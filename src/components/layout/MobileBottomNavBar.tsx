
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Scissors, Store, Briefcase, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

const MobileBottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Define bottom navigation items with consistent properties
  const bottomNavItems = [
    { icon: Home, path: '/', label: t('Home') },
    { icon: Briefcase, path: '/jobs', label: t('Jobs') },
    { icon: Store, path: '/salons', label: t('Salons') },
    { icon: Scissors, path: '/artists', label: t('Artists') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around px-2 z-40 shadow-sm">
      {bottomNavItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full",
            isActive(item.path) ? "text-purple-600" : "text-gray-500"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
      
      {/* Post Job floating button - Enhanced with EmviApp branding */}
      <button 
        onClick={() => navigate('/post-job')}
        className="absolute -top-6 bg-gradient-to-r from-[#9A7B69] to-[#B8956A] text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white"
        aria-label="Post a job"
      >
        <PlusCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MobileBottomNavBar;
