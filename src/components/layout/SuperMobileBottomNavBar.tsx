
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Search, Briefcase, Store, User } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { getLanguagePreference } from "@/utils/languagePreference";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const SuperMobileBottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  // Navigation tabs with dynamic labels based on language
  const navTabs = [
    { 
      path: "/", 
      icon: <Home strokeWidth={1.75} size={24} />, 
      label: t("Home") 
    },
    { 
      path: "/search", 
      icon: <Search strokeWidth={1.75} size={24} />, 
      label: t("Search") 
    },
    { 
      path: "/jobs", 
      icon: <Briefcase strokeWidth={1.75} size={language === "en" ? 30 : 28} />, 
      label: t("Jobs"),
      isCenter: true
    },
    { 
      path: "/salons", 
      icon: <Store strokeWidth={1.75} size={24} />, 
      label: t("Salons") 
    },
    { 
      path: "/auth/signup", 
      icon: <User strokeWidth={1.75} size={24} />, 
      label: t("Sign Up") 
    }
  ];

  // Only show on mobile screens
  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex items-center justify-around h-16">
        {navTabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full pt-1.5 pb-1",
              tab.isCenter && "relative"
            )}
            aria-current={isActive(tab.path) ? "page" : undefined}
          >
            <div 
              className={cn(
                "flex items-center justify-center transition-all",
                isActive(tab.path) 
                  ? "text-purple-600" 
                  : "text-gray-500",
                tab.isCenter && isActive(tab.path) && "shadow-md shadow-purple-500/50 rounded-full p-1",
                tab.isCenter && "mb-0.5"
              )}
            >
              {tab.icon}
            </div>
            <span 
              className={cn(
                "text-xs mt-1 font-medium",
                isActive(tab.path) 
                  ? "text-purple-600" 
                  : "text-gray-500"
              )}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SuperMobileBottomNavBar;
