import React from "react";
import { QRCodeCanvas } from "qrcode.react";

type QrProps = {
  url: string;
};

const Qr: React.FC<QrProps> = ({ url }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-xl font-semibold mb-4 text-orange-600">
        Scan to Download PDF
      </h2>
      <QRCodeCanvas
        value={url}
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
      />
      <p className="mt-2 text-gray-600 ">URL: {url}</p>
    </div>
  );
};

export default Qr;
