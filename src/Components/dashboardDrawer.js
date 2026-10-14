import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTable,
  FaPlusSquare,
  FaUser,
  FaKey,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useAuth from "../Context/useAuth";

const DashboardDrawer = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: "Features",
      items: [
        { to: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
        {
          to: "/dashboard/list-job",
          icon: <FaTable />,
          label: "List Job Table",
        },
        {
          to: "/dashboard/list-job/form",
          icon: <FaPlusSquare />,
          label: "Add New Job",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        { to: "/dashboard/profile", icon: <FaUser />, label: "Profile" },
        {
          to: "/dashboard/change-password",
          icon: <FaKey />,
          label: "Change Password",
        },
      ],
    },
  ];

  const renderMenu = () => (
    <>
      {menuItems.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-sm font-semibold text-gray-300 mb-2">
            {section.title}
          </h3>
          <nav className="flex flex-col space-y-2">
            {section.items.map((item, i) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={i}
                  to={item.to}
                  onClick={() => setIsOpen(false)} // Close drawer on mobile nav
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                    isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}

      <div className="pt-4 border-t border-white/20">
        <button
          onClick={() => {
            logout();
            setIsOpen(false);
          }}
          className="flex items-center gap-3 px-3 py-2 rounded-md transition hover:bg-white/10 w-full text-left"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-blue-900 text-white flex items-center justify-between p-4 shadow-md">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:block min-h-screen w-64 bg-gradient-to-b from-blue-900 to-indigo-800 text-white p-6 space-y-6 shadow-lg animate-fadeIn">
        {renderMenu()}
      </aside>

      {/* Sidebar Drawer for mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-gradient-to-b from-blue-900 to-indigo-800 text-white p-6 space-y-6 shadow-lg animate-slideIn">
            {renderMenu()}
          </div>
          <div
            className="flex-1 bg-black bg-opacity-40"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default DashboardDrawer;
