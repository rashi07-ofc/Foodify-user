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

export const Login = async (email: string, password: string) => {
  const response = await axios.post("auth/login", {
    email,
    password,
    device_id: getDeviceId(),
    role: 1,
  });

  const { accessToken, refreshToken } = response.data;
 
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  
  // if (data && data._id) {
  //   localStorage.setItem("userId", data._id); 
  // }
  
  setAuthHeaders(accessToken);
  
  return { accessToken, refreshToken }; 
};

export const Logout = async () => {
  const accessToken = getAuthToken();

  try {
    if (accessToken) { 
      console.log("loggin out")
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

export const refreshAuthToken = async () => { 
  const currentRefreshToken = getRefreshToken();

  if (!currentRefreshToken) {
    console.warn("No refresh token found in localStorage. Cannot refresh token.");
    throw new Error("No refresh token available.");
  }

  try {
    const response = await axios.post(
      "http://localhost:3001/auth/refresh",
      { refreshToken: currentRefreshToken }
    );

    const { accessToken, refreshToken, data } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    if (data && data._id) {
      localStorage.setItem("userId", data._id);
    }

    setAuthHeaders(accessToken);

    return { accessToken, refreshToken, user: { _id: data?._id || localStorage.getItem("userId") || '', email: data?.email || '', role: data?.role || 0 } };
  } catch (error) {
    console.error("Failed to refresh token:", error);
    clearAuthTokens();
    throw error;
  }
};