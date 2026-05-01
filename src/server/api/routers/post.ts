import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listing.create({
        data: input,
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.listing.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});