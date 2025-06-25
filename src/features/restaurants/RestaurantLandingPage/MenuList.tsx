import React, { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../../auth/authService";
import FoodLoader from "./FoodLoader";
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  restaurantId: string;
}

const MenuList: React.FC = () => {
  const token=getAuthToken();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { id: restaurantId } = useParams();

  useEffect(() => {
    const fetchMenu = async () => {
    console.log(token);
    
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
              Authorization: `Bearer ${token}`,
            },
          }
        );
       console.log(response.data);
       
        const data = response.data;  
        if (Array.isArray(data)) {
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


  if (loading) {
    return <p className="text-center mt-8">Loading menu...<FoodLoader/></p>;
  }


  //if no items found from backend
  if (menuItems.length === 0) {
    return (
      <p className="text-center mt-8">
        No menu items found for this restaurant.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {menuItems.map((item) => (
        <MenuItemCard
          key={item._id}
          id={item._id}
          name={item.name}
          description={item.description}
          price={item.price}
          imageUrl={item.imageUrl}
          restaurantId={item.restaurantId}
        />
      ))}
    </div>
  );
};

export default MenuList;
