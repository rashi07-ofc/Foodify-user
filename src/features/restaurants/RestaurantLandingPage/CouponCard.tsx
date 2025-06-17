import React from "react";
import { applyCoupon } from "../../../api/couponAPI";
import { toast } from "react-toastify";

type CouponProps = {
  code: string;
  discountPercent: number;
  expiryDate: string;
  maxDiscount: number;
  minOrderAmount: number;
  restaurantId: string;
  orderAmount: number;
};

const CouponCard: React.FC<CouponProps> = ({
  code,
  discountPercent,
  expiryDate,
  maxDiscount,
  minOrderAmount,
  restaurantId,
  orderAmount,
}) => {
  const formattedDate = new Date(expiryDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleApplyCoupon = async () => {
    try {
      const result = await applyCoupon({
        restaurantId,
        couponCode: code,
        orderAmount,
      });
      toast.success(
        `Coupon applied! You saved ₹${result.discountAmount}. New total: ₹${result.finalAmount}`
      );
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      toast.error("Failed to apply coupon. Please try again.");
    }
  };

  return (
    <div className="border border-orange-400 rounded-xl bg-orange-50 p-6 shadow-md flex flex-col gap-2 max-w-lg">
      <div className="text-2xl font-bold text-orange-600">{code}</div>
      <div className="text-lg text-gray-700">
        🎉 <span className="font-semibold">{discountPercent}% OFF</span> (Max ₹
        {maxDiscount})
      </div>
      <div className="text-sm text-gray-600">
        Minimum Order: ₹{minOrderAmount}
      </div>
      <div className="text-sm text-gray-500">Valid till: {formattedDate}</div>
      <button
        onClick={handleApplyCoupon}
        className="mt-3 px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition w-fit"
      >
        Apply Coupon
      </button>
    </div>
  );
};

export default CouponCard;
