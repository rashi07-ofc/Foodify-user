import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10 mt-20" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-3">Foodify</h2>
          <p className="text-gray-600 text-sm">
            Delivering delicious meals to your doorstep — fast, fresh, and full of flavor.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#home" className="hover:text-orange-500">Home</a></li>
            <li><a href="#features" className="hover:text-orange-500">Features</a></li>
            <li><a href="#services" className="hover:text-orange-500">Services</a></li>
            <li><a href="#contact" className="hover:text-orange-500">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-500" />
              <span>support@foodify.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-500 mt-1" />
              <span>123 Street Name, City, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-10 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Foodify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
