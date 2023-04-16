import { useEffect, useRef } from "react";
import { api } from "~/utils/api"

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

    useEffect(() => {
        if (
            envioRef.current &&
            productNameRef.current &&
            productPriceRef.current
        ) {
            const PaymentResult: PaymentResultType = {
                CodigoPostal: +envioRef.current.CodigoPostal,
                Calle: envioRef.current.Calle,
                Colonia: envioRef.current.Colonia,
                NumeroCasa: +envioRef.current.NumeroCasa,
                Telefono: envioRef.current.Telefono,
                NombreCliente: envioRef.current.Nombre,
                NombreProducto: productNameRef.current,
                PrecioProducto: +productPriceRef.current,
            };
            console.log(PaymentResult);
            createEnvio.mutate(PaymentResult);
        }
    }, []);

    return <div>Success</div>;
};

export default function Success() {
    return <SuccessPage />;
}
