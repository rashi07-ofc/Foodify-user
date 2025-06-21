import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

type FormData = {
  email: string;
};

const OTP: React.FC = () => {
  const navigate = useNavigate();
  const [formMessage, setFormMessage] = React.useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setFormMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:9000/auth/send-otp",
        { email: data.email },
        { headers: { "Content-Type": "application/json" } }
      );

      setFormMessage({
        type: "success",
        text: response.data.message || "OTP sent successfully!",
      });

      setTimeout(() => navigate("/signup"), 1000);
    } catch (err: any) {
      setFormMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to send OTP. Try again.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Send OTP</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(onSubmit)()}
              className={`mt-1 w-full rounded-lg border px-4 py-2 shadow-sm text-gray-700 ${
                errors.email ? "border-red-400" : "border-gray-300"
              } focus:ring-blue-500 focus:outline-none focus:ring-1`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
            {formMessage && (
              <p
                className={`mt-1 text-sm ${
                  formMessage.type === "success"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {formMessage.text}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 w-full rounded-xl px-4 py-2 text-white transition ${
              isSubmitting
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
