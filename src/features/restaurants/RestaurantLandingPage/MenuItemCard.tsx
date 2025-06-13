import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../../redux/slice/cartSlice";
import type { MenuItem } from '../../../data/menuData';
import { type RootState } from "../../../redux/store";



const MenuItemCard: React.FC<MenuItem> = ({
  id,
  name,
  price,
  description,
  image,
}) => {
  const dispatch = useDispatch();

  // Check if this item already exists in the cart
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id)
  );

  // Add a new item to the cart with quantity 1
  const handleAdd = () => {
    dispatch(addToCart({ id, name, price, image, quantity: 1 }));
  };

  // Increase item quantity in the cart
  const increaseQty = () => {
    dispatch(updateQuantity({ id, delta: 1 }));
  };

  // Decrease item quantity; remove if quantity reaches 0
  const decreaseQty = () => {
    if (cartItem?.quantity === 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, delta: -1 }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Optional Image Section */}
      {image && (
        <div className="relative">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Menu Item Details */}
      <div className="p-4">
        <h4 className="text-xl font-semibold text-gray-800 mb-1">{name}</h4>
        <p className="text-gray-600 text-sm mb-3">{description}</p>

        <div className="flex justify-between items-center">
          {/* Price */}
          <span className="text-lg text-orange-600 font-bold">
            ₹{price.toFixed(2)}
          </span>

          {/* Cart Controls */}
          {!cartItem ? (
            // Button to add item if not already in cart
            <button
              onClick={handleAdd}
              className="bg-orange-500 text-white text-sm px-4 py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            // Quantity control buttons (− / qty / +)
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 text-orange-600 hover:text-orange-800"
              >
                −
              </button>
              <span className="px-4 font-medium text-gray-700">
                {cartItem.quantity}
              </span>
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
