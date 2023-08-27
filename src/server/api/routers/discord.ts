import { z } from "zod";
import { createTRPCRouter, restrictedProcedure } from "~/server/api/trpc";

export const discordRouter = createTRPCRouter({
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
