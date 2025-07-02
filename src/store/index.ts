import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tenantReducer from "./slices/tenantSlice";
import permissionReducer from "./slices/permissionSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tenant: tenantReducer,
    permission: permissionReducer,
    user: userReducer,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
