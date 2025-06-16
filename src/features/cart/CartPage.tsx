import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTrash2,
  FiShoppingCart,
  FiPlus,
  FiMinus
} from 'react-icons/fi';
import { getAuthToken } from '../auth/authService';

const CartPage: React.FC = () => {
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [tax, setTax] = useState(0);
  const accessToken = getAuthToken();

  const userId = '684fac7d6f272b68f7f68792'; // Assuming fixed for now

  // Fetch cart from server
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3002/cart/get`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      setCartData(data);
      setDiscount(data.discount || 0);
      setTax(data.tax || 0);
      setCouponCode(data.couponCode || '');
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  // Delete entire cart
  const deleteCart = async () => {
    try {
      await axios.delete(`http://localhost:3002/cart/delete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCartData(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete cart");
    }
  };

  // Update quantity on backend and refresh
 // Update quantity on backend by calling separate APIs for increase/decrease
const updateQuantity = async (itemId: string, delta: number) => {
  try {
    if (delta === 1) {
      // Increase quantity by adding item again
      const restaurantId = cartData.restaurantId; // or get from item if available
      await axios.post(
        `http://localhost:3002/cart/add/${restaurantId}/${itemId}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
    } else if (delta === -1) {
      // Decrease quantity by removing one item
      // Option 1: call a decrease quantity API if exists
      // Option 2: if quantity is 1, remove item entirely, else call decrease API or your logic
      
      const item = cartData.items.find((i: any) => i.itemId === itemId);
      if (!item) return;

      if (item.quantity === 1) {
        // Remove item entirely
        await axios.delete(
          `http://localhost:3002/cart/remove/${itemId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      } else {
        // If your backend has a decrease endpoint, call it here.
        // For now, assuming you have a "remove one quantity" API, e.g.:
        await axios.post(
          `http://localhost:3002/cart/decrease-quantity`,
          { itemId },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      }
    }
    await fetchCart();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to update quantity');
  }
};


const handleCheckout = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3002/cart/get',
      { headers: { Authorization: `Bearer ${accessToken}` }, },
    );

    localStorage.setItem("cart_id", response.data._id);
    console.log(response.data);
    
    // Optionally check response status or message
    navigate("/place-order")
  } catch (err: any) {
    alert(err.response?.data?.message || 'Checkout failed. Please try again.');
  }
};

  // Remove item on backend and refresh
  const removeItem = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:3002/cart/remove-item/${itemId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      await fetchCart();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to remove item');
    }
  };

  // Apply coupon locally (you can extend this to validate from backend)
  const applyCoupon = () => {
    if (couponCode.trim().toLowerCase() === 'save20') {
      const newDiscount = cartData.itemTotal * 0.2;
      setDiscount(newDiscount);
    } else {
      setDiscount(0);
      alert('Invalid or expired coupon');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error: {error}</div>;

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="text-center mt-16">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="w-32 mx-auto mb-6 opacity-80"
        />
        <p className="text-xl text-gray-500 mb-4">Oops! Your cart is empty.</p>
        <button
          onClick={() => navigate('/restaurant/landing')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const { items, itemTotal, platformFee, deliveryCharges } = cartData;
  const total = itemTotal + tax + platformFee + deliveryCharges - discount;

  return (
    <div className="max-w-5xl mx-auto mt-32 px-4">
      <h2 className="text-4xl font-bold text-orange-600 mb-10 text-center flex items-center justify-center gap-3">
        <FiShoppingCart className="text-4xl" />
        Your Cart
      </h2>

      <AnimatePresence>
        {items.map((item: any) => (
          <motion.div
            key={item._id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-5 border border-orange-100 hover:shadow-orange-200"
          >
            <img
              src={item.image || 'https://via.placeholder.com/100'}
              alt={item.name}
              className="w-28 h-28 object-cover rounded-lg border"
            />

            <div className="flex-1 w-full">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                <p className="text-orange-500 font-semibold text-lg">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Unit Price: ₹{item.price.toFixed(2)}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center border rounded-md shadow-sm">
                  <button
                    onClick={() => updateQuantity(item.itemId, -1)}
                    className="px-3 py-1 text-orange-600 hover:text-orange-800"
                  >
                    <FiMinus />
                  </button>
                  <span className="px-4 font-medium text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.itemId, 1)}
                    className="px-3 py-1 text-green-600 hover:text-green-800"
                  >
                    <FiPlus />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.itemId)}
                  className="text-orange-500 hover:text-orange-700 text-lg"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Coupon */}
      <div className="mt-10 bg-white p-5 rounded-xl shadow-md space-y-4 text-right">
        <h3 className="text-lg font-semibold text-gray-700 text-left">Have a Coupon?</h3>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="border rounded-md px-4 py-2 flex-1"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            onClick={applyCoupon}
            className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600"
          >
            Apply
          </button>
        </div>
        {discount > 0 && (
          <p className="text-green-600 font-medium text-left">
            Coupon applied! You saved ₹{discount.toFixed(2)}
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg text-right space-y-2">
        <p>Subtotal: ₹{itemTotal.toFixed(2)}</p>
        <p>Tax: ₹{tax.toFixed(2)}</p>
        <p>Platform Fee: ₹{platformFee.toFixed(2)}</p>
        <p>Delivery Charges: ₹{deliveryCharges.toFixed(2)}</p>
        {discount > 0 && <p className="text-green-600">Discount: -₹{discount.toFixed(2)}</p>}
        <hr className="my-2" />
        <p className="text-2xl font-bold">
          Total: <span className="text-orange-600">₹{total.toFixed(2)}</span>
        </p>
      </div>

      {/* Checkout Button */}
    <motion.button
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleCheckout}
  className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative overflow-hidden"
>
  <FiShoppingCart className="text-lg" />
  Proceed to Checkout
  <span className="absolute inset-0 rounded-full animate-pulse bg-white opacity-5 pointer-events-none"></span>
</motion.button>


      <button
        onClick={deleteCart}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md transition flex items-center justify-center gap-2"
      >
        <FiTrash2 className="inline" />
        Delete Entire Cart
      </button>
    </div>
  );
};

export default CartPage;
