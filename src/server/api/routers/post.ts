import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.number(),
        category: z.string(),
        price: z.number(),
        unit: z.string(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listing.create({
        data: {
          name: input.name,
          quantity: input.quantity,
          category: input.category,
          price: input.price,
          unit: input.unit,
          imageUrl: input.imageUrl,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.listing.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.listing.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});