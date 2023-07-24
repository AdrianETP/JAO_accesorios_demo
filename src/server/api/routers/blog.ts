import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const blogRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.blog.findMany()
    }),
    getOneByTitle: publicProcedure.input(z.object({ title: z.string() })).query(({ ctx, input }) => {
        const result = ctx.prisma.blog.findFirst({ where: { Title: input.title } })
        return result

    })
})
