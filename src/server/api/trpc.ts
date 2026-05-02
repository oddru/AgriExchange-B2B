import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "~/server/db";
import { auth } from "~/server/auth"; // ✅ ADD THIS

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth(); // ✅ GET SESSION

  return {
    db,
    session, // INCLUDE SESSION IN CONTEXT
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

/**
 * Middleware for timing
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms`);

  return result;
});

/**
 * PUBLIC (no auth required)
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * PROTECTED (auth required)
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new Error("UNAUTHORIZED");
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.session.user,
      },
    });
  });