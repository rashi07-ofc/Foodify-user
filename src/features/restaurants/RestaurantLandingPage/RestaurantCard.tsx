import React, { useEffect, useState } from "react";
import { MdPhone, MdDirections, MdRateReview } from "react-icons/md";
import { motion } from "framer-motion";

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
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3005/restaurant/68400c12d4739babc990d3aa")
      .then((res) => res.json())
      .then((data) => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch restaurant:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!restaurant) return <div className="text-center mt-10">No data found</div>;

  // Sample images for static content (until API provides them)
  const images = [
    "https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <motion.div
      className="relative bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto p-6 mt-8"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Rating Badge */}
      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold shadow">
        4.5 ★ {/* Static rating; update if API provides */}
      </div>

      {/* Info */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{restaurant.name}</h2>
        <p className="text-gray-600 mt-1">{restaurant.address}</p>
        <p className="text-gray-500 text-sm mt-1">Open: 9:00 AM - 11:00 PM</p> {/* Static timing */}
        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
          <MdPhone className="text-gray-600" /> {restaurant.phone}
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
