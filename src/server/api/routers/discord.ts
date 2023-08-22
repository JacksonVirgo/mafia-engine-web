import { TRPCError } from "@trpc/server";
import axios from "axios";
import { REST, Routes } from "discord.js";
import { createTRPCRouter, restrictedProcedure } from "~/server/api/trpc";
import { getUserGuilds } from "~/utils/discordAPI";

export const discordRouter = createTRPCRouter({
	guilds: restrictedProcedure.query(async ({ ctx: { oauth } }) => {
		if (!oauth) throw new TRPCError({ code: "UNAUTHORIZED" });
		return {
			guilds: await getUserGuilds(oauth.token),
		};
	}),

	discordMafia: restrictedProcedure.query(async ({ ctx: { oauth } }) => {
		if (!oauth) throw new TRPCError({ code: "UNAUTHORIZED" });

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
