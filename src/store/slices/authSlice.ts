import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiBase";

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem("token"),
  loading: false,
  error: null,
};

// Login thunk
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}super-admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data?.author ? "superAdmin" : "user");
      sessionStorage.setItem("roleId", data?.user ? data?.user?.roleId : "");
      sessionStorage.setItem(
        "roleName",
        data?.user ? data?.user?.roleName : ""
      );
      return data.token;
    } catch (err: any) {
      return rejectWithValue(err.message || "Login error");
    }
  }
);

// Logout thunk
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`${API_BASE_URL}super-admin/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Logout failed");
      }

      sessionStorage.clear();
      return;
    } catch (err: any) {
      return rejectWithValue(err.message || "Logout error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.token = null;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
