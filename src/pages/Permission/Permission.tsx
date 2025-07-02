// import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import {
//   fetchPagesThunk,
//   createRoleThunk,
//   resetPermissionState,
// } from "../../store/slices/permissionSlice";
// import { Button } from "../../components/ui/button";
// import { Input } from "../../components/ui/input";
// import { Label } from "../../components/ui/label";
// import toast from "react-hot-toast";
// import { PageHeader } from "../../components/header";

// export function PermissionManagement() {
//   const dispatch = useAppDispatch();
//   const { pages, loading, success, error } = useAppSelector(
//     (state) => state.permission
//   );

//   const [roleName, setRoleName] = useState("");
//   const [permissions, setPermissions] = useState<{ [key: string]: any }>({});

//   const [roleError, setRoleError] = useState("");
//   useEffect(() => {
//     dispatch(fetchPagesThunk());
//   }, []);

//   // useEffect(() => {
//   //   if (success) {
//   //     toast.success("Role created successfully!");
//   //     dispatch(resetPermissionState());
//   //     setRoleName("");
//   //     setPermissions({});
//   //   }
//   //   if (error) toast.error(error);
//   // }, [success, error]);

//   const handleCheckboxChange = (
//     pageId: string,
//     field: string,
//     checked: boolean
//   ) => {
//     setPermissions((prev) => ({
//       ...prev,
//       [pageId]: {
//         ...prev[pageId],
//         [field]: checked,
//       },
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!roleName.trim()) {
//       setRoleError("Role name is required.");
//       return;
//     }
//     const permissionArray = Object.entries(permissions).map(
//       ([page_id, perms]) => ({
//         page_id,
//         can_view: perms.can_view || false,
//         can_edit: perms.can_edit || false,
//         can_update: perms.can_update || false,
//         can_delete: perms.can_delete || false,
//       })
//     );

//     dispatch(
//       createRoleThunk({ role_name: roleName, permissions: permissionArray })
//     );
//   };
//   const handleRoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setRoleName(value);

//     if (!value.trim()) {
//       setRoleError("Role name is required.");
//     } else {
//       setRoleError(""); // Clear error if valid
//     }
//   };

//   return (
//     <div className="w-full bg-gray-50">
//       <PageHeader
//         title="Permission Management"
//         subtitle="Assign Module Permissions"
//         // icon={<FileText />}
//         showMobileSidebarTrigger
//       />
//       <div className="p-6  mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Create Role</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             {/* <Label htmlFor="roleName">Role Name</Label>
//           <Input
//             id="roleName"
//             value={roleName}
//             onChange={(e) => setRoleName(e.target.value)}
//             required
//           /> */}
//             <Label
//               htmlFor="roleName"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Role Name*
//             </Label>
//             <Input
//               type="text"
//               id="roleName"
//               value={roleName}
//               onChange={handleRoleNameChange}
//               className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 roleError ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter role name"
//             />
//             {roleError && <p className="text-sm text-red-600">{roleError}</p>}
//           </div>

//           {/* <div className="space-y-4">
//           {pages.map((page) => (
//             <div key={page.id} className="border p-4 rounded-md">
//               <h4 className="font-semibold mb-2">{page.name}</h4>
//               <div className="flex gap-4">
//                 {["can_view", "can_edit", "can_update", "can_delete"].map(
//                   (perm) => (
//                     <label key={perm} className="flex items-center gap-1">
//                       <input
//                         type="checkbox"
//                         checked={permissions[page.id]?.[perm] || false}
//                         onChange={(e) =>
//                           handleCheckboxChange(page.id, perm, e.target.checked)
//                         }
//                       />
//                       <span className="capitalize">
//                         {perm.replace("can_", "")}
//                       </span>
//                     </label>
//                   )
//                 )}
//               </div>
//             </div>
//           ))}
//         </div> */}
//           <div className="w-full">
//             <table className="min-w-full border text-sm text-left text-gray-700">
//               <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-700">
//                 <tr>
//                   <th className="px-4 py-2 border">Module</th>
//                   <th className="px-4 py-2 border text-center">View</th>
//                   <th className="px-4 py-2 border text-center">Add</th>
//                   <th className="px-4 py-2 border text-center">Update</th>
//                   <th className="px-4 py-2 border text-center">Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pages.map((page) => (
//                   <tr key={page.id} className="border-t">
//                     <td className="px-4 py-2 border font-medium">
//                       {page.name}
//                     </td>
//                     {["can_view", "can_edit", "can_update", "can_delete"].map(
//                       (perm) => (
//                         <td key={perm} className="px-4 py-2 border text-center">
//                           <input
//                             type="checkbox"
//                             checked={permissions[page.id]?.[perm] || false}
//                             onChange={(e) =>
//                               handleCheckboxChange(
//                                 page.id,
//                                 perm,
//                                 e.target.checked
//                               )
//                             }
//                             className="h-4 w-4"
//                           />
//                         </td>
//                       )
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
//             Create Role
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

/////////////////////////////

// PermissionRolesUI.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchPagesThunk,
  fetchRolesThunk,
  upsertRoleThunk,
  deleteRoleThunk,
} from "../../store/slices/permissionSlice";
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
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { PageHeader } from "../../components/header";

const PermissionManagement = () => {
  const dispatch = useAppDispatch();
  const { pages, roles, success } = useAppSelector((state) => state.permission);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<any>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchPagesThunk());
    dispatch(fetchRolesThunk());
    setRoleName("");
    setPermissions({});
    setSelectedRoleId("");
  }, [success]);

  useEffect(() => {
    const role = roles.find((r) => r.id === selectedRoleId);
    if (role) {
      setRoleName(role.name);
      const perms: any = {};
      role.permissions.forEach((perm) => {
        perms[perm.page_id] = {
          can_view: perm.can_view,
          can_edit: perm.can_edit,
          can_update: perm.can_update,
          can_delete: perm.can_delete,
        };
      });
      setPermissions(perms);
    } else {
      setRoleName("");
      setPermissions({});
    }
  }, [selectedRoleId]);

  const handleCheckboxChange = (
    pageId: string,
    perm: string,
    checked: boolean
  ) => {
    setPermissions((prev: any) => ({
      ...prev,
      [pageId]: {
        ...prev[pageId],
        [perm]: checked,
      },
    }));
  };

  const handleSubmit = () => {
    if (!roleName.trim()) return alert("Role name is required");
    const permsArray = pages.map((p) => ({
      page_id: p.id,
      can_view: permissions[p.id]?.can_view || false,
      can_edit: permissions[p.id]?.can_edit || false,
      can_update: permissions[p.id]?.can_update || false,
      can_delete: permissions[p.id]?.can_delete || false,
    }));
    dispatch(
      upsertRoleThunk({
        role_name: roleName,
        role_id: selectedRoleId || undefined,
        permissions: permsArray,
      })
    );
  };

  const handleDelete = () => {
    if (selectedRoleId) {
      dispatch(deleteRoleThunk(selectedRoleId));
      setSelectedRoleId("");
      setRoleName("");
      setPermissions({});
    }
  };

  return (
    <div className="w-full bg-gray-50">
      <PageHeader
        title="Permission Management"
        subtitle="Assign Module Permissions"
        // icon={<FileText />}
        showMobileSidebarTrigger
      />
      <div className="mt-[20px] px-6 text-[22px] font-[500]">
        {selectedRoleId ? "Update Role" : "Create Role"}
      </div>
      <div className="space-y-6 mt-[10px] px-6 py-2">
        <div className="flex items-center gap-4">
          <Select onValueChange={setSelectedRoleId} value={selectedRoleId}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            className="w-64"
            placeholder="Enter role name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />

          <Button onClick={handleSubmit}>
            {selectedRoleId ? "Update Role" : "Create Role"}
          </Button>
          {selectedRoleId && (
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete Role
            </Button>
          )}
          {selectedRoleId && (
            <Button className="ml-[30px]" onClick={() => setSelectedRoleId("")}>
              Create New Role
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Module</th>
                {["can_view", "can_edit", "can_update", "can_delete"].map(
                  (perm) => (
                    <th key={perm} className="px-4 py-2 border text-center">
                      {perm.replace("can_", "")}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-t">
                  <td className="px-4 py-2 border font-medium">{page.name}</td>
                  {["can_view", "can_edit", "can_update", "can_delete"].map(
                    (perm) => (
                      <td key={perm} className="px-4 py-2 border text-center">
                        <input
                          type="checkbox"
                          checked={permissions[page.id]?.[perm] || false}
                          onChange={(e) =>
                            handleCheckboxChange(
                              page.id,
                              perm,
                              e.target.checked
                            )
                          }
                          className="h-4 w-4"
                        />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertDialog
          open={showDeleteConfirm}
          onOpenChange={setShowDeleteConfirm}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this role?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default PermissionManagement;
