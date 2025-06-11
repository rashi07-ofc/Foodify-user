import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGlobeAsia,
  FaLanguage,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-10 pb-5 mt-16 border-t">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-10 text-sm">

        {/* Brand & Language */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-red-600">FoodieFy</h2>
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center gap-2">
              <FaGlobeAsia className="text-lg text-red-500" />
              <span>Country: India</span>
            </div>
            <div className="flex items-center gap-2">
              <FaLanguage className="text-lg text-red-500" />
              <span>Language: English</span>
            </div>
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="font-semibold mb-3 text-red-500">Company</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-red-500 cursor-pointer">About Us</li>
            <li className="hover:text-red-500 cursor-pointer">Careers</li>
            <li className="hover:text-red-500 cursor-pointer">Press</li>
            <li className="hover:text-red-500 cursor-pointer">Help & Support</li>
            <li className="hover:text-red-500 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-3 text-red-500">Our Services</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-red-500 cursor-pointer">Order Online</li>
            <li className="hover:text-red-500 cursor-pointer">Table Booking</li>
            <li className="hover:text-red-500 cursor-pointer">Corporate Orders</li>
            <li className="hover:text-red-500 cursor-pointer">Restaurant Partners</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-3 text-red-500">Legal</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-red-500 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-red-500 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-red-500 cursor-pointer">Security</li>
            <li className="hover:text-red-500 cursor-pointer">Cookie Policy</li>
          </ul>
        </div>
      </div>

      {/* Social & Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-10 border-t pt-6 text-xs text-gray-500">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 text-lg text-gray-600 mb-4 md:mb-0">
            <FaFacebookF className="hover:text-red-500 cursor-pointer transition" />
            <FaTwitter className="hover:text-red-500 cursor-pointer transition" />
            <FaInstagram className="hover:text-red-500 cursor-pointer transition" />
            <FaYoutube className="hover:text-red-500 cursor-pointer transition" />
          </div>
          <p className="text-center md:text-left">
            By using FoodieFy, you agree to our Terms, Privacy, and Cookie policies. <br />
            &copy; {new Date().getFullYear()} FoodieFy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
