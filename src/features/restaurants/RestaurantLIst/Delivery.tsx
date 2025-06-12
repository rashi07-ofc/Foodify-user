import React from "react";
import FAQSection from "./FAQSection";

const categories = [
  {
    name: "Veg Meal",
    img: "https://img.freepik.com/free-photo/indian-thali-platter_466689-32909.jpg?w=200",
  },
  {
    name: "Pizza",
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

const Delivery: React.FC = () => (
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
            <div key={cat.name} className="flex flex-col items-center">
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
        <div className="flex flex-wrap justify-center gap-10 w-full">
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
        </div>
      </div>
    </div>
    <FAQSection />
  </>
);

export default Delivery;
