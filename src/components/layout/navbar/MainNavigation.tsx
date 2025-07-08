
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { mainNavigationItems, testNavigationItems } from '@/components/layout/navbar/config/navigationItems';
import { useTranslation } from '@/hooks/useTranslation';

const MainNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  // Show test navigation items only in development or for specific users
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       window.location.hostname === 'localhost' ||
                       window.location.search.includes('test=true');
  
  const allNavigationItems = isDevelopment 
    ? [...mainNavigationItems, ...testNavigationItems]
    : mainNavigationItems;
  
  return (
    <nav className="hidden md:flex items-center space-x-1">
      {allNavigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            item.highlight
              ? "text-yellow-700 bg-yellow-50 border border-yellow-200 hover:bg-yellow-100"
              : location.pathname === item.path
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
