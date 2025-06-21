import React, { useState } from "react";
import { getAuthToken } from "../../auth/authService";
import axios from "axios";

interface MenuItemCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  restaurantId: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
  restaurantId,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const accessToken = getAuthToken();
  console.log(accessToken);

  const handleAdd = async () => {
    console.log("adding api");
    const url = "http://localhost:3002/cart/add";

    try {
      const response = await axios.post(
        url,
        {
          restaurantId,
          itemId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setQuantity((prev) => prev + 1);
      console.log("jhsiufg");
      console.log("cartid dekho", response.data._id);
      localStorage.setItem("cartId", response.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = async () => {
    const url = "http://localhost:3002/cart/add";

    try {
      const response = await axios.post(
        url,
        { restaurantId, itemId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setQuantity((prev) => prev + 1);
      console.log("Quantity increased");
      console.log("cartid dekho", response.data);
    } catch (error) {
      console.error("Increase quantity API error:", error);
      console.error("Failed to increase quantity bhjfg");
    }
  };

  const decreaseQty = async () => {
    const url = "http://localhost:3002/cart/remove";

    try {
      const response = await axios.post(
        url,
        { itemId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setQuantity((prev) => (prev === 1 ? 0 : prev - 1));
      console.log("Quantity decreased");
    } catch (error) {
      console.error("Decrease quantity API error:", error);
      console.error("Failed to decrease quantity");
    }
  };

  const globalImages = [
    "https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_960_720.jpg",
    "https://eastindianrecipes.net/wp-content/uploads/2022/09/How-to-Make-North-Indian-Thali-Vegetarian-7.jpg",
    "https://c4.wallpaperflare.com/wallpaper/969/527/616/pizza-wallpaper-preview.jpg",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {imageUrl && (
        <div className="relative">
          <img
            src={globalImages[0]}
            alt={name}
            loading="lazy"
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h4 className="text-xl font-semibold text-gray-800 mb-1">{name}</h4>
        <p className="text-gray-600 text-sm mb-3">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-lg text-orange-600 font-bold">
            ₹{price.toFixed(2)}
          </span>

          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="bg-orange-500 text-white text-sm px-4 py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 text-orange-600 hover:text-orange-800"
              >
                −
              </button>
              <span className="px-4 font-medium text-gray-700">{quantity}</span>
              <button
                onClick={increaseQty}
                className="px-3 py-1 text-green-600 hover:text-green-800"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
