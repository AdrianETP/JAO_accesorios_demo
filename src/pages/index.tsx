import { type NextPage } from "next";
import Head from "next/head";
import { SignIn, useUser } from "@clerk/nextjs";


const Home: NextPage = () => {
    const user = useUser()
    if (!user.isSignedIn) return (
        <>
            <Head>
                <title>JAO accesorios</title>
                <meta name="description" content="lo que te falta para volverte inolvidable" />
                <link rel="icon" href="/logoJao.png" />
            </Head>
            <main className="h-screen w-screen bg-slate-800  flex justify-center items-center flex-col">
                <h1 className="text-5xl font-thin text-center mb-5  "> JAO Accesorios</h1>
                <SignIn />
            </main>
        </>
    );
    if (user.isSignedIn) {
        location.href = "/Products"
    }
    return (<>
    </>)

};

export default Home;
