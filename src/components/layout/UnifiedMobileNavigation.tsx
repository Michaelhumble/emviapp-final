import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Search, Briefcase, Store, User, Scissors, Crown, PlusCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { getLanguagePreference } from '@/utils/languagePreference';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/auth';

const UnifiedMobileNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userRole, loading } = useAuth();
  const [language, setLanguage] = useState(getLanguagePreference());
  const isMobile = useIsMobile();

  // Update language when it changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(getLanguagePreference());
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Don't render while auth is loading or on desktop
  if (loading || !isMobile) {
    return null;
  }

  // Tab activation logic
  const isActive = (path: string) => 
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // Determine which navigation variant to show based on current route
  const isJobsPage = location.pathname.startsWith('/jobs');
  
  // Define navigation tabs based on current page context
  const getNavigationTabs = () => {
    if (isJobsPage) {
      // Jobs page specific navigation with enhanced styling
      return [
        { 
          path: "/", 
          icon: Home, 
          label: t("Home"),
          isCenter: false
        },
        { 
          path: "/search", 
          icon: Search, 
          label: t("Search"),
          isCenter: false
        },
        { 
          path: "/jobs", 
          icon: Briefcase, 
          label: t("Jobs"),
          isCenter: true,
          hasSpecialBadge: true
        },
        { 
          path: "/salons", 
          icon: Store, 
          label: t("Salons"),
          isCenter: false
        },
        { 
          path: userRole === 'customer' ? "/pages/customer/profile" : "/contact", 
          icon: User, 
          label: userRole === 'customer' ? t("Profile") : t("Contact"),
          isCenter: false
        }
      ];
    } else {
      // Standard navigation for all other pages
      return [
        { path: '/', icon: Home, label: t('Home') },
        { path: '/jobs', icon: Briefcase, label: t('Jobs') },
        { path: '/salons', icon: Store, label: t('Salons') },
        { path: '/artists', icon: Scissors, label: t('Artists') },
      ];
    }
  };

  const navTabs = getNavigationTabs();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl md:hidden w-full max-w-full"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Premium gradient overlay for jobs page */}
      {isJobsPage && (
        <div className="absolute inset-0 bg-gradient-to-t from-purple-50/20 to-transparent pointer-events-none" />
      )}

      <div className={cn(
        "relative flex items-center justify-around px-2",
        isJobsPage ? "h-20" : "h-16"
      )}>
        {navTabs.map((tab) => {
          const IconComponent = tab.icon;
          const active = isActive(tab.path);
          
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative transition-all duration-300",
                "hover:scale-105 active:scale-95",
                // Ensure minimum 44x44px touch target
                "min-w-[44px] min-h-[44px] touch-manipulation"
              )}
              aria-current={active ? "page" : undefined}
            >
              {/* Jobs page center item special treatment */}
              {isJobsPage && tab.isCenter ? (
                <div className="relative">
                  {/* Premium center button background */}
                  <div className={cn(
                    "absolute inset-0 rounded-full transition-all duration-300",
                    active 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 scale-110" 
                      : "bg-gradient-to-r from-purple-400 to-pink-400 shadow-md scale-100"
                  )} />
                  
                  {/* Icon container - minimum 44x44px */}
                  <div className="relative w-14 h-14 flex items-center justify-center min-w-[44px] min-h-[44px]">
                    <IconComponent 
                      strokeWidth={1.75} 
                      size={language === "en" ? 30 : 28} 
                      className="text-white drop-shadow-sm"
                    />
                    
                    {/* Special badge for jobs */}
                    {tab.hasSpecialBadge && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-sm">
                        <Crown className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Regular items with 44x44px minimum touch target */
                <div className="flex flex-col items-center gap-1 p-2 min-w-[44px] min-h-[44px]">
                  <div className={cn(
                    "p-2 rounded-xl transition-all duration-300 min-w-[32px] min-h-[32px] flex items-center justify-center",
                    active 
                      ? isJobsPage 
                        ? "bg-gradient-to-r from-purple-100 to-pink-100 shadow-sm"
                        : "bg-purple-100 shadow-sm"
                      : "hover:bg-gray-50"
                  )}>
                    <IconComponent
                      strokeWidth={1.75} 
                      size={24} 
                      className={cn(
                        "transition-all duration-300",
                        active 
                          ? "text-purple-600 drop-shadow-sm" 
                          : "text-gray-500"
                      )}
                    />
                  </div>
                </div>
              )}
              
              {/* Label */}
              <span 
                className={cn(
                  "text-xs font-medium transition-all duration-300 mt-1",
                  isJobsPage && tab.isCenter 
                    ? "text-white drop-shadow-sm" 
                    : active 
                      ? "text-purple-600 font-semibold" 
                      : "text-gray-500"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Floating Post Job button for non-jobs pages */}
        {!isJobsPage && (
          <button 
            onClick={() => navigate('/post-job')}
            className="absolute bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 min-w-[44px] min-h-[44px] touch-manipulation"
            style={{ 
              top: 'max(-24px, calc(-1.5rem + env(safe-area-inset-top)))',
              right: '50%',
              transform: 'translateX(50%)'
            }}
            aria-label="Post a job"
          >
            <PlusCircle className="h-6 w-6" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default UnifiedMobileNavigation;