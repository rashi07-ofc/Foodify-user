import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful</h1>
      <p className="text-gray-600 mb-6">Your order has been placed successfully!</p>
      <button
        onClick={handleGoHome}
        className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
