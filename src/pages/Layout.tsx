// DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-zinc-300 text-zinc-600">
      <aside className=" flex-shrink-0">
        <SideBar />
      </aside>

      <div className="flex-1 overflow-y-auto p-4 bg-zinc-300">
        <Outlet /> {/* Nested routes render here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
