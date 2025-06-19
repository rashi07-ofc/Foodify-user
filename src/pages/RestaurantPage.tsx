// // // import React from "react";
// // // import { useAppSelector } from "../hooks/useAppDispatch";
// // // import { useParams } from "react-router-dom";

// // // const RestaurantPage: React.FC = () => {
// // //   const { id } = useParams();
// // //   const selected = useAppSelector((state) => state.search.selectedRestaurant);

// // //   if (!selected || selected._id !== id) {
// // //     return <p className="text-center mt-10 text-gray-500">Loading...</p>;
// // //   }

// // //   return (
// // //     <div className="max-w-4xl mx-auto px-4 py-8">
// // //       <img
// // //         src="https://via.placeholder.com/800x400"
// // //         alt={selected.name}
// // //         className="w-full rounded-lg shadow mb-6"
// // //       />
// // //       <h1 className="text-3xl font-bold mb-2">{selected.name}</h1>
// // //       <p className="text-gray-600 mb-4">{selected.description}</p>
// // //       <p className="text-gray-700">Address: {selected.address}</p>
// // //       <p className="text-gray-700">Phone: {selected.phone}</p>
// // //       <div className="mt-4 flex gap-2 flex-wrap">
// // //         {selected.tags.map((tag, i) => (
// // //           <span
// // //             key={i}
// // //             className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm"
// // //           >
// // //             {tag}
// // //           </span>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default RestaurantPage;


// // import React from "react";
// // import { useAppSelector } from "../hooks/useAppDispatch";
// // import { useParams } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { useLocation } from "react-router-dom";
// // import type { PublicRestaurant } from "../types/types";

// // const RestaurantPage: React.FC = () => {
// //   const { id } = useParams();
// // const location = useLocation();
// // const routeState = location.state as { restaurant?: PublicRestaurant } | null;
// // const restaurantFromState = routeState?.restaurant;
// // console.log(restaurantFromState)
// // const selected = useAppSelector((state) => state.search.selectedRestaurant) || restaurantFromState;
// // // const selected = useAppSelector((state) => state.search.selectedRestaurant) || routeState?.restaurant;

// // console.log(selected);
// // if (!selected || selected._id !== id) {
// //   return (
// //     <div className="flex items-center justify-center min-h-screen">
// //       <p className="text-lg font-medium text-gray-600 animate-pulse">Loading...</p>
// //     </div>
// //   );
// // }


// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 40 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.4 }}
// //       className="max-w-4xl mx-auto px-4 py-8 mt-20 bg-white rounded-2xl shadow-md"
// //     >
// //       <h1 className="text-3xl font-bold mb-4 text-gray-800">{selected.name}</h1>
// //       <p className="text-gray-600 mb-6">{selected.description}</p>

// //       <div className="space-y-2 text-gray-700">
// //         <p><span className="font-semibold">Address:</span> {selected.address}</p>
// //         <p><span className="font-semibold">Phone:</span> {selected.phone}</p>
// //       </div>

// //       <div className="mt-6 flex flex-wrap gap-2">
// //         {selected.tags.map((tag, i) => (
// //           <span
// //             key={i}
// //             className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
// //           >
// //             {tag}
// //           </span>
// //         ))}
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default RestaurantPage;


// import React, { useState } from "react";
// import { useAppSelector } from "../hooks/useAppDispatch";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useLocation } from "react-router-dom";
// import type { PublicRestaurant } from "../types/types";
// import { 
//   Star, 
//   MapPin, 
//   Phone, 
//   Clock, 
//   Users, 
//   Wifi, 
//   Car, 
//   CreditCard,
//   ChevronLeft,
//   ChevronRight,
//   Heart
// } from "lucide-react";

// const RestaurantPage: React.FC = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const routeState = location.state as { restaurant?: PublicRestaurant } | null;
//   const restaurantFromState = routeState?.restaurant;
//   const selected = useAppSelector((state) => state.search.selectedRestaurant) || restaurantFromState;
  
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // Dummy data for enhanced features
// const dummyImages = [
//   "https://source.unsplash.com/800x400/?restaurant",
//   "https://source.unsplash.com/800x400/?food",
//   "https://source.unsplash.com/800x400/?dining",
//   "https://source.unsplash.com/800x400/?meal"
// ];


//   const dummyReviews = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       rating: 5,
//       comment: "Amazing food and excellent service! The ambiance is perfect for a romantic dinner.",
//       date: "2 days ago"
//     },
//     {
//       id: 2,
//       name: "Mike Chen",
//       rating: 4,
//       comment: "Great location and delicious food. The staff was very friendly and accommodating.",
//       date: "1 week ago"
//     },
//     {
//       id: 3,
//       name: "Emma Davis",
//       rating: 5,
//       comment: "Best restaurant in the area! Fresh ingredients and creative menu. Highly recommended!",
//       date: "2 weeks ago"
//     }
//   ];

//   const dummyMenuItems = [
//     {
//       id: 1,
//       name: "Grilled Salmon",
//       description: "Fresh Atlantic salmon with herbs and lemon butter sauce",
//       price: "$28.99",
//       category: "Main Course"
//     },
//     {
//       id: 2,
//       name: "Truffle Pasta",
//       description: "Handmade pasta with truffle oil, mushrooms, and parmesan",
//       price: "$24.99",
//       category: "Main Course"
//     },
//     {
//       id: 3,
//       name: "Caesar Salad",
//       description: "Fresh romaine lettuce with our signature caesar dressing",
//       price: "$12.99",
//       category: "Appetizer"
//     },
//     {
//       id: 4,
//       name: "Chocolate Soufflé",
//       description: "Rich chocolate soufflé with vanilla ice cream",
//       price: "$9.99",
//       category: "Dessert"
//     }
//   ];

//   const amenities = [
//     { icon: Wifi, label: "Free WiFi" },
//     { icon: Car, label: "Parking Available" },
//     { icon: CreditCard, label: "Cards Accepted" },
//     { icon: Users, label: "Family Friendly" }
//   ];

//   if (!selected || selected._id !== id) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
//           <p className="text-lg font-medium text-gray-600">Loading restaurant details...</p>
//         </div>
//       </div>
//     );
//   }

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % dummyImages.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + dummyImages.length) % dummyImages.length);
//   };

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//         }`}
//       />
//     ));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-6xl mx-auto px-4 mt-16"
//       >
//         {/* Image Gallery */}
//         <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
//           <div className="relative h-96 bg-gray-200">
//             <img
//               src={dummyImages[currentImageIndex]}
//               alt={`${selected.name} - Image ${currentImageIndex + 1}`}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            
//             {/* Navigation Buttons */}
//             <button
//               onClick={prevImage}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-lg"
//             >
//               <ChevronLeft className="w-6 h-6 text-gray-800" />
//             </button>
//             <button
//               onClick={nextImage}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 shadow-lg"
//             >
//               <ChevronRight className="w-6 h-6 text-gray-800" />
//             </button>

//             {/* Favorite Button */}
//             <button
//               onClick={() => setIsFavorite(!isFavorite)}
//               className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200 shadow-lg"
//             >
//               <Heart
//                 className={`w-6 h-6 ${
//                   isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
//                 }`}
//               />
//             </button>

//             {/* Image Indicators */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//               {dummyImages.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentImageIndex(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-200 ${
//                     index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Restaurant Header */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="bg-white rounded-2xl shadow-lg p-8"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h1 className="text-4xl font-bold text-gray-900 mb-2">{selected.name}</h1>
//                   <div className="flex items-center space-x-2 mb-3">
//                     <div className="flex items-center">
//                       {renderStars(4)}
//                       <span className="ml-2 text-sm text-gray-600">4.5 (324 reviews)</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-2xl font-bold text-green-600">$$</span>
//                   <p className="text-sm text-gray-500">Price Range</p>
//                 </div>
//               </div>
              
//               <p className="text-gray-700 text-lg leading-relaxed mb-6">
//                 {selected.description || "Experience exceptional dining in our elegant restaurant featuring contemporary cuisine, fresh local ingredients, and impeccable service in a warm, inviting atmosphere perfect for any occasion."}
//               </p>

//               {/* Tags */}
//               <div className="flex flex-wrap gap-2">
//                 {selected.tags.map((tag, i) => (
//                   <span
//                     key={i}
//                     className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium border border-orange-200 hover:shadow-md transition-shadow duration-200"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Menu Preview */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//               className="bg-white rounded-2xl shadow-lg p-8"
//             >
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Menu Items</h2>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {dummyMenuItems.map((item) => (
//                   <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="font-semibold text-gray-900">{item.name}</h3>
//                       <span className="text-orange-600 font-bold">{item.price}</span>
//                     </div>
//                     <p className="text-gray-600 text-sm mb-2">{item.description}</p>
//                     <span className="text-xs text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
//                       {item.category}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Reviews */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.6, duration: 0.5 }}
//               className="bg-white rounded-2xl shadow-lg p-8"
//             >
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
//               <div className="space-y-6">
//                 {dummyReviews.map((review) => (
//                   <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-semibold">
//                           {review.name.charAt(0)}
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">{review.name}</h4>
//                           <div className="flex items-center space-x-2">
//                             <div className="flex">{renderStars(review.rating)}</div>
//                             <span className="text-sm text-gray-500">{review.date}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <p className="text-gray-700">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Contact Info */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//               className="bg-white rounded-2xl shadow-lg p-6"
//             >
//               <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-3">
//                   <MapPin className="w-5 h-5 text-orange-500" />
//                   <div>
//                     <p className="font-medium text-gray-900">Address</p>
//                     <p className="text-gray-600 text-sm">{selected.address}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Phone className="w-5 h-5 text-orange-500" />
//                   <div>
//                     <p className="font-medium text-gray-900">Phone</p>
//                     <p className="text-gray-600 text-sm">{selected.phone}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Clock className="w-5 h-5 text-orange-500" />
//                   <div>
//                     <p className="font-medium text-gray-900">Hours</p>
//                     <p className="text-gray-600 text-sm">Mon-Sun: 11:00 AM - 10:00 PM</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Amenities */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//               className="bg-white rounded-2xl shadow-lg p-6"
//             >
//               <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {amenities.map((amenity, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     <amenity.icon className="w-5 h-5 text-orange-500" />
//                     <span className="text-sm text-gray-700">{amenity.label}</span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default RestaurantPage;

import React, { useState } from "react";
import { useAppSelector } from "../hooks/useAppDispatch";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import type { PublicRestaurant } from "../types/types";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  Users,
  Wifi,
  Car,
  CreditCard,
  Heart
} from "lucide-react";

const RestaurantPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const routeState = location.state as { restaurant?: PublicRestaurant } | null;
  const restaurantFromState = routeState?.restaurant;
  const selected = useAppSelector((state) => state.search.selectedRestaurant) || restaurantFromState;

  const [isFavorite, setIsFavorite] = useState(false);

  // Dummy data for enhanced features
  const restaurantImage = "https://source.unsplash.com/800x400/?restaurant-interior"; // Single relevant image

  const dummyReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing food and excellent service! The ambiance is perfect for a romantic dinner.",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      comment: "Great location and delicious food. The staff was very friendly and accommodating.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      comment: "Best restaurant in the area! Fresh ingredients and creative menu. Highly recommended!",
      date: "2 weeks ago"
    }
  ];

  const dummyMenuItems = [
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with herbs and lemon butter sauce",
      price: "$28.99",
      category: "Main Course"
    },
    {
      id: 2,
      name: "Truffle Pasta",
      description: "Handmade pasta with truffle oil, mushrooms, and parmesan",
      price: "$24.99",
      category: "Main Course"
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with our signature caesar dressing",
      price: "$12.99",
      category: "Appetizer"
    },
    {
      id: 4,
      name: "Chocolate Soufflé",
      description: "Rich chocolate soufflé with vanilla ice cream",
      price: "$9.99",
      category: "Dessert"
    }
  ];

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Car, label: "Parking Available" },
    { icon: CreditCard, label: "Cards Accepted" },
    { icon: Users, label: "Family Friendly" }
  ];

  if (!selected || selected._id !== id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 mt-16"
      >
        {/* Single Restaurant Image */}
        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={restaurantImage}
            alt={selected.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>

          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200 shadow-lg"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Restaurant Header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{selected.name}</h1>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {renderStars(4)}
                      <span className="ml-2 text-sm text-gray-600">4.5 (324 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">$$</span>
                  <p className="text-sm text-gray-500">Price Range</p>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {selected.description || "Experience exceptional dining in our elegant restaurant featuring contemporary cuisine, fresh local ingredients, and impeccable service in a warm, inviting atmosphere perfect for any occasion."}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium border border-orange-200 hover:shadow-md transition-shadow duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Menu Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Menu Items</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {dummyMenuItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <span className="text-orange-600 font-bold">{item.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <span className="text-xs text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
              <div className="space-y-6">
                {dummyReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600 text-sm">{selected.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600 text-sm">{selected.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Hours</p>
                    <p className="text-gray-600 text-sm">Mon-Sun: 11:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <amenity.icon className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-700">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantPage;