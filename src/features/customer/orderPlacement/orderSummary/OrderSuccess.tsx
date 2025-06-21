// OrderSuccessPage.tsx
import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../../auth/authService";
import gsap from "gsap";

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  // GSAP refs
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const placeFinalOrder = async () => {
      const token = getAuthToken();
      const orderId = localStorage.getItem("orderId");

      if (!orderId || !token) {
        navigate("/"); // fallback to home if missing info
        return;
      }

      try {
        await axios.post(
          "http://localhost:3006/order/placeOrder",
          { orderId, modeOfPayment: "online" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Clean up
        localStorage.removeItem("orderId");
        localStorage.removeItem("cart_id");
      } catch (error) {
        console.error("Final order placement failed:", error);
        navigate("/order-failure");
      }
    };

    placeFinalOrder();
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
  }, []);

  return (
    <div className="text-center p-10" ref={containerRef}>
      <h1
        ref={headingRef}
        className="text-2xl font-bold text-green-600"
      >
        Order Successful!
      </h1>
      <p
        ref={subTextRef}
        className="text-gray-600 mt-2"
      >
        Thank you for your purchase.
      </p>
      <button
        ref={buttonRef}
        onClick={() => navigate("/home")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Go to Home
      </button>
    </div>
  );
}
