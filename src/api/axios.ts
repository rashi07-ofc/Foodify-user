import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import {
    getAuthToken,
    getRefreshToken,
    clearAuthTokens,
} from "../features/auth/authService";

type CustomInternalAxiosRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

const api = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 15000,
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
                const refreshToken = getRefreshToken();
                const { data } = await api.post("/auth/refresh", { refreshToken });

                const newAccessToken = data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);

                api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                if (originalRequest.headers) {
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                }

                console.log("Token refreshed successfully. Retrying original request.");
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token. Logging out.");
                clearAuthTokens();
                alert("Session expired. Please login again.");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;