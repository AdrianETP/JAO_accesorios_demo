import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.product.findMany();
    }),
    getOne: publicProcedure.input(z.object({ id: z.string() }).required()).query(({ ctx, input }) => {
        return ctx.prisma.product.findUnique({ where: { id: input.id } })
    }),
});
