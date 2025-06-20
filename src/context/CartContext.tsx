// import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
// import { getAuthToken } from "../features/auth/authService";

// interface CartItem {
//   itemId: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
// }

// interface CartData {
//   items: CartItem[];
//   restaurantId: string;
//   itemTotal: number;
//   tax: number;
//   platformFee: number;
//   deliveryCharges: number;
//   discount: number;
// }

// interface CartContextType {
//   cart: CartData | null;
//   fetchCart: () => void;
//   updateItemQuantity: (itemId: string, delta: number, restaurantId: string) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartData | null>(null);
//   const token = getAuthToken();

//   const fetchCart = useCallback(async () => {
//     if (!token) {
//       setCart(null);
//       return;
//     }
//     try {
//       const response = await fetch("http://localhost:3002/cart/get", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setCart(data);
//       } else {
//         setCart(null);
//       }
//     } catch (err) {
//       console.error("Cart fetch error:", err);
//       setCart(null);
//     }
//   }, [token]);

//   const updateItemQuantity = useCallback(
//     async (itemId: string, delta: number, restaurantId: string) => {
//       if (!token) return;

//       try {
//         let url = "";
//         let options: RequestInit = {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         if (delta > 0) {
//           url = `http://localhost:3002/cart/add/${restaurantId}/${itemId}`;
//           // no body needed for add
//         } else {
//           url = `http://localhost:3002/cart/remove/${itemId}`;
//           options.headers = {
//             ...options.headers,
//             "Content-Type": "application/json",
//           };
//           options.body = JSON.stringify({ itemId, delta }); // send delta negative
//         }

//         const response = await fetch(url, options);
//         if (response.ok) {
//           fetchCart();
//         } else {
//           console.error("Failed to update cart item quantity");
//         }
//       } catch (err) {
//         console.error("Update cart error:", err);
//       }
//     },
//     [token, fetchCart]
//   );

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   return (
//     <CartContext.Provider value={{ cart, fetchCart, updateItemQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CartItem {
  itemId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updateItemQuantity: (itemId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // helper to update or remove items by quantity
  const updateItemQuantity = (itemId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.itemId !== itemId);
      }
      const exists = prev.find((item) => item.itemId === itemId);
      if (exists) {
        return prev.map((item) =>
          item.itemId === itemId ? { ...item, quantity } : item
        );
      } else {
        return [...prev, { itemId, quantity }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ items, setItems, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
