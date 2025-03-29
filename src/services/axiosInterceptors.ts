import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import handleError, { ErrorResponse } from "./error";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

// Create axios instance
export const axiosClientVer2 = axios.create({
  baseURL: "http://localhost:5121/api/",
  timeout: 600000, // 10-minute timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosClientVer2.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        config.headers["Authorization"] = `Bearer ${token}`;
        const decodedToken = jwtDecode<DecodedToken>(token);

        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && currentTimestamp > decodedToken.exp) {
          console.warn("Token expired! Logging out...");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("isNotExist");
          location.href = "/login";
        }
      } catch (error) {
        console.error("Invalid token detected. Clearing storage and redirecting...");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isNotExist");
        location.href = "/login";
      }
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

    if (
      (error.response?.data as ErrorResponse)?.message?.includes("is not exists.")
    ) {
      localStorage.setItem("isNotExist", "true");
    } else {
      localStorage.setItem("isNotExist", "");
    }

    return Promise.reject(error);
  }
);

export default axiosClientVer2;
