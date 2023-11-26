import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/main/MainLayout";
import Error from "../components/main/Error";
import Home from "../components/outlets/Home/Home";
import Signup from "../components/outlets/Authentication/Signup";
import Login from "../components/outlets/Authentication/Login";
import PetListings from "../components/outlets/PetListings/PetListings";
import EachPet from "../components/outlets/EachPet/EachPet";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../components/outlets/Dashboard/Dashboard";
import AdminRoutes from "./AdminRoutes";
import AllUsers from "../components/outlets/Dashboard/DashComps/AdminDash/AllUsers/AllUsers";

const router = createBrowserRouter([
  {
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/pet-listings",
        element: <PetListings></PetListings>,
      },
      {
        path: "/pet-listings/:id",
        element: (
          <PrivateRoutes>
            <EachPet></EachPet>
          </PrivateRoutes>
        ),
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    path: "/dashboard",
    errorElement: <Error></Error>,
    children: [
        {
            element: <AdminRoutes>
                <AllUsers></AllUsers>
            </AdminRoutes>,
            path: "/dashboard/admin/all-users"
        }
    ]
  },
]);

export default router;
