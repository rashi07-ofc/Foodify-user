import React from "react";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-orange-500 tracking-tight cursor-pointer">
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

        {/* Right-side Login Button */}
        <div className="flex items-center gap-4">
          <button className="text-red-500 border border-red-500 px-5 py-2 rounded-full font-medium hover:bg-red-50 transition">
            Login
          </button>

          {/* Mobile Menu Icon (optional, kept for responsiveness) */}
          <button className="md:hidden text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
