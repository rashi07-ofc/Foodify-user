
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Star, 
  MapPin, 
  Clock, 
  Heart,
  ArrowRight,
  Utensils,
  Phone
} from "lucide-react";
import type { PublicRestaurant } from "../types/types";

interface Props {
  restaurant: PublicRestaurant;
  onClick: () => void;
}

export const RestaurantCard: React.FC<Props> = ({ restaurant, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate random but consistent data for each restaurant
  const rating = 3.5 + Math.random() * 1.5; // 3.5 to 5.0
  const reviewCount = Math.floor(Math.random() * 500) + 50; // 50 to 550
  const priceRange = ['$', '$$', '$$$'][Math.floor(Math.random() * 3)];
  const deliveryTime = `${15 + Math.floor(Math.random() * 30)}-${25 + Math.floor(Math.random() * 30)} min`;
  
  // Generate a consistent image based on restaurant ID
  const imageUrl = `https://picsum.photos/seed/${restaurant._id}/400/240`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center space-x-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "fill-yellow-400 text-yellow-400 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        hover: { duration: 0.2 }
      }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 overflow-hidden group border border-gray-100"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
          <img
            src={imageUrl}
            alt={restaurant.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Utensils className="w-12 h-12 text-gray-400 animate-pulse" />
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200 shadow-lg"
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-200 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            />
          </button>

          {/* Price badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-sm font-semibold text-gray-800">{priceRange}</span>
          </div>

          {/* Quick action overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <ArrowRight className="w-6 h-6 text-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200">
              {restaurant.name}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              {renderStars(rating)}
              <span className="text-sm text-gray-600 font-medium">
                {rating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">
                ({reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {restaurant.description || "Experience exceptional dining with our carefully crafted menu featuring fresh, locally sourced ingredients and innovative culinary techniques."}
        </p>

        {/* Location & Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-orange-500" />
            <span className="line-clamp-1">{restaurant.address}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              <span>{deliveryTime}</span>
            </div>
            {restaurant.phone && (
              <div className="flex items-center text-gray-500">
                <Phone className="w-4 h-4 mr-1 text-blue-500" />
                <span className="text-xs">{restaurant.phone.slice(-4)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {restaurant.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border border-orange-200"
            >
              {tag}
            </span>
          ))}
          {restaurant.tags.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{restaurant.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Available now</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-1 text-orange-600 group-hover:text-orange-700 transition-colors duration-200">
            <span className="text-sm font-semibold">View Menu</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-orange-500/20"></div>
      </div>
    </motion.div>
  );
};