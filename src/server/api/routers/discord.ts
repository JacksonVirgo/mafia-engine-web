import { z } from "zod";
import { createTRPCRouter, restrictedProcedure } from "~/server/api/trpc";
import { getPermissionsInGuild, getUserGuilds } from "~/utils/discordAPI";

export const discordRouter = createTRPCRouter({
	guilds: restrictedProcedure.query(async ({ ctx: { oauth } }) => {
		return {
			guilds: await getUserGuilds(oauth.token),
		};
	}),

	validatePermissions: restrictedProcedure
		.input(
			z.object({
				guildId: z.string(),
			})
		)
		.query(async ({ ctx: { oauth }, input: { guildId } }) => {
			return await getPermissionsInGuild(oauth.token, guildId);
		}),

	discordMafia: restrictedProcedure.query(async ({ ctx: { oauth } }) => {
		const guilds = await getUserGuilds(oauth.token);
		if (!guilds)
			return {
				inServer: false,
			};

		const guild = guilds.find((guild) => guild.id === "648663810772697089");
		if (!guild)
			return {
				inServer: false,
			};

		return {
			inServer: true,
			isOwner: guild.owner,
			isAdministrator: (guild.permissions & 0x8) === 0x8,
		};
	}),

	getUserData: restrictedProcedure.query(
		async ({ ctx: { prisma, discordId } }) => {
			const userData = await prisma.user.findUnique({
				where: {
					discordId,
				},
			});

			if (!userData)
				return {
					user: null,
				};

			return {
				user: {
					discordId: userData.discordId,
					username: userData.username,
				},
			};
		}
	),

	userCount: restrictedProcedure.query(async ({ ctx: { prisma } }) => {
		const count = await prisma.user.count();

		return {
			count,
		};
	}),

	users: restrictedProcedure
		.input(
			z.object({
				take: z.number().default(10),
				skip: z.number().default(0),
				sort: z.string().default("asc").nullish(),
				sortBy: z.string().default("id").nullish(),
				search: z.string().nullish(),
				idSearch: z.string().nullish(),
			})
		)
		.query(async ({ ctx: { prisma }, input }) => {
			const sort: "asc" | "desc" | undefined =
				input.sort == "desc"
					? "desc"
					: input.sort == "asc"
					? "asc"
					: undefined;
			const sortBy: "id" | "username" =
				input.sortBy === "id" ? "id" : "username";

			const search =
				input.search == "" ? undefined : input.search ?? undefined;

			const idSearch =
				input.idSearch == "" ? undefined : input.idSearch ?? undefined;

			const users = await prisma.user.findMany({
				where: {
					username: search
						? {
								contains: search,
								mode: "insensitive",
						  }
						: undefined,
					discordId: idSearch,
				},
				orderBy: {
					id: sortBy === "id" ? sort : undefined,
					username: sortBy === "username" ? sort : undefined,
				},
				take: input.take,
				skip: input.skip,
			});

			const totalUsers = await prisma.user.count();

			return {
				users,
				count: totalUsers,
			};
		}),
});
