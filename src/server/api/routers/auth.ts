import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createTRPCMiddleware,
  createTRPCRouter,
  publicProcedure,
  restrictedProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
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
