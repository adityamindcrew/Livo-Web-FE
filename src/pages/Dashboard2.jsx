// import { useState } from "react"
// import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
// import { DashboardContent } from "@/components/dashboard-content"
// import { TenantManagement } from "@/components/tenant-management"
// import { UserManagement } from "@/components/user-management"
// import { PermissionManagement } from "@/components/permission-management"
// import { AuditLogs } from "@/components/audit-logs"

// export default function Dashboard() {
//   const [activeItem, setActiveItem] = useState("dashboard")
//   const [showTenantForm, setShowTenantForm] = useState(false)
//   const [showUserForm, setShowUserForm] = useState(false)

//   // Check if any form is open
//   const isFormOpen = showTenantForm || showUserForm

//   const handleAddNewTenant = () => {
//     setShowTenantForm(true)
//     setActiveItem("tenants")
//   }

//   const handleTenantFormClose = () => {
//     setShowTenantForm(false)
//   }

//   const handleUserFormClose = () => {
//     setShowUserForm(false)
//   }

//   const renderContent = () => {
//     switch (activeItem) {
//       case "tenants":
//         return (
//           <TenantManagement
//             onCreateTenant={() => setShowTenantForm(true)}
//             showForm={showTenantForm}
//             onFormClose={handleTenantFormClose}
//           />
//         )
//       case "users":
//         return (
//           <UserManagement
//             showForm={showUserForm}
//             onFormOpen={() => setShowUserForm(true)}
//             onFormClose={handleUserFormClose}
//           />
//         )
//       case "permissions":
//         return <PermissionManagement />
//       case "logs":
//         return <AuditLogs />
//       case "dashboard":
//       default:
//         return <DashboardContent onAddNewTenant={handleAddNewTenant} onNavigateToUsers={() => setActiveItem("users")} />
//     }
//   }

//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen w-full">
//         {/* Always show sidebar on desktop, hide on mobile when forms are open */}
//         <AppSidebar activeItem={activeItem} onItemClick={setActiveItem} />
//         <SidebarInset>{renderContent()}</SidebarInset>
//       </div>
//     </SidebarProvider>
//   )
// }

import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content";
import { TenantManagement } from "@/components/tenant-management";
import { UserManagement } from "@/components/user-management";
import { PermissionManagement } from "@/components/permission-management";
import { AuditLogs } from "@/components/audit-logs";
import { SettingsManagement } from "@/components/settings-management";

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [showTenantForm, setShowTenantForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  // Check if any form is open
  const isFormOpen = showTenantForm || showUserForm;

  const handleAddNewTenant = () => {
    setShowTenantForm(true);
    setActiveItem("tenants");
  };

  const handleTenantFormClose = () => {
    setShowTenantForm(false);
  };

  const handleUserFormClose = () => {
    setShowUserForm(false);
  };

  const renderContent = () => {
    switch (activeItem) {
      case "tenants":
        return (
          <TenantManagement
            onCreateTenant={() => setShowTenantForm(true)}
            showForm={showTenantForm}
            onFormClose={handleTenantFormClose}
          />
        );
      case "users":
        return (
          <UserManagement
            showForm={showUserForm}
            onFormOpen={() => setShowUserForm(true)}
            onFormClose={handleUserFormClose}
          />
        );
      case "permissions":
        return <PermissionManagement />;
      case "logs":
        return <AuditLogs />;
      case "settings":
        return <SettingsManagement />;
      case "dashboard":
      default:
        return (
          <DashboardContent
            onAddNewTenant={handleAddNewTenant}
            onNavigateToUsers={() => setActiveItem("users")}
          />
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Always show sidebar on desktop, hide on mobile when forms are open */}
        {/* <AppSidebar activeItem={activeItem} onItemClick={setActiveItem} /> */}
        <SidebarInset>{renderContent()}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
