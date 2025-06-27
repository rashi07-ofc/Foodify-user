// types/index.ts

export type PaymentMethod = "online" | "cashOnDelivery";

export interface DeliveryAddress {
  // Client-side 'id' for mapping to backend '_id' for convenience,
  // optional because it's not present when creating new addresses.
  id?: string;
  user_id?: string; // User ID, likely set by the backend based on authentication
  label?: "Office" | "Home" | "Other" | string; // Address label, allow custom string for 'Other'
  house_no?: string; // House/Flat number, optional
  address_location_1: string; // Required: Main street address line
  address_location_2?: string; // Optional: Secondary street address line
  postal_code: number; // Required: Postal code, must be a number
  city: string; // Required: City
  country: string; // Required: Country
  latitude?: number; // Optional: Latitude for geolocation
  longitude?: number; // Optional: Longitude for geolocation
  // Backend-generated fields (do not include in requests, only present in responses):
  // createdAt?: string;
  // updatedAt?: string;
  // __v?: number;
}

// This interface represents an address as returned from your backend API,
// where '_id' is guaranteed to be present. Use this when fetching addresses.
export interface Address {
  _id: string; // The unique ID from the backend
  label: string; // Label will be present from backend
  house_no: string;
  address_location_1: string;
  address_location_2?: string;
  city: string;
  postal_code: number;
  country: string;
  latitude: number;
  longitude: number;
  user_id: string; // Likely also present on backend response
  createdAt: string; // Assuming these are always present on backend response
  updatedAt: string;
  __v: number;
}


export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  country: string;
  image?: string;
}

// Add a placeholder for OrderData based on your PlaceOrderPage.tsx usage
// You'll need to expand this based on your actual cart/order structure
export interface OrderData {
  deliveryAddress: DeliveryAddress; // The selected delivery address
  paymentMethod: PaymentMethod;    // The chosen payment method
  // Add other properties like:
  // items: CartItem[]; // Array of items in the order
  // totalAmount: number;
  // orderDate: string;
  // status: "pending" | "confirmed" | "delivered" | "cancelled";
  // etc.
}