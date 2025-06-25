import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { getAuthToken } from "../auth/authService";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTotalQuantity } from "../../redux/slice/cartSlice";
import { toast, ToastContainer } from "react-toastify";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [total, setTotal] = useState(0);
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [remove, setRemove] = useState(false);
  const [maxDiscount, setMaxDis] = useState<number | null>(null);
  const [couponId, setCouponId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tax, setTax] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState<
    { couponId: string; discount: string; expiryDate: string }[]
  >([]);
  const accessToken = getAuthToken();
  const navigate = useNavigate();

  //API to fetch coupons
  const fetchAvailableCoupons = async (restaurantId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/cart/coupons/6852fb2f8206802de65e3c75`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCouponId(response.data[0]._id);
      console.log(response.data[0]._id, "coupon id");
      const dataa = response.data[0];
      setCode(dataa.code);
      setDiscountPercent(dataa.discountPercent);
      setExpiryDate(dataa.expiryDate);
      setAvailableCoupons(response.data[0] || []);
      console.log(availableCoupons, "available coupon");
    } catch (err: any) {
      console.error(
        "Coupon fetch error:",
        err.response?.data?.message || err.message
      );
      setAvailableCoupons([]);
    }
  };

  //apply coupoj api
  const applyCoupon = async () => {
    try {
      if (!couponCode.trim()) {
        toast.warning("Please enter a coupon code");
        return;
      }

      const response = await axios.post(
        `http://localhost:3002/cart/applyCoupon/${couponId}`,
        {
          couponId: couponId,
        },
        // `http://localhost:3002/cart/applyCoupon/${couponId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("applY reponse", response.data);

      setTotal(response.data.newTotal);
      setMaxDis(response.data.maxDiscount);
      setRemove(true);
      const msg=response.data.message;
      // setCouponCode(response.data.Code || "");

      toast.success(msg);
      // fetchCart();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to apply coupon");
    }
  };

  //remove coupon
  const removeCoupon = async () => {
    try {
      const res=await axios.post(
        `http://localhost:3002/cart/removeCoupon`,
        {
          couponId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
   console.log(res , dfcgvhb);
   
      setRemove(false);
      toast.success("Coupon removed successfully");
      // fetchCart();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to remove coupon");
    }
  };

  //fetch cart state
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3002/cart/get", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (
        response.data?.message ===
        "Cart updated with latest prices, taxes, and totals"
      ) {
        toast.warning(
          "Some items in your cart are no longer available. Refreshing..."
        );
        setTimeout(() => {
          fetchCart();
        }, 1000);

        
      }

      console.log(response.data);

      const data = response.data.cart;
      localStorage.setItem("cartId", data._id);
      setCartData(data);

      const quantity =
        data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      dispatch(setTotalQuantity(quantity));
      localStorage.setItem("cartTotalQuantity", quantity);

      if (data?.restaurantId) {
        fetchAvailableCoupons(data.restaurantId);
      }
      setTotal(data.total);
      setDiscount(data.discount || 0);
      setTax(data.tax || 0);
      setCouponCode(data.couponCode || "");
      setError(null);
      setLoading(false);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error("Cart fetch error:", errorMsg);
      setError("NO items found in your cart");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  //delete entire cart
  const deleteCart = async () => {
    try {
      await axios.delete("http://localhost:3002/cart/delete", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCartData(null);
        dispatch(setTotalQuantity(0));
      localStorage.setItem("cartTotalQuantity", "");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete cart");
    }
  };

  //update quamtity
  const updateQuantity = async (itemId: string, delta: number) => {
    try {
      if (delta === 1) {
        await axios.post(
          `http://localhost:3002/cart/add`,
          {
            restaurantId: cartData.restaurantId,
            itemId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else if (delta === -1) {
        await axios.post(
          `http://localhost:3002/cart/remove`,
          {
            itemId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
      await fetchCart();
    } catch (err: any) {
      alert(err.message || "Failed to update quantity");
    }
  };

  //navigate to checkout

  const handleCheckout = async () => {
    try {
      const response = await axios.get("http://localhost:3002/cart/get", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const dataId = response.data.cart._id;
      localStorage.setItem("cart_id", dataId);
      navigate("/place-order");
    } catch (err: any) {
      toast.error(err.message || "Checkout failed. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;

  //if no items found in cart
  if (!cartData || cartData.items?.length === 0) {
    return (
      <div className="text-center mt-16">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="w-32 mx-auto mb-6 opacity-80"
        />
        <p className="text-xl text-gray-500 mb-4">Oops! Your cart is empty.</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const { items, itemTotal, platformFee, deliveryCharges } = cartData;

  return (
    //map through cart items
    <div className="max-w-5xl mx-auto mt-32 px-4">
      <ToastContainer position="top-center" autoClose={3000} />

      <h2 className="text-4xl font-bold text-orange-600 mb-10 text-center flex items-center justify-center gap-3">
        <FiShoppingCart className="text-4xl" />
        Your Cart
      </h2>

      <AnimatePresence>
        {items.map((item: any) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-5 border border-orange-100 hover:shadow-orange-200"
          >
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=781&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
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
                  <span className="px-4 font-medium text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.itemId, 1)}
                    className="px-3 py-1 text-green-600 hover:text-green-800"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {code ? (
        <div className="text-sm text-gray-500 text-left space-y-2 mt-6">
          <h4 className="font-semibold mb-2">Available Coupon:</h4>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-medium">{code}</span> — Save{" "}
              <span className="text-orange-600">{discountPercent}%</span>,
              expires on{" "}
              <span>{new Date(expiryDate).toLocaleDateString()}</span>
            </li>
          </ul>
        </div>
      ) : (
        <div className="text-sm text-gray-400 italic mt-4">
          No coupons found.
        </div>
      )}

      {/* apply coupon */}
      <div className="mt-8 flex items-center justify-start gap-4">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="border border-orange-400 px-4 py-2 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <button
          onClick={applyCoupon}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-semibold"
        >
          Apply Coupon
        </button>
      </div>
      {remove && (
        <div>
          <p className="text-green-600 text-sm">
            Coupon <strong>{cartData.couponCode}</strong> applied.
          </p>
          <button
            onClick={removeCoupon}
            className="text-sm text-red-600 hover:underline"
          >
            Remove Coupon
          </button>
        </div>
      )}

      {/* order charges details */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg text-right space-y-2">
        <p>Subtotal: ₹{itemTotal.toFixed(2)}</p>
        <p>Tax: ₹{tax.toFixed(2)}</p>
        <p>Platform Fee: ₹{platformFee.toFixed(2)}</p>
        <p>Delivery Charges: ₹{deliveryCharges.toFixed(2)}</p>

        <hr className="my-2" />
        <p className="text-2xl font-bold">
          Total: <span className="text-orange-600">₹{total}</span>
        </p>
      </div>

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
