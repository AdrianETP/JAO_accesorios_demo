import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype/lib";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify/lib";
import { unified } from "unified";

export const blogRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.blog.findMany()
    }),
    getOneByTitle: publicProcedure.input(z.object({ title: z.string() })).query(({ ctx, input }) => {
        const result = ctx.prisma.blog.findFirst({ where: { Title: input.title } })
        return result

    }),
    addOne: publicProcedure.input(z.object(
        {
            title: z.string(),
            description: z.string(),
            image: z.string(),
            mdcontent: z.string(),
            password: z.string(),
        }
    )).mutation(async ({ ctx, input }) => {
        if (input.password == process.env.BLOG_PASSWORD) {

            const md = input.mdcontent

            const html = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeSanitize)
                .use(rehypeStringify)
                .process(md)
            const nuevoBlog = {
                Title: input.title,
                Image: input.image,
                MdContent: input.mdcontent,
                Description: input.description,
                HtmlContent: html.value as string
            }

            const result = await ctx.prisma.blog.create({ data: nuevoBlog })
            return result
        }
        else {
            return "Error: Password incorrect"
        }


    })
})
