import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure, // ✅ IMPORT
} from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  /**
   * ✅ CREATE (AUTH REQUIRED)
   */
  create: protectedProcedure
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

          // ✅ IMPORTANT: LINK TO USER
          userId: ctx.user.id,
        },
      });
    }),

  /**
   * PUBLIC READ
   */
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.listing.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  /**
   * ✅ DELETE (AUTH + OWNERSHIP)
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const listing = await ctx.db.listing.findUnique({
        where: { id: input.id },
      });

      if (!listing) {
        throw new Error("Listing not found");
      }

      // ✅ OWNER CHECK
      if (listing.userId !== ctx.user.id) {
        throw new Error("Not allowed");
      }

      return ctx.db.listing.delete({
        where: { id: input.id },
      });
    }),
});