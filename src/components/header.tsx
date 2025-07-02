import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar"; // optional, remove if unused
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  onBack?: () => void;
  icon?: React.ReactNode;
  showMobileSidebarTrigger?: boolean;
  userName?: string;
  userRole?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBack,
  icon,
  showMobileSidebarTrigger = false,
  userName = "John Admin",
  userRole = "Super Administrator",
}) => {
  return (
    <div className="bg-white border-b px-4 sm:px-6 py-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          {showMobileSidebarTrigger && (
            <div className="md:hidden">
              <SidebarTrigger className="h-8 w-8" />
            </div>
          )}

          {
            showBackButton && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )
            // : icon ? (
            //   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            //     {React.cloneElement(icon as React.ReactElement, {
            //       className: "h-5 w-5 sm:h-6 sm:w-6 text-white",
            //     })}
            //   </div>
            // ) : null
          }

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {title}
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {subtitle}
            </p>
          </div>
        </div>

        {(userName || userRole) && (
          <div className="text-left sm:text-right">
            <p className="text-sm sm:text-base font-semibold text-gray-900">
              {userName}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {userRole}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
