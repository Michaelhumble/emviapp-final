
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, User, Briefcase, Plus } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const SuperMobileBottomNavBar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    {
      icon: Home,
      label: t({ english: "Home", vietnamese: "Trang Chủ" }),
      path: "/",
    },
    {
      icon: Search,
      label: t({ english: "Search", vietnamese: "Tìm Kiếm" }),
      path: "/search",
    },
    {
      icon: Plus,
      label: t({ english: "Post", vietnamese: "Đăng" }),
      path: "/post-job",
    },
    {
      icon: Briefcase,
      label: t({ english: "Jobs", vietnamese: "Việc Làm" }),
      path: "/jobs",
    },
    {
      icon: User,
      label: t({ english: "Profile", vietnamese: "Hồ Sơ" }),
      path: "/profile",
    },
  ];

  return (
    <div className="sm:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-around py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center px-2 py-2 min-w-0 flex-1 ${
                isActive(item.path)
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="h-4 w-4 mb-1" />
              <span className="text-xs font-medium truncate w-full text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SuperMobileBottomNavBar;
