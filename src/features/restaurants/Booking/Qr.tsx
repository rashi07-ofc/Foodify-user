import React from "react";
import {QRCodeCanvas} from "qrcode.react";

const Qr = () => {
  const url = "http://localhost:5173/contact";

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-xl font-semibold mb-4 text-orange-600">
        Scan to Contact Us
      </h2>
      <QRCodeCanvas value={`https://www.zomato.com/contact`} size={200} bgColor="#ffffff" fgColor="#000000" />
      <p className="mt-2 text-gray-600">URL: {url}</p>
    </div>
  );
};

export default Qr;
