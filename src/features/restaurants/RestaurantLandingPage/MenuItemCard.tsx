import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../../redux/slice/cartSlice";
import { type RootState } from "../../../redux/store";

interface MenuItemCardProps {
  id: string; // This is the menu item ID
  name: string;
  price: number;
  description: string;
  imageUrl: string; // Ensure this matches the prop name passed from MenuList
  restaurantId: string; // This prop is now passed from MenuList
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id, // menu item ID
  name,
  price,
  description,
  imageUrl,
  restaurantId, // Restaurant ID received
}) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id)
  );

  const handleAdd = () => {
    // Pass restaurantId to addToCart action
    dispatch(addToCart({ id, name, price, image: imageUrl, quantity: 1, restaurantId }));
  };

  const increaseQty = () => {
    dispatch(updateQuantity({ id, delta: 1 }));
  };

  const decreaseQty = () => {
    if (cartItem?.quantity === 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, delta: -1 }));
    }
  };

  console.log(imageUrl)

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {imageUrl && (
        <div className="relative">
          <img
            src={imageUrl}
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
          {/* Price text color changed to orange-600 */}
          <span className="text-lg text-orange-600 font-bold">₹{price.toFixed(2)}</span>

          {!cartItem ? (
            <button
              onClick={handleAdd}
              // --- Orange theme for Add to Cart button ---
              className="bg-orange-500 text-white text-sm px-4 py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={decreaseQty}
                // --- Orange theme for decrease button ---
                className="px-3 py-1 text-orange-600 hover:text-orange-800"
              >
                −
              </button>
              <span className="px-4 font-medium text-gray-700">
                {cartItem.quantity}
              </span>
              <button
                onClick={increaseQty}
                // --- Orange theme for increase button (adjusted for harmony) ---
                className="px-3 py-1 text-green-600 hover:text-green-800" // Kept green for "add" as it signifies positive action, but you can change to orange if preferred.
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