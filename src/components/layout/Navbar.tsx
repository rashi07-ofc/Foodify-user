import React, { useState, useRef, useEffect } from "react";
import { Menu, User, ShoppingCart, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../redux/store"; // Corrected import
import { logout } from "../../redux/slice/authSlice"; // Corrected import

const Navbar: React.FC = () => {
  // const isAuthenticated = !!localStorage.getItem("accessToken");
  const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    closeMobileMenu();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHome = () => {
    handleNavClick("#home");
    navigate("/home");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        <div
          className="text-2xl font-bold text-orange-500 tracking-tight cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Foodify
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <button
            onClick={handleHome}
            className="hover:text-orange-500 transition"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("#features")}
            className="hover:text-orange-500 transition"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick("#services")}
            className="hover:text-orange-500 transition"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick("#footer")}
            className="hover:text-orange-500 transition"
          >
            Contact Us
          </button>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/otp")}
                className="text-orange-500 border border-orange-500 px-5 py-2 rounded-full font-medium hover:bg-orange-50 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="text-white bg-orange-500 px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/cart")}
                className="text-orange-500 border border-orange-500 px-4 py-2 rounded-full hover:bg-orange-50 transition flex items-center gap-2 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="text-white bg-orange-500 px-4 py-2 rounded-full hover:bg-orange-600 transition flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/order-history");
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Your Orders
                    </button>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setShowDropdown(false);
                        navigate("/");
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[72px] right-0 w-80 max-w-[90vw] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          <div className="space-y-3 border-b border-gray-200 pb-4">
            <button
              onClick={() => handleNavClick("#home")}
              className="block w-full text-left text-gray-700 font-medium hover:text-orange-500 transition py-2"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("#features")}
              className="block w-full text-left text-gray-700 font-medium hover:text-orange-500 transition py-2"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("#services")}
              className="block w-full text-left text-gray-700 font-medium hover:text-orange-500 transition py-2"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("#footer")}
              className="block w-full text-left text-gray-700 font-medium hover:text-orange-500 transition py-2"
            >
              Contact Us
            </button>
          </div>

          <div className="space-y-3">
            {!isAuthenticated ? ( // Changed from isLoggedIn to isAuthenticated for consistency
              <>
                <button
                  onClick={() => {
                    navigate("/signup");
                    closeMobileMenu();
                  }}
                  className="w-full text-orange-500 border border-orange-500 px-5 py-3 rounded-full font-medium hover:bg-orange-50 transition"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                    closeMobileMenu();
                  }}
                  className="w-full text-white bg-orange-500 px-5 py-3 rounded-full font-medium hover:bg-orange-600 transition"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/cart");
                    closeMobileMenu();
                  }}
                  className="text-orange-500 border border-orange-500 px-4 py-2 rounded-full hover:bg-orange-50 transition flex items-center gap-2 relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:inline">Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    navigate("/profile");
                    closeMobileMenu();
                  }}
                  className="w-full text-gray-700 font-medium hover:text-orange-500 transition py-2 text-left"
                >
                  User Info
                </button>
                <button
                  onClick={() => {
                    navigate("/order-history");
                    closeMobileMenu();
                  }}
                  className="w-full text-gray-700 font-medium hover:text-orange-500 transition py-2 text-left"
                >
                  Your Orders
                </button>
                <button
                  onClick={() => {
                    dispatch(logout());
                    closeMobileMenu();
                    navigate("/");
                  }}
                  className="w-full text-white bg-orange-500 px-5 py-3 rounded-full font-medium hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
