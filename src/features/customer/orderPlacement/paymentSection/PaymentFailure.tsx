import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <XCircle className="text-red-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Failed</h1>
      <p className="text-gray-600 mb-6">Something went wrong while processing your payment.</p>
      <button
        onClick={handleGoHome}
        className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentFailure;
