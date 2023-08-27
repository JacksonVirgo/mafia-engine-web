import { createTRPCRouter, restrictedProcedure } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { discordRouter } from "./routers/discord";
import { z } from "zod";
import axios from "axios";
import { TRPCError } from "@trpc/server";
import { roleRouter } from "./routers/roles";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	auth: authRouter,
	discord: discordRouter,
	roles: roleRouter,

	contact: restrictedProcedure
		.input(
			z.object({
				title: z.string().max(40),
				message: z.string().max(1024),
			})
		)
		.mutation(async ({ input, ctx: { discordUser, discordId } }) => {
			try {
				const webhookURL = process.env.CONTACT_WEBHOOK;
				if (!webhookURL)
					throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
				if (!discordUser.username)
					throw new TRPCError({ code: "BAD_REQUEST" });

				const message: string[] = [
					"```yaml",
					`USER: ${discordUser.username}`,
					`DISCORD ID: ${discordId}`,
					"\n",
					`- SUBJECT -`,
					`${input.title}`,
					"\n",
					`- MESSAGE -`,
					`${input.message}`,
					"\n```",
				];

				const webhook = await axios.post(webhookURL, {
					content: message.join("\n"),
				});

				if (webhook.status != 204)
					throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
				return {
					success: true,
				};
			} catch (err) {
				console.log(err);
				throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
			}
		}),
});

// export type definition of API
export type AppRouter = typeof appRouter;
