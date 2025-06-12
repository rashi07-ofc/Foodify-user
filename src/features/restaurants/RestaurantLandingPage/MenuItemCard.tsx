import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../../redux/slice/cartSlice";
import { type RootState } from "../../../redux/store";

interface MenuItemCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
}) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === id)
  );

  const handleAdd = () => {
    dispatch(addToCart({ id, name, price, image: imageUrl, quantity: 1 }));
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
          <span className="text-lg text-red-600 font-bold">₹{price.toFixed(2)}</span>

          {!cartItem ? (
            <button
              onClick={handleAdd}
              className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 text-red-600 hover:text-red-800"
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
