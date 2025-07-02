import { useState } from "react"
import { FileText, User } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { SidebarTrigger } from "../components/ui/sidebar"
import React from "react"

interface AuditLog {
  id: number
  date: string
  user: {
    name: string
    email: string
  }
  action: string
  module: string
  tenantName: string
}

const initialLogs: AuditLog[] = [
  {
    id: 1,
    date: "2024-01-15 14:32:15",
    user: {
      name: "Mike Johnson",
      email: "mike@company.com",
    },
    action: "Created new user account",
    module: "User Management",
    tenantName: "TechCorp Solutions",
  },
  {
    id: 2,
    date: "2024-01-15 13:45:22",
    user: {
      name: "Sarah Wilson",
      email: "sarah@enterprise.com",
    },
    action: "Updated billing settings",
    module: "Billing",
    tenantName: "Enterprise Inc",
  },
  {
    id: 3,
    date: "2024-01-15 12:18:45",
    user: {
      name: "David Chen",
      email: "david@startup.io",
    },
    action: "Deleted tenant configuration",
    module: "Tenant Management",
    tenantName: "StartupHub",
  },
  {
    id: 4,
    date: "2024-01-15 11:05:33",
    user: {
      name: "Emma Davis",
      email: "emma@retail.com",
    },
    action: "Modified security settings",
    module: "Security",
    tenantName: "Retail Solutions",
  },
  {
    id: 5,
    date: "2024-01-15 10:22:17",
    user: {
      name: "Alex Rodriguez",
      email: "alex@finance.com",
    },
    action: "Updated system settings",
    module: "Settings",
    tenantName: "FinanceFirst",
  },
  {
    id: 6,
    date: "2024-01-15 09:45:12",
    user: {
      name: "Lisa Thompson",
      email: "lisa@acme.com",
    },
    action: "Created new tenant",
    module: "Tenant Management",
    tenantName: "Acme Corp",
  },
  {
    id: 7,
    date: "2024-01-15 09:12:33",
    user: {
      name: "Robert Brown",
      email: "robert@innovation.com",
    },
    action: "Updated user permissions",
    module: "User Management",
    tenantName: "Innovation Labs",
  },
  {
    id: 8,
    date: "2024-01-15 08:55:44",
    user: {
      name: "Jennifer Garcia",
      email: "jennifer@global.com",
    },
    action: "Modified billing configuration",
    module: "Billing",
    tenantName: "Global Solutions",
  },
  {
    id: 9,
    date: "2024-01-15 08:30:15",
    user: {
      name: "William Martinez",
      email: "william@tech.com",
    },
    action: "Updated security policies",
    module: "Security",
    tenantName: "TechStart Inc",
  },
  {
    id: 10,
    date: "2024-01-15 08:15:22",
    user: {
      name: "Jessica Anderson",
      email: "jessica@digital.com",
    },
    action: "Deleted user account",
    module: "User Management",
    tenantName: "Digital Dynamics",
  },
  {
    id: 11,
    date: "2024-01-15 07:45:33",
    user: {
      name: "Christopher Taylor",
      email: "christopher@future.com",
    },
    action: "Created new module",
    module: "Settings",
    tenantName: "Future Systems",
  },
  {
    id: 12,
    date: "2024-01-15 07:22:11",
    user: {
      name: "Amanda White",
      email: "amanda@smart.com",
    },
    action: "Updated tenant settings",
    module: "Tenant Management",
    tenantName: "Smart Solutions",
  },
  {
    id: 13,
    date: "2024-01-15 06:58:44",
    user: {
      name: "Daniel Harris",
      email: "daniel@nextgen.com",
    },
    action: "Modified billing plan",
    module: "Billing",
    tenantName: "NextGen Corp",
  },
  {
    id: 14,
    date: "2024-01-15 06:35:17",
    user: {
      name: "Michelle Clark",
      email: "michelle@cloud.com",
    },
    action: "Updated security settings",
    module: "Security",
    tenantName: "CloudTech Systems",
  },
  {
    id: 15,
    date: "2024-01-15 06:12:55",
    user: {
      name: "Kevin Lewis",
      email: "kevin@advanced.com",
    },
    action: "Created user role",
    module: "User Management",
    tenantName: "Advanced Solutions",
  },
]

// Generate more logs to reach 247 total
const generateMoreLogs = (): AuditLog[] => {
  const additionalLogs: AuditLog[] = []
  const actions = [
    "Created new user account",
    "Updated billing settings",
    "Deleted tenant configuration",
    "Modified security settings",
    "Updated system settings",
    "Created new tenant",
    "Updated user permissions",
    "Modified billing configuration",
    "Updated security policies",
    "Deleted user account",
  ]

  const modules = ["User Management", "Billing", "Tenant Management", "Security", "Settings"]
  const tenants = ["TechCorp Solutions", "Enterprise Inc", "StartupHub", "Retail Solutions", "FinanceFirst"]

  for (let i = 16; i <= 247; i++) {
    additionalLogs.push({
      id: i,
      date: `2024-01-${Math.floor(Math.random() * 14) + 1} ${Math.floor(Math.random() * 24)
        .toString()
        .padStart(2, "0")}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`,
      user: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
      },
      action: actions[Math.floor(Math.random() * actions.length)],
      module: modules[Math.floor(Math.random() * modules.length)],
      tenantName: tenants[Math.floor(Math.random() * tenants.length)],
    })
  }

  return additionalLogs
}

const allLogs = [...initialLogs, ...generateMoreLogs()]

const getModuleBadgeColor = (module: string) => {
  switch (module) {
    case "User Management":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Billing":
      return "bg-green-100 text-green-800 border-green-200"
    case "Tenant Management":
      return "bg-red-100 text-red-800 border-red-200"
    case "Security":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "Settings":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function AuditLogs() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Calculate pagination
  const totalLogs = allLogs.length
  const totalPages = Math.ceil(totalLogs / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLogs = allLogs.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Trigger */}
            <div className="md:hidden">
              <SidebarTrigger className="h-8 w-8" />
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">Audit Logs</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base font-medium">
                Monitor all system activities and user actions
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm sm:text-base font-semibold text-gray-900">John Admin</p>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Super Administrator</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Audit Logs Table */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-0">
            {/* Mobile View */}
            <div className="block lg:hidden">
              {currentLogs.map((log, index) => (
                <div
                  key={log.id}
                  className={`p-4 sm:p-6 ${index !== currentLogs.length - 1 ? "border-b border-gray-200" : ""}`}
                >
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{log.user.name}</p>
                        <p className="text-xs sm:text-sm text-blue-600 font-medium truncate">{log.user.email}</p>
                      </div>
                    </div>

                    {/* Log Details */}
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">Date & Time:</span>
                        <span className="text-xs sm:text-sm font-mono text-gray-900 font-medium">{log.date}</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">Action Performed:</span>
                        <span className="text-sm sm:text-base text-gray-900 font-medium leading-relaxed">
                          {log.action}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">Affected Module:</span>
                        <Badge
                          className={`${getModuleBadgeColor(log.module)} font-medium text-xs sm:text-sm px-3 py-1 border`}
                        >
                          {log.module}
                        </Badge>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">Tenant Name:</span>
                        <span className="text-sm sm:text-base text-gray-900 font-semibold">{log.tenantName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-600 hover:bg-blue-600 border-b-0">
                    <TableHead className="text-white font-semibold text-sm py-4 px-6">Date</TableHead>
                    <TableHead className="text-white font-semibold text-sm py-4 px-6">User</TableHead>
                    <TableHead className="text-white font-semibold text-sm py-4 px-6">Action Performed</TableHead>
                    {/* <TableHead className="text-white font-semibold text-sm py-4 px-6">Affected Module</TableHead> */}
                    <TableHead className="text-white font-semibold text-sm py-4 px-6">Tenant Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentLogs.map((log, index) => (
                    <TableRow
                      key={log.id}
                      className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <TableCell className="py-4 px-6">
                        <span className="text-gray-900 font-mono text-sm font-medium">{log.date}</span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-900 text-sm">{log.user.name}</p>
                          <p className="text-sm text-blue-600 font-medium">{log.user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-gray-900 text-sm font-medium leading-relaxed">{log.action}</span>
                      </TableCell>
                      {/* <TableCell className="py-4 px-6">
                        <Badge className={`${getModuleBadgeColor(log.module)} font-medium text-sm px-3 py-1 border`}>
                          {log.module}
                        </Badge>
                      </TableCell> */}
                      <TableCell className="py-4 px-6">
                        <span className="text-gray-900 text-sm font-semibold">{log.tenantName}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 border-t border-gray-200 bg-gray-50/50">
              <p className="text-sm font-medium text-gray-600">
                Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{" "}
                <span className="font-semibold text-gray-900">{Math.min(endIndex, totalLogs)}</span> of{" "}
                <span className="font-semibold text-gray-900">{totalLogs}</span> results
              </p>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="text-gray-600 font-medium px-3 py-2 text-sm border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page, index) => (
                    <div key={index}>
                      {page === "..." ? (
                        <span className="px-2 py-1 text-gray-500 text-sm font-medium">...</span>
                      ) : (
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page as number)}
                          className={
                            currentPage === page
                              ? "bg-blue-600 text-white hover:bg-blue-700 font-semibold px-3 py-2 text-sm"
                              : "text-gray-600 font-medium px-3 py-2 text-sm border-gray-300 hover:bg-gray-50"
                          }
                        >
                          {page}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="text-gray-600 font-medium px-3 py-2 text-sm border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
