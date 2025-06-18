// auth/order.ts
import axios from "./axios";
import {
    getAuthToken,
    getRefreshToken,
    setAuthHeaders,
    refreshAuthToken,
    clearAuthTokens,
} from "../features/auth/authService";

const orderApi = axios.create({
    baseURL: "http://localhost:3006", // Update if needed
});

// Attach access token before each request
orderApi.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

orderApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            getRefreshToken()
        ) {
            originalRequest._retry = true;

            try {
                const { accessToken } = await refreshAuthToken();

                // Attach new token and retry original request
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return orderApi(originalRequest);
            } catch (refreshError) {
                clearAuthTokens();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default orderApi;