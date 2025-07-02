import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard2";
import Login from "./pages/Login";
import Layout from "./components/layout";
import DashboardContent from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedRoute";
import TenantManagement from "./pages/Tenant/Tenant";
import { CreateTenant } from "./pages/Tenant/CreateTanent";
import EditTenant from "./pages/Tenant/EditTenant";
import { UserManagement } from "./pages/User/User";
import { CreateUser } from "./pages/User/CreateUser";
import EditUser from "./pages/User/EditUser";
import PermissionManagement from "./pages/Permission/Permission";
import { AuditLogs } from "./pages/Logs/Logs";
import { SettingsManagement } from "./pages/Setting/Setting";
import PermissionProtectedRoute from "./components/PermissionProtectedRoute";
import Forbidden from "./pages/Forbidden/Forbidden";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="dashboard1" element={<Dashboard />} />
          <Route
            path="dashboard"
            element={
              <PermissionProtectedRoute>
                <DashboardContent />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="tenants"
            element={
              <PermissionProtectedRoute>
                <TenantManagement />
              </PermissionProtectedRoute>
            }
          />
          <Route path="create_tenant" element={<CreateTenant />} />
          <Route path="edit_tenant/:id" element={<EditTenant />} />
          <Route
            path="users"
            element={
              <PermissionProtectedRoute>
                <UserManagement />
              </PermissionProtectedRoute>
            }
          />
          <Route path="create_user" element={<CreateUser />} />
          <Route path="edit_user" element={<EditUser />} />
          <Route
            path="permissions"
            element={
              <PermissionProtectedRoute>
                <PermissionManagement />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="logs"
            element={
              <PermissionProtectedRoute>
                <AuditLogs />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <PermissionProtectedRoute>
                <SettingsManagement />
              </PermissionProtectedRoute>
            }
          />
        </Route>
        <Route path="/403" element={<Forbidden />} />
      </Routes>
    </div>
  );
}

export default App;
