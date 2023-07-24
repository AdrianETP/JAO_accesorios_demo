import { useRouter } from "next/router"
import { api } from "~/utils/api"
import Image from 'next/image'
import Head from "next/head"
import Navbar from "~/components/Navbar"
import { type StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState, type FormEvent } from "react"
import Loading from "~/components/Loading"

interface BuyFormProps {
    productName: string,
    productPrice: number,
}
function BuyForm(props: BuyFormProps) {
    const stripe = useStripe()
    const elements = useElements()
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
            const encodedEnvio = encodeURIComponent(JSON.stringify(envio))
            const encodedProductName = encodeURIComponent(props.productName)
            const encodedProductPrice = encodeURIComponent(props.productPrice)
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: { // Make sure to change this to your payment completion page 
                    return_url: `http://localhost:3000/Success?envio=${encodedEnvio}&productName=${encodedProductName}&productPrice=${encodedProductPrice}`,
                },
            });
            if (!error) {

            } else {
                console.log(error)
            }
        }



    }

    return (
        <>
            <form className="sm:w-5/6 w-full bg-secondaryBlack shadow-xl p-4 rounded-md text-textColor" onSubmit={e => handleSubmit(e)}>
                <h1 className="mb-3 text-textColor">Pago</h1>
                <PaymentElement />
                <h1 className="mt-3 text-textColor">Envio</h1>
                <div className="flex sm:flex-row flex-col sm:space-x-3">
                    <input className="input input-lg bg-[#30313d] text-textColor w-full sm:w-1/2  mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Codigo Postal" type="number" onChange={(e) => setEnvio(envio => ({ ...envio, CodigoPostal: e.target.value }))} />
                    <input className="input input-lg bg-[#30313d] text-textColor w-full sm:w-1/2  mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Calle" onChange={(e) => setEnvio(envio => ({ ...envio, Calle: e.target.value }))} />
                </div>

                <div className="flex sm:flex-row flex-col sm:space-x-3">
                    <input className="input input-lg bg-[#30313d] text-textColor w-full sm:w-1/2  mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Colonia" onChange={(e) => setEnvio(envio => ({ ...envio, Colonia: e.target.value }))} />
                    <input className="input input-lg bg-[#30313d] text-textColor w-full sm:w-1/2  mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Numero de Casa" type="number" onChange={(e) => setEnvio(envio => ({ ...envio, NumeroCasa: e.target.value }))} />

                </div>
                <input className="input input-lg bg-[#30313d] text-textColor w-full mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Telefono" type="number" onChange={(e) => setEnvio(envio => ({ ...envio, Telefono: e.target.value }))} />
                <input className="input input-lg bg-[#30313d] text-textColor w-full mt-3 border-1 border-gray-50/5 shadow-black shadow-sm rounded-sm" placeholder="Nombre de quien Recibe" onChange={(e) => setEnvio(envio => ({ ...envio, Nombre: e.target.value }))} />
                <div className="w-full flex justify-center mt-3">
                    <button className="btn bg-secondary text-textColor hover:bg-secondarydes">Terminar la compra</button>
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
            <main className="min-h-screen h-fit flex flex-col bg-primary items-center max-w-screen min-w-screen overflow-x-hidden">
                <div className="navbar mb-5"></div>
                <div className="flex lg:space-x-5 lg:flex-row flex-col items-center space-y-5">
                    <Image width={500} height={500} src={product.data.images[0] ? product.data.images[0] : ""} alt={product.data.name} className="rounded-lg w-4/5 max-w-xl h-1/3  shadow-xl" />
                    <div className='lg:w-fit  lg:min-w-[45vw]  w-[90vw] py-10 flex flex-col md:flex-row md:justify-between items-center md:items-start  pt-10 px-4 rounded-md'>
                        <div className="w-full flex flex-col items-center space-y-5">
                            <h1 className="text-5xl md:text-8xl text-center font-light w-full text-textColor">{product.data.name}</h1>
                            <p className="text-2xl font-thin text-textColor text-center px-4">{product.data.description}</p>
                            <div className="text-2xl font-thin text-textColor px-4 flex justify-evenly w-4/5"><p className="text-textColor">precio: ${price.unit_amount / 100}MXN</p></div>
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
