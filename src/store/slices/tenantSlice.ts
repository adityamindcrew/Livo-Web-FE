import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../config/apiBase";
import toast from "react-hot-toast";

export interface TenantItem {
  tenant_id: string;
  tenant_name: string;
  admin_user_email: string;
  admin_user_password: string;
  contact_email: string;
  contact_number: string;
  industry: string;
  modules: {
    leasing: ModulePermissions;
    fm: ModulePermissions;
    visitor_management: ModulePermissions;
  };
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
interface ModulePermissions {
  can_view: boolean;
  can_add: boolean;
  can_update: boolean;
  can_delete: boolean;
}
interface TenantPayload {
  tenant_name: string;
  admin_user_email: string;
  admin_user_password: string;
  contact_email: string;
  contact_number: string;
  industry: string;
  modules: {
    leasing: ModulePermissions;
    fm: ModulePermissions;
    visitor_management: ModulePermissions;
  };
  status: string;
  notes?: string;
}

interface TenantState {
  tenants: TenantItem[];
  loading: boolean;
  error: string | null;
  success: boolean;
  editSuccess: boolean;
  successMessage?: string;
}

const initialState: TenantState = {
  tenants: [],
  loading: false,
  error: null,
  success: false,
  editSuccess: false,
  successMessage: "",
};

export const createTenantThunk = createAsyncThunk(
  "tenant/create",
  async (payload: TenantPayload, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const res = await fetch(`${API_BASE_URL}tenants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
      // toast.success(data.message);
      if (!res.ok) {
        toast.error(data.message);
        return rejectWithValue(data.message || "Tenant creation failed");
      }

      return data;
    } catch (err: any) {
      console.log(err.message, "errorsacs");
      toast.error(err.message);
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const getTenantsThunk = createAsyncThunk(
  "tenant/list",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const res = await fetch(`${API_BASE_URL}tenants`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("GetData", data);

      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to fetch tenants");
      }

      return data.data as TenantItem[];
    } catch (err: any) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const editTenantThunk = createAsyncThunk(
  "tenant/edit",
  async (
    {
      tenantId,
      payload,
    }: {
      tenantId: string;
      payload: {
        tenant_name: string;
        admin_user_email: string;
        admin_user_password?: string;
        contact_email: string;
        contact_number: string;
        industry: string;
        modules: {
          leasing: {
            can_view: boolean;
            can_add: boolean;
            can_update: boolean;
            can_delete: boolean;
          };
          fm: {
            can_view: boolean;
            can_add: boolean;
            can_update: boolean;
            can_delete: boolean;
          };
          visitor_management: {
            can_view: boolean;
            can_add: boolean;
            can_update: boolean;
            can_delete: boolean;
          };
        };
        status: string;
        notes?: string;
        // createdAt: string;
        // updatedAt: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const response = await fetch(`${API_BASE_URL}tenants/${tenantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Tenant update failed");
      }

      return data.tenant;
    } catch (err: any) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
export const deleteTenantThunk = createAsyncThunk(
  "tenant/delete",
  async (tenantId: any, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const res = await fetch(`${API_BASE_URL}tenants/${tenantId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Deletion failed");
      }

      return tenantId; // Return tenant ID to remove from local state
    } catch (err: any) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    resetTenantState: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
      state.editSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTenantThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createTenantThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage = action.payload.message;
      })
      .addCase(createTenantThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getTenantsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTenantsThunk.fulfilled, (state, action) => {
        state.tenants = action.payload;
        state.loading = false;
      })
      .addCase(getTenantsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(editTenantThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.editSuccess = false;
      })
      .addCase(editTenantThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.editSuccess = true;
      })
      .addCase(editTenantThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteTenantThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTenantThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tenants = state.tenants.filter(
          (t) => t.tenant_id !== action.payload
        );
      })
      .addCase(deleteTenantThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTenantState } = tenantSlice.actions;
export default tenantSlice.reducer;
