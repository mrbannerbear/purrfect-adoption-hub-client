import { useContext } from "react";
import AboutUs from "./HomeComps/AboutUs/AboutUs";
import Banner from "./HomeComps/Banner/Banner";
import CallToAction from "./HomeComps/CallToAction/CallToAction";
import Categories from "./HomeComps/Categories/Categories";
import Contact from "./HomeComps/Contact/Contact";
import Donate from "./HomeComps/Donate/Donate";
import { AuthProvider } from "../../../context/AuthContext";
import usePets from "../../../custom/usePets";

const Home = () => {
    const { user } = useContext(AuthProvider)
    const {pets} = usePets()
    console.log(pets)
    console.log(user)
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <AboutUs></AboutUs>
            <CallToAction></CallToAction>
            <Contact></Contact>
            <Donate></Donate>
        </div>
    );
};

export default Home;