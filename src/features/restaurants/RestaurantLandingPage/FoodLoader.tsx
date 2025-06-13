import React from 'react';
import { GiKnifeFork } from 'react-icons/gi';

const FoodLoader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10 space-y-4">
      <div className="relative w-20 h-20">
        {/* Outer Spinner with Gradient */}
        <div className="absolute top-0 left-0 w-full h-full border-[5px] border-t-transparent border-b-transparent border-l-orange-400 border-r-orange-600 rounded-full animate-spin shadow-lg"></div>

        {/* Inner Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl text-orange-600 animate-pulse drop-shadow-md">
          <GiKnifeFork />
        </div>
      </div>

      {/* Loading Text */}
      <p className="text-gray-600 text-sm font-medium tracking-wide animate-pulse">
        Fetching delicious food for you...
      </p>
    </div>
  );
};

export default FoodLoader;
