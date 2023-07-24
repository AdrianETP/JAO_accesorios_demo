import { createTRPCRouter } from "~/server/api/trpc";
import { productRouter } from "./routers/products";
import { stripeRouter } from "./routers/stripe";
import { envioRouter } from "./routers/envio";
import { blogRouter } from "./routers/blog";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    product: productRouter,
    stripe: stripeRouter,
    envio: envioRouter,
    blog: blogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
