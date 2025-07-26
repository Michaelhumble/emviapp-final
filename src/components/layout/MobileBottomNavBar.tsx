
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Scissors, Store, Briefcase, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';

const MobileBottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { loading } = useAuth();

  // Don't render while auth is loading to prevent flickering
  if (loading) {
    return null;
  }

  // Define bottom navigation items with consistent properties
  const bottomNavItems = [
    { icon: Home, path: '/', label: t('Home') },
    { icon: Briefcase, path: '/jobs', label: t('Jobs') },
    { icon: Store, path: '/salons', label: t('Salons') },
    { icon: Scissors, path: '/artists', label: t('Artists') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around px-2 z-40 shadow-sm" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {bottomNavItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          className={cn(
            "flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 py-1",
            isActive(item.path) ? "text-purple-700" : "text-gray-700"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
      
      {/* Post Job floating button - Safe positioning */}
      <button 
        onClick={() => navigate('/post-job')}
        className="absolute bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200"
        style={{ 
          top: 'max(-24px, calc(-1.5rem + env(safe-area-inset-top)))',
          right: '50%',
          transform: 'translateX(50%)',
          minHeight: '48px',
          minWidth: '48px'
        }}
        aria-label="Post a job"
      >
        <PlusCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default MobileBottomNavBar;
