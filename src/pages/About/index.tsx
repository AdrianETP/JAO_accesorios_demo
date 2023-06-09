    import Image from "next/image";
    import group_pic from "public/logoJAO.png";
    import Navbar from "~/components/Navbar";

    export default function About() {
        return (
             <div>
                <Navbar></Navbar>
                    <h1 className="text-right font-thin text-3xl">Quienes somos</h1>
            <Image src = {group_pic} alt = "" width={300} className="mx-auto rounded-lg mt-8" />
            <p className="font-thin mt-8" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ad? Repudiandae aut quasi, vero, laboriosam iure voluptas tempore dolores dolore tempora distinctio deserunt nemo, nobis ipsam vitae perspiciatis cupiditate. Dolores?</p>
            </div>
        )
    }
