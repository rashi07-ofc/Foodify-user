import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">
        Contact Us
      </h2>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-700">Phone</h3>
          <p className="text-gray-600">📞 +91 98765 43210</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700">Email</h3>
          <p className="text-gray-600">✉️ support@foddifyy.com</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700">Address</h3>
          <p className="text-gray-600">
            🍽️ Foodify Restaurant, <br />
            123 MG Road, Mumbai, India
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default Contact;
