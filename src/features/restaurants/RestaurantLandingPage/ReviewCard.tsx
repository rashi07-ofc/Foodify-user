import React from "react";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";

interface ReviewProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" },
  tap: { scale: 0.98 },
};

const ReviewCard: React.FC<ReviewProps> = ({ name, rating, comment, date }) => {
  return (
    <motion.div
      className="border rounded-lg p-4 bg-white shadow-sm mb-4 cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <span className="flex items-center gap-1 bg-orange-500 text-white text-xs px-2 py-1 rounded">
          {rating}
          <AiFillStar size={12} />
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{comment}</p>
      <span className="text-xs text-gray-400">{date}</span>
    </motion.div>
  );
};

export default ReviewCard;
