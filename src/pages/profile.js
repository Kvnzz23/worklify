import React from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import useAuth from "../Context/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="profile animate-fadeIn">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
          My Profile
        </h1>

        <div className="bg-white shadow rounded-lg p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-600 shadow">
              <img
                src={
                  user?.image_url ||
                  "https://i.pinimg.com/736x/33/ba/c0/33bac083ba44f180c1435fc41975bf36.jpg"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Basic Info */}
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.name || "Unknown User"}
              </h2>
              <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
                <FaEnvelope className="text-blue-500" />
                {user?.email || "email@example.com"}
              </p>
            </div>
          </div>

          {/* Detail Section */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-gray-700">
              <FaPhone className="text-blue-500" />
              <span>{user?.phone || "Not provided"}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>{user?.address || "No address specified"}</span>
            </div>
          </div>

          {/* Optional Edit Button */}
          <div className="mt-6 text-center md:text-right">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
