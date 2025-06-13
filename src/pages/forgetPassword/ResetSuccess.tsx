import React from "react";
import { useResetFlow } from "../../context/ResetFlowContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetSuccess() {
  const { passwordReset } = useResetFlow();
  const navigate = useNavigate();

  if (!passwordReset) {
    toast.error("Unauthorized access.");
    navigate("/forgot-password");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4" data-aos="fade-up">
      <div className="max-w-sm w-full bg-white border border-gray-100 shadow-md rounded-xl p-6 text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-2">Password Reset Successful</h2>
        <p className="text-gray-600 text-sm mb-6">
          Your password has been updated. You can now log in with your new credentials.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="block mx-auto mt-3 px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-400 transition duration-200 cursor-pointer"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}