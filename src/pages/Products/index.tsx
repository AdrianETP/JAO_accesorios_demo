import Product from '~/components/product'
import Head from 'next/head'
import Navbar from '~/components/Navbar'
import { api } from '~/utils/api';

function Products() {
    const products = api.product.getAll.useQuery()
    if (products.isLoading) return (
        <div>
            <Head>
                <title>JAO accesorios</title>
                <meta name="description" content="lo que te falta para volverte inolvidable" />
                <link rel="icon" href="/logoJao.png" />
            </Head>
            <Navbar />
            <main className="min-h-screen h-fit flex flex-col bg-slate-800 items-center max-w-screen min-w-full w-fit">
                <div className="navbar mb-5"></div>
                <div className='flex justify-center items-center'>
                    <h1 className='text-5xl font-thin'>Loading...</h1>
                </div>
            </main>
        </div>
    )

    return (
        <div>
            <Head>
                <title>JAO accesorios</title>
                <meta name="description" content="lo que te falta para volverte inolvidable" />
                <link rel="icon" href="/logoJao.png" />
            </Head>
            <Navbar />
            <main className="min-h-screen h-fit flex flex-col bg-slate-800 items-center max-w-screen min-w-full w-fit">
                <div className="navbar mb-5"></div>
                <div>
                    <h1 className="text-slate-300 text-5xl font-thin text-center"> Nuestros Productos</h1>
                    <div className='sm:w-4/5 min-w-full min-h-screen h-fit flex flex-col sm:flex-row justify-center items-center sm:items-start sm:flex-wrap   '>
                        {products.data?.map(product => (
                            <Product key={product.id} id={product.id} image={"/products/" + product.nombreImagen} name={product.nombre} description={product.descripcion} price={product.precio} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Products
