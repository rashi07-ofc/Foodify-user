// PaymentSection.tsx
import { CreditCard } from "lucide-react";
import type { PaymentMethod } from "../../../../types";

interface PaymentSectionProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentMethod,
  onPaymentMethodChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center mb-6">
        <CreditCard className="w-6 h-6 text-orange-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
      </div>

      <div className="space-y-4">
        <div
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === "mock"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => onPaymentMethodChange("mock")}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="mock"
              checked={paymentMethod === "mock"}
              onChange={() => {}}
              className="text-orange-600 focus:ring-orange-500"
            />
            <CreditCard className="w-5 h-5 ml-3 mr-2 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Mock Payment</div>
              <div className="text-sm text-gray-600">
                Pay online using mock payment gateway
              </div>
            </div>
          </label>
        </div>

        {/* Cash on Delivery option... */}

        <div
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
            paymentMethod === "cod"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => onPaymentMethodChange("cod")}
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => {}}
              className="text-orange-600 focus:ring-orange-500"
            />
            <CreditCard className="w-5 h-5 ml-3 mr-2 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Cash on Delivery</div>
              <div className="text-sm text-gray-600">
                Pay online using mock payment gateway
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;