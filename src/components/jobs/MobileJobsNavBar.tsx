
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Briefcase, PlusSquare, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from '@/hooks/useTranslation';

const MobileJobsNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  
  // Don't render on desktop
  if (!isMobile) return null;
  
  // Don't render on post-job pages as they have their own navigation
  if (location.pathname === '/post-job') return null;
  
  // Check current route for active state
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);
  
  const navItems = [
    { 
      icon: Home, 
      label: t('Home'), 
      path: '/',
      isActive: location.pathname === '/'
    },
    { 
      icon: Briefcase, 
      label: t('Jobs'), 
      path: '/jobs',
      isActive: location.pathname === '/jobs' || location.pathname.startsWith('/jobs/')
    },
    { 
      icon: PlusSquare, 
      label: t('Post Job'), 
      path: '/post-job',
      isActive: location.pathname === '/post-job'
    },
    { 
      icon: User, 
      label: t('Profile'), 
      path: '/dashboard',
      isActive: location.pathname.startsWith('/dashboard')
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg nav-bottom-glow">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center flex-1 h-full"
            aria-current={item.isActive ? "page" : undefined}
          >
            <div 
              className={cn(
                "flex items-center justify-center",
                item.isActive ? "text-emvi-accent" : "text-gray-500"
              )}
            >
              <item.icon size={24} strokeWidth={1.75} />
            </div>
            <span 
              className={cn(
                "text-xs mt-1 font-medium",
                item.isActive ? "text-emvi-accent" : "text-gray-500"
              )}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileJobsNavBar;
