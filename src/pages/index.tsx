import { type NextPage } from "next";



const Home: NextPage = () => {

    if (typeof location != "undefined") {
        location.href = "/About"
    }
    return (
        <></>
    )
};

export default Home;
