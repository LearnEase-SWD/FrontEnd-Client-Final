import { AxiosError } from "axios"; // Import AxiosError
import { handleNotify } from "../utils/handleNotify"; // Import handleNotify

// Định nghĩa kiểu cho response data
export interface ErrorResponse {
  message?: string;
  Message?: string;
}

const handleError = (error: AxiosError) => {

  
  // Chỉ định kiểu cho tham số error
  if (error.response) {
    const { status, data } = error.response; // Lấy status và data từ response

    // Kiểm tra kiểu của data
    if (typeof data === "object" && data !== null) {
      const errorData = data as ErrorResponse;
      
      if (status === 400) {
        handleNotify('Error', errorData.message || errorData.Message || 'Bad Request', 'error');
      }
      if (status === 401) {
        console.log("401 - Lỗi", error);
        handleNotify('Error', errorData.message || errorData.Message || 'Unauthorized', 'error');
      }
      if (status === 403) {
        console.log("403 - Lỗi", errorData);
        handleNotify('Forbidden', errorData.message || errorData.Message || 'Forbidden', 'error');
      }
      if (status === 404) {
        console.log("404 - Not Found", error);
        handleNotify("Error", errorData.message || errorData.Message || 'Error' , 'error');
      }
      if (status === 409) {
        console.log("409 - Tạo sổ.", error);
        handleNotify('Conflict', errorData.message || errorData.Message || 'Conflict', 'error');
      }
      if (status === 500) {
        console.log("500 - Internal Server Error", error);
        handleNotify('Internal Server Error', errorData.message || errorData.Message || 'Internal Server Error', 'error');
      }
    } else {
      console.log("Unexpected data format:", data);
    }
  } else {
    console.log("Error:", error.message);
    handleNotify('Error', error.message, 'error');
  }
};

export default handleError;