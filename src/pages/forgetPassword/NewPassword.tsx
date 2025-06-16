import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetFlow } from "../../context/ResetFlowContext";

export default function NewPassword() {
  const { codeVerified, setPasswordReset } = useResetFlow();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const isLengthValid = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!codeVerified) {
    toast.error("You are not allowed to access this page.");
    navigate("/forgot-password");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setPasswordReset(true);
    toast.success("Password has been reset successfully.");
    setTimeout(() => navigate("/reset-success"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4" data-aos="fade-up">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white border border-gray-100 shadow-lg rounded-xl p-8 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Create New Password</h2>
          <p className="text-sm text-gray-600 mt-1">Set a new password for your account</p>
        </div>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f2c100] transition"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f2c100] transition"
        />

        <ul className="text-left text-sm space-y-1 mt-1">
          <li className={isLengthValid ? "text-green-600" : "text-gray-400"}>
            {isLengthValid ? "✔️" : "❌"} At least 8 characters
          </li>
          <li className={hasSpecialChar ? "text-green-600" : "text-gray-400"}>
            {hasSpecialChar ? "✔️" : "❌"} One special character recommended
          </li>
        </ul>

        <button
          type="submit"
          className="block mx-auto mt-3 px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-400 transition duration-200 cursor-pointer"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}