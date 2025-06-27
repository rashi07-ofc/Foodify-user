import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../../auth/authService";
import gsap from "gsap";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { CheckCircle } from "lucide-react";
import { toast } from 'react-toastify'; // Import toast for user feedback

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);

  const { width, height } = useWindowSize();

  useEffect(() => {
    const placeFinalOrder = async () => {
      const token = getAuthToken();
      const orderId = localStorage.getItem("orderId");
      const cartId = localStorage.getItem("cart_id");

      if (!orderId || !token) {
        navigate("/");
        return;
      }

      try {
        // Last API Call 
        await axios.post(
          "http://localhost:3006/order/placeOrder",
          { orderId, modeOfPayment: "online" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Delete the cartId
        if (cartId) {
          try {
            await axios.delete("http://localhost:3002/cart/delete", {
              headers: { Authorization: `Bearer ${token}` },
              data: { cart_id: cartId } 
            });
            console.log("Cart deleted successfully:", cartId);
          } catch (cartDeleteError) {
            console.error("Failed to delete cart:", cartDeleteError);
            toast.warn("Your order was placed, but we couldn't clear your cart. Please clear it manually if needed.");
          }
        }

        // Clear local storage items
        localStorage.removeItem("orderId");
        localStorage.removeItem("cart_id");

        // Stop confetti after a delay
        setTimeout(() => setShowConfetti(false), 5000);

      } catch (error) {
        console.error("Final order placement failed:", error);
        // If order placement itself fails, navigate to failure page
        toast.error("Failed to place your order. Please try again.");
        navigate("/order-failure");
      }
    };
  }, [navigate]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.5 } });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1 })
      .fromTo(
        headingRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1 },
        "-=0.3"
      )
      .fromTo(
        subTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.3"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.2"
      );
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white relative">
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} />
      )}

      <div
        ref={containerRef}
        className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center"
      >
        <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />

        <h1 ref={headingRef} className="text-3xl font-bold text-green-700">
          Order Successful!
        </h1>
        <p ref={subTextRef} className="text-gray-600 mt-3 text-base">
          Your order has been placed successfully. <br /> Thank you for shopping with us!
        </p>

        <button
          ref={buttonRef}
          onClick={() => navigate("/home")}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}