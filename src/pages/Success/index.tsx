import { useEffect, useRef } from "react";
import { api } from "~/utils/api"
import Head from "next/head";
import Navbar from "~/components/Navbar";
import { useUser } from "@clerk/nextjs";

interface Envio {
    CodigoPostal: string;
    Calle: string;
    Colonia: string;
    NumeroCasa: string;
    Telefono: string;
    Nombre: string;
}

interface PaymentResultType {
    CodigoPostal: number;
    Calle: string;
    Colonia: string;
    NumeroCasa: number;
    Telefono: string;
    NombreCliente: string;
    NombreProducto: string;
    PrecioProducto: number;
}


const SuccessPage = () => {
    const createEnvio = api.envio.addOne.useMutation();
    const envioRef = useRef<Envio>();
    const productNameRef = useRef<string>();
    const productPriceRef = useRef<string>();
    const VolverInicio = () => {
        sessionStorage.clear();
        location.href = "/";
    }

    if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const envioParams = params.get("envio");
        const productNameParams = params.get("productName");
        const productPriceParams = params.get("productPrice");

        if (envioParams) {
            const envioJson: Envio = JSON.parse(envioParams) as Envio;
            envioRef.current = {
                CodigoPostal: envioJson.CodigoPostal,
                Calle: envioJson.Calle,
                Colonia: envioJson.Colonia,
                NumeroCasa: envioJson.NumeroCasa,
                Telefono: envioJson.Telefono,
                Nombre: envioJson.Nombre,
            };
        }

        if (productNameParams) {
            productNameRef.current = productNameParams;
        }

        if (productPriceParams) {
            productPriceRef.current = productPriceParams;
        }
    }
    const userHook = useUser();
    let email: string | undefined = undefined;
    if (userHook.isSignedIn) {
        email = userHook.user.emailAddresses.toString()
        console.log(email)
    }

    if (
        envioRef.current &&
        productNameRef.current &&
        productPriceRef.current
    ) {
        interface PaymentResult {
            CodigoPostal: number;
            Calle: string;
            Colonia: string;
            NumeroCasa: number;
            Telefono: string;
            NombreCliente: string;
            NombreProducto: string;
            PrecioProducto: number;
            Email: string;
        }
        const PaymentResult: PaymentResult = {
            CodigoPostal: +envioRef.current.CodigoPostal,
            Calle: envioRef.current.Calle,
            Colonia: envioRef.current.Colonia,
            NumeroCasa: +envioRef.current.NumeroCasa,
            Telefono: envioRef.current.Telefono,
            NombreCliente: envioRef.current.Nombre,
            NombreProducto: productNameRef.current,
            PrecioProducto: +productPriceRef.current,
            Email: email ? email : "",
        };
        const storagePayment = sessionStorage.getItem("payment");
        if (storagePayment != JSON.stringify(PaymentResult)) {
            createEnvio.mutate(PaymentResult)
            sessionStorage.setItem("payment", JSON.stringify(PaymentResult));
        }
    }
    return (
        <div>
            <Head>
                <title>JAO accesorios</title>
                <meta name="description" content="lo que te falta para volverte inolvidable" />
                <link rel="icon" href="/logoJao.png" />
            </Head>
            <Navbar />
            <main className="min-h-screen h-fit  flex flex-col  justify-center bg-slate-800 items-center max-w-screen min-w-screen  ">
                <div className="navbar mb-5"></div>
                <div className="flex lg:space-x-5  flex-col items-center space-y-5 w-screen">
                    <h1 className="text-6xl font-bold text-white">
                        Gracias por su compra
                    </h1>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => VolverInicio()}>
                        Volver al inicio
                    </button>
                </div >
            </main >
        </div >

    );
};

export default function Success() {
    return <SuccessPage />;
}
