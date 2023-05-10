import Product from '~/components/product'
import Head from 'next/head'
import Navbar from '~/components/Navbar'
import { api } from '~/utils/api';
import Loading from '~/components/Loading';

function Products() {
    const productQuery = api.stripe.getProducts.useQuery()
    const products = productQuery.data?.data
    if (typeof window != "undefined" && window.sessionStorage.getItem("payment")) {
        window.sessionStorage.removeItem("payment")
    }
    if (productQuery.isLoading) return (
        <Loading />
    )
    if (!products) return (<h1>Product Error</h1>)

    if (!!products) return (
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
                    <h1 className="text-slate-300 text-5xl  text-center"> Nuestros Productos</h1>
                    <div className='sm:w-4/5 min-w-full min-h-screen h-fit flex flex-col sm:flex-row justify-center items-center sm:items-start sm:flex-wrap   '>
                        {products.map(product => {
                            const price = product.default_price
                            if (typeof price == "string" || !price) return <h1>price error</h1>
                            if (product.images[0] && price.unit_amount) return <Product key={product.id} id={product.id} image={product.images[0]} name={product.name} description={product.description ? product.description : ""} price={price.unit_amount / 100} />
                        }

                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Products
