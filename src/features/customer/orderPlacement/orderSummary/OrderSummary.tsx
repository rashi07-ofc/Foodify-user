// OrderSummary.tsx
import axios from "axios";
import type { DeliveryAddress, PaymentMethod } from "../../../../types";

interface OrderSummaryProps {
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  onPlaceOrder: () => void;
}

const handleOrder = async () => {
  try {
    const res = await axios.post("http://localhost:3007/payment/checkout", {
      orderId: "12345", // your actual order ID
    });

    // ✅ this is the correct line
    window.location.href = res.data.url;
  } catch (err) {
    console.error("Error redirecting to Stripe:", err);
  }
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  deliveryAddress,
  paymentMethod,
  onPlaceOrder,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Delivery Address</h3>
          {deliveryAddress.fullName ? (
            <div className="text-sm text-gray-600 space-y-1">
              {deliveryAddress.label && (
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                  {deliveryAddress.label}
                </span>
              )}
              <p>{deliveryAddress.fullName}</p>
              <p>{deliveryAddress.phoneNumber}</p>
              <p>{deliveryAddress.streetAddress}</p>
              <p>
                {deliveryAddress.city} - {deliveryAddress.zipCode}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Select or enter delivery address
            </p>
          )}
        </div>

        <div>
          <h3 className="font-medium text-gray-700 mb-2">Payment Method</h3>
          <p className="text-sm text-gray-600">
            {paymentMethod === "mock" ? "Mock Payment" : "Cash on Delivery"}
          </p>
        </div>
      </div>

      <button
        onClick={handleOrder}
        className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none"
      >
        Place Order
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        By placing this order, you agree to our terms and conditions
      </p>
    </div>
  );
};

export default OrderSummary;
