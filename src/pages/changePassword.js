import React from 'react'

export default function ChangePassword() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        Change Password
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 animate-fadeIn">
        <form className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block font-semibold mb-1">Current Password</label>
            <input
              type="password"
              name="current_password"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block font-semibold mb-1">New Password</label>
            <input
              type="password"
              name="new_password"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block font-semibold mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirm_password"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center md:text-right pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
