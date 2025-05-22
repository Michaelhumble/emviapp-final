
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { mainNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import { useTranslation } from '@/hooks/useTranslation';

const MainNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  return (
    <nav className="hidden md:flex items-center space-x-1">
      {mainNavigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            location.pathname === item.path
              ? "text-purple-700 bg-purple-50"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {t({
            english: item.title,
            vietnamese: item.vietnameseTitle || item.title
          })}
        </Link>
      ))}
    </nav>
  );
};

export default MainNavigation;
