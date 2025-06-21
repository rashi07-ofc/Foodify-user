import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/slice/authSlice";
import gsap from "gsap";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: 1,
  });
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // 🧠 Refs for animation
  const headingRef = useRef(null);
  const formCardRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.4 } });

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
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
        },
        "-=0.2"
      );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "otp") {
      setOtp(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^\+?[\d\s\-\(\)]{10,15}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Phone number is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterAndOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!otp.trim()) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post<{ accessToken: string; refreshToken: string }>(
        "http://localhost:9000/auth/signup",
        {
          username: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: 1,
          otp,
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
      setErrors({
        form:
          error.response?.data?.message ||
          "Registration failed. Please check your details and OTP.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <form ref={formRef} className="space-y-6" onSubmit={handleRegisterAndOtpSubmit}>
            {errors.form && (
              <div className="rounded-md bg-orange-50 p-4 text-orange-700">
                {errors.form}
              </div>
            )}

            {[
              { label: "Full Name", id: "name", type: "text" },
              { label: "Email", id: "email", type: "email" },
              { label: "Phone", id: "phone", type: "tel", placeholder: "+91 9876543210" },
              { label: "Password", id: "password", type: "password" },
              { label: "Confirm Password", id: "confirmPassword", type: "password" },
            ].map(({ label, id, type, ...rest }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  value={formData[id as keyof typeof formData] as string}
                  onChange={handleChange}
                  {...rest}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors[id] ? "border-orange-400" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
                />
                {errors[id] && (
                  <p className="mt-1 text-sm text-orange-600">{errors[id]}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP sent to your phone/email
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength={6}
                value={otp}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.otp ? "border-orange-400" : "border-gray-300"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
              />
              {errors.otp && (
                <p className="mt-1 text-sm text-orange-600">{errors.otp}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
