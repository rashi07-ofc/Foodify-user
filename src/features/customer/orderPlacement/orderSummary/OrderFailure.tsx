import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import gsap from "gsap";

export default function OrderFailurePage() {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    localStorage.removeItem("orderId");
  }, []);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
      <div
        ref={containerRef}
        className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center"
      >
        <XCircle className="text-red-500 mx-auto mb-4" size={64} />

        <h1
          ref={headingRef}
          className="text-3xl font-bold text-red-700"
        >
          Payment Failed!
        </h1>
        <p
          ref={subTextRef}
          className="text-gray-600 mt-3 text-base"
        >
          Unfortunately, your payment could not be processed.
        </p>

        <button
          ref={buttonRef}
          onClick={() => navigate("/cart")}
          className="mt-6 w-full bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
