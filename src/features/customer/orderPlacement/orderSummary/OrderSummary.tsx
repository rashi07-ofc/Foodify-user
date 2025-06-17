// OrderSummary.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../api/axios"; // Use your configured axios instance
import { getAuthToken } from "../../../auth/authService"; // Import the helper
import type { DeliveryAddress, PaymentMethod } from "../../../../types";

interface OrderSummaryProps {
  deliveryAddress: DeliveryAddress;
  modeOfPayment: PaymentMethod;
  onPlaceOrder?: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  deliveryAddress,
  modeOfPayment,
}) => {
  const navigate = useNavigate();
  const cId = localStorage.getItem("cart_id")
  console.log(cId);
  

  const handleOrder = async () => {
    try {
      // Get current auth token
      const token = getAuthToken();
      if (!token) {
        navigate("/login");
        return;
      }
      console.log(token);
      // Create order with auth
      const orderIdResponse = await axios.post<{ id: string }>(
        "http://localhost:3006/order/prePlaceOrder",
        { cartId: "684ac6aca64c3abb72c33ab2" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderId = orderIdResponse.data.orderId;

      if (modeOfPayment === "online") {
        console.log("Hii");
        // console.log(orderId);
        const stripeResponse = await axios.post<{ url: string }>(
          "http://localhost:3007/payment/checkout",
          { orderId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        window.location.href = stripeResponse.data.url;
      }

      // Cash on delivery
      console.log("Placing order with:", {
        orderId,
        modeOfPayment,
      });

      console.log(modeOfPayment);
      console.log(orderId);

      await axios.post(
        "http://localhost:3006/order/placeOrder",
        { orderId, modeOfPayment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log("Hii hihi");

      navigate("/order-success");
    } catch (error) {
      console.error("Order processing failed:", error);
      alert("Something went wrong while placing the order.");
    }
  };

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
            {modeOfPayment === "online" ? "Online Payment" : "Cash on Delivery"}
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
