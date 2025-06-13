// import React from 'react';
// import { FaWifi, FaCreditCard, FaParking, FaUtensils, FaLeaf, FaClock } from 'react-icons/fa';

// interface Highlight {
//   icon: React.ReactNode;
//   label: string;
// }

// const highlights: Highlight[] = [
//   { icon: <FaLeaf className="text-green-600" />, label: 'Pure Veg' },
//   { icon: <FaClock className="text-yellow-500" />, label: 'Open Now' },
//   { icon: <FaUtensils className="text-red-500" />, label: 'Indoor Seating' },
//   { icon: <FaWifi className="text-blue-500" />, label: 'Free Wi-Fi' },
//   { icon: <FaCreditCard className="text-purple-500" />, label: 'Accepts Cards' },
//   { icon: <FaParking className="text-gray-700" />, label: 'Parking Available' },
// ];

// const RestaurantHighlights: React.FC = () => {
//   return (
//     <div className="my-6">
//       <h3 className="text-lg font-semibold mb-4">Restaurant Highlights</h3>
//       <div className="flex flex-wrap gap-4">
//         {highlights.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md shadow-sm text-sm"
//           >
//             {item.icon}
//             <span>{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RestaurantHighlights;
import React from 'react';
import {
  FaWifi,
  FaCreditCard,
  FaParking,
  FaUtensils,
  FaLeaf,
  FaClock,
} from 'react-icons/fa';

interface Highlight {
  key: string;
  icon: React.ReactNode;
  label: string;
}

const ALL_HIGHLIGHTS: Highlight[] = [
  { key: 'veg', icon: <FaLeaf className="text-green-600" />, label: 'Pure Veg' },
  { key: 'open', icon: <FaClock className="text-yellow-500" />, label: 'Open Now' },
  { key: 'indoor', icon: <FaUtensils className="text-orange-500" />, label: 'Indoor Seating' },
  { key: 'wifi', icon: <FaWifi className="text-blue-500" />, label: 'Free Wi-Fi' },
  { key: 'cards', icon: <FaCreditCard className="text-purple-500" />, label: 'Accepts Cards' },
  { key: 'parking', icon: <FaParking className="text-gray-700" />, label: 'Parking Available' },
];

interface RestaurantHighlightsProps {
  features: string[]; 
}

const RestaurantHighlights: React.FC<RestaurantHighlightsProps> = ({ features }) => {
  const activeHighlights = ALL_HIGHLIGHTS.filter((highlight) =>
    features.includes(highlight.key)
  );

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-4">Restaurant Highlights</h3>
      <div className="flex flex-wrap gap-4">
        {activeHighlights.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md shadow-sm text-sm"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantHighlights;
