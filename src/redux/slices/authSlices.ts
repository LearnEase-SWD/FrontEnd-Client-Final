// Import necessary modules
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../services/httpsMethod";
import { User } from "../../models/UserModel";
import { ModalRegisterGoogleProps } from "../../components/ModalRegisterGoogle";
import { handleNotify } from "../../utils/handleNotify";

export interface AuthState {
  login: {
    token: string | null;
    currentUser: User;
    loading: boolean;
    error: string | null;
    success: boolean;
    // is_google: boolean;
    is_register_google: boolean;
    googleId?: string;
  };
  verifyToken: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
  resendToken: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
}

const token = localStorage.getItem("token");
const currentUser = JSON.parse(localStorage.getItem("user") ?? "{}");
const initialState: AuthState = {
  login: {
    loading: false,
    currentUser: currentUser,
    token: token,
    error: null,
    success: false,
    is_register_google: false,
  },
  verifyToken: {
    loading: false,
    error: "",
    success: false,
  },
  resendToken: {
    loading: false,
    error: "",
    success: false,
  },
};

// Login function
export const login = createAsyncThunk<
  AuthState,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
  const { dispatch } = thunkAPI;
  const response = await postRequest("/api/auth", { email, password });
  localStorage.setItem("token", (response as any).data.token);
  if (response.success) {
    await dispatch(getCurrentUser());
  }
  return response.data as AuthState;
});

// Google Login function
export const loginWithGoogle = createAsyncThunk<
  AuthState,
  string,
  { rejectValue: string }
>("auth/loginGoogle", async (google_id, thunkAPI): Promise<AuthState> => {
  const { dispatch } = thunkAPI;
  const response = await postRequest("/api/auth/google", {
    google_id: google_id,
  });
  console.log("res gg", response.message);
  localStorage.setItem("token", (response as any).data.token);
  if (response.success) {
    await dispatch(getCurrentUser());
  }

  return response.data as AuthState;
});

// Google Register function
export const registerWithGoogle = createAsyncThunk<
  AuthState,
  ModalRegisterGoogleProps
>("auth/registerGoogle", async (formData) => {
  const response = await postRequest("/api/users/google", formData);
  handleNotify("Sign Up Successful!", "Please check your email")
  
  localStorage.setItem("token", (response as any).data.token);
  return response.data as AuthState;
});

// Get Current User function
export const getCurrentUser = createAsyncThunk("auth/user", async () => {
  const res = await getRequest("/api/auth");
  localStorage.setItem("user", JSON.stringify(res.data));
  handleNotify("Login successfully", " ");
  return res.data;
});

// Auth Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.login.currentUser = {} as User;
      state.login.token = null;
      localStorage.removeItem("token");
    },
    verifyTokenPending: (state) => {
      state.verifyToken.loading = true;
    },
    verifyTokenFulfilled: (state) => {
      state.verifyToken.loading = false;
      state.verifyToken.success = true;
    },
    verifyTokenRejected: (state) => {
      state.verifyToken.loading = false;
      state.verifyToken.success = false;
    },
    resendTokenPending: (state) => {
      state.resendToken.loading = true;
    },
    resendTokenFulfilled: (state) => {
      state.resendToken.loading = false;
      state.resendToken.success = true;
    },
    resendTokenRejected: (state) => {
      state.resendToken.loading = false;
      state.resendToken.success = false;
    },
    setIsLoginGoogleStart:(state, action)=>{
      state.login.googleId = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.login.loading = false;

        state.login.success = true;
      })
      .addCase(login.rejected, (state) => {
        state.login.loading = false;
        state.login.error = "Login failed";
        state.login.success = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.success = true;
        state.login.currentUser = action.payload as User;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.login.loading = false;
        state.login.success = false;
        state.login.error = action.payload as string;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state) => {
        state.login.loading = false;
        state.login.success = true;
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.login.loading = false;
        state.login.success = false;
        state.login.is_register_google = true;
      })
      .addCase(registerWithGoogle.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(registerWithGoogle.fulfilled, (state) => {
        state.login.loading = false;
        state.login.success = true;
        
      })
      .addCase(registerWithGoogle.rejected, (state) => {
        state.login.loading = false;
        state.login.success = false;
      });
  },
});

// Export actions and reducer
export const {
  logout,
  verifyTokenFulfilled,
  verifyTokenPending,
  verifyTokenRejected,
  resendTokenFulfilled,
  resendTokenPending,
  resendTokenRejected,
  // setRegisterGoogle,
  setIsLoginGoogleStart,
  // setIsLoginGoogleFailed,
} = authSlice.actions;

export default authSlice.reducer;
