import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/main/MainLayout";
import Error from "../components/main/Error";
import Home from "../components/outlets/Home/Home";

const router = createBrowserRouter([
    {
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    }
])

export default router