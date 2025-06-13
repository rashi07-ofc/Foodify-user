// types.ts
export type PaymentMethod = "cashOnDelivery" | "online";

export interface DeliveryAddress {
  id: string;
  fullName: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  label?: string;
}
