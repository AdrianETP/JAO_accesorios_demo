import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { transporter } from "../../../nodemailer";
import { Email } from "@clerk/nextjs/dist/api";
export const envioRouter = createTRPCRouter({
    addOne: publicProcedure.input(z.object({
        CodigoPostal: z.number(),
        Calle: z.string(),
        Colonia: z.string(),
        NumeroCasa: z.number(),
        Telefono: z.string(),
        NombreCliente: z.string(),
        NombreProducto: z.string(),
        PrecioProducto: z.number(),
        Email: z.string(),
    }).required()).mutation(async ({ input, ctx }) => {
        if (input.Email == "") {
            throw new Error("Email is required");
        }
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
        await transporter.sendMail({
            from: process.env.SMTP_USERNAME,
            to: process.env.SMTP_USERNAME,
            subject: 'Nuevo envio',
            text: 'Nuevo envio',
            html: `
            <h1>Nuevo envio</h1>
            <ul>
            <li>Codigo Postal: ${newEnvio.CodigoPostal}</li>
            <li>Calle: ${newEnvio.Calle}</li>
            <li>Colonia: ${newEnvio.Colonia}</li>
            <li>Numero Casa: ${newEnvio.NumeroCasa}</li>
            <li>Telefono: ${newEnvio.Telefono}</li>
            <li>Nombre Cliente: ${newEnvio.NombreCliente}</li>
            <li>Nombre Producto: ${newEnvio.NombreProducto}</li>
            <li>Precio Producto: ${newEnvio.PrecioProducto / 100}</li>
            </ul>
            `
        })


        await transporter.sendMail({
            from: process.env.SMTP_USERNAME,
            to: input.Email,
            subject: 'Muchas Gracias por su compra',
            text: 'Muchas Gracias por su compra!',
            html: `
            <h1>Muchas Gracias por su compra</h1>
            <p>Agradecemos que hayas comprado el producto: ${newEnvio.NombreProducto}, El producto ya esta en proceso de entrega y cualquier duda y/o inconveniente puede comunicarse a este correo ${process.env.SMTP_USERNAME ? process.env.SMTP_USERNAME : "contacto.jaoaccesorios@gmail.com"}</p>
            `
        })



        return newEnvio;
    }),
})
