
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, User, Briefcase } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const MobileBottomNavBar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const navItems = [
    { icon: Home, label: t({ english: "Home", vietnamese: "Trang Chủ" }), path: "/" },
    { icon: Search, label: t({ english: "Search", vietnamese: "Tìm Kiếm" }), path: "/search" },
    { icon: Briefcase, label: t({ english: "Jobs", vietnamese: "Việc Làm" }), path: "/jobs" },
    { icon: User, label: t({ english: "Profile", vietnamese: "Hồ Sơ" }), path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center px-3 py-2 min-w-0 flex-1 ${
                isActive(item.path)
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
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

export default MobileBottomNavBar;
