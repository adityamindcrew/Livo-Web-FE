import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Building2,
  Eye,
  EyeOff,
  Info,
  Users,
  Phone,
  Settings,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Textarea } from "../../components/ui/textarea";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  editTenantThunk,
  resetTenantState,
} from "../../store/slices/tenantSlice";

interface Tenant {
  id?: number;
  name: string;
  type: string;
  contactEmail: string;
  contactNumber: string;
  adminEmail: string;
  adminPassword?: string;
  status: string;
  modules: {
    leasing: {
      can_view: boolean;
      can_add: boolean;
      can_update: boolean;
      can_delete: boolean;
    };
    fm: {
      can_view: boolean;
      can_add: boolean;
      can_update: boolean;
      can_delete: boolean;
    };
    visitor_management: {
      can_view: boolean;
      can_add: boolean;
      can_update: boolean;
      can_delete: boolean;
    };
  };
  createdOn: string;
  avatar: string;
  avatarBg: string;
  notes?: string;
}

const moduleOptions = [
  { id: "leasing", label: "Leasing Management" },
  { id: "facility", label: "Facility Management" },
  { id: "visitor", label: "Visitor Management" },
];

const industryOptions = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Consulting",
  "Other",
];

const EditTenant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location);
  const ten = location.state?.tenant;
  const dispatch = useAppDispatch();
  const { loading, error, editSuccess } = useAppSelector(
    (state) => state.tenant
  );

  // Redirect on success
  useEffect(() => {
    if (editSuccess) {
      alert("Tenant updated successfully!");
      dispatch(resetTenantState());
      navigate("/tenants");
    }
  }, [editSuccess]);
  console.log("ten", ten);
  const getInitialModules = (modules: any) => ({
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
  });

  const [formData, setFormData] = useState<Tenant>({
    name: ten?.name || "",
    type: ten?.type || "",
    contactEmail: ten?.contactEmail || "",
    contactNumber: ten?.contactNumber || "",
    adminEmail: ten?.adminEmail || "",
    adminPassword: ten?.adminPassword || "",
    status: ten?.status || "",
    modules: getInitialModules(ten?.modules),
    createdOn: ten?.createdOn || "",
    avatar: ten?.avatar || "",
    avatarBg: ten?.avatarBg || "",
    notes: ten?.notes || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // const handleModuleChange = (moduleId: string, checked: boolean) => {
  //   const label =
  //     moduleOptions.find((m) => m.id === moduleId)?.label || moduleId;
  //   if (checked) {
  //     handleInputChange("modules", [...formData.modules, label]);
  //   } else {
  //     handleInputChange(
  //       "modules",
  //       formData.modules.filter((m) => m !== label)
  //     );
  //   }
  // };
  const handleModuleChange = (moduleId: string, checked: boolean) => {
    if (moduleId === "leasing") {
      setFormData((prev) => ({ ...prev, leasing: checked }));
    } else if (moduleId === "facility") {
      setFormData((prev) => ({ ...prev, fm: checked }));
    } else if (moduleId === "visitor") {
      setFormData((prev) => ({ ...prev, visitor_management: checked }));
    }

    // Optional: Clear error on change
    if (errors.modules) {
      setErrors((prev) => ({ ...prev, modules: "" }));
    }
  };
  const handleModulePermissionChange = (
    module: string,
    permission: keyof typeof formData.modules.leasing,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [module]: {
          ...prev.modules[module],
          [permission]: checked,
        },
      },
    }));
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = "Tenant name is required.";
    if (!formData.type) newErrors.type = "Industry is required.";
    if (!formData.contactEmail?.trim()) {
      newErrors.contactEmail = "Contact email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format.";
    }
    if (!formData.adminEmail?.trim()) {
      newErrors.adminEmail = "Admin email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = "Invalid email format.";
    }
    if (formData.adminPassword && formData.adminPassword.length < 6) {
      newErrors.adminPassword = "Password must be at least 6 characters.";
    }

    // if (!formData.leasing && !formData.fm && !formData.visitor_management) {
    //   newErrors.modules = "At least one module must be selected.";
    // }
    if (!formData.status) newErrors.status = "Status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("formData", formData);

    e.preventDefault();
    // if (!validateForm()) return;

    const payload = {
      tenant_name: formData.name,
      admin_user_email: formData.adminEmail,
      admin_user_password: formData.adminPassword || "",
      contact_email: formData.contactEmail,
      contact_number: formData.contactNumber,
      industry: formData.type,
      modules: formData.modules,
      status: formData.status,
      notes: formData.notes || "",
      // createdAt: ten.createdOn,
      // updatedAt: new Date().toISOString(),
    };
    console.log("payload", payload);

    dispatch(editTenantThunk({ tenantId: ten.id, payload }));
  };

  return (
    <div className="flex pb-2 flex-col flex-1 min-h-full bg-gray-50">
      <div className="flex-1 bg-gray-50">
        <div className="bg-white border-b px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Edit Tenant</h1>
          </div>
        </div>

        <div className="p-4  sm:p-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Basic Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Tenant Name*
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter tenant name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="type"
                        className="text-sm font-medium text-gray-700"
                      >
                        Industry*
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) =>
                          handleInputChange("type", value)
                        }
                      >
                        <SelectTrigger
                          className={errors.type ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryOptions.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <p className="text-sm text-red-600">{errors.type}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Contact Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="contactEmail"
                        className="text-sm font-medium text-gray-700"
                      >
                        Contact Email*
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="contact@company.com"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          handleInputChange("contactEmail", e.target.value)
                        }
                        className={errors.contactEmail ? "border-red-500" : ""}
                      />
                      {errors.contactEmail && (
                        <p className="text-sm text-red-600">
                          {errors.contactEmail}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="contactNumber"
                        className="text-sm font-medium text-gray-700"
                      >
                        Contact Number
                      </Label>
                      <Input
                        id="contactNumber"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.contactNumber}
                        onChange={(e) =>
                          handleInputChange("contactNumber", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Admin Account
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="adminEmail"
                        className="text-sm font-medium text-gray-700"
                      >
                        Admin Email*
                      </Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@company.com"
                        value={formData.adminEmail}
                        onChange={(e) =>
                          handleInputChange("adminEmail", e.target.value)
                        }
                        className={errors.adminEmail ? "border-red-500" : ""}
                      />
                      {errors.adminEmail && (
                        <p className="text-sm text-red-600">
                          {errors.adminEmail}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="adminPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Admin Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="adminPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder={"Enter password"}
                          value={formData.adminPassword}
                          onChange={(e) =>
                            handleInputChange("adminPassword", e.target.value)
                          }
                          className={
                            errors.adminPassword
                              ? "border-red-500 pr-10"
                              : "pr-10"
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                      {errors.adminPassword && (
                        <p className="text-sm text-red-600">
                          {errors.adminPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Modules & Configuration
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">
                        Modules Enabled*
                      </Label>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="leasing"
                            checked={formData.leasing}
                            onChange={(e) =>
                              handleModuleChange("leasing", e.target.checked)
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="leasing"
                            className="text-sm text-gray-700"
                          >
                            Leasing Management
                          </label>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="facility"
                            checked={formData.fm}
                            onChange={(e) =>
                              handleModuleChange("facility", e.target.checked)
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="facility"
                            className="text-sm text-gray-700"
                          >
                            Facility Management
                          </label>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="visitor"
                            checked={formData.visitor_management}
                            onChange={(e) =>
                              handleModuleChange("visitor", e.target.checked)
                            }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="visitor"
                            className="text-sm text-gray-700"
                          >
                            Visitor Management
                          </label>
                        </div>
                      </div>

                      {errors.modules && (
                        <p className="text-sm text-red-600">{errors.modules}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="status"
                        className="text-sm font-medium text-gray-700"
                      >
                        Status*
                      </Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          handleInputChange("status", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div> */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Module Permissions
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-200 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left p-2 border">Module</th>
                          <th className="p-2 border text-center">View</th>
                          <th className="p-2 border text-center">Add</th>
                          <th className="p-2 border text-center">Update</th>
                          <th className="p-2 border text-center">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {["leasing", "fm", "visitor_management"].map(
                          (moduleKey) => (
                            <tr key={moduleKey} className="border-t">
                              <td className="p-2 font-medium capitalize text-gray-700 border">
                                {moduleKey.replace("_", " ")}
                              </td>
                              {[
                                "can_view",
                                "can_add",
                                "can_update",
                                "can_delete",
                              ].map((perm) => (
                                <td
                                  key={perm}
                                  className="p-2 text-center border"
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      formData.modules[moduleKey][
                                        perm as keyof typeof formData.modules.leasing
                                      ]
                                    }
                                    onChange={(e) =>
                                      handleModulePermissionChange(
                                        moduleKey,
                                        perm as keyof typeof formData.modules.leasing,
                                        e.target.checked
                                      )
                                    }
                                    className="h-4 w-4"
                                  />
                                </td>
                              ))}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="status"
                    className="text-sm font-medium text-gray-700"
                  >
                    Status*
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Additional Notes
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="notes"
                      className="text-sm font-medium text-gray-700"
                    >
                      Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any additional notes or special requirements..."
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      className="min-h-[120px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                  <Button type="button" variant="outline" className="sm:w-auto">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 sm:w-auto"
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    {"Save Tenant"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditTenant;
