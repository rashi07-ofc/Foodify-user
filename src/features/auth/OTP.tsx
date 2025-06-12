import React, { useState } from "react";

const SendOtpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

  //   try {
  //     const response = await axios.post("http://localhost:9000/auth/send-otp", {
  //       { email },
  // { headers: { "Content-Type": "application/json" } 
  //     });

  //     setSuccess(response.data.message || "OTP sent successfully!");
  //   } catch (err: any) {
  //     const message =
  //       err.response?.data?.message || "Failed to send OTP. Try again.";
  //     setError(message);
  //   } finally {
  //     setLoading(false);
  //   }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Send OTP</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          {success && <p className="mt-1 text-sm text-green-600">{success}</p>}
        </div>

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className={`mt-4 w-full rounded-xl px-4 py-2 text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default SendOtpPage;
