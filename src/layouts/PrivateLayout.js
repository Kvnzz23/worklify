import { Outlet } from "react-router-dom";
import DashboardDrawer from "../Components/dashboardDrawer"; // Drawer sidebar kanan
import NavbarDashboard from "../Components/navbarDasboard";  // Navbar atas

const PrivateLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar atas */}
      <NavbarDashboard />

      {/* Body: Sidebar kanan + konten */}
      <div className="flex flex-row flex-1">
        {/* Sidebar drawer kanan */}
        <DashboardDrawer />

        {/* Konten utama */}
        <main className="flex-1 p-6 bg-white overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
