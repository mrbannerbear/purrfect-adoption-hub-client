import DashNav from "./DashComps/DashNav";
import Sidebar from "./DashComps/Sidebar";
import { Outlet } from "react-router-dom"


const Dashboard = () => {
    return (
        <>
           <DashNav></DashNav>
        <div className="bg-white grid grid-cols-4">
        <div className="col-span-1">
            <Sidebar></Sidebar>
        </div>
        <div className="col-span-3">
            <Outlet></Outlet>
        </div>
    </div>
    </>
    );
};

export default Dashboard;