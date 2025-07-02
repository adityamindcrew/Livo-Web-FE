// // src/layout/DashboardLayout.tsx
// import { useState } from "react";
// import Sidebar from "./app-sidebar";
// import { Outlet } from "react-router-dom";

// export default function DashboardLayout() {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="flex">
//       <Sidebar
//         collapsed={collapsed}
//         toggleCollapse={() => setCollapsed(!collapsed)}
//       />
//       <main
//         className={`transition-all duration-300 p-6 w-full ${
//           collapsed ? "ml-16" : "ml-64"
//         }`}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// src/layout/DashboardLayout.tsx
import { useState } from "react";
import AppSidebar from "./app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "./ui/sidebar";
import clsx from "clsx";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen  overflow-hidden">
        {/* Sidebar fixed height */}
        <div
          // className={` ${collapsed ? "w-[90px]" : "w-64"} `}
          className={clsx(
            "transition-all duration-300",
            collapsed ? "w-[90px]" : "w-64",
            "fixed md:static  bg-white h-full border-r"
          )}
        >
          <AppSidebar
            collapsed={collapsed}
            toggleCollapse={() => setCollapsed(!collapsed)}
            activeItem={location.pathname}
          />
        </div>
        {/* Scrollable Main Content */}

        <main
          // className={`flex-1 w-full   overflow-y-auto  transition-all duration-300 `}
          className={clsx(
            "flex-1 w-full overflow-y-auto z-50 transition-all duration-300"
            // collapsed ? "ml-[90px]" : "ml-64"
            // Always offset for mobile collapsed sidebar
          )}
        >
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
