import axiosInstanse from "./axiosInstance";

interface Location{
    latitude:number;
    longitude:number;
    offset:number | null;
    limit:number | null;
    
}

export const getNearbyRestaurants=async({longitude,latitude,offset,limit}:Location)=>{
    const response=await axiosInstanse('/restaurant/nearby',{
        params:{
            latitude,
            longitude,
            offset: 0,
            limit: 10
        }
    });
    console.log(response.data);
    
    return response.data;
}

export const getRestaurantsByTags=async (tags:string)=>{
    const response=await axiosInstanse('/restaurant/tags',{
        params:{
             tags,
        }
    });

    console.log("restaurant data",response);

    return response.data;
}