import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import handleError, { ErrorResponse } from "./error";

// Tạo instance của axios
export const axiosClientVer2 = axios.create({
  baseURL: "http://localhost:5121/api/",
  timeout: 600000, // Request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosClientVer2.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token"); // Dùng Google OAuth token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    handleError(error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClientVer2.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    handleError(error);
    return Promise.reject(error);
  }
);

export default axiosClientVer2;