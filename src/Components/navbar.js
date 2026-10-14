import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import LogoImg from "../assets/logo_worklify.png";
import useAuth from "../Context/useAuth"; // Pastikan path benar

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-1">
          <img src={LogoImg} alt="logo" className="w-11 h-11" />
          <span className="text-xl font-bold tracking-wide">Worklify</span>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? (
            <HiX className="w-6 h-6 text-white" />
          ) : (
            <HiMenu className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Navigation Menu */}
        <div
          className={`flex-col md:flex md:flex-row gap-6 ${
            menuOpen ? "flex mt-4" : "hidden"
          } md:mt-0 md:flex`}
        >
          <Link
            to="/"
            className="font-medium hover:text-gray-200 transition duration-150"
          >
            Home
          </Link>
          <Link
            to="/vacancy"
            className="font-medium hover:text-gray-200 transition duration-150"
          >
            Vacancy
          </Link>
          {!user && (
            <>
              <Link
                to="/dashboard"
                className="font-medium hover:text-gray-200 transition duration-150"
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                className="font-medium hover:text-gray-200 transition duration-150"
              >
                Login
              </Link>
            </>
          )}
          {user && (
            <>
              <Link
                to="/dashboard"
                className="font-medium hover:text-gray-200 transition duration-150"
              >
                Dashboard
              </Link>
              <Link
                onClick={logout}
                className="font-medium hover:text-gray-200 transition duration-150"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
