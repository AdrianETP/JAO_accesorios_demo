import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const envioRouter = createTRPCRouter({
    addOne: publicProcedure.input(z.object({
        CodigoPostal: z.number(),
        Calle: z.string(),
        Colonia: z.string(),
        NumeroCasa: z.number(),
        Telefono: z.number(),
        NombreCliente: z.string(),
        NombreProducto: z.string(),
        PrecioProducto: z.number(),
    }).required()).mutation(async ({ input, ctx }) => {
        const newEnvio = await ctx.prisma.envio.create({
            data: {
                CodigoPostal: input.CodigoPostal,
                Calle: input.Calle,
                Colonia: input.Colonia,
                NumeroCasa: input.NumeroCasa,
                Telefono: input.Telefono,
                NombreCliente: input.NombreCliente,
                NombreProducto: input.NombreProducto,
                PrecioProducto: input.PrecioProducto,
            }
        })
        return newEnvio;
    }),
})
