// App.jsx
import React from "react";

function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#890709]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="../../public/umera-logo.svg" // Replace with your logo's path
            alt="UMeRA Logo"
            className="mx-auto mb-2"
            width={70}
          />
          <h1 className="text-lg font-bold text-gray-800">
            SIGN IN TO YOUR ACCOUNT
          </h1>
        </div>

        {/* Form */}
        <form>
          <div className="mb-4">
            <label
              htmlFor="staff-id"
              className="block text-sm font-medium text-gray-700"
            >
              Staff ID
            </label>
            <input
              id="staff-id"
              type="text"
              placeholder="UMS-RD-010"
              className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#890709] focus:border-[#890709]"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Work Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="emmanuelolafusi@umera.ng"
              className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#890709] focus:border-[#890709]"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#890709] focus:border-[#890709]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#890709] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#a72020] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a72020]"
          >
            SIGN IN
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 flex flex-col items-center text-sm text-gray-600">
          {/* <a href="/new-staff" className="hover:text-[#890709]">
            NEW STAFF
          </a> */}
          <a href="/reset-password" className="hover:text-[#890709] mt-2">
            RESET PASSWORD / CREATE PASSWORD
          </a>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="absolute bottom-4 text-center text-sm text-white">
        © UMeRA Copyright © Made with ❤️ by Oluwabukola Odunsi
      </footer> */}
    </div>
  );
}

export default SignIn;
