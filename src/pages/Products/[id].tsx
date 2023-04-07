import { useRouter } from "next/router"
import { api } from "~/utils/api"
import Image from 'next/image'
import Head from "next/head"
import Navbar from "~/components/Navbar"

export default function Product() {
    const router = useRouter()
    let { id } = router.query
    let product
    if (typeof id === "string") product = api.product.getOne.useQuery({ id: id })
    let data;

    if (product) data = product.data
    if (!!data) {
        return (
            <div>
                <Head>
                    <title>JAO accesorios</title>
                    <meta name="description" content="lo que te falta para volverte inolvidable" />
                    <link rel="icon" href="/logoJao.png" />
                </Head>
                <Navbar />
                <main className="min-h-screen h-fit flex flex-col bg-slate-800 items-center max-w-screen min-w-screen overflow-x-hidden">
                    <div className="navbar mb-5"></div>
                    <div>
                        <div className='md:w-7/8 md:max-w-[80vw]  w-screen py-10 flex flex-col md:flex-row md:justify-between items-center md:items-start bg-zinc-500/30 pt-10 px-4 rounded-md'>
                            {/*here goes the content*/}
                            <Image width={500} height={500} src={"/productPics/" + data.nombreImagen} alt={data.nombre} className="rounded-lg w-full md:w-1/2 h-1/3 " />
                            <div className="md:w-1/2 w-full flex flex-col items-center space-y-5">
                                <h1 className="text-5xl md:text-7xl text-center font-light w-full">{data.nombre}</h1>
                                <p className="text-2xl font-thin text-slate-400 text-center px-4">{data.descripcionLarga}</p>
                                <div className="text-2xl font-thin text-slate-400 px-4 flex justify-evenly w-4/5"><p>${data.precio}MXN</p> <p>{data.stock} in stock</p></div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        )
    }

    return (<div />)

}
