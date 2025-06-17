import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import {
  getAuthToken,
  getRefreshToken,
  clearAuthTokens,
  refreshAuthToken,
} from "../features/auth/authService";

type CustomInternalAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const api = axios.create({
  baseURL: "http://localhost:3001",
<<<<<<< HEAD
=======
  timeout: 15000,
>>>>>>> 5347c53c09e059b08fb60ec033735b768fcd1c09
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAuthToken();
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post("auth/refresh", {
          refreshToken,
        });

        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Update headers
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        console.log("Token refreshed successfully. Retrying original request.");

        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          "Failed to refresh token. User needs to re-authenticate.",
          refreshError
        );

        clearAuthTokens();

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    console.error("API call failed:", error);
    return Promise.reject(error);
  }
);

export default api;
