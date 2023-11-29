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
import AllPets from "../components/outlets/Dashboard/DashComps/AdminDash/AllPets/AllPets";
import DonationCampaigns from "../components/outlets/DonationCampaigns/DonationCampaigns";
import EachDonation from "../components/outlets/EachDonation/EachDonation";
import AllDonations from "../components/outlets/Dashboard/DashComps/AdminDash/AllDonations/AllDonations";
import EditDonation from "../components/outlets/Dashboard/DashComps/AdminDash/AllDonations/AllDonationsComps/EditDonation";
import AddPet from "../components/outlets/Dashboard/DashComps/UserDash/AddPet/AddPet";
import PetUpdate from "../components/outlets/Dashboard/DashComps/AdminDash/AllPets/AllPetsComps/PetUpdate";
import CreateDonation from "../components/outlets/Dashboard/DashComps/UserDash/CreateDonation/CreateDonation";
import MyDonations from "../components/outlets/Dashboard/DashComps/UserDash/MyDonations/MyDonations";

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
        path: "/donation-campaigns",
        element: <DonationCampaigns></DonationCampaigns>
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
        path: "/donations/:id",
        element: (
          <PrivateRoutes>
            <EachDonation></EachDonation>
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
      }
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
        },
        {
            element: <AdminRoutes>
                <AllPets></AllPets>
            </AdminRoutes>,
            path: "/dashboard/admin/all-pets"
        },
        {
            element: <AdminRoutes>
                <AllDonations></AllDonations>
            </AdminRoutes>,
            path: "/dashboard/admin/all-donations"
        },
        {
          element: <PrivateRoutes>
            <AddPet></AddPet>
          </PrivateRoutes>,
          path: "/dashboard/add-pet"
        },
        {
          element: <PrivateRoutes>
            <PetUpdate></PetUpdate>
          </PrivateRoutes>,
          path: "/dashboard/pet-update/:id"
        },
        {
          element: <PrivateRoutes>
            <CreateDonation></CreateDonation>
          </PrivateRoutes>,
          path: "/dashboard/create-donation"
        },
        {
          element: <PrivateRoutes>
            <EditDonation></EditDonation>
          </PrivateRoutes>,
          path: "/dashboard/edit-donation/:id"
        },
        {
          element: <PrivateRoutes>
            <MyDonations></MyDonations>
          </PrivateRoutes>,
          path: "/dashboard/my-donation-campaigns"
        }
    ]
  },
]);

export default router;
