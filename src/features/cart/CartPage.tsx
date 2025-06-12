import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';


import { updateQuantity, removeFromCart } from '../../redux/slice/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTrash2,
  FiShoppingCart,
  FiPlus,
  FiMinus
} from 'react-icons/fi';

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

const handleCheckout = () => {
  navigate('/cart/checkout');
};


  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h2 className="text-4xl font-bold text-red-600 mb-10 text-center flex items-center justify-center gap-3">
        <FiShoppingCart className="text-4xl" />
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty cart"
            className="w-32 mx-auto mb-6 opacity-80"
          />
          <p className="text-xl text-gray-500 mb-4">Oops! Your cart is empty.</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium shadow"
            onClick={() => window.location.href = "/restaurant/landing"}
          >
            Browse Menu
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-5 border border-red-100 hover:shadow-red-200 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg border border-gray-300"
                />

                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-bold text-gray-800">{item.name}</h4>
                    <p className="text-red-500 font-semibold text-lg">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    Unit Price: ₹{item.price.toFixed(2)}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex items-center border rounded-md shadow-sm">
                      {/* <button
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, delta: -1 }))
                        }
                        className="px-3 py-1 text-red-600 hover:text-red-800"
                        title="Decrease quantity"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 font-medium text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, delta: 1 }))
                        }
                        className="px-3 py-1 text-green-600 hover:text-green-800"
                        title="Increase quantity"
                      >
                        <FiPlus />
                      </button> */}
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                        }
                        className="px-3 py-1 text-red-600 hover:text-red-800"
                        title="Decrease quantity"
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 font-medium text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                        }
                        className="px-3 py-1 text-green-600 hover:text-green-800"
                        title="Increase quantity"
                      >
                        <FiPlus />
                      </button>

                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700 text-lg"
                      title="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-right mt-12 border-t pt-6"
          >
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              Total:{' '}
              <span className="text-red-600">₹{totalPrice.toFixed(2)}</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <FiShoppingCart className="text-lg" />
              Proceed to Checkout
              <span className="absolute inset-0 rounded-full animate-pulse bg-white opacity-5 pointer-events-none"></span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CartPage;
