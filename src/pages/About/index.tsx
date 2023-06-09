import Image from "next/image";
import group_pic from "public/logoJAO.png";

export default function About() {
    
    return (
        <div>
        <h1 className="text-center font-thin text-3xl">Quienes somos</h1>
        <Image src = {group_pic} alt = "" width={300} className="mx-auto" />
        <p className="font-thin" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ad? Repudiandae aut quasi, vero, laboriosam iure voluptas tempore dolores dolore tempora distinctio deserunt nemo, nobis ipsam vitae perspiciatis cupiditate. Dolores?</p>
        </div>
    )
}
