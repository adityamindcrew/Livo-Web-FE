import {
  Building2,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { TenantForm } from "../../components/tenant-form";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTenantsThunk } from "../../store/slices/tenantSlice";
import dayjs from "dayjs"; // for formatting createdAt
import { deleteTenantThunk } from "../../store/slices/tenantSlice";
import toast from "react-hot-toast";
interface ModulePermissions {
  can_view: boolean;
  can_add: boolean;
  can_update: boolean;
  can_delete: boolean;
}
interface Tenant {
  id: number;
  name: string;
  type: string;
  contactEmail: string;
  contactNumber: string;
  adminEmail: string;
  adminPassword?: string;
  status: string;
  modules: {
    leasing: ModulePermissions;
    fm: ModulePermissions;
    visitor_management: ModulePermissions;
  };
  createdOn: string;
  avatar: string;
  avatarBg: string;
  notes?: string;
}

const initialTenants: Tenant[] = [
  {
    id: 1,
    name: "Acme Corporation",
    type: "Enterprise",
    contactEmail: "admin@acme.com",
    contactNumber: "+1 (555) 123-4567",
    adminEmail: "admin@acme.com",
    status: "Active",
    modules: ["CRM", "Analytics", "Reports"],
    createdOn: "Jan 15, 2024",
    avatar: "AC",
    avatarBg: "bg-blue-600",
  },
  {
    id: 2,
    name: "TechStart Inc",
    type: "Startup",
    contactEmail: "contact@techstart.com",
    contactNumber: "+1 (555) 234-5678",
    adminEmail: "admin@techstart.com",
    status: "Active",
    modules: ["CRM", "Analytics"],
    createdOn: "Feb 3, 2024",
    avatar: "TS",
    avatarBg: "bg-green-600",
  },
  {
    id: 3,
    name: "Global Solutions",
    type: "Enterprise",
    contactEmail: "info@globalsolutions.com",
    contactNumber: "+1 (555) 345-6789",
    adminEmail: "admin@globalsolutions.com",
    status: "Inactive",
    modules: ["CRM"],
    createdOn: "Dec 12, 2023",
    avatar: "GS",
    avatarBg: "bg-purple-600",
  },
  {
    id: 4,
    name: "Innovation Labs",
    type: "Technology",
    contactEmail: "contact@innovation.com",
    contactNumber: "+1 (555) 456-7890",
    adminEmail: "admin@innovation.com",
    status: "Active",
    modules: ["CRM", "Analytics", "Reports"],
    createdOn: "Mar 8, 2024",
    avatar: "IL",
    avatarBg: "bg-orange-600",
  },
  {
    id: 5,
    name: "Digital Dynamics",
    type: "Technology",
    contactEmail: "hello@digitaldynamics.com",
    contactNumber: "+1 (555) 567-8901",
    adminEmail: "admin@digitaldynamics.com",
    status: "Active",
    modules: ["CRM", "Analytics"],
    createdOn: "Apr 12, 2024",
    avatar: "DD",
    avatarBg: "bg-red-600",
  },
  {
    id: 6,
    name: "Future Systems",
    type: "Enterprise",
    contactEmail: "info@futuresystems.com",
    contactNumber: "+1 (555) 678-9012",
    adminEmail: "admin@futuresystems.com",
    status: "Active",
    modules: ["CRM", "Analytics", "Reports"],
    createdOn: "May 20, 2024",
    avatar: "FS",
    avatarBg: "bg-indigo-600",
  },
  {
    id: 7,
    name: "Smart Solutions",
    type: "Consulting",
    contactEmail: "contact@smartsolutions.com",
    contactNumber: "+1 (555) 789-0123",
    adminEmail: "admin@smartsolutions.com",
    status: "Inactive",
    modules: ["CRM"],
    createdOn: "Jun 5, 2024",
    avatar: "SS",
    avatarBg: "bg-pink-600",
  },
  {
    id: 8,
    name: "NextGen Corp",
    type: "Startup",
    contactEmail: "hello@nextgen.com",
    contactNumber: "+1 (555) 890-1234",
    adminEmail: "admin@nextgen.com",
    status: "Active",
    modules: ["CRM", "Analytics"],
    createdOn: "Jul 18, 2024",
    avatar: "NG",
    avatarBg: "bg-teal-600",
  },
];

const stats = [
  {
    title: "Total Tenants",
    value: "47",
    icon: Building2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "Active Tenants",
    value: "42",
    icon: Building2,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    title: "Inactive Tenants",
    value: "5",
    icon: Building2,
    iconColor: "text-red-600",
    iconBg: "bg-red-100",
  },
];

interface TenantManagementProps {
  onCreateTenant?: () => void;
  showForm?: boolean;
  onFormClose?: () => void;
}

export default function TenantManagement() {
  //   {
  //   onCreateTenant,
  //   showForm = false,
  //   onFormClose,
  // }: TenantManagementProps
  const dispatch = useAppDispatch();
  const {
    tenants: fetchedTenants,
    loading,
    error,
  } = useAppSelector((state) => state.tenant);
  console.log("fetchedTenants", fetchedTenants);

  useEffect(() => {
    dispatch(getTenantsThunk());
  }, []);
  // const getModulesFromFlags = (tenant: any): string[] => {
  //   const modules: string[] = [];
  //   if (tenant.leasing) modules.push("Leasing");
  //   if (tenant.fm) modules.push("FM");
  //   if (tenant.visitor_management) modules.push("Visitor Management");
  //   return modules;
  // };
  const getModulesFromObject = (modules: any) => {
    return {
      leasing: {
        can_view: modules?.leasing?.can_view || false,
        can_add: modules?.leasing?.can_add || false,
        can_update: modules?.leasing?.can_update || false,
        can_delete: modules?.leasing?.can_delete || false,
      },
      fm: {
        can_view: modules?.fm?.can_view || false,
        can_add: modules?.fm?.can_add || false,
        can_update: modules?.fm?.can_update || false,
        can_delete: modules?.fm?.can_delete || false,
      },
      visitor_management: {
        can_view: modules?.visitor_management?.can_view || false,
        can_add: modules?.visitor_management?.can_add || false,
        can_update: modules?.visitor_management?.can_update || false,
        can_delete: modules?.visitor_management?.can_delete || false,
      },
    };
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };
  // const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const tenants = fetchedTenants.map((t) => ({
    id: t.tenant_id,
    name: t.tenant_name,
    type: t.industry,
    contactEmail: t.contact_email,
    contactNumber: t.contact_number,
    adminEmail: t.admin_user_email,
    status: t.status,
    modules: getModulesFromObject(t.modules), // helper below
    createdOn: dayjs(t.createdAt).format("MMM D, YYYY"),
    avatar: getInitials(t.tenant_name),
    avatarBg: "bg-blue-600",
  }));
  console.log("tenants", tenants);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    tenant: Tenant | null;
  }>({
    open: false,
    tenant: null,
  });
  const navigate = useNavigate();
  const itemsPerPage = 5;

  // Filter tenants based on search term, status, and type
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || tenant.status.toLowerCase() === statusFilter;
    const matchesType =
      typeFilter === "all" || tenant.type.toLowerCase() === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate pagination
  const totalTenants = filteredTenants.length;
  const totalPages = Math.ceil(totalTenants / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTenants = filteredTenants.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    handleFilterChange();
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
    handleFilterChange();
  };

  const handleCreateTenant = () => {
    setEditingTenant(null);
    setOpenCreateForm(true);
    navigate("/create_tenant");
    // onCreateTenant?.();
  };

  const handleEditTenant = (tenant: Tenant) => {
    navigate(`/edit_tenant/${tenant.id}`, {
      state: {
        tenant: tenant,
      },
    });
  };

  // const handleSaveTenant = (tenantData: Tenant) => {
  //   if (editingTenant) {
  //     // Update existing tenant
  //     setTenants((prev) =>
  //       prev.map((tenant) =>
  //         tenant.id === editingTenant.id
  //           ? { ...tenantData, id: editingTenant.id }
  //           : tenant
  //       )
  //     );
  //   } else {
  //     // Add new tenant
  //     setTenants((prev) => [...prev, { ...tenantData, id: Date.now() }]);
  //   }
  //   // onFormClose?.();
  //   setEditingTenant(null);
  // };

  const handleCancelForm = () => {
    // onFormClose?.();
    setEditingTenant(null);
  };

  const handleDeleteTenant = (tenant: Tenant) => {
    setDeleteDialog({ open: true, tenant });
  };

  const confirmDelete = async () => {
    if (deleteDialog.tenant) {
      try {
        await dispatch(deleteTenantThunk(deleteDialog.tenant.id));
        toast.success("Tenant deleted successfully!");
        dispatch(getTenantsThunk());
      } catch (err) {
        toast.error("Failed to delete tenant");
      }
      setDeleteDialog({ open: false, tenant: null });
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Show form if creating or editing
  // if (openCreateForm) {
  //   return (
  //     <TenantForm
  //       tenant={editingTenant}
  //       onSave={handleSaveTenant}
  //       onCancel={handleCancelForm}
  //       isEdit={!!editingTenant}
  //     />
  //   );
  // }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Tenant Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Manage all tenant accounts and configurations
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm font-medium text-gray-900">John Admin</p>
            <p className="text-xs text-gray-500">Super Administrator</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-white">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-lg ${stat.iconBg}`}>
                    <stat.icon
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Controls */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Button
              onClick={handleCreateTenant}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Tenant
            </Button>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Select
                value={statusFilter}
                onValueChange={handleStatusFilterChange}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tenants..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tenants Table */}
        <Card className="bg-white">
          <CardContent className="p-0">
            {/* Mobile View */}
            <div className="block sm:hidden">
              {currentTenants.map((tenant) => (
                <div key={tenant.id} className="border-b border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${tenant.avatarBg} rounded-full flex items-center justify-center text-white font-medium text-sm`}
                      >
                        {tenant.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {tenant.name}
                        </p>
                        <p className="text-sm text-gray-500">{tenant.type}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditTenant(tenant)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteTenant(tenant)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-gray-900">
                        {tenant.contactEmail}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <Badge
                        className={
                          tenant.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {tenant.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Modules:</span>
                      <span className="text-gray-900">
                        {/* {tenant.modules.join(", ")} */}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="text-gray-900">{tenant.createdOn}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Tenant Name</TableHead>
                    <TableHead>Contact Email</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Modules Enabled</TableHead> */}
                    <TableHead>Created On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 ${tenant.avatarBg} rounded-full flex items-center justify-center text-white font-medium text-sm`}
                          >
                            {tenant.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {tenant.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {tenant.type}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900">
                        {tenant.contactEmail}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            tenant.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {tenant.status}
                        </Badge>
                      </TableCell>
                      {/* <TableCell className="text-gray-900">
                        {tenant.modules.join(", ")}
                      </TableCell> */}
                      <TableCell className="text-gray-900">
                        {tenant.createdOn}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditTenant(tenant)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteTenant(tenant)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, totalTenants)}{" "}
                of {totalTenants} results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers().map((page, index) => (
                  <div key={index}>
                    {page === "..." ? (
                      <span className="px-2 text-gray-500">...</span>
                    ) : (
                      <Button
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        onClick={() => goToPage(page as number)}
                        className={currentPage === page ? "bg-blue-600" : ""}
                      >
                        {page}
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, tenant: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tenant</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteDialog.tenant?.name}? This
              action cannot be undone and will remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
