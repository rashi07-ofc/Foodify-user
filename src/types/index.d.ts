export type PaymentMethod = "cashOnDelivery" | "online";

export interface DeliveryAddress {
    fullName: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    zipCode: string;
    label?: string;
}