import type { UserGuild } from "./discordAPI";

export function isGuild(guild: unknown): guild is UserGuild {
	if (typeof guild !== "object") return false;
	if (!guild) return false;
	if (!("id" in guild)) return false;
	if (!("name" in guild)) return false;
	if (!("owner" in guild)) return false;
	if (!("permissions" in guild)) return false;
	if (!("permissions_new" in guild)) return false;
	return true;
}

export function isGuildArray(d: unknown): d is UserGuild[] {
	if (!Array.isArray(d)) return false;
	if (!d.every((guild) => isGuild(guild))) return false;
	return true;
}
