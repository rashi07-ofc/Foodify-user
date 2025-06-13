// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { login } from "../../redux/slice/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const device_id=localStorage.getItem("device_id");
//   console.log(device_id);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:3000/auth/login", {
//         email,
//         password,
        
//       });

//       const userData = response.data;

//       dispatch(login(userData)); // assuming userData = { name, email, token, etc. }
//       navigate("/list");
//     } catch (err: any) {
//       const message =
//         err.response?.data?.message || "Login failed. Please try again.";
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
    
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
//         <h2 className="text-2xl font-bold text-gray-800 text-center">
//           Login to your account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 text-sm text-gray-600">Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm text-gray-600">Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//             />
//           </div>

//           {error && (
//             <p className="text-sm text-red-500 text-center mt-2">{error}</p>
//           )}

//           <div className="flex justify-end text-sm">
//             <Link to="/forgot-password" className="text-red-500 hover:underline">
//               Forgot Password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-orange-500 text-white py-2 rounded-md font-semibold transition ${
//               loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="flex items-center gap-2 text-gray-400 text-sm">
//           <div className="h-px flex-1 bg-gray-300" />
//           or
//           <div className="h-px flex-1 bg-gray-300" />
//         </div>

//         <div className="space-y-2">
//           <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition">
//             Continue with Google
//           </button>
//         </div>

//         <p className="text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link to="/otp" className="text-red-500 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { login } from "../../redux/slice/authSlice";

// Utility function to get or create a device ID
const getDeviceId = (): string => {
  let deviceId = localStorage.getItem("device_id");
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem("device_id", deviceId);
  }
  return deviceId;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get or create the device ID
  const device_id = getDeviceId();
  console.log("Device ID:", device_id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
        device_id, 
        role:1,
      });

      const userData = response.data;

      dispatch(login(userData)); // assuming userData = { name, email, token, etc. }
      navigate("/list");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
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

          {error && (
            <p className="text-sm text-red-500 text-center mt-2">{error}</p>
          )}

          <div className="flex justify-end text-sm">
            <Link
              to="/forgot-password"
              className="text-orange-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
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

        <div className="space-y-2">
          <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition">
            Continue with Google
          </button>
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
