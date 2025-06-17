import axios from "../../api/axios";
import { getDeviceId } from "../../utils/deviceId";
// Add these helper functions
export const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAuthHeaders = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  delete axios.defaults.headers.common["Authorization"];
};

// Updated login function
export const login = async (email: string, password: string) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
    device_id: getDeviceId(),
    role: 1,
  });

  const { accessToken, refreshToken } = response.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  setAuthHeaders(accessToken); // Set axios default headers
};

// Updated logout function
export const Logout = async () => {
  const accessToken = getAuthToken();

  try {
    await axios.post(
      "auth/logout",
      {},
      { headers: { 'Authorization': `Bearer ${accessToken}` } } 
    );
  } finally {
    clearAuthTokens();
  }
};