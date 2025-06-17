// components/MenuList.tsx
import React, { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard"; // Make sure the path is correct
import { useParams } from "react-router-dom";
import axios from "axios";
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  restaurantId:string
}

const MenuList: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { id: restaurantId } = useParams(); // Renamed 'id' to 'restaurantId' for clarity


useEffect(() => {
  const fetchMenu = async () => {
    const token = localStorage.getItem("accessToken"); // Or get it from Redux/context if needed

    if (!restaurantId) return;
    if (!token) {
      console.warn("No access token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3005/restaurant/${restaurantId}/menu`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Pass the token here
          },
        }
      );

      const data = response.data;
      if (Array.isArray(data.menuItems)) {
        setMenuItems(data.menuItems);
      } else if (Array.isArray(data)) {
        setMenuItems(data);
      } else {
        console.warn("Unexpected API response format:", data);
        setMenuItems([]);
      }
    } catch (err) {
      console.error("Failed to fetch menu:", err);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  fetchMenu();
}, [restaurantId]);
// Dependency array should include restaurantId
 
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
          imageUrl={item.imageUrl} 
          restaurantId={item.restaurantId}// Changed from 'image' to 'imageUrl' to match prop name
          // --- PASS THE RESTAURANT ID HERE ---
        />
      ))}
    </div>
  );
};

export default MenuList;