import { useRouter } from "next/router"
import { api } from "~/utils/api"
import Image from 'next/image'
import Head from "next/head"
import Navbar from "~/components/Navbar"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState, FormEvent } from "react"
import Loading from "~/components/Loading"

interface BuyFormProps {
    productName: string,
    productPrice: number,
}
function BuyForm(props: BuyFormProps) {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState("")
    const [envio, setEnvio] = useState({
        CodigoPostal: "",
        Calle: "",
        Colonia: "",
        NumeroCasa: "",
        Telefono: "",
        Nombre: "",
    })
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!stripe || !elements) {
        }
        else {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: { // Make sure to change this to your payment completion page 
                    return_url: `https://jao-accesorios-demo.vercel.app/Success?envio=${JSON.stringify(envio)}&productName=${props.productName}&productPrice=${props.productPrice}`,
                },
            });
            if (!error) {

            } else {
                console.log(error)
                setMessage(error.message || "Something went wrong")
            }
        }



    }

    return (
        <>
            <form className="sm:w-5/6 w-full bg-slate-900 p-4 rounded-md" onSubmit={e => handleSubmit(e)}>
                <h1 className="mb-3">Pago</h1>
                <PaymentElement />
                <h1 className="mt-3">Envio</h1>
                <div className="flex sm:flex-row flex-col sm:space-x-3">
                    <input className="input input-lg bg-[#30313d] text-white w-full sm:w-1/2  mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Codigo Postal" type="number" onChange={(e) => setEnvio(envio => ({ ...envio, CodigoPostal: e.target.value }))} />
                    <input className="input input-lg bg-[#30313d] text-white w-full sm:w-1/2  mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Calle" onChange={(e) => setEnvio(envio => ({ ...envio, Calle: e.target.value }))} />
                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-3">
                    <input className="input input-lg bg-[#30313d] text-white w-full sm:w-1/2  mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Colonia" onChange={(e) => setEnvio(envio => ({ ...envio, Colonia: e.target.value }))} />
                    <input className="input input-lg bg-[#30313d] text-white w-full sm:w-1/2  mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Numero de Casa" type="number" onChange={(e) => setEnvio(envio => ({ ...envio, NumeroCasa: e.target.value }))} />

                </div>
                <input className="input input-lg bg-[#30313d] text-white w-full mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Telefono" type="number" onChange={(e) => setEnvio(envio => ({ ...envio, Telefono: e.target.value }))} />
                <input className="input input-lg bg-[#30313d] text-white w-full mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Nombre de quien Recibe" onChange={(e) => setEnvio(envio => ({ ...envio, Nombre: e.target.value }))} />
                <div className="w-full flex justify-center mt-3">
                    <button className="btn btn-success">Terminar la compra</button>
                </div>
            </form>

        </>
    );
}

export default function Product() {
    const { query } = useRouter()
    const product = api.stripe.getProduct.useQuery({ id: query.id as string });
    const price = product?.data?.default_price
    const stripeKeys = api.stripe.getKeys.useQuery({ amount: price instanceof Object && price?.unit_amount ? price?.unit_amount : 0 });
    if (!stripeKeys.data) return (<Loading />)
    const stripeOptions: StripeElementsOptions = {
        clientSecret: stripeKeys.data?.secretKey ? stripeKeys.data.secretKey : "",
        appearance: {
            theme: 'night',
            labels: "floating"
        }
    }
    const stripePromise = loadStripe(stripeKeys.data?.publicKey)
    if (product.isLoading || stripeKeys.isLoading) return (<Loading />)
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
                    <Image width={500} height={500} src={product.data.images[0] ? product.data.images[0] : ""} alt={product.data.name} className="rounded-lg w-4/5 max-w-xl h-1/3 " />
                    <div className='lg:w-fit  lg:min-w-[45vw]  w-[90vw] py-10 flex flex-col md:flex-row md:justify-between items-center md:items-start  pt-10 px-4 rounded-md'>
                        <div className="w-full flex flex-col items-center space-y-5">
                            <h1 className="text-5xl md:text-8xl text-center font-light w-full">{product.data.name}</h1>
                            <p className="text-2xl font-thin text-slate-400 text-center px-4">{product.data.description}</p>
                            <div className="text-2xl font-thin text-slate-400 px-4 flex justify-evenly w-4/5"><p className="text-slate-400">precio: ${price.unit_amount / 100}MXN</p></div>
                            {
                                stripeKeys.data?.publicKey && stripeKeys.data.secretKey ?
                                    < Elements stripe={stripePromise} options={stripeOptions}  >
                                        <BuyForm productName={product.data.name} productPrice={price.unit_amount} />
                                    </Elements> : <div>Error with buying</div>
                            }
                        </div>
                    </div >
                </div >
            </main >
        </div >
    )
    return <div />

}
