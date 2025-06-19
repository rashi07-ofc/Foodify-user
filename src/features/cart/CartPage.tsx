import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { getAuthToken } from "../auth/authService";
import axios from "axios";
import { restaurant } from "../restaurants/RestaurantLandingPage/restaurantData";

const CartPage: React.FC = () => {
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [tax, setTax] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState<{ couponId: string; discount: string; expiryDate: string }[]>([]);
 const accessToken = getAuthToken();

 const fetchAvailableCoupons = async(restaurantId:string)=>{
  try{
    console.log("Calling coupon api");
    const response=await axios.get(`http://localhost:3002/coupons/${restaurantId}`,{
      headers:{
        Authorization:`Bearer ${accessToken}`,
      }
    })
    console.log("here is response of coupon API", response.data);
    setAvailableCoupons(response.data.coupons || []);
    
  }
   catch (err: any) {
    console.error("Coupon fetch error:", err.response?.data?.message || err.message);
    setAvailableCoupons([]);
  }
 }


  // const fetchAvailableCoupons = async (restaurantId: string) => {
  //   try {
  //     console.log("calling copon api");

  //     const response = await fetch(
  //       `http://localhost:3002/coupons/${restaurantId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,

  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to fetch coupons");
  //     }

  //     const data = await response.json();
  //     console.log("here is reposne of copon api", data);

  //     setAvailableCoupons(data.coupons || []);
  //   } catch (err: any) {
  //     console.error("Coupon fetch error:", err.message);
  //     setAvailableCoupons([]);
  //   }
  // };

  // Fetch cart from server
 const fetchCart = async () => {
  try {
    setLoading(true);
    const response = await axios.get('http://localhost:3002/cart/get', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = response.data.cart;
    console.log(data);
    
    setCartData(data);

    if (data?.restaurantId) {
      fetchAvailableCoupons(data.restaurantId);
    }

    setDiscount(data.discount || 0);
    setTax(data.tax || 0);
    setCouponCode(data.couponCode || "");
    setError(null);
  } catch (err: any) {
    const errorMsg = err.response?.data?.message || err.message;
    console.error("Cart fetch error:", errorMsg);
    setError(errorMsg);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCart();
  }, []);

  const deleteCart = async () => {
    try {
        await axios.delete("http://localhost:3002/cart/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setCartData(null);
    } catch (err: any) {
      alert(err.message || "Failed to delete cart");
    }
  };

  
  const updateQuantity = async (itemId: string, delta: number) => {
  try {
    if (delta === 1) {
      await axios.post(`http://localhost:3002/cart/add`,
        {
          restaurantId: cartData.restaurantId,
          itemId,
        }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
        );
      }
     else if (delta === -1) {
      await axios.post(`http://localhost:3002/cart/remove`, {
        itemId,},
       {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      
      });
    }
    await fetchCart();
  } catch (err: any) {
    alert(err.message || "Failed to update quantity");
  }
};


  const handleCheckout = async () => {
    try {
      const response = await axios.get("http://localhost:3002/cart/get", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.data;
      localStorage.setItem("cart_id", data._id);
      console.log(data);

      navigate("/place-order");
    } catch (err: any) {
      alert(err.message || "Checkout failed. Please try again.");
    }
  };

  // const removeItem = async (itemId: string) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3002/cart/remove/${itemId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to remove item");
  //     }

  //     await fetchCart();
  //   } catch (err: any) {
  //     alert(err.message || "Failed to remove item");
  //   }
  // };

  const applyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "save20") {
      const newDiscount = cartData.itemTotal * 0.2;
      setDiscount(newDiscount);
    } else {
      setDiscount(0);
      alert("Invalid or expired coupon");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;

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
            key={item.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-5 border border-orange-100 hover:shadow-orange-200"
          >
            <img
              src={item.image || "https://via.placeholder.com/100"}
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
                {/* <button
                  onClick={() => removeItem(item.itemId)}
                  className="text-orange-500 hover:text-orange-700 text-lg"
                >
                  <FiTrash2 />
                </button> */}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

    {availableCoupons.length > 0 ? (
  <div className="text-sm text-gray-500 text-left space-y-2">
    <h4 className="font-semibold mb-2">Available Coupons:</h4>
    <ul className="list-disc list-inside">
      {availableCoupons.map((coupon) => (
        <li key={coupon.couponId}>
          <span className="font-medium">{coupon.couponId}</span> — Save{" "}
          <span className="text-orange-600">{coupon.discount}</span>, expires on{" "}
          <span>{coupon.expiryDate}</span>
        </li>
      ))}
    </ul>
  </div>
) : (
  <div className="text-sm text-gray-400 italic mt-4">No coupons found.</div>
)}


      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg text-right space-y-2">
        <p>Subtotal: ₹{itemTotal.toFixed(2)}</p>
        <p>Tax: ₹{tax.toFixed(2)}</p>
        <p>Platform Fee: ₹{platformFee.toFixed(2)}</p>
        <p>Delivery Charges: ₹{deliveryCharges.toFixed(2)}</p>
        {discount > 0 && (
          <p className="text-green-600">Discount: -₹{discount.toFixed(2)}</p>
        )}
        <hr className="my-2" />
        <p className="text-2xl font-bold">
          Total: <span className="text-orange-600">₹{total.toFixed(2)}</span>
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
