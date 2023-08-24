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

export function generateHeaders(authToken: string) {
	return {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	};
}

export function getUrl(str: string) {
	return `https://discord.com/api${str}`;
}

export async function getUserGuilds(authToken: string) {
	try {
		const res = await axios.get(
			getUrl("/users/@me/guilds"),
			generateHeaders(authToken)
		);

		if (!res.data) return null;
		if (isGuildArray(res.data)) return res.data;
		return null;
	} catch (err) {
		return null;
	}
}

export async function getPermissionsInGuild(
	authToken: string,
	guildId: string
) {
	try {
		const res = await axios.get(
			getUrl(`/users/@me/guilds/${guildId}/member`),
			generateHeaders(authToken)
		);

		const data = res.data as unknown;
		if (!data) return null;
		if (typeof data != "object") return null;
		if (!("permissions" in data)) return null;
		if (typeof data.permissions != "number") return null;

		const permissions = {
			status: 200,
			isAdministrator: (data.permissions & 0x8) === 0x8,
		};

		return permissions;
	} catch (err) {
		console.log(err);
		console.log("error");
		return null;
	}
}
