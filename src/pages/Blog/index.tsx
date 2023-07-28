import { Blog } from "@prisma/client";
import { map } from "@trpc/server/observable";
import Navbar from "~/components/Navbar";
import BlogWindow from "~/components/blogWindow";
import { api } from "~/utils/api";

export default function Blogs() {
    const blogQuery = api.blog.getAll.useQuery()
    const blogs: Blog[] | undefined = blogQuery.data
    /* console.log(blogs)
    const ab = api.blog.addOne.useMutation()
    const addBlog = () => {
        ab.mutate({
            title: "hola",
            description: "helloo",
            image: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=900&q=60",
            mdcontent: "# hello world \n this is __cool__"
        })
    } */
    return (
        <>
            <Navbar></Navbar>
            <main className="pt-20 bg-primary min-h-screen flex flex-col items-center">
                <h1 className="text-5xl text-textColor text-center py-5">Nuestro blog</h1>
                <div className="w-3/4 space-y-5 flex flex-col items-center">
                    {blogs?.map(e => (
                        <BlogWindow title={e.Title} description={e.Description} key={e.id} path={e.Title} image={e.Image} />
                    ))}
                </div>

            </main>
        </>

    )

}
