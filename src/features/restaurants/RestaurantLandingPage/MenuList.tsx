// components/MenuList.tsx
import React, { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard"; // Make sure the path is correct
import { useParams } from "react-router-dom";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
}

const MenuList: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { id: restaurantId } = useParams(); // Renamed 'id' to 'restaurantId' for clarity

  useEffect(() => {
    // Using restaurantId in the fetch URL
    fetch(`http://localhost:3005/restaurant/683d7adf339b913562146f00/menu`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.menuItems)) {
          setMenuItems(data.menuItems);
        } else if (Array.isArray(data)) {
          setMenuItems(data);
        } else {
          console.warn(
            "API response for menu items was not an array or did not contain a 'menuItems' array:",
            data
          );
          setMenuItems([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
        setLoading(false);
      });
  }, [restaurantId]); // Dependency array should include restaurantId

  if (loading) {
    return <p className="text-center mt-8">Loading menu...</p>;
  }

  if (menuItems.length === 0) {
    return (
      <p className="text-center mt-8">No menu items found for this restaurant.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {menuItems.map((item) => (
        <MenuItemCard
          key={item._id}
          id={item._id} // This is the menu item's ID
          name={item.name}
          description={item.description}
          price={item.price}
          imageUrl={item.imageUrl} // Changed from 'image' to 'imageUrl' to match prop name
          // --- PASS THE RESTAURANT ID HERE ---
        />
      ))}
    </div>
  );
};

export default MenuList;

