import React from "react"
import { useState } from "react"
import { Key, Users, Home, Wrench, UserCheck, Info, Check, X } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"

interface ModulePermission {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  iconBg: string
  permissions: {
    view: boolean
    create: boolean
    edit: boolean
    delete: boolean
  }
}

const initialModules: ModulePermission[] = [
  {
    id: "leasing",
    name: "Leasing Management",
    description: "Property leasing and contracts",
    icon: Home,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    permissions: {
      view: true,
      create: true,
      edit: false,
      delete: false,
    },
  },
  {
    id: "facilities",
    name: "Facilities Management",
    description: "Maintenance and facility operations",
    icon: Wrench,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    permissions: {
      view: true,
      create: false,
      edit: true,
      delete: false,
    },
  },
  {
    id: "visitor",
    name: "Visitor Management",
    description: "Guest access and tracking",
    icon: UserCheck,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    permissions: {
      view: true,
      create: true,
      edit: true,
      delete: false,
    },
  },
]

export function PermissionManagement() {
  const [modules, setModules] = useState<ModulePermission[]>(initialModules)
  const [entityType, setEntityType] = useState("")
  const [selectedEntity, setSelectedEntity] = useState("")

  const handlePermissionChange = (
    moduleId: string,
    permission: keyof ModulePermission["permissions"],
    checked: boolean,
  ) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId ? { ...module, permissions: { ...module.permissions, [permission]: checked } } : module,
      ),
    )
  }

  const handleSelectAll = () => {
    setModules((prev) =>
      prev.map((module) => ({
        ...module,
        permissions: {
          view: true,
          create: true,
          edit: true,
          delete: true,
        },
      })),
    )
  }

  const handleClearAll = () => {
    setModules((prev) =>
      prev.map((module) => ({
        ...module,
        permissions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
        },
      })),
    )
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving permissions:", modules)
  }

  const handleCancel = () => {
    // Reset to initial state or handle cancel logic
    setModules(initialModules)
    setEntityType("")
    setSelectedEntity("")
  }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Key className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Permission Management</h1>
            </div>
          </div>
         
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Breadcrumb */}
      

        {/* Main Content */}
        <Card className="bg-white">
          <CardContent className="p-0">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6" />
                <div>
                  <h2 className="text-xl font-semibold">Assign Module Permissions</h2>
                  <p className="text-blue-100 mt-1">Configure access permissions for tenants and users</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Selection Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Select Entity Type</label>
                  <Select value={entityType} onValueChange={setEntityType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose entity type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="role">Role</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Select Tenant</label>
                  <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose tenant or user..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Corp</SelectItem>
                      <SelectItem value="techstart">TechStart Inc</SelectItem>
                      <SelectItem value="global">Global Solutions</SelectItem>
                      <SelectItem value="innovation">Innovation Labs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Module Permissions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Module Permissions</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleSelectAll}>
                      <Check className="h-4 w-4 mr-2" />
                      Select All
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleClearAll}>
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </div>

                {/* Permissions Table */}
                <div className="border rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-blue-600 text-white">
                    <div className="grid grid-cols-6 gap-4 p-4">
                      <div className="col-span-2 font-medium">Module</div>
                      <div className="text-center font-medium">View</div>
                      <div className="text-center font-medium">Create</div>
                      <div className="text-center font-medium">Edit</div>
                      <div className="text-center font-medium">Delete</div>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="bg-white">
                    {modules.map((module, index) => (
                      <div
                        key={module.id}
                        className={`grid grid-cols-6 gap-4 p-4 items-center ${
                          index !== modules.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <div className="col-span-2 flex items-center gap-3">
                          <div className={`w-8 h-8 ${module.iconBg} rounded-lg flex items-center justify-center`}>
                            <module.icon className={`h-4 w-4 ${module.iconColor}`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{module.name}</p>
                            <p className="text-sm text-gray-500">{module.description}</p>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Checkbox
                            checked={module.permissions.view}
                            onCheckedChange={(checked) => handlePermissionChange(module.id, "view", checked as boolean)}
                          />
                        </div>
                        <div className="flex justify-center">
                          <Checkbox
                            checked={module.permissions.create}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(module.id, "create", checked as boolean)
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <Checkbox
                            checked={module.permissions.edit}
                            onCheckedChange={(checked) => handlePermissionChange(module.id, "edit", checked as boolean)}
                          />
                        </div>
                        <div className="flex justify-center">
                          <Checkbox
                            checked={module.permissions.delete}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(module.id, "delete", checked as boolean)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    Save Permissions
                  </Button>
                </div>
              </div>

              {/* Permission Guidelines */}
              <Card className="bg-blue-50 border-blue-200 mt-6">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Permission Guidelines</h4>
                      <p className="text-sm text-blue-800">
                        Changes will take effect immediately. Users will need to refresh their session to see updated
                        permissions. Removing permissions may restrict access to certain features.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
