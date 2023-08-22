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
});
