import { useRouter } from "next/router"
import { api } from "~/utils/api"
import Image from 'next/image'
import Head from "next/head"
import Navbar from "~/components/Navbar"
import { ReactFragment, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe } from "@stripe/react-stripe-js"

type BuyProps = {
    priceId: string
}
function BuyButton(props: BuyProps) {
    const createCheckoutSession = api.stripe.getSession.useMutation()
    const stripe = useStripe()
    const handleSubmit = async (e: any) => {

        e.preventDefault()
        const session = await createCheckoutSession.mutateAsync({ priceId: props.priceId })
        console.log(session)
        stripe?.redirectToCheckout({
            sessionId: session.id
        })
    }
    return (

        <button onClick={(e) => handleSubmit(e)} className="btn btn-success">buy</button>
    )
}

export default function Product() {
    const router = useRouter()
    const id = router.query.id?.toString()
    if (!id) return (<h1>error: no id </h1>)
    const [lugar, setLugar] = useState("");
    const [otroLugar, setOtroLugar] = useState("");
    const product = api.stripe.getProduct.useQuery({ id: id.toString() });
    const price = product?.data?.default_price
    const stripeKeys = api.stripe.getKeys.useQuery();
    if (!stripeKeys.data) return (<h1 className="bg-slate-800 text-slate-200">error: no stripe keys</h1>)
    const stripePromise = loadStripe(stripeKeys.data?.publicKey)
    if (product.isLoading || stripeKeys.isLoading) return (<div><h1>Loading...</h1></div>)
    if (!price || typeof price == "string") {
        return (<h1> price error</h1>)
    }




    if (product.data && price.unit_amount) return (
        <div>
            <Head>
                <title>JAO accesorios</title>
                <meta name="description" content="lo que te falta para volverte inolvidable" />
                <link rel="icon" href="/logoJao.png" />
            </Head>
            <Navbar />
            <main className="min-h-screen h-fit flex flex-col bg-slate-800 items-center max-w-screen min-w-screen overflow-x-hidden">
                <div className="navbar mb-5"></div>
                <div className="flex lg:space-x-5 lg:flex-row flex-col items-center space-y-5">
                    <Image width={500} height={500} src={product.data.images[0] ? product.data.images[0] : ""} alt={product.data.name} className="rounded-lg w-full max-w-xl h-1/3 " />
                    <div className='lg:w-fit  lg:min-w-[45vw]  w-[90vw] py-10 flex flex-col md:flex-row md:justify-between items-center md:items-start bg-slate-500/30 pt-10 px-4 rounded-md'>
                        <div className="w-full flex flex-col items-center space-y-5">
                            <h1 className="text-5xl md:text-8xl text-center font-light w-full">{product.data.name}</h1>
                            <p className="text-2xl font-thin text-slate-400 text-center px-4">{product.data.description}</p>
                            <div className="text-2xl font-thin text-slate-400 px-4 flex justify-evenly w-4/5"><p className="text-slate-400">precio: ${price.unit_amount / 100}MXN</p></div>
                            <h3 className="text-xl font-bold text-center">donde te gustaria recoger el producto?</h3>

                            <select className="select select-bordered w-full max-w-xs" onChange={e => { setLugar(e.target.value) }} value={lugar}>
                                <option>Lugar 1</option>
                                <option>Lugar 2</option>
                                <option>Otro</option>
                            </select>
                            <input className={lugar == "Otro" ? "input w-80 input-bordered" : "hidden"} placeholder="Que otro lugar te conviene?" onChange={(e) => setOtroLugar(e.target.value)} value={otroLugar} />
                            <Elements stripe={stripePromise}>
                                <BuyButton priceId={price.id} />
                            </Elements>
                        </div>
                    </div >
                </div >
            </main >
        </div >
    )
    return <div />

}
