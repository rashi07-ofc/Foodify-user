import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FAQSection from "./FAQSection";
import { getRestaurantsByTags } from "../../../api/restaurentFetchAPI";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { MdRestaurant } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import vegmeal from "../../../assets/vegmeal.jpeg";
import thali from "../../../assets/thali.jpg";
import pizza from "../../../assets/pizza.jpeg";
import cake from "../../../assets/cake.jpeg";
import biryani from "../../../assets/biryani.jpeg";
import paneer from "../../../assets/paneer.jpg";
import belgianwaffle from "../../../assets/belgianwaffle.jpeg";
import dinos from "../../../assets/dinos.jpeg";
import dominos from "../../../assets/dominos.png";
import pizzahut from "../../../assets/pizzahut.jpeg";
import topntown from "../../../assets/topntown.jpeg";

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
  { name: "Veg Meal", img: [vegmeal], apiCode: "vegetarian" },
  { name: "Pizza", img: [pizza], apiCode: "pizza" },
  { name: "Thali", img: [thali], apiCode: "thali" },
  { name: "Cake", img: [cake], apiCode: "cake" },
  { name: "Biryani", img: [biryani], apiCode: "biryani" },
  { name: "Paneer", img: [paneer], apiCode: "paneer" },
];

const brands = [
  { name: "Domino's Pizza", img: [dominos], time: "19 min" },
  { name: "Pizza Hut", img: [pizzahut], time: "24 min" },
  { name: "Dino's Pizza", img: [dinos], time: "44 min" },
  { name: "Belgian Waffle Co", img: [belgianwaffle], time: "22 min" },
  { name: "Top N Town Ice Cream", img: [topntown], time: "21 min" },
];

const Delivery: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>();
  const [tag, setTag] = useState<string>("pizza");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await getRestaurantsByTags(tag);
      setRestaurants(data);
      console.log("Fetched restaurants:", data);
    };
    getData();
  }, [tag]);


  const getPlaceholderImage = () =>
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&h=400&q=80";

  const formatTags = (tags: string[]) =>
    tags.map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1)).join(" • ");

  const calculateDistance = (coordinates: [number, number]) =>
    `${(Math.random() * 5 + 0.5).toFixed(1)} km`;

  return (
    <>
      <div className="flex flex-col items-center w-screen py-5 px-0 md:px-[10vw] bg-white">
        <div className="flex flex-col items-start px-5 md:px-[10vw] w-full max-w-[80vw] box-border">
          {/* Header */}
          <h2
            className="text-[32px] font-semibold mb-6 font-[Dancing Script] italic drop-shadow-lg"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            Eat what makes you happy
          </h2>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-10 mb-12 w-full">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setTag(cat.apiCode)}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden mb-3 border-4 border-[#FF9D59]">
                  <img
                    src={cat.img[0]}
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

          {/* Top Brands */}
          <h2
            className="text-[32px] font-semibold mb-6 font-[Dancing Script] italic drop-shadow-lg"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            Top brands for you
          </h2>
          <div className="flex flex-wrap justify-center gap-10 w-full">
            {brands.map((brand) => (
              <div key={brand.name} className="flex flex-col items-center">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden mb-3 border-4 border-[#FF9D59]">
                  <img
                    src={brand.img[0]}
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
          </div>

          {/* Restaurants List */}
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {restaurants?.map((restaurant) => {
                // Determine the ID to use for the key and potentially other elements within the card
                const currentRestaurantId = restaurant._id ?? '6767';

                return (
                  <div
                    // Use the resolved ID for the key
                    key={currentRestaurantId}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-orange-200 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  >
                    {/* Restaurant Image */}
                    <div className="relative h-48 bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
                      <img
                        src={getPlaceholderImage()}
                        alt={restaurant.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MdRestaurant className="w-16 h-16 text-white opacity-80" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          <BiCheckCircle className="w-3 h-3" />
                          Open
                        </div>
                      </div>
                      <div className="absolute top-3 left-3">
                        <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                          {calculateDistance(restaurant.location.coordinates)}
                        </div>
                      </div>
                    </div>

                    {/* Restaurant Details */}
                    <div className="p-6">
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

                      <div className="flex items-start gap-2 mb-3">
                        <IoLocationOutline className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm line-clamp-2">
                          {restaurant.address}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <IoCallOutline className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">
                          {restaurant.phone}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          // For navigation, maintain the specific logic:
                          // if restaurant._id is defined, go to /landing/:id
                          // otherwise, go to /ulul
                          if (restaurant._id) {
                            navigate(`/landing/${restaurant._id}`);
                          } else {
                            console.warn("Restaurant ID is undefined, navigating to /ulul");
                            navigate("/landing/684ab140d5e1127595270ec4");
                          }
                        }}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        View Menu
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <FAQSection />
    </>
  );
};

export default Delivery;