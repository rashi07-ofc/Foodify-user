import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_12345');

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': { color: '#a0aec0' },
      fontWeight: '400',
    },
    invalid: { color: '#fa755a' },
  },
};

const CheckoutForm: React.FC<{ totalAmount: number }> = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    // Simulate payment success after 1.5s delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="bg-green-100 text-green-700 p-6 rounded max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p>Thank you for your order.</p>
      </div>
    );
  }

  return (
    <form
    onSubmit={handleSubmit}
    className="w-[500px] mx-auto bg-white p-10 rounded shadow-md min-h-[500px]"
  >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>

      <p className="mb-6 text-lg">
        Total Amount:{' '}
        <span className="font-semibold text-red-600">₹{totalAmount.toFixed(2)}</span>
      </p>

      <label className="block mb-2 font-medium text-gray-700">Card Number</label>
      <div className="mb-6 p-3 border rounded">
        <CardNumberElement options={ELEMENT_OPTIONS} />
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-700">Expiry Date</label>
          <div className="p-3 border rounded">
            <CardExpiryElement options={ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-700">CVC</label>
          <div className="p-3 border rounded">
            <CardCvcElement options={ELEMENT_OPTIONS} />
          </div>
        </div>
      </div>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition disabled:opacity-50"
      >
        {processing ? 'Processing…' : 'Pay Now'}
      </button>
    </form>
  );
};

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} />
      </Elements>
    </div>
  );
};

export default Checkout;
