// import axiosInstance from "./axiosInstance";

// export const getCoupons = () => axiosInstance.get("/restaurant/coupons/{restaurantId}");


import axiosInstanse from "./axiosInstance";

// interface ApplyCouponPayload {
//     restaurantId: string;
//     couponCode: string;
//     orderAmount: number;
//   }

export const getCoupons = async (restaurantId: string) => {
    // console.log(restaurantId);
    const response = await axiosInstanse.get(`/restaurant/coupons/${restaurantId}`);
    //   console.log('response',response);
    return response.data;
}

//   export const applyCoupon = async (payload: ApplyCouponPayload) => {
//     const response = await axiosInstanse.post("/restaurant/apply-coupon", payload);
//     return response.data;
//   };

