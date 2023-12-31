/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma } from "~/server/db";
import { initTRPC, TRPCError } from "@trpc/server";
import {
	type ExternalAccount,
	getAuth,
	type OauthAccessToken,
} from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

// type CreateContextOptions = Record<string, never>;

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: CreateNextContextOptions) => {
	const { req } = opts;
	const sesh = getAuth(req);
	const userId = sesh.userId;

	return {
		prisma,
		userId,
	};
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError
						? error.cause.flatten()
						: null,
			},
		};
	},
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;
export const createTRPCMiddleware = t.middleware;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

const isLoggedIn = createTRPCMiddleware(async (opts) => {
	const ctx = opts.ctx;
	if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
	try {
		const user = ctx.userId
			? await clerkClient.users.getUser(ctx.userId)
			: null;
		if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

		let discordUser: ExternalAccount | undefined;

		for (const account of user.externalAccounts) {
			if (discordUser) break;
			if (account.provider === "oauth_discord") discordUser = account;
		}

		user.externalAccounts.forEach((account) => {
			if (account.provider === "oauth_discord") {
				discordUser = account;
			}
		});

		if (!discordUser) throw new TRPCError({ code: "UNAUTHORIZED" });

		const token = await clerkClient.users.getUserOauthAccessToken(
			user.id,
			"oauth_discord"
		);

		let discordToken: OauthAccessToken | undefined;
		if (token) {
			for (const t of token) {
				if (t.provider === "oauth_discord" && !discordToken) {
					discordToken = t;
				}
			}
		}

		if (!discordToken) throw new TRPCError({ code: "UNAUTHORIZED" });

		const newCTX = {
			...ctx,
			user,
			oauth: discordToken,
			discordUser,
			discordId: discordUser.externalId,
		};

		return opts.next({
			ctx: newCTX,
		});
	} catch (err) {
		console.log(err);
		throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
	}
});

const isAdmin = createTRPCMiddleware(async (opts) => {
	const ctx = opts.ctx;
	if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
	try {
		const user = ctx.userId
			? await clerkClient.users.getUser(ctx.userId)
			: null;
		if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

		let discordUser: ExternalAccount | undefined;

		for (const account of user.externalAccounts) {
			if (discordUser) break;
			if (account.provider === "oauth_discord") discordUser = account;
		}

		user.externalAccounts.forEach((account) => {
			if (account.provider === "oauth_discord") {
				discordUser = account;
			}
		});

		if (!discordUser) throw new TRPCError({ code: "UNAUTHORIZED" });

		const token = await clerkClient.users.getUserOauthAccessToken(
			user.id,
			"oauth_discord"
		);

		let discordToken: OauthAccessToken | undefined;
		if (token) {
			for (const t of token) {
				if (t.provider === "oauth_discord" && !discordToken) {
					discordToken = t;
				}
			}
		}

		if (!discordToken) throw new TRPCError({ code: "UNAUTHORIZED" });

		const data = await prisma.user.findUnique({
			where: {
				discordId: discordUser.externalId,
			},
		});
		if (!data) throw new TRPCError({ code: "UNAUTHORIZED" });

		if (data.permission !== "Admin")
			throw new TRPCError({ code: "UNAUTHORIZED" });

		const newCTX = {
			...ctx,
			user,
			oauth: discordToken,
			discordUser,
			discordId: discordUser.externalId,
		};

		return opts.next({
			ctx: newCTX,
		});
	} catch (err) {
		console.log(err);
		throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
	}
});

export const restrictedProcedure = publicProcedure.use(isLoggedIn);
export const adminProcedure = publicProcedure.use(isAdmin);
