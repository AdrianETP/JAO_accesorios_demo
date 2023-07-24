import { Blog } from "@prisma/client";
import Navbar from "~/components/Navbar";
import BlogWindow from "~/components/blogWindow";
import { api } from "~/utils/api";

export default function Blogs() {
    const blogQuery = api.blog.getAll.useQuery()
    const blogs: Blog[] | undefined = blogQuery.data
    console.log(blogs)
    return (
        <>
            <Navbar></Navbar>
            <main className="pt-20 bg-primary min-h-screen flex flex-col items-center">
                <h1 className="text-5xl text-textColor text-center py-5">Nuestro blog</h1>
                <div className="w-3/4 space-y-5 flex flex-col items-center">
                    {blogs?.map(e => (
                    <BlogWindow title={e.Title} description={e.Description} key={e.id} path={e.Title} image={e.Image}/>
                    ))}
                </div>

            </main>
        </>

    )

}
