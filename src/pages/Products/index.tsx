import React from 'react'
import Product from '~/components/product'
import Head from 'next/head'
import Navbar from '~/components/Navbar'

function Products() {
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
                        <Product name="cadena 1" image='/products/cadena-1.jpg' description='cadena de acero inoxidable' price={200}></Product>
                        <Product name="cadena 2" image='/products/cadena-2.jpg' description='cadena de acero inoxidable' price={200}></Product>
                        <Product name="cadena 3" image='/products/cadena-3.jpg' description='cadena de acero inoxidable' price={300}></Product>
                        <Product name="cadena 4" image='/products/cadena-4.jpg' description='cadena de acero inoxidable' price={400}></Product>
                        <Product name="juego de cadenas 1" image='/products/juego-cadenas-1.jpg' description='juego de cadenas de acero' price={400}></Product>
                        <Product name="juego de cadenas 2" image='/products/juego-cadenas-2.jpg' description='juego de cadenas de acero' price={400}></Product>
                        <Product name="juego de pulceras" image='/products/juego-pulceras-1.jpg' description='juego de pulceras de acero' price={400}></Product>
                        <Product name="pulceras de alambre" image='/products/pulcera-alambre.jpg' description='juego de pulceras de acero' price={400}></Product>
                        <Product name="juego de pulceras" image='/products/pulsera-mano.jpg' description='juego de pulceras de acero' price={400}></Product>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Products
