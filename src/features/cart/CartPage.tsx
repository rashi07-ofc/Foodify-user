import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { getAuthToken } from "../auth/authService";
import axios from "axios";
<<<<<<< HEAD
// import { restaurant } from "../restaurants/RestaurantLandingPage/restaurantData"; // This import is unused, can be removed
=======
import { useDispatch } from "react-redux";
import { setTotalQuantity } from "../../redux/slice/cartSlice";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
>>>>>>> 6c00015addf865135b23192d77fb5c7b4672434b

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const[total,setTotal]=useState(0);
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const[couponId,setCouponId]=useState("");
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
      setCouponId(response.data[0]._id)
      console.log(response.data[0]._id, "coupon id");
      const dataa = response.data[0];
      setCode(dataa.code);
      setDiscountPercent(dataa.discountPercent);
      setExpiryDate(dataa.expiryDate);
      setAvailableCoupons(response.data[0] || []);
      console.log(availableCoupons , "available coupon");
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

    await axios.post(
      `http://localhost:3002/cart/applyCoupon/${couponId}`, 
      {
        couponId: couponId
      },
      // `http://localhost:3002/cart/applyCoupon/${couponId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    toast.success("Coupon applied successfully!");
    fetchCart(); 
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Failed to apply coupon");
  }
};

//remove coupon 
const removeCoupon = async () => {
  try {
    await axios.post(`http://localhost:3002/cart/removeCoupon`, {
      couponId
    },{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    toast.success("Coupon removed successfully");
    fetchCart(); // Refresh cart to reflect changes
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

<<<<<<< HEAD
      const backendResponseData = response.data; // Store the raw response data

      console.log("Raw backend response data:", backendResponseData); // See the full structure

      // Check if the response contains a 'cart' object
      if (backendResponseData && backendResponseData.cart) {
        const cartActualData = backendResponseData.cart; // Extract the actual cart object
        setCartData(cartActualData); // Set the cart state to the actual cart object

        // Ensure cartActualData.items is an array before calling reduce
        const quantity =
          cartActualData.items?.reduce(
            (sum: number, item: any) => sum + item.quantity,
            0
          ) || 0;
        setTotalQuantity(quantity);

        if (cartActualData?.restaurantId) {
          fetchAvailableCoupons(cartActualData.restaurantId);
        }

        // Use properties from cartActualData, not backendResponseData directly
        setDiscount(cartActualData.discount || 0);
        setTax(cartActualData.tax || 0);
        setCouponCode(cartActualData.couponCode || "");
        setError(null);
      } else {
        // Handle cases where 'cart' property might be missing or empty from the response
        // For example, if the backend returns { message: "No active cart" }
        setCartData(null); // Explicitly set to null to trigger the empty cart UI
        setTotalQuantity(0);
        setDiscount(0);
        setTax(0);
        setCouponCode("");
        setError(null);
        console.warn(
          "Backend response did not contain a 'cart' object:",
          backendResponseData
        );
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error("Cart fetch error:", errorMsg);
      // If the cart is empty or not found, set cartData to null and clear error for empty state UI
      if (err.response?.status === 404 || err.response?.status === 204) {
        setCartData(null);
        setError(null); // Clear error so empty cart UI is shown
      } else {
        setError(errorMsg);
      }
    } finally {
=======
      if (
        response.data?.message ===
        "Cart updated with latest prices, taxes, and totals"
      ) {
        toast.warning(
          "Some items in your cart are no longer available. Refreshing..."
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return fetchCart();
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
      setTotal(data.itemTotal)
      setDiscount(data.discount || 0);
      setTax(data.tax || 0);
      setCouponCode(data.couponCode || "");
      setError(null);
      setLoading(false);

    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error("Cart fetch error:", errorMsg);
      setError("NO items found in your cart");
>>>>>>> 6c00015addf865135b23192d77fb5c7b4672434b
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCart();
  }, [accessToken]); // Added accessToken to dependencies, as it's used in fetchCart

  //delete entire cart
  const deleteCart = async () => {
    try {
      await axios.delete("http://localhost:3002/cart/delete", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
<<<<<<< HEAD

      setCartData(null); // Clear cart data in UI after deletion
      setTotalQuantity(0); // Reset total quantity
      setDiscount(0); // Reset discount
      setTax(0); // Reset tax
      setCouponCode(""); // Reset coupon code
=======
      setCartData(null);
>>>>>>> 6c00015addf865135b23192d77fb5c7b4672434b
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
      await fetchCart(); // Re-fetch cart to get updated state
    } catch (err: any) {
      console.error(
        "Failed to update quantity:",
        err.response?.data?.message || err.message
      );
      alert(err.response?.data?.message || "Failed to update quantity");
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
<<<<<<< HEAD
      const data = response.data;
      localStorage.setItem("cart_id", data._id);
      console.log(data);

      navigate("/place-order");
    } catch (err: any) {
      console.error(
        "Checkout failed:",
        err.response?.data?.message || err.message
      );
      alert(
        err.response?.data?.message || "Checkout failed. Please try again."
      );
    }
  };

  const applyCoupon = () => {
    // This logic is client-side. For a real app, coupon application
    // should ideally happen on the backend via an API call.
    if (couponCode.trim().toLowerCase() === "save20") {
      // You'll need to know the itemTotal from cartData for this
      if (cartData && cartData.itemTotal) {
        const newDiscount = cartData.itemTotal * 0.2;
        setDiscount(newDiscount);
        // Optionally, make an API call to apply coupon on backend as well
      } else {
        alert("Cannot apply coupon: Cart data not available.");
      }
    } else {
      setDiscount(0);
      alert("Invalid or expired coupon");
    }
  };
=======
      const dataId = response.data.cart._id;
      localStorage.setItem("cart_id", dataId);
      navigate("/place-order");
    } catch (err: any) {
      toast.error(err.message || "Checkout failed. Please try again.");
    }
  };

  // const applyCoupon = () => {
  //   if (couponCode.trim().toLowerCase() === "save20") {
  //     const newDiscount = cartData.itemTotal * 0.2;
  //     setDiscount(newDiscount);
  //   } else {
  //     setDiscount(0);
  //     toast.info("Invalid or expired coupon");
  //   }
  // };
>>>>>>> 6c00015addf865135b23192d77fb5c7b4672434b

  // Render logic based on loading, error, and cartData
  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;

<<<<<<< HEAD
  // This check now correctly handles cases where cartData is null (e.g., initially or after delete)
  // or when cartData exists but its `items` array is empty.
  if (!cartData || !cartData.items || cartData.items.length === 0) {
=======
  //if no items found in cart
  if (!cartData || cartData.items?.length === 0) {
>>>>>>> 6c00015addf865135b23192d77fb5c7b4672434b
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

  // Destructure `items` safely after the check
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
        {/* The crucial fix is here: `items?.map` */}
        {items?.map((item: any) => (
          <motion.div
            key={item.itemId || item._id || item.id} // Use a robust key strategy
            layout
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

<<<<<<< HEAD
      {/* Coupon Input */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="flex-1 w-full sm:w-auto p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          onClick={applyCoupon}
          className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Apply Coupon
        </button>
      </div>

      {availableCoupons.length > 0 && (
        <div className="mt-6 p-6 bg-orange-50 rounded-xl shadow-inner border border-orange-200">
          <h4 className="font-bold text-lg text-orange-700 mb-3">
            Available Coupons
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {availableCoupons.map((coupon) => (
              <li key={coupon.couponId}>
                <span className="font-semibold">{coupon.couponId}</span> (
                <span className="text-green-600">{coupon.discount}</span>) -
                Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
              </li>
            ))}
=======
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
>>>>>>> 6c00015addf865135b23192d77fb5c7b4672434b
          </ul>
        </div>
      )}

      {/* apply coupon */}
{/* Apply Coupon */}
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
  {cartData?.couponCode && (
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
        <p>Subtotal: ₹{itemTotal?.toFixed(2) || "0.00"}</p>{" "}
        {/* Optional chaining for safety */}
        <p>Tax: ₹{tax.toFixed(2)}</p>
<<<<<<< HEAD
        <p>Platform Fee: ₹{platformFee?.toFixed(2) || "0.00"}</p>{" "}
        {/* Optional chaining for safety */}
        <p>Delivery Charges: ₹{deliveryCharges?.toFixed(2) || "0.00"}</p>{" "}
        {/* Optional chaining for safety */}
        {discount > 0 && (
          <p className="text-green-600">Discount: -₹{discount.toFixed(2)}</p>
        )}
=======
        <p>Platform Fee: ₹{platformFee.toFixed(2)}</p>
        <p>Delivery Charges: ₹{deliveryCharges.toFixed(2)}</p>
      
>>>>>>> 6c00015addf865135b23192d77fb5c7b4672434b
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
