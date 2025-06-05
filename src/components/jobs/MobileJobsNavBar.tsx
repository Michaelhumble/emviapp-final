
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Briefcase, PlusSquare, User, Heart, Calendar, Search, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/context/auth';
import { Badge } from "@/components/ui/badge";

const MobileJobsNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { userRole } = useAuth();
  
  // Don't render on desktop
  if (!isMobile) return null;
  
  // Don't render on post-job pages as they have their own navigation
  if (location.pathname === '/post-job') return null;
  
  // Check current route for active state
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);
  
  // Customer-specific navigation items
  const customerNavItems = [
    { 
      icon: Home, 
      label: t('Home'), 
      path: '/',
      isActive: location.pathname === '/',
      gradient: 'from-purple-500 to-blue-500'
    },
    { 
      icon: Search, 
      label: t('Discover'), 
      path: '/artists',
      isActive: location.pathname === '/artists' || location.pathname.startsWith('/artists/'),
      gradient: 'from-pink-500 to-rose-500'
    },
    { 
      icon: Calendar, 
      label: t('Bookings'), 
      path: '/bookings',
      isActive: location.pathname === '/bookings' || location.pathname.startsWith('/bookings/'),
      gradient: 'from-blue-500 to-cyan-500',
      badge: '3' // Active bookings count
    },
    { 
      icon: Heart, 
      label: t('Favorites'), 
      path: '/favorites',
      isActive: location.pathname === '/favorites',
      gradient: 'from-rose-500 to-pink-500'
    },
    { 
      icon: User, 
      label: t('Profile'), 
      path: '/dashboard',
      isActive: location.pathname.startsWith('/dashboard'),
      gradient: 'from-indigo-500 to-purple-500'
    },
  ];

  // Default navigation for non-customers
  const defaultNavItems = [
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

  const navItems = userRole === 'customer' ? customerNavItems : defaultNavItems;

  return (
    <div className={cn(
      "md:hidden fixed bottom-0 left-0 right-0 z-50 shadow-lg",
      userRole === 'customer' 
        ? "bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-xl border-t border-purple-200" 
        : "bg-white/95 backdrop-blur-md border-t border-gray-200"
    )}>
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item, index) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center flex-1 h-full relative group"
            aria-current={item.isActive ? "page" : undefined}
          >
            {/* Customer Premium Design */}
            {userRole === 'customer' ? (
              <>
                {item.isActive && (
                  <div className={cn(
                    "absolute inset-x-2 inset-y-2 rounded-2xl bg-gradient-to-r opacity-20",
                    item.gradient || 'from-purple-500 to-pink-500'
                  )} />
                )}
                
                <div className={cn(
                  "flex items-center justify-center relative transition-all duration-300",
                  item.isActive 
                    ? `bg-gradient-to-r ${item.gradient || 'from-purple-500 to-pink-500'} text-white shadow-lg scale-110` 
                    : "text-gray-600 group-hover:text-purple-600 group-hover:scale-105",
                  "w-12 h-12 rounded-2xl mb-1"
                )}>
                  <item.icon size={22} strokeWidth={item.isActive ? 2.5 : 2} />
                  
                  {/* Badge for notifications */}
                  {item.badge && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500 border-2 border-white">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                
                <span className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  item.isActive 
                    ? "text-purple-700 font-bold" 
                    : "text-gray-600 group-hover:text-purple-600"
                )}>
                  {item.label}
                </span>
                
                {/* Active indicator sparkle */}
                {item.isActive && (
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
                )}
              </>
            ) : (
              /* Default Design for other roles */
              <>
                <div className={cn(
                  "flex items-center justify-center",
                  item.isActive ? "text-emvi-accent" : "text-gray-500"
                )}>
                  <item.icon size={24} strokeWidth={1.75} />
                </div>
                <span className={cn(
                  "text-xs mt-1 font-medium",
                  item.isActive ? "text-emvi-accent" : "text-gray-500"
                )}>
                  {item.label}
                </span>
              </>
            )}
          </button>
        ))}
      </div>
      
      {/* Customer Premium Bottom Accent */}
      {userRole === 'customer' && (
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />
      )}
    </div>
  );
};

export default MobileJobsNavBar;
