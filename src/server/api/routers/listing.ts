import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        quantity: z.number().min(1),
        price: z.number().min(0),
        unit: z.string().min(1),
        imageUrl: z.string().url().optional(),
        category: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listing.create({
        data: {
          name: input.name,
          quantity: input.quantity,
          price: input.price,
          unit: input.unit,
          imageUrl: input.imageUrl ?? null,
          category: input.category,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.listing.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listing.delete({
        where: { id: input.id },
      });
    }),
});