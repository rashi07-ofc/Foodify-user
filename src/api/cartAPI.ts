import axios from "axios";
import { getAuthToken } from "../features/auth/authService";

const BASE_URL = "http://localhost:3002/cart";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export const fetchCart = async () => {
  const response = await axios.get(`${BASE_URL}/get`, getAuthHeaders());
  return response.data;
};

export const deleteCart = async () => {
  return axios.delete(`${BASE_URL}/delete`, getAuthHeaders());
};

export const addItemToCart = async (restaurantId: string, itemId: string) => {
  return axios.post(
    `${BASE_URL}/add`,
    { restaurantId, itemId },
    getAuthHeaders()
  );
};

export const removeItemFromCart = async (itemId: string) => {
  return axios.post(`${BASE_URL}/remove`, { itemId }, getAuthHeaders());
};

export const fetchAvailableCoupons = async (restaurantId: string) => {
  const response = await axios.get(`${BASE_URL}/coupons/${restaurantId}`, getAuthHeaders());
  return response.data;
};
