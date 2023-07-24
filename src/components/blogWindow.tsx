import Image from "next/image"
interface BlogWT {
    title: string,
    description: string,
    image: string,
    path: string
}
export default function BlogWindow({ title, description, image, path }: BlogWT) {
    return (
        <div className="w-3/4 h-fit bg-secondary rounded-xl shadow-secondaryBlack shadow-md backdrop-blur-xl ">
            <a className="w-full h-full max-h-48  text-textColor flex justify-start overflow-y-hidden space-x-10 rounded-xl" href={'/Blog/' + path}>
                <Image src={image} alt={title} width={1000} height={1000} className=" w-1/2  rounded-tl-md rounded-bl-md" />
                <div className="p-3">
                    <h1 className=" text-2xl">{title}</h1>
                    <p>{description}</p>
                </div>
            </a>
        </div>
    )

}
