// src/layout/ProtectedLayout.tsx
import { Navigate, Outlet } from "react-router-dom";
import Layout from "./layout";

export default function ProtectedLayout() {
  const token = sessionStorage.getItem("token");

  if (!token) return <Navigate to="/" replace />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
