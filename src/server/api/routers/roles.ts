import { z } from "zod";
import { createTRPCRouter, restrictedProcedure } from "~/server/api/trpc";

export const roleRouter = createTRPCRouter({
	createRole: restrictedProcedure
		.input(
			z.object({
				name: z.string(),
				alignment: z.string(),
				subAlignment: z.string(),
				abilities: z.string(),
				winCondition: z.string(),
				flavour: z.string().nullish(),
				wiki: z.string().url().nullish(),
				color: z.string().nullish(),
			})
		)
		.mutation(async ({ ctx: { prisma }, input }) => {
			try {
				const role = await prisma.role.create({
					data: {
						name: input.name,
						alignment: input.alignment,
						subAlignment: input.subAlignment,
						abilities: input.abilities,
						winCondition: input.winCondition,
						flavourText: input.flavour,
						wikiUrl: input.wiki,
						roleColour: input.color,
					},
				});

				if (!role) return false;
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		}),
});
``;
