import React from "react";
import {
  FaHome,
  FaBriefcase,
  FaSignInAlt,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../Context/useAuth";

export default function Footer() {
  const { user, logout } = useAuth();
  return (
    <div className="bg-blue-700 text-white p-5 flex flex-col-reverse md:flex-row items-center justify-between gap-10 animate-fadeIn">
      <div className="text-right">
        <p className="text-sm">
          &copy; 2025 Copyright Worklify By Kevin Herlambang
        </p>
      </div>
      <div className="text-left flex flex-row gap-3 items-center text-sm">
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-gray-300 hover:underline"
        >
          <FaHome /> Home
        </Link>
        <p>|</p>
        <Link
          to="/vacancy"
          className="flex items-center gap-1 hover:text-gray-300 hover:underline"
        >
          <FaBriefcase /> Vacancy
        </Link>
        <p>|</p>
        {!user && (
          <Link
            to="/login"
            className="flex items-center gap-1 hover:text-gray-300 hover:underline"
          >
            <FaSignInAlt /> Login
          </Link>
        )}
        {user && (
          <>
            <Link
              to="/dashboard"
              className="flex items-center gap-1 hover:text-gray-300 hover:underline"
            >
              <FaTachometerAlt /> Dashboard
            </Link>
            <p>|</p>
            <Link
              onClick={logout}
              className="flex items-center gap-1 hover:text-gray-300 hover:underline"
            >
              <FaSignOutAlt /> Logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
