// // store/slices/permissionSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API_BASE_URL } from "../../config/apiBase";

// interface Page {
//   id: string;
//   name: string;
// }

// interface RolePayload {
//   role_name: string;
//   permissions: {
//     page_id: string;
//     can_view: boolean;
//     can_edit: boolean;
//     can_update: boolean;
//     can_delete: boolean;
//   }[];
// }

// interface PermissionState {
//   pages: Page[];
//   loading: boolean;
//   error: string | null;
//   success: boolean;
//   role_id: string | null;
// }

// const initialState: PermissionState = {
//   pages: [],
//   loading: false,
//   error: null,
//   success: false,
//   role_id: null,
// };

// // Fetch pages
// export const fetchPagesThunk = createAsyncThunk(
//   "permission/fetchPages",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(`${API_BASE_URL}permission/pages`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to fetch pages");
//       return data;
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// // Create role
// export const createRoleThunk = createAsyncThunk(
//   "permission/createRole",
//   async (payload: RolePayload, { rejectWithValue }) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(`${API_BASE_URL}permission/role/upsert`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Role creation failed");
//       return data;
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// const permissionSlice = createSlice({
//   name: "permission",
//   initialState,
//   reducers: {
//     resetPermissionState: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//       state.role_id = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPagesThunk.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchPagesThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.pages = action.payload;
//       })
//       .addCase(fetchPagesThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(createRoleThunk.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(createRoleThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.role_id = action.payload.role_id;
//       })
//       .addCase(createRoleThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetPermissionState } = permissionSlice.actions;
// export default permissionSlice.reducer;

////////////
// permissionSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiBase";
import toast from "react-hot-toast";

export interface Permission {
  page_id: string;
  can_view: boolean;
  can_edit: boolean;
  can_update: boolean;
  can_delete: boolean;
}

export interface Page {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: PermissionWithPage[];
}

export interface PermissionWithPage extends Permission {
  page: Page;
}

interface PermissionState {
  pages: Page[];
  roles: Role[];
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string;
  status: number;
  singleRole: any | null;
}

const initialState: PermissionState = {
  pages: [],
  roles: [],
  loading: false,
  error: null,
  success: false,
  message: "",
  status: 0,
  singleRole: null,
};

export const fetchPagesThunk = createAsyncThunk(
  "permission/fetchPages",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}permission/pages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("datassfdvdfn", data);

      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchRolesThunk = createAsyncThunk(
  "permission/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}permission/roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// export const upsertRoleThunk = createAsyncThunk(
//   "permission/upsertRole",
//   async (
//     {
//       role_name,
//       role_id,
//       permissions,
//     }: { role_name: string; role_id?: string; permissions: Permission[] },
//     { rejectWithValue }
//   ) => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const url = role_id
//         ? `${API_BASE_URL}permission/role/permissions`
//         : `${API_BASE_URL}permission/role/upsert`;
//       const payload = role_id
//         ? { role_name, role_id, permissions }
//         : { role_name, permissions };

//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) return rejectWithValue(data.message);
//       return data;
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   }
// );
export const upsertRoleThunk = createAsyncThunk(
  "permission/upsertRole",
  async (
    {
      role_name,
      role_id,
      permissions,
    }: { role_name: string; role_id?: string; permissions: Permission[] },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const url = role_id
        ? `${API_BASE_URL}permission/role/permissions`
        : `${API_BASE_URL}permission/role/upsert`;
      const payload = role_id
        ? { role_name, role_id, permissions }
        : { role_name, permissions };

      const res = await fetch(url, {
        method: role_id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.code === 200 && data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteRoleThunk = createAsyncThunk(
  "permission/deleteRole",
  async (role_id: string, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}permission/role`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role_id }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return role_id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchSingleRoleThunk = createAsyncThunk(
  "permission/fetchSingleRole",
  async (
    { role_id, role_name }: { role_id: any; role_name: any },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}permission/role/permissions?role_id=${role_id}&role_name=${role_name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch role");
      }

      return data.data; // includes role info + permissions[]
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPagesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPagesThunk.fulfilled, (state, action) => {
        state.pages = action.payload?.data;
        state.loading = false;
      })
      .addCase(fetchPagesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchRolesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolesThunk.fulfilled, (state, action) => {
        state.roles = action.payload?.data;
        state.loading = false;
      })
      .addCase(fetchRolesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(upsertRoleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(upsertRoleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.status = action.payload?.status;
      })
      .addCase(upsertRoleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteRoleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteRoleThunk.fulfilled, (state, action) => {
        state.roles = state.roles.filter((r) => r.id !== action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteRoleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchSingleRoleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchSingleRoleThunk.fulfilled, (state, action) => {
        state.singleRole = action.payload;
      })
      .addCase(fetchSingleRoleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default permissionSlice.reducer;
