
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Search, Briefcase, Store, User, Crown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { getLanguagePreference } from "@/utils/languagePreference";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/auth";

const MobileJobsNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userRole } = useAuth();
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

  // Tab activation logic
  const isActive = (path: string) => 
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // Enhanced navigation tabs with premium styling
  const navTabs = [
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

  // Only show on mobile screens
  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-purple-100 shadow-2xl md:hidden">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-50/20 to-transparent pointer-events-none" />
      
      <div className="relative flex items-center justify-around h-20 px-2">
        {navTabs.map((tab) => {
          const IconComponent = tab.icon;
          const active = isActive(tab.path);
          
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full relative transition-all duration-300",
                "hover:scale-105 active:scale-95"
              )}
              aria-current={active ? "page" : undefined}
            >
              {/* Center item special treatment */}
              {tab.isCenter ? (
                <div className="relative">
                  {/* Premium center button background */}
                  <div className={cn(
                    "absolute inset-0 rounded-full transition-all duration-300",
                    active 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 scale-110" 
                      : "bg-gradient-to-r from-purple-400 to-pink-400 shadow-md scale-100"
                  )} />
                  
                  {/* Icon container */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
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
                /* Regular items */
                <div className="flex flex-col items-center gap-1 p-2">
                  <div className={cn(
                    "p-2 rounded-xl transition-all duration-300",
                    active 
                      ? "bg-gradient-to-r from-purple-100 to-pink-100 shadow-sm" 
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
                  tab.isCenter 
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
      </div>
      
      {/* Bottom safe area for phones with home indicators */}
      <div className="h-safe-area-inset-bottom bg-white/95" />
    </nav>
  );
};

export default MobileJobsNavBar;
