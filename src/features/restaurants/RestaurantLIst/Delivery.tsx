import React, { useEffect, useState } from "react";
import FAQSection from "./FAQSection";
import { getRestaurantsByTags } from "../../../api/restaurentFetchAPI";
import { IoLocationOutline, IoCallOutline } from 'react-icons/io5';
import { MdRestaurant, MdAccessTime } from 'react-icons/md';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

interface Restaurant {
  _id?: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  name: string;
  description: string;
  address: string;
  phone: string;
  managerId: string;
  isActive: boolean;
  tags: string[];
  isBlocked?: boolean;
  isDeleted?: boolean;
  DeletedAt?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  isActiveManager?: boolean;
}


const categories = [
  {
    name: "Veg Meal",
    img: "https://img.freepik.com/free-photo/indian-thali-platter_466689-32909.jpg?w=200",
  },
  {
    name: "pizza",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200",
  },
  {
    name: "Thali",
    img: "https://img.freepik.com/free-photo/indian-thali-platter_466689-32909.jpg?w=200",
  },
  {
    name: "Cake",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200",
  },
  {
    name: "Biryani",
    img: "https://images.unsplash.com/photo-1600628422019-2e3a9c3d1bda?w=200",
  },
  {
    name: "Paneer",
    img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=200",
  },
];

const brands = [
  {
    name: "Domino's Pizza",
    img: "https://seeklogo.com/images/D/dominos-pizza-logo-6F7B0C6E11-seeklogo.com.png",
    time: "19 min",
  },
  {
    name: "Pizza Hut",
    img: "https://seeklogo.com/images/P/pizza-hut-logo-7B85D4C5C8-seeklogo.com.png",
    time: "24 min",
  },
  {
    name: "Dino's Pizza",
    img: "https://img.freepik.com/free-vector/pizza-logo-design_23-2147617596.jpg?w=200",
    time: "44 min",
  },
  {
    name: "The Belgian Waffle Co.",
    img: "https://thebelgianwaffle.co/assets/images/logo.png",
    time: "22 min",
  },
  {
    name: "Top N Town Ice Cream",
    img: "https://topntown.com/images/logo.png",
    time: "21 min",
  },
];

const Delivery: React.FC = () => {

  const [restaurants,setRestaurants]=useState<Restaurant[]>();
  const [tag,setTag]=useState<string>("pizza");


  useEffect(()=>{
    const getData=async ()=>{
      const data=await getRestaurantsByTags(tag);
      setRestaurants(data);
    }
    getData();
    console.log('restaurant data on initial load',restaurants);
  },[tag,setTag])

    const getPlaceholderImage = (name: string, tags: string[]) => {
    const cuisine = tags[0] || 'restaurant';
    return `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&h=400&q=80`;
  };

  // Format tags for display
  const formatTags = (tags: string[]) => {
    return tags.map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)).join(' • ');
  };

  // Calculate distance (placeholder function - you can implement actual geolocation)
  const calculateDistance = (coordinates: [number, number]) => {
    // This is a placeholder - implement actual distance calculation based on user location
    return `${(Math.random() * 5 + 0.5).toFixed(1)} km`;
  };

  
  return (
  <>
    <div className="flex flex-col items-center w-screen py-5 px-0 md:px-[10vw] bg-white">
      <div className="flex flex-col items-start px-5 md:px-[10vw] w-full max-w-[80vw] box-border">
        {/* Eat what makes you happy */}
        <h2
          className="text-[32px] font-semibold mb-6 font-[Dancing Script] italic drop-shadow-lg"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          Eat what makes you happy
        </h2>
        <div className="flex flex-wrap justify-center gap-10 mb-12 w-full">
          {categories.map((cat) => (
            
            <div onClick={()=>setTag(cat.name)} key={cat.name} className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden mb-3 border-4 border-[#FF9D59]">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-[#FF9D59] font-bold text-xl md:text-2xl mt-1">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Top brands for you */}
        <h2
          className="text-[32px] font-semibold mb-6 font-[Dancing Script] italic drop-shadow-lg"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          Top brands for you
        </h2>
        {/* <div className="flex flex-wrap justify-center gap-10 w-full">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden mb-3 border-4 border-[#FF9D59]">
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="object-contain w-24 h-24 md:w-28 md:h-28"
                />
              </div>
              <span className="text-[#FF9D59] font-bold text-xl md:text-2xl">
                {brand.name}
              </span>
              <span className="text-gray-500 text-base md:text-lg">
                {brand.time}
              </span>
            </div>
          ))}
        </div> */}
           <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {restaurants?.map((restaurant, index) => (
          <div 
            key={restaurant._id || index} 
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-orange-200 transition-all duration-300 transform hover:scale-105 overflow-hidden"
          >
            {/* Restaurant Image */}
            <div className="relative h-48 bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
              <img
                src={getPlaceholderImage(restaurant.name, restaurant.tags)}
                alt={restaurant.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  // Fallback to a solid color background with restaurant icon
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              {/* Fallback background with icon */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <MdRestaurant className="w-16 h-16 text-white opacity-80" />
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  <BiCheckCircle className="w-3 h-3" />
                  Open
                </div>
              </div>
              
              {/* Distance Badge */}
              <div className="absolute top-3 left-3">
                <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  {calculateDistance(restaurant.location.coordinates)}
                </div>
              </div>
            </div>

            {/* Restaurant Details */}
            <div className="p-6">
              {/* Name and Tags */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {restaurant.name}
                </h3>
                <p className="text-orange-600 font-medium text-sm mb-2">
                  {formatTags(restaurant.tags)}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {restaurant.description}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 mb-3">
                <IoLocationOutline className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm line-clamp-2">
                  {restaurant.address}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 mb-4">
                <IoCallOutline className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  {restaurant.phone}
                </span>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                View Menu
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
    <FAQSection />
  </>
  )
};

export default Delivery;