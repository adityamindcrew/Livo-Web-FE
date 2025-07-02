"use client";

import {
  Building2,
  TrendingUp,
  Users,
  Plus,
  Shield,
  CheckCircle,
  UserPlus,
  Building,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { SidebarTrigger } from "../components/ui/sidebar";
import React from "react";
import { PageHeader } from "../components/header";

const stats = [
  {
    title: "Total Tenants",
    value: "247",
    change: "+12%",
    changeType: "positive",
    icon: Building2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    description: "from last month",
  },
  {
    title: "Total Users",
    value: "1,847",
    change: "+15%",
    changeType: "positive",
    icon: Users,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    description: "from last month",
  },
  {
    title: "Active Tenants",
    value: "198",
    change: "+8%",
    changeType: "positive",
    icon: TrendingUp,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    description: "from last month",
  },
];

const recentTenants = [
  {
    name: "TechCorp Solutions",
    email: "admin@techcorp.com",
    createdAt: "2 hours ago",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    avatar: "TC",
    avatarBg: "bg-blue-600",
  },
  {
    name: "Digital Innovations",
    email: "contact@digital.com",
    createdAt: "5 hours ago",
    status: "Inactive",
    statusColor: "bg-yellow-100 text-yellow-800",
    avatar: "DI",
    avatarBg: "bg-purple-600",
  },
  {
    name: "StartupHub Inc",
    email: "hello@startuphub.com",
    createdAt: "1 day ago",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    avatar: "SH",
    avatarBg: "bg-green-600",
  },
  {
    name: "CloudTech Systems",
    email: "info@cloudtech.com",
    createdAt: "2 days ago",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    avatar: "CS",
    avatarBg: "bg-orange-600",
  },
];

const recentUsers = [
  {
    name: "Sarah Johnson",
    email: "sarah@acme.com",
    role: "Admin",
    tenant: "Acme Corp",
    createdAt: "1 hour ago",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    email: "michael@techstart.com",
    role: "Manager",
    tenant: "TechStart Inc",
    createdAt: "3 hours ago",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    email: "emily@global.com",
    role: "User",
    tenant: "Global Solutions",
    createdAt: "6 hours ago",
    avatar: "ER",
  },
];

const recentActivity = [
  {
    type: "tenant_created",
    message: "New tenant 'TechCorp Solutions' was created",
    time: "2 hours ago",
    icon: Building,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    type: "user_added",
    message: "Sarah Johnson was added to Acme Corp",
    time: "1 hour ago",
    icon: UserPlus,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    type: "system_update",
    message: "System maintenance completed successfully",
    time: "3 hours ago",
    icon: CheckCircle,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    type: "security_alert",
    message: "Security scan completed - no issues found",
    time: "5 hours ago",
    icon: Shield,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
];

const systemMetrics = [
  {
    name: "CPU Usage",
    value: 45,
    status: "good",
    color: "bg-green-500",
  },
  {
    name: "Memory Usage",
    value: 67,
    status: "warning",
    color: "bg-yellow-500",
  },
  {
    name: "Storage Usage",
    value: 23,
    status: "good",
    color: "bg-green-500",
  },
  {
    name: "Network Load",
    value: 34,
    status: "good",
    color: "bg-green-500",
  },
];

const quickActions = [
  {
    title: "Add New Tenant",
    description: "Create a new tenant account",
    icon: Plus,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    action: "add_tenant",
  },
  {
    title: "View Reports",
    description: "Access analytics and reports",
    icon: BarChart3,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    action: "reports",
  },
  {
    title: "User Management",
    description: "Manage user accounts",
    icon: Users,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    action: "users",
  },
];

export default function DashboardContent() {
  // const handleQuickAction = (action: string) => {
  //   switch (action) {
  //     case "add_tenant":
  //       onAddNewTenant?.();
  //       break;
  //     case "users":
  //       onNavigateToUsers?.();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <div className="w-full bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            
            <div className="md:hidden">
              <SidebarTrigger className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Welcome back! Here's what's happening with your platform today.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-left sm:text-right">
              <p className="text-sm font-medium text-gray-900">John Admin</p>
              <p className="text-xs text-gray-500">Super Administrator</p>
            </div>
          </div>
        </div>
      </div> */}
      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome back! Here's what's happening with your platform today."
        // icon={<FileText />}
        showMobileSidebarTrigger
      />
      <div className="p-4 sm:p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="bg-white hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${stat.iconBg} flex-shrink-0`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Tenants */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Recent Tenants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTenants.map((tenant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${tenant.avatarBg} rounded-lg flex items-center justify-center text-white font-medium text-sm`}
                      >
                        {tenant.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {tenant.name}
                        </p>
                        <p className="text-sm text-gray-500">{tenant.email}</p>
                        <p className="text-xs text-gray-400">
                          {tenant.createdAt}
                        </p>
                      </div>
                    </div>
                    <Badge className={tenant.statusColor}>
                      {tenant.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Users */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {user.role}
                        </Badge>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">
                          {user.tenant}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{user.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
