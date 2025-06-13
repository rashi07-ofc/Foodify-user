import React from 'react';
import { MapPin, Phone, Star, Clock } from 'lucide-react';
import image from '../../../assets/FoodGallary3.jpg'
interface Restaurant {
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  isActive: boolean;
  tags: string[];
  rating?: number;
  openingTime?: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
}

interface RestaurantCardProps {
  restaurant?: Restaurant;
  imageUrl?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ 
  restaurant = {
    _id: "68400c12d4739babc990d3aa",
    name: "Spice Hub",
    description: "Authentic Indian cuisine with a modern twist",
    address: "456 Curry Lane, Taste City",
    phone: "+1987654321",
    isActive: true,
    tags: ["indian", "spicy", "vegetarian"],
    rating: 4.0,
    openingTime: "10:00 AM"
  },
  imageUrl = "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto">
      {/* Restaurant Image */}
      <div className="relative">
        <img 
          src={image} 
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            restaurant.isActive 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {restaurant.isActive ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Restaurant Name */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            {restaurant.name}
          </h2>
          
          {/* Rating */}
          <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-semibold text-gray-800">
              {restaurant.rating || 4.0}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {restaurant.description}
        </p>

        {/* Address */}
        <div className="flex items-start mb-3">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-gray-700 text-sm">
            {restaurant.address}
          </p>
        </div>

        {/* Phone Number */}
        <div className="flex items-center mb-3">
          <Phone className="w-4 h-4 text-gray-400 mr-2" />
          <a 
            // href={tel:${restaurant.phone}}
            className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
          >
            {restaurant.phone}
          </a>
        </div>

        {/* Opening Time */}
        <div className="flex items-center mb-4">
          <Clock className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-gray-700 text-sm">
            Opens at {restaurant.openingTime || "10:00 AM"}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {restaurant.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full border border-orange-200 capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;