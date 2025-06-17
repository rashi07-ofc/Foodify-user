  import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../auth/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // --- FIX: Define error and loading states ---
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(true); // Set loading to true

    try {
      await login(email, password);
      navigate("/home");
    } catch (err: any) { // Use 'any' or a more specific error type if available
      console.error("Login failed:", err);
      // More robust error handling: check if it's an Axios error for specific messages
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Use message from API if available
      } else if (err.message) {
        setError("Login failed: " + err.message); // Use generic error message
      } else {
        setError("Login failed. Please check your email and password.");
      }
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {error && ( // Now 'error' is defined
            <p className="text-sm text-red-500 text-center mt-2">{error}</p>
          )}

          <div className="flex justify-end text-sm">
            <Link
              to="/forgot"
              className="text-orange-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading} // Now 'loading' is defined
            className={`w-full bg-orange-500 text-white py-2 rounded-md font-semibold transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <div className="h-px flex-1 bg-gray-300" />
          or
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/otp" className="text-orange-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;