import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  // CREATE listing (with optional image + category)
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        quantity: z.number().min(1),
        imageUrl: z.string().url().optional().nullable(),
        category: z.string().min(1).default("vegetable"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listing.create({
        data: {
          name: input.name,
          quantity: input.quantity,
          imageUrl: input.imageUrl ?? null,
          category: input.category,
        },
      });
    }),

  // GET all listings
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  // DELETE listing
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.listing.delete({
        where: {
          id: input.id,
        },
      });
    }),
});