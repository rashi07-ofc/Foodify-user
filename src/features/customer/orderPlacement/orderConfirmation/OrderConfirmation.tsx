// OrderConfirmation.tsx
import { CheckCircle } from "lucide-react";
import type { OrderData } from "../../../../types";

interface OrderConfirmationProps {
  orderData: OrderData;
  onReset: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ 
  orderData, 
  onReset 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order has been confirmed and will be delivered soon.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">
              Order Summary
            </h3>

            {/* Delivery Address Section */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">
                Delivery Address:
              </h4>
              {orderData.deliveryAddress.label && (
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium mb-1 inline-block">
                  {orderData.deliveryAddress.label}
                </span>
              )}
              <p className="text-sm text-gray-600">
                {orderData.deliveryAddress.fullName}
              </p>
              <p className="text-sm text-gray-600">
                {orderData.deliveryAddress.phoneNumber}
              </p>
              <p className="text-sm text-gray-600">
                {orderData.deliveryAddress.streetAddress}
              </p>
              <p className="text-sm text-gray-600">
                {orderData.deliveryAddress.city}, {orderData.deliveryAddress.zipCode}
              </p>
            </div>

            {/* Payment Method Section */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">
                Payment Method:
              </h4>
              <p className="text-sm text-gray-600">
                {orderData.paymentMethod === "cod" 
                  ? "Cash on Delivery" 
                  : "Mock Payment Gateway"}
              </p>
            </div>

            {/* Add Order Items Section if you have them */}
            {/* <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">
                Order Items:
              </h4>
              {orderData.items?.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div> */}

            {/* Add Order Total if you have pricing information */}
            {/* <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between font-medium text-gray-900">
                <span>Total</span>
                <span>${orderData.total}</span>
              </div>
            </div> */}
          </div>

          <button
            onClick={onReset}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Place Another Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;