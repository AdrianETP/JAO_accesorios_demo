import Head from "next/head"
import { useRouter } from "next/router"
import Navbar from "~/components/Navbar"
import { api } from "~/utils/api"
export default function BlogPage() {
    const { query } = useRouter()
    const blog = api.blog.getOneByTitle.useQuery({ title: query.title as string })
    const blogContent = blog.data?.HtmlContent

    return (
        <div>
            <Head>
                <title>JAO accesorios</title>
                <meta name="description" content="lo que te falta para volverte inolvidable" />
                <link rel="icon" href="/logoJao.png" />
            </Head>
            <Navbar />
            <main className="min-h-screen h-fit flex flex-col bg-primary items-center max-w-screen min-w-full w-fit  overflow-x-hidden pt-20 text-textColor [&>h1]:text-6xl [&>h2]:text-4xl [&>h3]:text-2xl [&>h4]:text-xl [&>ul]:list-disc text-start space-y-10 [&>img]:w-1/2 [&>img]:rounded-md" dangerouslySetInnerHTML={{ __html: blogContent ? blogContent : "" }} />
        </div >
    )

}
