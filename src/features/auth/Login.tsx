import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Login as loginApi } from "../auth/authService";
import { login as loginRedux } from "../../redux/slice/authSlice";
import gsap from "gsap";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.4 } });

    tl.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
      .fromTo(headingRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.2")
      .fromTo(
        formRef.current?.querySelectorAll("div, button"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.1 },
        "-=0.2"
      );
  }, []);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const user = await loginApi(data.email, data.password);
      dispatch(loginRedux(user));
      navigate("/home");
    } catch (err: any) {
      console.error("Login failed:", err);
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div ref={containerRef} className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 ref={headingRef} className="text-2xl font-bold text-gray-800 text-center">
          Login to your account
        </h2>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-end text-sm">
            <Link to="/forgot" className="text-orange-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-orange-500 text-white py-2 rounded-md font-semibold transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <div className="h-px flex-1 bg-gray-300" />
          or
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/otp" className="text-orange-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
