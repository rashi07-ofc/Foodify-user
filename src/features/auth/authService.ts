// authService.ts

import axios from "../../api/axios";
import { getDeviceId } from "../../utils/deviceId";

//access token ke liye
export const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

//refresh token ke liye
export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

//api call ke liye header mai access token daalna hai, uska code yaha hai
export const setAuthHeaders = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

//clear all tokens
export const clearAuthTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  delete axios.defaults.headers.common["Authorization"];
};

export const login = async (email: string, password: string) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
    device_id: getDeviceId(),
    role: 1,
  });

  const { accessToken, refreshToken, data } = response.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  if (data && data._id) {
    localStorage.setItem("userId", data._id);
  }

  setAuthHeaders(accessToken);
  
  return { accessToken, refreshToken }; 
};

export const Logout = async () => {
  const accessToken = getAuthToken();

  try {
    if (accessToken) { 
      await axios.post(
        "/auth/logout", 
        {},
        { headers: { 'Authorization': `Bearer ${accessToken}` } } 
      );
    }
  } catch (error) {
    console.error("Logout API call failed:", error);
  } finally {
    clearAuthTokens();
  }
};

/**
 * @description Makes an API call to refresh the access and refresh tokens.
 * @returns {Promise<{ accessToken: string; refreshToken: string; user: { _id: string; email: string; role: number; } }>} New tokens and user data.
 * @throws Will throw an error if the refresh token API call fails.
 */
export const refreshAuthToken = async () => { // <--- NEW FUNCTION
  const currentRefreshToken = getRefreshToken();

  if (!currentRefreshToken) {
    // If no refresh token exists, no point in trying to refresh
    console.warn("No refresh token found in localStorage. Cannot refresh token.");
    throw new Error("No refresh token available.");
  }

  try {
    const response = await axios.post(
      "/auth/refresh",
      { refreshToken: currentRefreshToken }
    );

    const { accessToken, refreshToken, data } = response.data;

    // Update localStorage with new tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // Update userId if provided in refresh response (optional, depending on your backend)
    if (data && data._id) {
      localStorage.setItem("userId", data._id);
    }

    // Set new access token in default Axios headers
    setAuthHeaders(accessToken);

    return { accessToken, refreshToken, user: { _id: data?._id || localStorage.getItem("userId") || '', email: data?.email || '', role: data?.role || 0 } };
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // Important: If refresh fails (e.g., refresh token expired/invalid),
    // the user is effectively logged out and should be redirected to login.
    clearAuthTokens(); // Clear all tokens if refresh fails
    throw error; // Re-throw to be handled by the caller (e.g., an Axios interceptor)
  }
};