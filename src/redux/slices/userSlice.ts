import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../services/httpsMethod";
import { User } from "../../models/UserModel";
import { DataInterface } from "../../types/data.type";
import { SearchParamInterface } from "../../types/search.type";
import {  APIResponseData } from "../../models/ApiReponse.model";
import { UserService } from "../../services/user.service";
import {  UserSearchParams } from "../../models/SearchInfo.model";

interface initialStateInterface {
  register: {
    loading: boolean;
    success: boolean;
    message: string;
  };
  requestedUser: {
    listRequest: APIResponseData<User>,
    loading: boolean,
    success: boolean,
  },
  previewProfile: {
    
    loading: boolean;
    success: boolean;
    message: string;
  };
  forgotPassword: {
    loading: boolean;
    success: boolean;
    message: string;
  };
  users: {
    loading: boolean;
    success: boolean;
    data: DataInterface<User>;
  };
}

const initialState: initialStateInterface = {
  register: {
    loading: false,
    success: false,
    message: "",
  },
  requestedUser: {
    listRequest: {
      
    },
    loading: false,
    success: false,
  },
  previewProfile: {
    loading: false,
    success: false,
    message: "",
  },
  forgotPassword: {
    loading: false,
    success: false,
    message: "",
  },
  users: {
    loading: false,
    success: false,
    data: {
      pageData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
      },
    },
  },
};
export const getUsersData = createAsyncThunk(
  "user/getAllUser",
  async (searchParam: SearchParamInterface) => {
    const res = await postRequest("admin/users", searchParam);
    return res.data;
  }
);

export const getUsersRequestData = createAsyncThunk(
  "user/getUsersRequestData",
  async (searchParam: UserSearchParams) => {
    const res = await UserService.getUsers(searchParam);
    console.log("request data thunk", res.data);
    return res.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerPending: (state) => {
      state.register.loading = true;
      state.register.success = false;
      state.register.message = "";
    },
    registerFulfilled: (state) => {
      state.register.loading = false;
      state.register.success = true;
      state.register.message = "Register successfully";
    },
    registerRejected: (state) => {
      state.register.loading = false;
    },

    previewProfilePending: (state, ) => {
      state.previewProfile.loading = true;
      state.previewProfile.success = false;
    },
    previewProfileFulfilled: (state) => {
      state.previewProfile.loading = false;
      state.previewProfile.success = true;
    

    },
    previewProfileRejected: (state) => {
      state.previewProfile.loading = false;
    },
    // Forgot password actions
    forgotPasswordPending: (state) => {
      state.forgotPassword.loading = true;
      state.forgotPassword.success = false;
      state.forgotPassword.message = "";
    },
    forgotPasswordFulfilled: (state) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.success = true;
      state.forgotPassword.message = "Password reset email sent successfully";
    },
    forgotPasswordRejected: (state) => {
      state.forgotPassword.loading = false;
      state.forgotPassword.success = false;
      state.forgotPassword.message =
        "Email does not exist or something went wrong.";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.pending, (state) => {
        state.users.loading = true;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.success = true;
        state.users.data = action.payload  as DataInterface<User>;
      })
      .addCase(getUsersData.rejected, (state) => {
        state.users.loading = false;
        state.users.success = false;
      })
      // Request instructor data
      .addCase(getUsersRequestData.pending, (state) => {
        state.requestedUser.loading = true;
      })
      .addCase(getUsersRequestData.fulfilled, (state, action) => {
        state.requestedUser.loading = false;
        state.requestedUser.success = true;
        state.requestedUser.listRequest = action.payload as unknown as APIResponseData<User>;
      })
      .addCase(getUsersRequestData.rejected, (state) => {
        state.requestedUser.loading = false;
        state.requestedUser.success = false;
      });
  },
});

export const {
  registerFulfilled,
  registerPending,
  registerRejected,
  previewProfileFulfilled,
  previewProfilePending,
  previewProfileRejected,
  forgotPasswordPending,
  forgotPasswordFulfilled,
  forgotPasswordRejected,
} = usersSlice.actions;

export default usersSlice.reducer;
