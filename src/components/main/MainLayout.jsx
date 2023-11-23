import { Outlet } from "react-router-dom"
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <>
        <Navbar></Navbar>
            <Outlet></Outlet>
        <Footer></Footer>
        </>
    );
};

export default MainLayout;