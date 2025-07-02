import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { UserForm } from "../../components/user-form";
import { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteUserThunk, fetchUsersThunk } from "../../store/slices/userSlice";
import { fetchRolesThunk } from "../../store/slices/permissionSlice";

interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  role: string;
  // tenant: string;
  status: string;
  avatar?: string | null;
}

// const initialUsers: User[] = [
//   {
//     id: 1,
//     fullName: "Sarah Johnson",
//     email: "sarah.johnson@acmecorp.com",
//     role: "Admin",
//     tenant: "Acme Corp",
//     status: "Active",
//     avatar: null,
//   },
//   {
//     id: 2,
//     fullName: "Michael Chen",
//     email: "michael.chen@techstart.com",
//     role: "Manager",
//     tenant: "TechStart Inc",
//     status: "Active",
//     avatar: "MC",
//   },
//   {
//     id: 3,
//     fullName: "Emily Rodriguez",
//     email: "emily.rodriguez@global.com",
//     role: "User",
//     tenant: "Global Solutions",
//     status: "Inactive",
//     avatar: null,
//   },
//   {
//     id: 4,
//     fullName: "David Wilson",
//     email: "david.wilson@innovation.com",
//     role: "Super Admin",
//     tenant: "Innovation Labs",
//     status: "Active",
//     avatar: null,
//   },
//   {
//     id: 5,
//     fullName: "Lisa Thompson",
//     email: "lisa.thompson@acmecorp.com",
//     role: "User",
//     tenant: "Acme Corp",
//     status: "Active",
//     avatar: null,
//   },
// ];

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-purple-100 text-purple-800";
    case "Manager":
      return "bg-blue-100 text-blue-800";
    case "User":
      return "bg-green-100 text-green-800";
    case "Super Admin":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusBadgeColor = (status: string) => {
  return status === "Active"
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
};

export function UserManagement() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersThunk());
    dispatch(fetchRolesThunk());
  }, [dispatch]);
  const { users, loading, error } = useAppSelector((state) => state.user);
  // const [users, setUsers] = useState<User[]>(initialUsers);
  const { roles } = useAppSelector((state) => state.permission);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [tenantFilter, setTenantFilter] = useState("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    user: User | null;
  }>({
    open: false,
    user: null,
  });
  const navigate = useNavigate();
  const itemsPerPage = 5;

  // Filter users based on search term, role, and tenant
  // const filteredUsers = users.filter((user) => {
  //   const matchesSearch =
  //     user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesRole =
  //     roleFilter === "all" ||
  //     user.role.toLowerCase().replace(" ", "-") === roleFilter;
  //   const matchesTenant =
  //     tenantFilter === "all" ||
  //     user.tenant.toLowerCase().replace(" ", "").includes(tenantFilter);

  //   return matchesSearch && matchesRole && matchesTenant;
  // });
  console.log(users, "user");

  // const filteredUsers =
  //   users &&
  //   users
  //   .filter((user) => {
  //     const fullName = user.full_name || "";
  //     const email = user.email || "";
  //     const roleName = user.role?.name?.toLowerCase() || "";
  //     // const tenantName = user.tenant?.toLowerCase() || "";

  //     const matchesSearch =
  //       fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       email.toLowerCase().includes(searchTerm.toLowerCase());

  //     const matchesRole =
  //       roleFilter === "all" || roleName.replace(" ", "-") === roleFilter;

  //     // const matchesTenant =
  //     //   tenantFilter === "all" || tenantName.includes(tenantFilter.toLowerCase());

  //     // return matchesSearch && matchesRole && matchesTenant;
  //     return matchesSearch && matchesRole;
  //   });
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) => {
        const fullName = user.full_name || "";
        const email = user.email || "";
        const roleName = user.role?.name?.toLowerCase() || "";
        const matchesSearch =
          fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(searchTerm.toLowerCase());

        // const matchesRole =
        //   roleFilter === "all" || roleName.replace(" ", "-") === roleFilter;
        const matchesRole =
          roleFilter === "all" || roleName.replace(/\s+/g, "-") === roleFilter;

        return matchesSearch && matchesRole;
      })
    : [];

  // Calculate pagination
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    handleFilterChange();
  };

  const handleTenantFilterChange = (value: string) => {
    setTenantFilter(value);
    handleFilterChange();
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    navigate("/create_user");
    // onFormOpen?.();
  };

  const handleEditUser = (user: User) => {
    navigate(`/edit_user`, {
      state: {
        user: user,
      },
    });
    // onFormOpen?.();
  };

  // const handleSaveUser = (userData: User) => {
  //   if (editingUser) {
  //     // Update existing user
  //     setUsers((prev) =>
  //       prev.map((user) =>
  //         user.id === editingUser.id
  //           ? { ...userData, id: editingUser.id }
  //           : user
  //       )
  //     );
  //   } else {
  //     // Add new user
  //     setUsers((prev) => [...prev, { ...userData, id: Date.now() }]);
  //   }
  //   // onFormClose?.();
  //   setEditingUser(null);
  // };

  // const handleCancelForm = () => {
  //   // onFormClose?.();
  //   setEditingUser(null);
  // };

  const handleDeleteUser = (user: User) => {
    setDeleteDialog({ open: true, user });
  };

  const confirmDelete = () => {
    console.log("deleteDialog.user?.user_id", deleteDialog.user);

    if (deleteDialog.user?.user_id) {
      dispatch(deleteUserThunk(deleteDialog.user.user_id));
      setDeleteDialog({ open: false, user: null });
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
  //   if (showForm) {
  //     return <UserForm user={editingUser} onSave={handleSaveUser} onCancel={handleCancelForm} isEdit={!!editingUser} />
  //   }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Manage system-wide users and permissions
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm font-medium text-gray-900">John Admin</p>
            <p className="text-xs text-gray-500">Super Administrator</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Controls */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Button
              onClick={handleCreateUser}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create User
            </Button>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="super-admin">Super Admin</SelectItem> */}
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem
                        key={role.id}
                        value={role.name.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectContent>
              </Select>

              {/* <Select
                value={tenantFilter}
                onValueChange={handleTenantFilterChange}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Tenants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tenants</SelectItem>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="techstart">TechStart Inc</SelectItem>
                  <SelectItem value="global">Global Solutions</SelectItem>
                  <SelectItem value="innovation">Innovation Labs</SelectItem>
                </SelectContent>
              </Select> */}

              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <Card className="bg-white">
          <CardContent className="p-0">
            {/* Mobile View */}
            <div className="block sm:hidden">
              {currentUsers &&
                currentUsers.map((user) => (
                  <div
                    key={user.user_id}
                    className="border-b border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {/* {user?.avatar ? (
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {user?.avatar}
                        </div>
                      ) : ( */}
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        {/* )} */}
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.full_name}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteUser(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Role:</span>
                        <Badge className={getRoleBadgeColor(user.role?.name)}>
                          {user.role?.name}
                        </Badge>
                      </div>
                      {/* <div className="flex justify-between">
                      <span className="text-gray-500">Tenant:</span>
                      <span className="text-gray-900">{user.tenant}</span>
                    </div> */}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <Badge className={getStatusBadgeColor(user.status)}>
                          {user.status}
                        </Badge>
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
                    <TableHead className="w-[250px]">Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    {/* <TableHead>Tenant</TableHead> */}
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers &&
                    currentUsers.map((user) => (
                      <TableRow key={user.user_id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {/* {user.avatar ? (
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                              {user.avatar}
                            </div>
                          ) : ( */}
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <Users className="h-4 w-4 text-gray-600" />
                            </div>
                            {/* )} */}
                            <span className="font-medium text-gray-900">
                              {user.full_name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-900">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            // className={getRoleBadgeColor(user.role?.name)}
                            className="bg-gray-100 text-gray-800"
                          >
                            {user.role?.name}
                          </Badge>
                        </TableCell>
                        {/* <TableCell className="text-gray-900">
                        {user.tenant}
                      </TableCell> */}
                        <TableCell>
                          <Badge className={getStatusBadgeColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, totalUsers)} of{" "}
                {totalUsers} results
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
        onOpenChange={(open) => setDeleteDialog({ open, user: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteDialog.user?.fullName}?
              This action cannot be undone.
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
