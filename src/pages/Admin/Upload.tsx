import Head from "next/head";
import { FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

export default function Upload() {
    const [blog, setBlog] = useState({
        title: "",
        description: "",
        image: "",
        mdcontent: "",
        password: ""
    })
    const createBlogMut = api.blog.addOne.useMutation()
    const createBlog = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        const result = createBlogMut.mutate(blog)
        alert(result)
        setBlog({
            title: "",
            description: "",
            image: "",
            mdcontent: "",
            password: ""
        })



    }
    return (
        <>
            <Head>
                <title>JAO accesorios</title>
                <meta name="description" content="lo que te falta para volverte inolvidable" />
                <link rel="icon" href="/logoJao.png" />
            </Head>
            <Navbar />
            <main className="min-h-screen h-fit flex flex-col bg-primary items-center w-screen  overflow-x-hidden pt-20">
                <form className="flex flex-col w-full items-center space-y-5" onSubmit={e => createBlog(e)}>
                    <input placeholder="title" className="p-3 border-2 border-textColor rounded-md w-1/2" value={blog.title} onChange={e => setBlog(blog => ({ ...blog, title: e.target.value }))} />
                    <input placeholder="password" className="p-3 border-2 border-textColor rounded-md w-1/2" value={blog.password} onChange={e => setBlog(blog => ({ ...blog, password: e.target.value }))} />
                    <input placeholder="description" className="p-3 border-2 border-textColor rounded-md w-2/3" value={blog.description} onChange={e => setBlog(blog => ({ ...blog, description: e.target.value }))} />
                    <input placeholder="image URL" className="p-3 border-2 border-textColor rounded-md w-2/3" value={blog.image} onChange={e => setBlog(blog => ({ ...blog, image: e.target.value }))} />
                    <textarea placeholder="Md Content" className="p-3 border-2 border-textColor rounded-md w-2/3 min-h-96" value={blog.mdcontent} onChange={e => setBlog(blog => ({ ...blog, mdcontent: e.target.value }))} />
                    <button type="submit">Submit</button>
                </form>
            </main>
        </ >
    )

}
