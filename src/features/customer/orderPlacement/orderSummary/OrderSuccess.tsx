// OrderSuccessPage.tsx
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../../auth/authService";

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const placeFinalOrder = async () => {
      const token = getAuthToken();
      const orderId = localStorage.getItem("orderId");

      if (!orderId || !token) {
        navigate("/"); // fallback to home if missing info
        return;
      }

      try {
        await axios.post(
          "http://localhost:3006/order/placeOrder",
          { orderId, modeOfPayment: "online" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Clean up
        localStorage.removeItem("orderId");
        localStorage.removeItem("cart_id");
      } catch (error) {
        console.error("Final order placement failed:", error);
        navigate("/order-failure");
      }
    };

    placeFinalOrder();
  }, [navigate]);

  return (
    <div className="text-center p-10">
      <h1 className="text-2xl font-bold text-green-600">Order Successful!</h1>
      <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
      <button
        onClick={() => navigate("/home")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Go to Home
      </button>
    </div>
  );
}
