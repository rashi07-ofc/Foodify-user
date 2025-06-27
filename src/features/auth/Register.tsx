import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import axios from "axios";
import gsap from "gsap";

// Yup Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[\d\s\-\(\)]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Min 8 characters")
    .required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  otp: yup.string().required("OTP is required"),
});

type FormData = yup.InferType<typeof schema>;

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const headingRef = useRef(null);
  const formCardRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.4 },
    });
    tl.fromTo(headingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
      .fromTo(
        formCardRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1 },
        "-=0.3"
      )
      .fromTo(
        formRef.current?.querySelectorAll("div, button"),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.08 },
        "-=0.2"
      );
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setFormError("");

    try {
      const res = await axios.post<{
        accessToken: string;
        refreshToken: string;
      }>(
        "http://localhost:9000/auth/signup",
        {
          username: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: 1,
          otp: data.otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      
      const { accessToken, refreshToken } = res.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch(login({ accessToken, refreshToken }));
      navigate("/home", { state: { message: "Registration successful!" } });
    } catch (error: any) {
      console.error(error);
      setFormError(
        error.response?.data?.message ||
        "Registration failed. Please check your details and OTP."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const arr = [
    { id: "name", label: "Full Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    {
      id: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "+91 9876543210",
    },
    { id: "password", label: "Password", type: "password" },
    { id: "confirmPassword", label: "Confirm Password", type: "password" },
    { id: "otp", label: "OTP", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md" ref={headingRef}>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Login
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" ref={formCardRef}>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            ref={formRef}
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {formError && (
              <div className="text-sm text-red-500">{formError}</div>
            )}

            {arr.map(({ id, label, ...rest }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                <input
                  {...register(id as keyof FormData)}
                  {...rest}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors[id as keyof FormData]
                      ? "border-red-400"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                />
                {errors[id as keyof FormData] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[id as keyof FormData]?.message}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
