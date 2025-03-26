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
// Tạo instance của axios
export const axiosClientVer2 = axios.create({
  baseURL: "https://edumaster-api-dev.vercel.app",
  timeout: 600000, // Request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosClientVer2.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token"); 

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && currentTimestamp > decodedToken.exp) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("isNotExist");
        location.href = "/login";
      }
    }
    return config; // Trả về config đã được chỉnh sửa
  },
  (error: AxiosError) => {
    // Xử lý lỗi request
    handleError(error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClientVer2.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    handleError(error);
    if (
      (error.response?.data as ErrorResponse).message?.includes(
        "is not exists."
      )
    ) {
      localStorage.setItem("isNotExist", "true");
    } else {
      localStorage.setItem("isNotExist", "");
    }
    return Promise.reject(error);
  }
);

export default axiosClientVer2;
