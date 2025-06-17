import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill out both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const token = localStorage.getItem("forgotPasswordToken");
    if (!token) {
      setError("No token found. Please request a password reset again.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:9008/auth/reset-password/${token}`,
        {
          password,
          confirm_password: confirmPassword,
        },
      );

      setSuccess(true);
      setError("");
      localStorage.removeItem("forgotPasswordToken");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        {success ? (
          <p className="text-green-600 text-center">
            Your password has been successfully reset.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-xl hover:bg-orange-700 transition duration-150"
            >
              Change Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
