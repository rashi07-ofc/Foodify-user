// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToCart,
//   updateQuantity,
//   removeFromCart,
// } from "../../../redux/slice/cartSlice";
// import { type RootState } from "../../../redux/store";

// interface MenuItemCardProps {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   restaurantId: string;
// }

// const MenuItemCard: React.FC<MenuItemCardProps> = ({
//   id,
//   name,
//   price,
//   description,
//   imageUrl,
//   restaurantId,
// }) => {
//   const dispatch = useDispatch();

//   const cartItem = useSelector((state: RootState) =>
//     state.cart.items.find((item) => item.id === id)
//   );

//   const handleAdd = () => {
//     // API Call to Add
//     fetch("/api/cart/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id,
//         name,
//         price,
//         image: imageUrl,
//         quantity: 1,
//         restaurantId,
//       }),
//     }).catch((err) => console.error("Add to cart API error:", err));

//     dispatch(
//       addToCart({ id, name, price, image: imageUrl, quantity: 1, restaurantId })
//     );
//   };

//   const increaseQty = () => {
//     // API Call to update quantity (+1)
//     fetch("/api/cart/update", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id, delta: 1 }),
//     }).catch((err) => console.error("Increase quantity API error:", err));

//     dispatch(updateQuantity({ id, delta: 1 }));
//   };

//   const decreaseQty = () => {
//     if (cartItem?.quantity === 1) {
//       // API Call to remove item
//       fetch("/api/cart/remove", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id }),
//       }).catch((err) => console.error("Remove from cart API error:", err));

//       dispatch(removeFromCart(id));
//     } else {
//       // API Call to update quantity (-1)
//       fetch("/api/cart/update", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id, delta: -1 }),
//       }).catch((err) => console.error("Decrease quantity API error:", err));

//       dispatch(updateQuantity({ id, delta: -1 }));
//     }
//   };

//   const globalImages = [
//     "https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_960_720.jpg",
//     "https://eastindianrecipes.net/wp-content/uploads/2022/09/How-to-Make-North-Indian-Thali-Vegetarian-7.jpg",
//     "https://c4.wallpaperflare.com/wallpaper/969/527/616/pizza-wallpaper-preview.jpg",
//   ];

//   const getRandomImage = () =>
//     globalImages[Math.floor(Math.random() * globalImages.length)];

//   const imgToShow = getRandomImage();

//   return (
//     <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
//       {imageUrl && (
//         <div className="relative">
//           <img
//             src={imgToShow}
//             alt={name}
//             loading="lazy"
//             className="w-full h-48 object-cover"
//           />
//         </div>
//       )}

//       <div className="p-4">
//         <h4 className="text-xl font-semibold text-gray-800 mb-1">{name}</h4>
//         <p className="text-gray-600 text-sm mb-3">{description}</p>

//         <div className="flex justify-between items-center">
//           <span className="text-lg text-orange-600 font-bold">
//             ₹{price.toFixed(2)}
//           </span>

//           {!cartItem ? (
//             <button
//               onClick={handleAdd}
//               className="bg-orange-500 text-white text-sm px-4 py-2 rounded hover:bg-orange-600 transition-colors"
//             >
//               Add to Cart
//             </button>
//           ) : (
//             <div className="flex items-center border rounded-md overflow-hidden">
//               <button
//                 onClick={decreaseQty}
//                 className="px-3 py-1 text-orange-600 hover:text-orange-800"
//               >
//                 −
//               </button>
//               <span className="px-4 font-medium text-gray-700">
//                 {cartItem.quantity}
//               </span>
//               <button
//                 onClick={increaseQty}
//                 className="px-3 py-1 text-green-600 hover:text-green-800"
//               >
//                 +
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuItemCard;
import React, { useEffect, useState } from "react";
import { getAuthToken } from "../../auth/authService";

interface MenuItemCardProps {
  id: string; // This is the menu item ID
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  restaurantId: string;
}

// const MenuItemCard: React.FC<MenuItemCardProps> = ({
//   id,
//   name,
//   price,
//   description,
//   imageUrl,
//   restaurantId,
// }) => {
//   const userId = "684fac7d6f272b68f7f68792";
//   const [quantity, setQuantity] = useState<number>(0);
//   console.log("useris", userId);
//   console.log("restarujd", restaurantId);
//     console.log("item id",id );

//   const handleAdd = () => {
//     const url = `http://localhost:3002/cart/add/${userId}/${restaurantId}/${id}`;
//     fetch(url, { method: "POST" })
//       .then(() => setQuantity(1))
//       .catch((err) => console.error("Add to cart API error:", err));
//   };

//   const increaseQty = () => {
//     const url = `http://localhost:3002/cart/add/${userId}/${restaurantId}/${id}`;
//     fetch(url, { method: "POST" })
//       .then(() => setQuantity((prev) => prev + 1))
//       .catch((err) => console.error("Increase quantity API error:", err));
//   };

//   const decreaseQty = () => {
//     if (quantity === 1) {
//       const url = `http://localhost:3002/cart/remove/${userId}/${id}`;
//       fetch(url, { method: "DELETE" })
//         .then(() => setQuantity(0))
//         .catch((err) => console.error("Remove from cart API error:", err));
//     } else {
//       const url = `http://localhost:3002/cart/add/${userId}/${restaurantId}/${id}`;
//       fetch(url, { method: "POST" })
//         .then(() => setQuantity((prev) => prev - 1))
//         .catch((err) => console.error("Decrease quantity API error:", err));
//     }
//   };

// In MenuItemCard.tsx
// ... (imports and props)

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id, // menu item ID
  name,
  price,
  description,
  imageUrl,
  restaurantId
}) => {
  // It's better to fetch userId from context or global state if available,
  // hardcoding it here is not ideal for a real application.
  // const userId = "684fac7d6f272b68f7f68792";
  const [quantity, setQuantity] = useState<number>(0);
    const accessToken = getAuthToken(); // or use getAuthToken()

  // const [resId, setResId] = useState<number>(0);

  // Effect to fetch initial quantity from the cart on component mount
  // You'll need an API to get the current cart state for the user
  // useEffect(() => {
  //   const fetchCartItemQuantity = async () => {
  //     try {
  //       // This is a hypothetical endpoint. You need an API like:
  //       // GET /cart/:userId/item/:itemId
  //       // or a general GET /cart/:userId that returns all cart items
  //       const response = await fetch(`http://localhost:3002/cart/`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         // Assuming your API returns the quantity for this specific item,
  //         // or you iterate through a full cart response.
  //         setQuantity(data.quantity || 0);
  //         // setResId(data.restaurantId)
  //         // setResId(data.restaurantId); // Adjust based on actual API response
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch initial cart quantity:", error);
  //     }
  //   };
  //   fetchCartItemQuantity();
  // }, [id]); // Re-fetch if userId or itemId changes

const handleAdd = () => {

  const url = `http://localhost:3002/cart/add/${restaurantId}/${id}`;
  console.log(accessToken)
  fetch(url, {
    method: "POST",
     headers: { 'Authorization': `Bearer ${accessToken}` }     
  })
    .then((res) => {
      if (res.ok) {
        setQuantity((prev) => prev + 1);
      } else {
        console.error("Failed to add to cart");
      }
    })
    .catch((err) => console.error("Add to cart API error:", err));
};

const increaseQty = () => {
  const url = `http://localhost:3002/cart/add/${restaurantId}/${id}`;
  fetch(url, {
    method: "POST",
     headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      if (res.ok) {
        setQuantity((prev) => prev + 1);
      } else {
        console.error("Failed to increase quantity");
      }
    })
    .catch((err) => console.error("Increase quantity API error:", err));
};


  const decreaseQty = () => {
    if (quantity === 1) {
      const url = `http://localhost:3002/cart/remove/${id}`; // DELETE for removing the item entirely
      fetch(url, {
        method: "DELETE",
        headers: {
                "Authorization": `Bearer ${accessToken}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({itemId: id }), // Send userId and itemId
      })
        .then((res) => {
          if (res.ok) {
            setQuantity(0);
          } else {
            console.error("Failed to remove from cart");
          }
        })
        .catch((err) => console.error("Remove from cart API error:", err));
    } else {
      const url = `http://localhost:3002/cart/remove/${id}`; // DELETE for removing the item entirely
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: id,
          delta: -1, // Indicate a decrement
        }),
      })
        .then((res) => {
          if (res.ok) {
            setQuantity((prev) => prev - 1);
          } else {
            console.error("Failed to decrease quantity");
          }
        })
        .catch((err) => console.error("Decrease quantity API error:", err));
    }
  };


  const globalImages = [
    "https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_960_720.jpg",
    "https://eastindianrecipes.net/wp-content/uploads/2022/09/How-to-Make-North-Indian-Thali-Vegetarian-7.jpg",
    "https://c4.wallpaperflare.com/wallpaper/969/527/616/pizza-wallpaper-preview.jpg",
  ];

  const getRandomImage = () =>
    globalImages[Math.floor(Math.random() * globalImages.length)];

  const imgToShow = getRandomImage();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {imageUrl && (
        <div className="relative">
          <img
            src={imgToShow}
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
