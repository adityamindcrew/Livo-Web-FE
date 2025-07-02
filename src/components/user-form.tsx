import React from "react"

import { ArrowLeft, Users, Eye, EyeOff, Info } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { useState, useEffect } from "react"

interface User {
  id?: number
  fullName: string
  email: string
  password?: string
  role: string
  tenant: string
  status: string
  avatar?: string | null
}

interface UserFormProps {
  user?: User | null
  onSave: (user: User) => void
  onCancel: () => void
  isEdit?: boolean
}

export function UserForm({ user, onSave, onCancel, isEdit = false }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    fullName: "",
    email: "",
    password: "",
    role: "",
    tenant: "",
    status: "Active",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (user && isEdit) {
      setFormData({
        ...user,
        password: "", // Don't pre-fill password for security
      })
    }
  }, [user, isEdit])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!isEdit && !formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!formData.role) {
      newErrors.role = "Role is required"
    }

    if (!formData.tenant) {
      newErrors.tenant = "Tenant is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      const userData = {
        ...formData,
        id: user?.id || Date.now(), // Use existing ID or generate new one
      }

      // Generate avatar initials if not provided
      if (!userData.avatar) {
        const names = userData.fullName.split(" ")
        userData.avatar =
          names.length > 1
            ? `${names[0][0]}${names[1][0]}`.toUpperCase()
            : userData.fullName.substring(0, 2).toUpperCase()
      }

      onSave(userData)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Create or edit system user</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm font-medium text-gray-900">Super Admin</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-2xl mx-auto">
        {/* Form Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{isEdit ? "Edit User" : "Create New User"}</h2>
              <p className="text-gray-600 text-sm">
                {isEdit
                  ? "Update user information and permissions"
                  : "Add a new user to the system with appropriate permissions"}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name*
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address*
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password{!isEdit && "*"}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isEdit ? "Leave blank to keep current password" : "Enter password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
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
                {!errors.password && (
                  <p className="text-sm text-gray-500">Password must be at least 8 characters long</p>
                )}
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Assign Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Assign Role*
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}
              </div>

              {/* Assign Tenant */}
              <div className="space-y-2">
                <Label htmlFor="tenant" className="text-sm font-medium text-gray-700">
                  Assign Tenant*
                </Label>
                <Select value={formData.tenant} onValueChange={(value) => handleInputChange("tenant", value)}>
                  <SelectTrigger className={errors.tenant ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                    <SelectItem value="TechStart Inc">TechStart Inc</SelectItem>
                    <SelectItem value="Global Solutions">Global Solutions</SelectItem>
                    <SelectItem value="Innovation Labs">Innovation Labs</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tenant && <p className="text-sm text-red-600">{errors.tenant}</p>}
              </div>

              {/* Status */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Status*</Label>
                <RadioGroup
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Active" id="active" />
                    <Label htmlFor="active" className="text-sm font-normal">
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Inactive" id="inactive" />
                    <Label htmlFor="inactive" className="text-sm font-normal">
                      Inactive
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Required Fields Note */}
              <p className="text-sm text-gray-500">*Required fields</p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} className="sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 sm:w-auto">
                  <Users className="h-4 w-4 mr-2" />
                  {isEdit ? "Update User" : "Save User"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* User Creation Guidelines */}
        <Card className="bg-blue-50 border-blue-200 mt-6">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 mb-2">User Creation Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Users will receive an email notification with login credentials</li>
                  <li>• Role permissions can be modified later from the user management panel</li>
                  <li>• Inactive users cannot access the system until reactivated</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
