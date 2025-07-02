import {
  BarChart3,
  Building2,
  FileText,
  Key,
  LogOut,
  Menu,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import clsx from "clsx";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../components/ui/sidebar";
import { LivoLogo } from "../assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../components/ui/alert-dialog"; // update path if needed
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { logoutThunk } from "../store/slices/authSlice";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { fetchPagesThunk } from "../store/slices/permissionSlice";
import { fetchSingleRoleThunk } from "../store/slices/permissionSlice";
// const menuItems = [
//   { title: "Dashboard", icon: BarChart3, url: "/dashboard", key: "dashboard" },
//   { title: "Tenants", icon: Building2, url: "/tenants", key: "tenants" },
//   { title: "Users", icon: Users, url: "/users", key: "users" },
//   { title: "Permissions", icon: Key, url: "/permissions", key: "permissions" },
//   { title: "Logs", icon: FileText, url: "/logs", key: "logs" },
//   { title: "Settings", icon: Settings, url: "/settings", key: "settings" },
// ];
const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    url: "/dashboard",
    key: "dashboard",
    activeKeys: ["/dashboard"],
  },
  {
    title: "Tenants",
    icon: Building2,
    url: "/tenants",
    key: "tenants",
    activeKeys: ["/tenants", "/create_tenant", "edit_tenant"],
  },
  {
    title: "Users",
    icon: Users,
    url: "/users",
    key: "users",
    activeKeys: ["/users", "/create_user", "/edit_user"],
  },
  {
    title: "Permissions",
    icon: Key,
    url: "/permissions",
    key: "permissions",
    activeKeys: ["/permissions"],
  },
  {
    title: "Logs",
    icon: FileText,
    url: "/logs",
    key: "logs",
    activeKeys: ["/logs"],
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
    key: "settings",
    activeKeys: ["/settings", "/settings/profile", "/settings/security"],
  },
  {
    title: "Log Out",
    icon: LogOut,
    url: "/",
    key: "logout",
    activeKeys: ["/logout"],
  },
];

interface AppSidebarProps {
  activeItem?: string;
  onItemClick?: (key: string) => void;
  collapsed: boolean;
  toggleCollapse: () => void;
}

export default function AppSidebar({
  activeItem = "dashboard",
  onItemClick,
  collapsed,
  toggleCollapse,
}: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activeKey = menuItems.find((item) =>
    item.activeKeys?.some((key) => location.pathname.includes(key))
  )?.key;

  const { pages, loading, success, error } = useAppSelector(
    (state) => state.permission
  );
  const role = sessionStorage.getItem("role"); // superAdmin or user
  const roleId = sessionStorage.getItem("roleId");
  const roleName = sessionStorage.getItem("roleName");
  useEffect(() => {
    dispatch(
      fetchSingleRoleThunk({
        role_id: roleId,
        role_name: roleName,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(fetchPagesThunk());
  }, []);
  console.log("pages", pages);
  const { singleRole } = useAppSelector((state) => state.permission);
  console.log("singleRole", singleRole);

  // const onItemClickk = (key: string) => {
  //   navigation?.(key);
  // };
  const onItemClickk = (key: string) => {
    if (key === "logout") {
      setLogoutDialogOpen(true); // open modal
    } else {
      navigate?.(`/${key}`);
    }
  };
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/");
  };
  const allowedPageIds =
    (role === "superAdmin"
      ? menuItems.map((item) => item.key) // allow all pages for super admin
      : singleRole?.permissions
          ?.filter(
            (perm) =>
              perm.can_view ||
              perm.can_edit ||
              perm.can_delete ||
              perm.can_update
          )
          ?.map((perm) => perm.page_id)) || [];

  return (
    <>
      <Sidebar
        className={clsx(
          "transition-all bg-white border-r h-full min-h-screen",
          collapsed ? "w-[90px]" : "w-64"
        )}
      >
        <SidebarHeader
          className={clsx(
            "  border-b flex items-center justify-between",
            collapsed ? "py-8 " : "py-[18px]"
          )}
        >
          {/* <button onClick={toggleCollapse} className="hidden md:block h-3 w-3 flex "> */}
          {/* <Menu className="h-3 w-3" onClick={toggleCollapse} /> */}
          {/* </button> */}
          {/* {collapsed && (
          <div className="cursor-pointer ">
            <Menu className="h-5 w-5" onClick={toggleCollapse} />
          </div>
        )} */}
          <div className="flex items-center gap-[20px] ">
            <div className="flex items-center gap-3">
              {collapsed ? (
                <div className="cursor-pointer ">
                  <Menu className="h-5 w-5" onClick={toggleCollapse} />
                </div>
              ) : (
                <div className="h-12 w-12 flex items-center justify-center rounded-lg">
                  <img src={LivoLogo} alt="Livo Logo" />
                </div>
              )}
              {!collapsed && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Super Admin
                  </h2>
                  <p className="text-sm text-gray-500">Control Panel</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <div className="cursor-pointer ">
                <Menu className="h-5 w-5" onClick={toggleCollapse} />
              </div>
            )}
          </div>

          {/* Collapse Button */}
        </SidebarHeader>

        <SidebarContent className="px-4 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              {/* <SidebarMenu className="space-y-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeKey === item.key}
                      className="w-full justify-start px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-r-2 data-[active=true]:border-blue-700"
                    >
                      <button
                        onClick={() => onItemClickk?.(item.key)}
                        className="flex items-center gap-3 w-full text-left"
                      >
                        <item.icon className="h-5 w-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </button>
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 w-full text-left"
                      >
                        <item.icon className="h-5 w-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu> */}
              <SidebarMenu className="space-y-1">
                {menuItems
                  .filter((item) => {
                    if (item.key === "logout") return true;
                    if (role === "superAdmin") return true;

                    const matchedPermission = singleRole?.permissions?.find(
                      (perm) =>
                        perm.page?.name?.toLowerCase() ===
                        item.title.toLowerCase()
                    );

                    return (
                      matchedPermission &&
                      (matchedPermission.can_view ||
                        matchedPermission.can_edit ||
                        matchedPermission.can_update ||
                        matchedPermission.can_delete)
                    );
                  })
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={activeKey === item.key}
                        className="w-full justify-start px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-r-2 data-[active=true]:border-blue-700"
                      >
                        <button
                          onClick={() => onItemClickk?.(item.key)}
                          className="flex items-center gap-3 w-full text-left"
                        >
                          <item.icon className="h-5 w-5" />
                          {!collapsed && <span>{item.title}</span>}
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will end your session and redirect you to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleLogout}
            >
              Yes, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
