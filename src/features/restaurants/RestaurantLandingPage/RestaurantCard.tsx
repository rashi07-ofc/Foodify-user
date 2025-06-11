import React from "react";
import { MdPhone } from "react-icons/md";
import { motion } from "framer-motion";
import { MdDirections, MdRateReview } from "react-icons/md";
import { restaurant } from "./restaurantData";

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 4px 8px rgba(0,0,0,0.15)" },
  tap: { scale: 0.95 },
};

const imgVariants = {
  hover: { scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" },
  initial: { scale: 1 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const RestaurantCard: React.FC = () => {
  const { name, address, timing, phone, rating, images } = restaurant;

  return (
    <motion.div
      className="relative bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto p-6 mt-8"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Rating Badge */}
      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold shadow">
        {rating} ★
      </div>

      {/* Info */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 mt-1">{address}</p>
        <p className="text-gray-500 text-sm mt-1">Open: {timing}</p>
        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
          <MdPhone className="text-gray-600" /> {phone}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap mb-6">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded transition text-sm select-none"
        >
          <MdDirections size={18} />
          Direction
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded transition text-sm select-none"
          onClick={() => {
            const el = document.getElementById("restaurant-tabs");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        >
          <MdRateReview size={18} />
          Reviews
        </motion.button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
        {images.map((src, idx) => (
          <motion.img
            key={idx}
            src={src}
            alt={`food item ${idx + 1}`}
            loading="lazy"
            variants={imgVariants}
            initial="initial"
            whileHover="hover"
            className="rounded-lg object-cover h-40 w-full cursor-pointer transition-transform"
            draggable={false}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default React.memo(RestaurantCard);
