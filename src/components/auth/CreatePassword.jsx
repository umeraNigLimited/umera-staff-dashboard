// App.jsx
import React, { useState } from "react";
import { useCreatePassword } from "../hooks/useCreatePassword";

function CreatePassword() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState({
    password: "",
    confirm_password: "",
  });

  const { createPassword, error, loading, setError } = useCreatePassword();

  function handleStaffId(e) {
    const { value } = e.target;
    setStaffId(value);
  }

  function handlePassword(e) {
    const { name, value } = e.target;
    setPassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    // if (password.password !== password.confirm_password) {
    //   setSamePassword(false);
    // }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (password.password !== password.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    // console.log(staffId, password.confirm_password, password.password);

    await createPassword(staffId, password.password);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#890709] px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/umera-logo.svg" //
            alt="UMeRA Logo"
            className="mx-auto mb-2"
            width={70}
          />
          <h1 className="text-lg font-bold text-gray-800">CREATE PASSWORD</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="staff_id"
              className="block text-sm font-medium text-gray-700"
            >
              Staff ID
            </label>
            <input
              id="staff_id"
              name="staff_id"
              type="text"
              placeholder="UMS201125010"
              value={staffId}
              onChange={handleStaffId}
              className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#890709] focus:border-[#890709]"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Create Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={password.password}
              onChange={handlePassword}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#890709] focus:border-[#890709]"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="********"
              value={password.confirm_password}
              onChange={handlePassword}
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#890709] focus:border-[#890709]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#890709] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#a72020] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a72020]"
          >
            CREATE PASSWORD
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 flex flex-col items-center text-sm text-gray-600">
          {/* <a href="/new-staff" className="hover:text-[#890709]">
            NEW STAFF
          </a> */}
          <a href="/reset-password" className="hover:text-[#890709] mt-2">
            RESET PASSWORD
          </a>

          {error && <span className="text-red-500 mt-4">{error}</span>}
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="absolute bottom-4 text-center text-sm text-white">
        © UMeRA Copyright © Made with ❤️ by Oluwabukola Odunsi
      </footer> */}
    </div>
  );
}

export default CreatePassword;
