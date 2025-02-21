import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  token: string | null;
  shopId: number | null;
  error: string | null;
  expiresAt: number | null; // Timestamp of expiration
}

const getTokenFromStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const expiresAt = decoded.exp * 1000; // Convert to milliseconds

      // If token is expired, clear it
      if (Date.now() > expiresAt) {
        localStorage.removeItem("token");
        return { token: null, expiresAt: null };
      }

      return { token, expiresAt };
    } catch (error) {
      localStorage.removeItem("token");
    }
  }
  return { token: null, expiresAt: null };
};

const { token, expiresAt } = getTokenFromStorage();

const initialState: AuthState = {
  token,
  shopId: null,
  error: null,
  expiresAt,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; shopId: number }>
    ) => {
      const decoded: any = jwtDecode(action.payload.token);
      state.token = action.payload.token;
      state.shopId = action.payload.shopId;
      state.expiresAt = decoded.exp * 1000; // Store expiration timestamp
      state.error = null;

      // Save to localStorage
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.shopId = null;
      state.expiresAt = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
