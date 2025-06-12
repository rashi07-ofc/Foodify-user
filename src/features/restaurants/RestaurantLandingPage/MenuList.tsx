// components/MenuList.tsx
import React, { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";

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

  useEffect(() => {
    fetch("http://localhost:3005/restaurant/683d7adf339b913562146f00/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-8">Loading menu...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {menuItems.map((item) => (
        <MenuItemCard
          key={item._id}
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.imageUrl}
          tags={item.tags}
        />
      ))}
    </div>
  );
};

export default MenuList;
