import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return {};
  }),

  getUser: publicProcedure
    .input(z.object({ authId: z.string().nullish() }))
    .query(async ({ input }) => {
      if (!input.authId) return {};
      const user = await clerkClient.users.getUser(input.authId);
      return user;
    }),
});
