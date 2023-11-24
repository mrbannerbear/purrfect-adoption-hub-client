import AboutUs from "./HomeComps/AboutUs/AboutUs";
import Banner from "./HomeComps/Banner";
import CallToAction from "./HomeComps/CallToAction/CallToAction";
import Categories from "./HomeComps/Categories/Categories";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <AboutUs></AboutUs>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;