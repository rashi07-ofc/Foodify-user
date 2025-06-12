import React from "react";
import { Menu, User, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
const cartItemCount = useSelector((state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)
);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div
          className="text-2xl font-bold text-orange-500 tracking-tight cursor-pointer"
          onClick={() => navigate("/")}
        >
          Foodify
        </div>

        {/* Navigation Links (Hidden on mobile) */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#home" className="hover:text-orange-500 transition scroll-smooth">
            Home
          </a>
          <a href="#features" className="hover:text-orange-500 transition scroll-smooth">
            Features
          </a>
          <a href="#services" className="hover:text-orange-500 transition scroll-smooth">
            Services
          </a>
          <a href="#footer" className="hover:text-orange-500 transition scroll-smooth">
            Contact Us
          </a>
        </nav>

        {/* Right-side Buttons */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="text-red-500 border border-red-500 px-5 py-2 rounded-full font-medium hover:bg-red-50 transition"
            >
              Login
            </button>
          ) : (
            <>
             <button
  onClick={() => navigate("/cart")}
  className="relative text-orange-500 border border-orange-500 px-4 py-2 rounded-full hover:bg-orange-50 transition flex items-center gap-2"
>
  <ShoppingCart className="w-5 h-5" />
  Cart
  {cartItemCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {cartItemCount}
    </span>
  )}
</button>

              <button
                onClick={() => navigate("/profile")}
                className="text-white bg-orange-500 px-4 py-2 rounded-full hover:bg-orange-600 transition flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                Profile
              </button>
            </>
          )}

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
