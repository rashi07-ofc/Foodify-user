// import axiosInstance from "./axiosInstance";

// export const getCoupons = () => axiosInstance.get("/restaurant/coupons/{restaurantId}");


import axiosInstanse from "./axiosInstance";


  
  export const getCoupons =async  (restaurantId: string) =>{
    console.log(restaurantId);
      const response=await axiosInstanse.get(`/restaurant/coupons/${restaurantId}`);
      console.log('response',response);
      return response.data;
  }
  
 


