import Navbar from "~/components/Navbar";
import Head from "next/head";
import Image from "next/image";

export default function About() {
    const QA = [
        {
            id: 1,
            pregunta: " ¿Cuál es el material y la calidad de los accesorios?",
            respuesta: "Procuramos optar por accesorios de la mejor calidad y material. Accesorios que nosotros también usemos sin ningún problema. Son de acero inoxidable por ende puedes dejar a un lado la preocupación de que te van a manchar o que se podrían ver mal."
        },
        {
            id: 2,
            pregunta: "¿Cuál es la política de devoluciones y cambios?",
            respuesta: "Los artículos tienen una garantía de 15 días, si por cualquier razón el articulo llegará a estar defectuoso, nosotros mismos veríamos con buenos ojos ya sea devolver el dinero invertido en este o cambiarlo por otro del catálogo."
        },


    ]
    const propositos = [
        {
            id: 1,
            title: "Diseños exclusivo y limitados",
            description: "Nos preocupamos por traer a ustedes diseños exclusivos, modernos y de calidad. Algunos de estos son limitados, refiriéndose a que existe la posibilidad que en un futuro no vuelvan a estar disponibles. Procuramos que en Jao Acessorios se manejen los mejores materiales y que estos duren para toda la vida."
        },
        {
            id: 2,
            title: "Experiencia del cliente personalizada",
            description: "Brindamos una experiencia de cliente excepcional y personalizada porque sabemos puede marcar la diferencia. Desde el sitio web hasta el servicio postventa, nos centramos en las necesidades individuales de cada cliente y ofrecer recomendaciones basadas en sus preferencias para crear un vínculo más fuerte con la marca. Contamos con ofertas exclusivas para nuestros clientes recurrentes."

        },
        {
            id: 3,
            title: "Estilo atemporal y versatilidad",
            description: "Los accesorios para hombres se centrarían en diseños atemporales y versátiles que se adapten a diferentes ocasiones y estilos de vida. La durabilidad y la calidad serían esenciales para garantizar que los productos sean duraderos y perduren en el tiempo."
        }

    ]
    return (
        <div>
            <Head>
                <title>JAO accesorios</title>
                <meta name="description" content="lo que te falta para volverte inolvidable" />
                <link rel="icon" href="/logoJao.png" />
            </Head>
            <Navbar />
            <main className="min-h-screen h-fit flex flex-col bg-primary items-center max-w-screen min-w-full w-fit  overflow-x-hidden">
                <section className="text-center  flex  items-center w-full min-h-[80vh] h-4/6 pt-20 space-y-10 justify-evenly flex-wrap md:flex-row flex-col  " >
                    <Image src="/logoJao.png" width={300} height={300} alt="Logo" className="rounded-md w-86  shadow-xl"></Image>
                    <div className="md:w-1/3 w-full text-center flex flex-col items-center space-y-5 ">
                        <h1 className="text-textColor md:text-6xl text-7xl">Quienes somos?</h1>
                        <p className="w-full text-textColor text-lg">Las apariencias importan, mentira si no lo crees. El cómo vistes importa para la escuela, el trabajo, negocios, relaciones personales, para toda tu vida. Con Jao Accesorios vestirás mejor para toda ocasión, no te sentirás mal vestido, subirá tu autoestima al tener buen porte. ¿Estás listo para tomar acción y que te tomen en serio en tu vida? Viste mejor con nosotros y se te facilitarán las cosas                        </p>
                    </div>
                </section>
                <section className="text-center  flex flex-col items-center justify-center w-screen  pt-10 " >
                    <h1 className="text-textColor text-6xl ">Propositos</h1>
                    <div className="w-full h-full flex  justify-center md:space-x-10 space-y-5 md:space-y-0 md:flex-row flex-col items-center pt-10 flex-wrap">
                        {
                            propositos.map((proposito) => (

                                <div className="relative md:w-96 md:h-96 w-80 h-80 shadow-xl  rounded-md" key={proposito.id}>
                                    <h2 className="text-xl bg-secondaryBlack text-textColor w-full h-full absolute rounded-md hover:opacity-0 transition-all flex justify-center items-center ease-in">{proposito.title}</h2>
                                    <p className="  bg-secondary text-textColor w-full h-full text-md absolute rounded-md hover:opacity-100 opacity-0 transition-all flex justify-center items-center p-5  ease-out duration-500 ">

                                        {proposito.description}
                                    </p>
                                </div>
                            ))

                        }
                    </div>
                </section>
                <section className="text-center   items-center w-full min-h-[80vh] h-4/6  space-y-10 px-3 flex justify-center flex-col" >
                    <h1 className="text-6xl text-textColor">Preguntas Frequentes</h1>
                    <div className="md:w-2/3 w-full space-y-10">
                        {
                            QA.map(qa => (
                                <details className=" bg-accent rounded-md flex justify-between [&_svg]:open:rotate-180 " key={qa.id}>
                                    <summary className="cursor-pointer bg-secondary py-3 md:text-3xl text-2xl rounded-t-md list-none   relative">

                                        <svg className="rotate-0 transform text-textColor transition-all duration-300 absolute left-5 top-5" fill="none" height="30" width="30" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                        <h1 className="text-textColor">{qa.pregunta}</h1>

                                    </summary>

                                    <div className="bg-accent text-secondaryBlack py-5 text-md rounded-md   transition-all px-5">
                                        <p>{qa.respuesta}</p>
                                    </div>
                                </details>
                            ))
                        }
                    </div>


                </section>
            </main>
        </div >
    )
}
