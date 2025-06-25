import React from "react";
import { useNavigate } from "react-router-dom";
import type { DeliveryAddress, PaymentMethod } from "../../../../types";
import orderApi from "../../../../api/order";
import axios from "axios"; // Import axios for the cart delete API call
import { getAuthToken } from "../../../auth/authService"; // Import getAuthToken
import { toast } from "react-toastify"; // Import toast from react-toastify

interface OrderSummaryProps {
  deliveryAddress: DeliveryAddress | null;
  modeOfPayment: PaymentMethod;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  deliveryAddress,
  modeOfPayment,
}) => {
  const navigate = useNavigate();
  const cId = localStorage.getItem("cartId"); // This is cart_id from your OrderSuccessPage
  const adId = localStorage.getItem("selectedAddressId");

  const handleOrder = async () => {
    if (
      !deliveryAddress ||
      !deliveryAddress.address_location_1 ||
      !deliveryAddress.postal_code
    ) {
      toast.error(
        "Please select or enter a complete delivery address before placing the order."
      );
      return;
    }

    if (!cId) {
      toast.error(
        "Cart information is missing. Please ensure you have items in your cart."
      );
      navigate("/cart");
      return;
    }

    if (!adId) {
      toast.error("No address selected. Please select a delivery address.");
      return;
    }

    const toastId = toast.info("Placing your order...", {
      autoClose: false,
      isLoading: true,
    }); // Show loading toast for order process

    try {
      // Pre-place the order
      const orderIdResponse = await orderApi.post<{
        data: { orderId: string };
      }>(
        "http://localhost:3006/order/prePlaceOrder",
        { cartId: cId, addressId: adId },
      );

      const orderId = orderIdResponse.data.data.orderId;
      localStorage.setItem("orderId", orderId);

      if (modeOfPayment === "online") {
        // For online payment, redirect to Stripe
        const stripeResponse = await orderApi.post<{ data: { url: string } }>(
          "http://localhost:3007/payment/checkout",
          {
            orderId,
            successUrl: "http://localhost:5173/order-success",
            cancelUrl: "http://localhost:5173/order-failure",
          }
        );
        toast.dismiss(toastId);
        window.location.href = stripeResponse.data.data.url;
        return;
      }

      // place the final order directly
      await orderApi.post("http://localhost:3006/order/placeOrder", {
        orderId,
        modeOfPayment,
      });

      // Delete the cart for COD orders after successful placement
      if (cId) {
        // Ensure cartId exists
        try {
          const token = getAuthToken(); // Get auth token
          if (token) {
            await axios.delete("http://localhost:3002/cart/delete", {
              headers: { Authorization: `Bearer ${token}` },
              data: { cart_id: cId },
            });
            console.log("Cart deleted successfully for COD order:", cId);
            localStorage.removeItem("cartId");
          } else {
            console.warn(
              "Auth token missing, could not delete cart for COD order."
            );
          }
        } catch (cartDeleteError) {
          console.error(
            "Failed to delete cart for COD order:",
            cartDeleteError
          );
          toast.warn(
            "Order placed, but couldn't clear your cart. Please clear it manually if needed."
          );
        }
      }

      // Show success toast and navigate for COD orders
      toast.update(toastId, {
        render: "Order placed successfully!",
        type: "success",
        autoClose: 3000,
        isLoading: false,
      });
      navigate("/order-success");
    } catch (error) {
      console.error("Order processing failed:", error);
      const errorMessage =
        "Something went wrong while placing your order. Please try again.";
      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
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
          {deliveryAddress &&
          deliveryAddress.address_location_1 &&
          deliveryAddress.postal_code ? (
            <div className="text-sm text-gray-600 space-y-1">
              {deliveryAddress.label && (
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium mr-2">
                  {deliveryAddress.label}
                </span>
              )}
              {deliveryAddress.house_no && <p>{deliveryAddress.house_no},</p>}
              <p>{deliveryAddress.address_location_1}</p>
              {deliveryAddress.address_location_2 && (
                <p>{deliveryAddress.address_location_2}</p>
              )}
              <p>
                {deliveryAddress.city} - {deliveryAddress.postal_code}
              </p>
              <p>{deliveryAddress.country}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Please select or enter a delivery address.
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
