// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
// import { type RootState } from '../../redux/store';
// import { updateQuantity, removeFromCart } from '../../redux/slice/cartSlice';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FiTrash2,
//   FiShoppingCart,
//   FiPlus,
//   FiMinus
// } from 'react-icons/fi';



// const CartPage: React.FC = () => {
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [couponCode, setCouponCode] = useState('');
//   const [discount, setDiscount] = useState(0);

//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   // Static fees (can be dynamic or fetched from backend)
//   const platformFee = 10; // Flat platform fee
//   const deliveryCharges = subtotal > 300 ? 0 : 40; // Free above ₹300
//   const taxRate = 0.05; // 5% GST
//   const tax = subtotal * taxRate;

//   const applyCoupon = () => {
//     if (couponCode.trim().toLowerCase() === 'SAVE20') {
//       setDiscount(subtotal * 0.2); // 20% off
//     } else {
//       setDiscount(0);
//       alert('Invalid or Expired Coupon');
//     }
//   };

//   const totalPrice = subtotal + tax + platformFee + deliveryCharges - discount;

//   const handleCheckout = () => {
//     navigate('/place-order');
//   };



//   return (
//     <div className="max-w-5xl mx-auto mt-12 px-4">
//       <h2 className="text-4xl font-bold text-orange-600 mb-10 text-center flex items-center justify-center gap-3">
//         <FiShoppingCart className="text-4xl" />
//         Your Cart
//       </h2>

//       {cartItems.length === 0 ? (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center py-20"
//         >
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
//             alt="Empty cart"
//             className="w-32 mx-auto mb-6 opacity-80"
//           />
//           <p className="text-xl text-gray-500 mb-4">Oops! Your cart is empty.</p>
//           <button
//             className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium shadow"
//             onClick={() => window.location.href = "/restaurant/landing"} // Consider using navigate('/kolo') here if /kolo is your new home for Browse
//           >
//             Browse Menu
//           </button>
//         </motion.div>
//       ) : (
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           className="space-y-6"
//         >
//           <AnimatePresence>
//             {cartItems.map((item) => (
//               <motion.div
//                 key={item.id}
//                 layout
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-5 border border-orange-100 hover:shadow-orange-200 transition-all duration-300"
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-28 h-28 object-cover rounded-lg border border-gray-300"
//                 />

//                 <div className="flex-1 w-full">
//                   <div className="flex justify-between items-center">
//                     <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
//                     <p className="text-orange-500 font-semibold text-lg">
//                       ₹{(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                   <p className="text-gray-500 text-sm mt-1">
//                     Unit Price: ₹{item.price.toFixed(2)}
//                   </p>

//                   <div className="mt-4 flex items-center gap-3">
//                     <div className="flex items-center border rounded-md shadow-sm">
//                       <button
//                         onClick={() =>
//                           dispatch(updateQuantity({ id: item.id, delta: -1 }))
//                         }
//                         className="px-3 py-1 text-orange-600 hover:text-orange-800"
//                         title="Decrease quantity"
//                       >
//                         <FiMinus />
//                       </button>
//                       <span className="px-4 font-medium text-gray-700">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() =>
//                           dispatch(updateQuantity({ id: item.id, delta: 1 }))
//                         }
//                         className="px-3 py-1 text-green-600 hover:text-green-800"
//                         title="Increase quantity"
//                       >
//                         <FiPlus />
//                       </button>
//                     </div>
//                     <button
//                       onClick={() => dispatch(removeFromCart(item.id))}
//                       className="text-orange-500 hover:text-orange-700 text-lg"
//                       title="Remove item"
//                     >
//                       <FiTrash2 />
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-right mt-12 border-t pt-6"
//           >
//                       {/* Coupon Section */}
//           <div className="mt-10 bg-white p-5 rounded-xl shadow-md space-y-4">
//             <h3 className="text-lg font-semibold text-gray-700">Have a Coupon?</h3>
//             <div className="flex items-center gap-4">
//               <input
//                 type="text"
//                 placeholder="Enter coupon code"
//                 className="border rounded-md px-4 py-2 flex-1"
//                 value={couponCode}
//                 onChange={(e) => setCouponCode(e.target.value)}
//               />
//               <button
//                 onClick={applyCoupon}
//                 className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600"
//               >
//                 Apply
//               </button>
//             </div>
//             {discount > 0 && (
//               <p className="text-green-600 font-medium">Coupon applied! You saved ₹{discount.toFixed(2)}</p>
//             )}
//           </div>

//           {/* Cost Summary */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="mt-10 bg-white p-6 rounded-xl shadow-lg space-y-2 text-right text-gray-800"
//           >
//             <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
//             <p>Tax (5% GST): ₹{tax.toFixed(2)}</p>
//             <p>Platform Fee: ₹{platformFee.toFixed(2)}</p>
//             <p>Delivery Charges: ₹{deliveryCharges.toFixed(2)}</p>
//             {discount > 0 && (
//               <p className="text-green-600">Discount: -₹{discount.toFixed(2)}</p>
//             )}
//             <hr className="my-2" />
//             <p className="text-2xl font-bold">
//               Total: <span className="text-orange-600">₹{totalPrice.toFixed(2)}</span>
//             </p>
//           </motion.div>

//             <motion.button
//               whileHover={{ scale: 1.08 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleCheckout}
//               className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 relative overflow-hidden"
//             >
//               <FiShoppingCart className="text-lg" />
//               Proceed to Checkout
//               <span className="absolute inset-0 rounded-full animate-pulse bg-white opacity-5 pointer-events-none"></span>
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default CartPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTrash2,
  FiShoppingCart,
  FiPlus,
  FiMinus
} from 'react-icons/fi';

const CartPage: React.FC = () => {
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
    const [tax,setTax] = useState('');


  const userId = '684fac7d6f272b68f7f68792';

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:3002/cart/get/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        setCartData(data);
        setDiscount(data.discount || 0);
        setTax(data.tax);

        setCouponCode(data.couponCode || '');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const updateQuantity = (itemId: string, delta: number) => {
    const updatedItems = cartData.items.map((item: any) =>
      item.itemId === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartData({ ...cartData, items: updatedItems });
  };

  const removeItem = (itemId: string) => {
    const updatedItems = cartData.items.filter((item: any) => item.itemId !== itemId);
    setCartData({ ...cartData, items: updatedItems });
  };

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
    <div className="max-w-5xl mx-auto mt-12 px-4">
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
        <p>Tax : ₹{tax}</p>
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
        onClick={() => navigate('/place-order')}
        className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 relative overflow-hidden"
      >
        <FiShoppingCart className="text-lg" />
        Proceed to Checkout
        <span className="absolute inset-0 rounded-full animate-pulse bg-white opacity-5 pointer-events-none"></span>
      </motion.button>
    </div>
  );
};

export default CartPage;
