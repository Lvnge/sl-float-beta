// DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex bg-zinc-300 text-zinc-600">
      <SideBar />
      <div className="w-full">
        <Outlet /> {/* Nested routes render here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
