import React from "react"

import { ArrowLeft, Building2, Eye, EyeOff, Info, Users, Phone, Settings, FileText } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { Textarea } from "../components/ui/textarea"
import { useState, useEffect } from "react"

interface Tenant {
  id?: number
  name: string
  type: string
  contactEmail: string
  contactNumber: string
  adminEmail: string
  adminPassword?: string
  status: string
  modules: string[]
  createdOn: string
  avatar: string
  avatarBg: string
  notes?: string
}

interface TenantFormProps {
  tenant?: Tenant | null
  onSave: (tenant: Tenant) => void
  onCancel: () => void
  isEdit?: boolean
}

const moduleOptions = [
  { id: "leasing", label: "Leasing Management" },
  { id: "facility", label: "Facility Management" },
  { id: "visitor", label: "Visitor Management" },
]

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
]

export function TenantForm({ tenant, onSave, onCancel, isEdit = false }: TenantFormProps) {
  const [formData, setFormData] = useState<Tenant>({
    name: "",
    type: "",
    contactEmail: "",
    contactNumber: "",
    adminEmail: "",
    adminPassword: "",
    status: "Active",
    modules: [],
    createdOn: "",
    avatar: "",
    avatarBg: "",
    notes: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (tenant && isEdit) {
      setFormData({
        ...tenant,
        adminPassword: "", // Don't pre-fill password for security
      })
    }
  }, [tenant, isEdit])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Tenant name is required"
    }

    if (!formData.type.trim()) {
      newErrors.type = "Industry is required"
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address"
    }

    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = "Admin email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
      newErrors.adminEmail = "Please enter a valid admin email address"
    }

    if (!isEdit && !formData.adminPassword) {
      newErrors.adminPassword = "Admin password is required"
    } else if (formData.adminPassword && formData.adminPassword.length < 8) {
      newErrors.adminPassword = "Password must be at least 8 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const tenantData = {
        ...formData,
        id: tenant?.id || Date.now(),
        createdOn:
          tenant?.createdOn ||
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
      }

      // Generate avatar and background if not provided
      if (!tenantData.avatar) {
        const names = tenantData.name.split(" ")
        tenantData.avatar =
          names.length > 1
            ? `${names[0][0]}${names[1][0]}`.toUpperCase()
            : tenantData.name.substring(0, 2).toUpperCase()
      }

      if (!tenantData.avatarBg) {
        const colors = ["bg-blue-600", "bg-green-600", "bg-purple-600", "bg-orange-600", "bg-red-600"]
        tenantData.avatarBg = colors[Math.floor(Math.random() * colors.length)]
      }

      onSave(tenantData)
    }
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleModuleChange = (moduleId: string, checked: boolean) => {
    const moduleLabel = moduleOptions.find((m) => m.id === moduleId)?.label || moduleId
    if (checked) {
      handleInputChange("modules", [...formData.modules, moduleLabel])
    } else {
      handleInputChange(
        "modules",
        formData.modules.filter((m) => m !== moduleLabel),
      )
    }
  }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Tenant</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Add a new tenant to the system with their configuration details
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm font-medium text-gray-900">Super Admin</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Form */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Tenant Name*
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter tenant name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                      Industry*
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger className={errors.type ? "border-red-500" : ""}>
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
                    {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700">
                      Contact Email*
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@company.com"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      className={errors.contactEmail ? "border-red-500" : ""}
                    />
                    {errors.contactEmail && <p className="text-sm text-red-600">{errors.contactEmail}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">
                      Contact Number
                    </Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Admin Account */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Admin Account</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail" className="text-sm font-medium text-gray-700">
                      Admin Email*
                    </Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="admin@company.com"
                      value={formData.adminEmail}
                      onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                      className={errors.adminEmail ? "border-red-500" : ""}
                    />
                    {errors.adminEmail && <p className="text-sm text-red-600">{errors.adminEmail}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword" className="text-sm font-medium text-gray-700">
                      Admin Password{!isEdit && "*"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="adminPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder={isEdit ? "Leave blank to keep current password" : "Enter password"}
                        value={formData.adminPassword}
                        onChange={(e) => handleInputChange("adminPassword", e.target.value)}
                        className={errors.adminPassword ? "border-red-500 pr-10" : "pr-10"}
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
                    {errors.adminPassword && <p className="text-sm text-red-600">{errors.adminPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Modules & Configuration */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Modules & Configuration</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Modules Enabled*</Label>
                    <div className="space-y-3">
                      {moduleOptions.map((module) => (
                        <div key={module.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={module.id}
                            checked={formData.modules.includes(module.label)}
                            onCheckedChange={(checked) => handleModuleChange(module.id, checked as boolean)}
                          />
                          <Label htmlFor={module.id} className="text-sm font-normal">
                            {module.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                      Status*
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
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
              </div>

              {/* Additional Notes */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Additional Notes</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any additional notes or special requirements..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button type="button" variant="outline" onClick={onCancel} className="sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 sm:w-auto">
                  <Building2 className="h-4 w-4 mr-2" />
                  {isEdit ? "Update Tenant" : "Save Tenant"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
