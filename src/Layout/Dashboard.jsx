import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64 p-5 lg:p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
