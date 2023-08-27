import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import type { Permission } from "@prisma/client";

export type AuthResponse =
	| {
			discordId: string;
			username: string;
			permission: Permission;
	  }
	| { error: string };

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AuthResponse>
) {
	const searchParams = req.query;

	if (!("id" in searchParams))
		return res.status(400).json({ error: "Bad Request" });

	const id = searchParams.id;
	if (typeof id !== "string")
		return res.status(400).json({ error: "Bad Request" });

	const data = await prisma.user.findUnique({
		where: {
			discordId: id,
		},
	});

	if (!data) return res.status(404).json({ error: "Not Found" });

	return res.status(200).json({
		discordId: data.discordId,
		username: data.username,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		permission: data.permission,
	});
}
