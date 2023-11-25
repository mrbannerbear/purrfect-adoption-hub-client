import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/main/MainLayout";
import Error from "../components/main/Error";
import Home from "../components/outlets/Home/Home";
import Signup from "../components/outlets/Authentication/Signup";
import Login from "../components/outlets/Authentication/Login";
import PetListings from "../components/outlets/PetListings/PetListings";

const router = createBrowserRouter([
    {
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/pet-listings",
                element: <PetListings></PetListings>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
        ]
    }
])

export default router