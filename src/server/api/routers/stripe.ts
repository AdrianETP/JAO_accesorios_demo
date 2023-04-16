import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import Stripe from "stripe";
import { env } from '../../../env.mjs'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15"
})
export const stripeRouter = createTRPCRouter({
    getProducts: publicProcedure.query(async () => {
        const products = await stripe.products.list({ expand: ['data.default_price'] })
        return products
    }),
    getProduct: publicProcedure.input(z.object({ id: z.string() }).required()).query(async ({ input }) => {
        const product: Stripe.Product = await stripe.products.retrieve(input.id, { expand: ["default_price"] })
        return product

    }),
    getKeys: publicProcedure.input(z.object({ amount: z.number() }).required()).query(async ({ input }) => {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: input.amount,
            currency: "mxn",
            payment_method_types: ["card"],
        })
        return {
            publicKey: env.STRIPE_PUBLISHABLE_KEY,
            secretKey: paymentIntent.client_secret,
        }
    }),
    getSession: publicProcedure.input(z.object({ priceId: z.string() })).mutation(({ input }) => {
        return stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [{
                price: input.priceId,
                quantity: 1
            }],
            success_url: "http://localhost:3000/Products",
        })
    })


})
