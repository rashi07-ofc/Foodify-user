// types.ts
export type PaymentMethod = "cashOnDelivery" | "online";

// export interface DeliveryAddress {
//   id: string;
//   fullName: string;
//   phoneNumber: string;
//   streetAddress: string;
//   city: string;
//   zipCode: string;
//   label?: string;
// }


// types/index.ts (Example)

export interface DeliveryAddress {
  _id?: string; // Optional, as it's not present when adding a new address
  user_id?: string; // Optional, will likely be set by backend based on auth
  label?: "Office" | "Home" | "Other" | string; // Matches API labels, allow string for 'Other'
  house_no?: string;
  address_location_1: string; // Required for street address line 1
  address_location_2?: string; // Optional for street address line 2
  postal_code: number; // Matches API's postal_code
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  // createdAt?: string; // These are backend-generated, not for request body
  // updatedAt?: string;
  // __v?: number;
}

// Keep other types like PaymentMethod if you have them
export type PaymentMethod = "online" | "cod";
