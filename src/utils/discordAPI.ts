import axios from "axios";
import { isGuildArray } from "./discordAPITypeCheck";

export type UserGuild = {
	id: string;
	name: string;
	icon?: string;
	owner: boolean;
	permissions: number;
	permissions_new: string;
};

export type UserGuilds = UserGuild[];

export async function getUserGuilds(authToken: string) {
	try {
		const res = await axios.get(
			"https://discord.com/api/users/@me/guilds",
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		);

		if (!res.data) return null;
		if (isGuildArray(res.data)) return res.data;
		return null;
	} catch (err) {
		return null;
	}
}
