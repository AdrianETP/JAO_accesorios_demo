import { type NextPage } from "next";
import Head from "next/head";
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Navbar from "~/components/Navbar";


const Home: NextPage = () => {
    const user = useUser()
    console.log(user.isSignedIn ? user.user : "")



    if (!user.isSignedIn) return (
        <>
            <Head>
                <title>JAO accesorios</title>
                <meta name="description" content="lo que te falta para volverte inolvidable" />
                <link rel="icon" href="/logoJao.png" />
            </Head>
            <main className="h-screen w-screen bg-slate-800 flex justify-center items-center flex-col">
                <h1 className="text-slate-300 text-5xl font-thin text-center mb-5"> JAO Accesorios</h1>
                <SignIn />
            </main>
        </>
    );
    return (<>
        <Head>
            <title>JAO accesorios</title>
            <meta name="description" content="lo que te falta para volverte inolvidable" />
            <link rel="icon" href="/logoJao.png" />
        </Head>
        <main className="min-h-screen flex flex-col bg-slate-800 h-[200vh]">
            <Navbar />
            <div className="navbar mb-3"></div>
            <h1 className="text-slate-300 text-5xl font-thin text-center mb-5">JAO Accesorios</h1>
        </main>
    </>)

};

export default Home;
