import USER_API from "../constants/api/user";
import {
  previewProfileFulfilled,
  previewProfilePending,
  previewProfileRejected,
} from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store/store";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "./httpsMethod";
import {
  ChangeUserRoleParams,
  ChangeUserStatusParams,
  User,
} from "../models/UserModel";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import { UserSearchParams } from "../models/SearchInfo.model";
import { handleNotify } from "../utils/handleNotify";
// import dayjs from "dayjs";
const BASE_URL = "/api/users";

export const UserService = {
  // Get a list of users with optional search filters
  getUsers(
    params: UserSearchParams
  ): Promise<ApiResponse<APIResponseData<User[]>>> {
    return postRequest(USER_API.GET_USERS, params);
  },
  getUser(userId: string): Promise<ApiResponse<APIResponseData<User[]>>> {
    return getRequest(USER_API.GET_USER(userId), false);
  },
  createUser(param: User): Promise<ApiResponse<User>> {
    return postRequest<User>(USER_API.CREATE_USER, param)
      .then((response) => {
        handleNotify("User created successfully!", "");
        return response;
      })
      .catch((error) => {
        handleNotify("Failed to update user", error.message, "error");
        throw error;
      });
  },
  updateUser(userId: string, param: User): Promise<ApiResponse<User>> {
    return putRequest<User>(USER_API.UPDATE_USER(userId), param)
      .then((response) => {
        handleNotify("User updated successfully!", "");
        return response;
      })
      .catch((error) => {
        handleNotify("Failed to update user", error.message, "error");
        throw error;
      });
  },
  deleteUser(userId: string): Promise<ApiResponse<User>> {
    return deleteRequest<User>(USER_API.DELETE_USER(userId))
      .then((response) => {
        handleNotify("User deleted successfully!", "");
        return response;
      })
      .catch((error) => {
        handleNotify("Failed to delete user", error.message, "error");
        throw error;
      });
  },
  changeRole(params: ChangeUserRoleParams): Promise<ApiResponse<User>> {
    return putRequest<User>(USER_API.CHANGE_ROLE, params)
      .then((response) => {
        handleNotify("User role changed successfully!", "");
        return response;
      })
      .catch((error) => {
        handleNotify("Failed to change user role.", error.message, "error");
        throw error;
      });
  },

  changeStatus(params: ChangeUserStatusParams): Promise<ApiResponse<User>> {
    return putRequest(USER_API.CHANGE_STATUS, params)
      .then((response) => {
        handleNotify("Status updated successfully!", "");
        return response as ApiResponse<User>;
      })
      .catch((error) => {
        handleNotify("Failed to update status.", error.message, "error");
        throw error;
      });
  },
};
// Lấy danh sách người dùng
export const getUsers = async (searchParams: any) => {
  try {
    const response = await postRequest(`${BASE_URL}/search`, searchParams);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const getUser = async (user_id: string) => {
  try {
    const response = await getRequest(`${BASE_URL}/${user_id}`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const createUser = async (searchParams: any): Promise<User> => {
  try {
    const response = await postRequest(`${BASE_URL}/create`, searchParams);
    return response.data as User; // Adjust if your response structure is different
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow to handle at the calling site
  }
};

export const updatedUser = async (userId: string, userData: any) => {
  try {
    const response = await putRequest(`${BASE_URL}/${userId}`, userData);
    if (response && response.success) {
      handleNotify("User updated successfully", "");
      return response.data; // Trả về dữ liệu người dùng đã được cập nhật
    } else {
      handleNotify("Error", response.message || "Failed to update user"); // Hiển thị thông báo lỗi
      return null; // Trả về null khi không thành công
    }
  } catch (error: any) {
    console.error("Error updating user:", error);
    handleNotify(
      "An error occurred while updating the user.",
      error.message,
      "error"
    ); // Thông báo lỗi chung
    return null; // Đảm bảo trả về null trong trường hợp có lỗi
  }
};

export const changeRole = async (userId: string, role: string) => {
  try {
    const response = await putRequest(`${BASE_URL}/change-role`, {
      user_id: userId,
      role,
    });
    if (response.success) {
      handleNotify("User updated successfully", "");
    } else {
      handleNotify(
        "Error",
        response.message || "Failed to update user",
        "error"
      ); // Hiển thị thông báo lỗi
    }
  } catch (error) {
    console.error("Error changing user role:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
export const changePassword = async (
  user_id: string,
  old_password: string,
  new_password: string
) => {
  try {
    const response = await putRequest(`${BASE_URL}/change-password`, {
      user_id: user_id,
      old_password: old_password,
      new_password: new_password,
    });
    if (response.success) {
      handleNotify("User password updated successfully", "");
    } else {
      handleNotify(
        "Error",
        response.message || "Failed to update password",
        "error"
      );
    }
  } catch (error) {
    console.error("Error changing user password:", error);
    throw error;
  }
};
export const changeStatus = async (userId: string, status: boolean) => {
  try {
    const response = await putRequest(`${BASE_URL}/change-status`, {
      user_id: userId,
      status,
    });
    if (response.success) {
      return true; // Hoặc trả về một giá trị nào đó nếu cần thiết
    } else {
      throw new Error("Failed to change role");
    }
  } catch (error) {
    console.error("Error changing user status:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await deleteRequest(`${BASE_URL}/${userId}`);
    if (response.success) {
      console.log("User deleted successfully");
      handleNotify("User deleted successfully", "");
      return true;
    } else {
      handleNotify(
        "Error",
        response.message || "Failed to update password",
        "error"
      );
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const previewInstructor = async (
  formData: any,
  dispatch: AppDispatch
) => {
  dispatch(previewProfilePending());
  try {
    const res = await putRequest(USER_API.PREVIEW_INSTRUCTOR, formData);
    handleNotify("Submit preview successfully", "");
    console.log("res preview", res);
    // const filterUserList = userList
    //   .slice()
    //   .sort(
    //     (a, b) => dayjs(b.updated_at).valueOf() - dayjs(a.updated_at).valueOf()
    //   );
    dispatch(previewProfileFulfilled());
  } catch (error) {
    console.log(error);
    dispatch(previewProfileRejected());
  }
};

export const completeLesson = async (lessonId: string) => {
  try {
    const response = await postRequest(`${BASE_URL}/completed-lesson`, {
      lessonId: lessonId,
    });
    if (response.success) {
      handleNotify("Lesson completed", "");
      return true;
    } else {
      handleNotify(
        "Error",
        response.message || "Failed to complete lesson",
        "error"
      );
    }
  } catch (error) {
    console.error("Error completing lesson:", error);
    throw error;
  }
};
