import React, { useEffect, useState } from "react";
import { getCoupons } from "../../../api/couponAPI";
import { toast } from "react-toastify";

interface Coupon {
  code: string;
  discountPercent: number;
  expiryDate: string;
  maxDiscount: number;
  minOrderAmount: number;
}

const CouponList: React.FC<{ restaurantId: string; orderAmount: number }> = ({
  restaurantId,
  orderAmount,
}) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const result = await getCoupons(restaurantId);
        console.log("Result",result);
        setCoupons(result); // adjust if your API returns a different structure
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, [restaurantId]);

 

  return (
    <div className="flex flex-col gap-4">
      {coupons?.map((coupon) => (
        <div
          key={coupon.code}
          className="border border-orange-400 rounded-lg p-4 bg-orange-50 flex flex-col gap-2"
        >
          <div className="text-lg font-semibold text-orange-600">
            {coupon.code}
          </div>
          <div className="text-gray-700">
            {coupon.discountPercent}% OFF | Max ₹{coupon.maxDiscount}
          </div>
          <div className="text-sm text-gray-600">
            Minimum Order ₹{coupon.minOrderAmount}
          </div>
          {/* <button
            onClick={() => handleApplyCoupon(coupon.code)}
            className="mt-2 px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition w-fit"
          >
            Apply Coupon
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default CouponList;
