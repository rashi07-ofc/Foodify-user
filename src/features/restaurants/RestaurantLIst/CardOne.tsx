import React from "react";
import { RiDiscountPercentLine } from "react-icons/ri";

interface Data {
  name: string;
  city: string;
  price_per_dish: string;
  timings: string;
  rating: number;
  distance: string;
  coupon_percent: string;
}

const CardOne = ({
  name,
  city,
  price_per_dish,
  timings,
  rating,
  distance,
  coupon_percent,
}: Data) => {
  return (
    <div className="m-8 p-4 rounded-lg transition-all duration-300 bg-white hover:-translate-y-1 hover:shadow-lg shadow border-4 border-[#FF9D59] font-poppins">
      <div className="relative">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/b3/78/fa/tamra-restaurant.jpg?w=600&h=-1&s=1"
          className="rounded-md w-full h-56 object-cover"
          alt="Restaurant"
        />
        <div className="absolute bottom-5 left-4 flex items-center bg-gradient-to-r from-[rgba(75,75,211,0.8)] to-[rgba(201,237,238,0.8)] px-2 py-1 rounded hover:bg-blue-600 transition">
          <RiDiscountPercentLine className="text-[30px] text-white" />
          <p className="font-bold py-1 px-6 text-white">
            Offer {coupon_percent} Off
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-4">
        <p className="text-lg font-bold leading-none">{name}</p>
        <p className="bg-[rgb(127,187,187)] px-5 py-2 rounded-2xl font-extrabold text-white text-lg">
          {rating}
        </p>
      </div>
      <div className="flex items-center justify-between w-full mt-2">
        <p className="text-lg font-bold leading-none">{city}</p>
        <p className="text-lg font-extrabold leading-none">
          {price_per_dish} for two
        </p>
      </div>
      <div className="flex items-center justify-between w-full mt-2">
        <p className="text-lg font-bold leading-none text-[rgb(218,66,66)]">
          open at {timings}
        </p>
        <p className="text-lg font-bold leading-none">{distance}</p>
      </div>
    </div>
  );
};

export default CardOne;
