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
  {
    key: 'veg',
    icon: <FaLeaf className="text-orange-500" />,
    label: 'Pure Veg',
  },
  {
    key: 'open',
    icon: <FaClock className="text-orange-400" />,
    label: 'Open Now',
  },
  {
    key: 'indoor',
    icon: <FaUtensils className="text-orange-500" />,
    label: 'Indoor Seating',
  },
  {
    key: 'wifi',
    icon: <FaWifi className="text-orange-300" />,
    label: 'Free Wi-Fi',
  },
  {
    key: 'cards',
    icon: <FaCreditCard className="text-orange-500" />,
    label: 'Accepts Cards',
  },
  {
    key: 'parking',
    icon: <FaParking className="text-orange-400" />,
    label: 'Parking Available',
  },
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
      <h3 className="text-lg font-semibold text-orange-600 mb-4">
        Restaurant Highlights
      </h3>
      <div className="flex flex-wrap gap-4">
        {activeHighlights.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-orange-50 text-orange-800 px-4 py-2 rounded-md shadow-sm text-sm"
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
