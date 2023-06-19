import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";




const Home: NextPage = () => {
    const user = useUser();
    if (user.isSignedIn) {
        if (typeof location != "undefined") {
            location.href = "/Products"
        }
    }
    else {
        if (typeof location != "undefined") {
            location.href = "/About"
        }
    }
    return (
        <></>
    )
};

export default Home;
