import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiBase";
import toast from "react-hot-toast";
interface User {
  user_id: string;
  full_name: string;
  email: string;
  status: string;
  role_id: string;
  role: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  success: boolean;
  error: string | null;
  editSuccess: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
  success: false,
  error: null,
  editSuccess: false,
};

export const createUserThunk = createAsyncThunk(
  "user/create",
  async (
    {
      full_name,
      email,
      password,
      role_id,
      status,
    }: {
      full_name: string;
      email: string;
      password: string;
      role_id: string;
      status: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name,
          email,
          password,
          role_id,
          status,
        }),
      });

      const data = await res.json();
      if (data.code === 201 && data.success === true) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const fetchUsersThunk = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok)
        return rejectWithValue(data.message || "Failed to fetch users");

      return data.data; // assuming `data.data` is the array of users
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const updateUserThunk = createAsyncThunk(
  "user/update",
  async (
    {
      user_id,
      full_name,
      email,
      password,
      role_id,
      status,
    }: {
      user_id: string;
      full_name: string;
      email: string;
      password: string;
      role_id: string;
      status: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}user/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name,
          email,
          password,
          role_id,
          status,
        }),
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const deleteUserThunk = createAsyncThunk(
  "user/deleteUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const response = await fetch(`${API_BASE_URL}user/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to delete user");
      }

      return userId; // for local state update
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createUserThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.editSuccess = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u.user_id !== action.payload);
        state.editSuccess = true;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
