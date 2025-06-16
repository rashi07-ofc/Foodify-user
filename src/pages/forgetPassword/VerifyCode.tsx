import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useResetFlow } from "../../context/ResetFlowContext";

export default function VerifyCode() {
  const { otp, setCodeVerified } = useResetFlow();
  const navigate = useNavigate();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = digits.join("");
    if (enteredCode !== otp) {
      toast.error("Invalid OTP");
      return;
    }
    toast.success("Code verified successfully");
    setCodeVerified(true);
    setTimeout(() => navigate("/new-password"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4" data-aos="fade-up">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white border border-gray-100 shadow-lg rounded-xl p-8 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Verify Code</h2>
          <p className="text-sm text-gray-600 mt-1">Enter the 6-digit code sent to your email</p>
        </div>

        <div className="flex justify-center space-x-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputsRef.current[index] = el!)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-10 h-12 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 text-lg"
            />
          ))}
        </div>

        <button
          type="submit"
          className="block mx-auto mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-400 transition duration-200 cursor-pointer"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
