// import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
// import handleError from "../services/error";
// import { AppDispatch } from "../redux/store/store";
// import { setIsLoginGoogleFailed, setRegisterGoogle } from "../redux/slices/authSlices";

// export const axiosClientVer2 = axios.create({
//   baseURL: "https://edumaster-api-dev.vercel.app",
//   timeout: 6000000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Set up interceptors with dispatch and selector data
// export const setupAxiosInterceptors = (dispatch: AppDispatch, is_google: boolean) => {
//   // Request Interceptor
//   axiosClientVer2.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error: AxiosError) => {
//       handleError(error);
//       return Promise.reject(error);
//     }
//   );

//   // Response Interceptor
//   axiosClientVer2.interceptors.response.use(
//     (response: AxiosResponse) => response,
//     (error: AxiosError) => {
//       handleError(error);
//       if (is_google && error.response?.data) {
//         dispatch(setIsLoginGoogleFailed());
//         dispatch(setRegisterGoogle(true));
//       }
//       return Promise.reject(error);
//     }
//   );
// };
