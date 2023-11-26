import Sidebar from "./DashComps/Sidebar";
import { Outlet } from "react-router-dom"


const Dashboard = () => {
    return (
        <div className="bg-white grid grid-cols-4">
        <div className="col-span-1">
            <Sidebar></Sidebar>
        </div>
        <div className="col-span-3">
            <Outlet></Outlet>
        </div>
    </div>
    );
};

export default Dashboard;