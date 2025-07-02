import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, "");

const sensitiveRouteKeys = [
  "dashboard",
  "tenants",
  "users",
  "permissions",
  "logs",
  "settings",
];

export default function PermissionProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = sessionStorage.getItem("role");
  const { pathname } = useLocation();
  const { singleRole, loading } = useAppSelector((state) => state.permission);
  //   if (loading) return <div>Loading...</div>;
  // Super admin has full access

  const routeKey = sensitiveRouteKeys.find((key) => pathname.includes(key));

  if (!routeKey) return children; // Allow access to non-sensitive routes

  //   if (loading || !singleRole?.permissions) {
  //     return <div>Loading...</div>; // You can show a spinner here instead
  //   }

  if (role === "superAdmin") return children;
  const hasPermission = singleRole?.permissions?.some(
    (perm) =>
      normalize(perm.page?.name || "") === routeKey &&
      (perm.can_view || perm.can_edit || perm.can_update || perm.can_delete)
  );
  //   const hasPermission = singleRole.permissions.some((perm) => {
  //     const permName = normalize(perm.page?.name || "");
  //     return (
  //       permName === normalize(routeKey) &&
  //       (perm.can_view || perm.can_edit || perm.can_update || perm.can_delete)
  //     );
  //   });
  return hasPermission ? (
    children
  ) : (
    <div className="text-center mt-10 text-red-600 font-semibold">
      Loading...
    </div>
  );
  //   return hasPermission ? children : null;
}
