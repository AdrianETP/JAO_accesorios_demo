import Navbar from "~/components/Navbar";
import Head from "next/head";
import Image from "next/image";

export default function About() {
    return (
        <div>
            <Head>
                <title>JAO accesorios</title>
                <meta name="description" content="lo que te falta para volverte inolvidable" />
                <link rel="icon" href="/logoJao.png" />
            </Head>
            <Navbar />
            <main className="min-h-screen h-fit flex flex-col bg-slate-800 items-center max-w-screen min-w-full w-fit  ">
                <section className="text-center  flex flex-col items-center w-full min-h-[80vh] h-4/6 pt-20 space-y-10" >
                    <Image src="/logoJao.png" width={300} height={300} alt="Logo" className="rounded-md w-27 h-27"></Image>
                    <h1 className="text-white text-6xl ">Quienes somos?</h1>
                    <p className="w-2/3">lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui
                        officia deserunt mollit anim id est laborum e
                    </p>
                </section>
                <section className="text-center  flex flex-col items-center justify-center w-screen space-y-10" >
                    <h1 className="text-white text-6xl ">Propositos</h1>
                    <div className="w-full h-full flex  justify-center space-x-10 flex-wrap py-10">
                        <div className="relative w-96 h-96">
                            <h2 className="text-xl bg-black w-full h-full absolute rounded-md hover:opacity-0 transition-all flex justify-center items-center ease-in">hello world</h2>
                            <p className="  bg-slate-600 w-full h-full text-md absolute rounded-md hover:opacity-100 opacity-0 transition-all flex justify-center items-center p-5  ease-out duration-1000 ">lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit
                                esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui
                                officia deserunt mollit anim id est laborum e
                            </p>
                        </div>
                        <div className="relative w-96 h-96">
                            <h2 className="text-xl bg-black w-full h-full absolute rounded-md hover:opacity-0 transition-all flex justify-center items-center">hello world</h2>
                            <p className="  bg-slate-600 w-full h-full text-md absolute rounded-md hover:opacity-100 opacity-0 transition-all flex justify-center items-center p-5 duration-1000 ">lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit
                                esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui
                                officia deserunt mollit anim id est laborum e
                            </p>
                        </div>
                        <div className="relative w-96 h-96">
                            <h2 className="text-xl bg-black w-full h-full absolute rounded-md hover:opacity-0 transition-all flex justify-center items-center">hello world</h2>
                            <p className="  bg-slate-600 w-full h-full text-md absolute rounded-md hover:opacity-100 opacity-0 transition-all flex justify-center items-center p-5 duration-1000  ">lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit
                                esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui
                                officia deserunt mollit anim id est laborum e
                            </p>
                        </div>
                    </div>




                </section>
            </main>
        </div >
    )
}
