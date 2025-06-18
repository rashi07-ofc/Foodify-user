// OrderFailurePage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderFailurePage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("orderId");
  }, []);

  return (
    <div className="text-center p-10">
      <h1 className="text-2xl font-bold text-red-600">Payment Failed!</h1>
      <p className="text-gray-600 mt-2">Your payment was not successful.</p>
      <button
        onClick={() => navigate("/cart")}
        className="mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded"
      >
        Try Again
      </button>
    </div>
  );
}
