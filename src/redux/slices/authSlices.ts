// Import necessary modules
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../services/httpsMethod";
import { User } from "../../models/UserModel";
import { ModalRegisterGoogleProps } from "../../components/ModalRegisterGoogle";
import { handleNotify } from "../../utils/handleNotify";
import axios from 'axios';
export interface AuthState {
  login: {
    token: string | null;
    currentUser: User | null;
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

const initialState: AuthState = {
  login: {
    loading: false,
    currentUser: null,
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



// Google Login function
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (accessToken: string, { rejectWithValue }) => {
    try {
      // Make an API call to verify the token and get user details
      const response = await axios.post('http://localhost:5121/api/auth/callback',
        { accessToken },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Store token and user info in localStorage
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      // Handle error
      console.error('Google login error:', error);
      return rejectWithValue('Login failed');
    }
  }
);
// Google Register function
export const registerWithGoogle = createAsyncThunk<
  AuthState,
  ModalRegisterGoogleProps
>("auth/registerGoogle", async (formData) => {
  const response = await postRequest("auth/login", formData);
  handleNotify("Sign Up Successful!", "Please check your email")

  localStorage.setItem("token", (response as any).data.token);
  return response.data as AuthState;
});

// Get Current User function
export const getCurrentUser = createAsyncThunk("auth/user", async () => {
  const res = await getRequest("auth/login");
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
    setIsLoginGoogleStart: (state, action) => {
      state.login.googleId = action.payload
    }

  },
  extraReducers: (builder) => {
    builder

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
        state.login.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.currentUser = action.payload;
        state.login.token = action.payload.accessToken;
        state.login.success = true;

        // Determine if additional registration is needed
        state.login.is_register_google = action.payload.isNewUser || false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload as string;
        state.login.currentUser = null;
        state.login.token = null;
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
