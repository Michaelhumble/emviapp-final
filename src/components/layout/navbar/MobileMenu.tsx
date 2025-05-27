
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Briefcase, Store, Scissors, Info, Phone, Globe, Plus } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileMenuProps {
  className?: string;
  user?: any;
  handleSignOut?: () => Promise<void>;
  minimal?: boolean;
}

const MobileMenu = ({ className, user, handleSignOut, minimal = false }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, toggleLanguage, isVietnamese } = useTranslation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Briefcase, label: "Jobs", path: "/jobs" },
    { icon: Store, label: "Salons", path: "/salons" },
    { icon: Scissors, label: "Artists", path: "/artists" },
    { icon: Info, label: "About", path: "/about" },
    { icon: Phone, label: "Contact", path: "/contact" },
  ];
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  // Don't render anything if we're not on mobile and the component isn't forced to appear
  if (!isMobile && !minimal) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "p-2 rounded-full border border-[#9A7B69]/40 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:scale-105",
            className
          )}
        >
          <Menu className="h-6 w-6 text-[#1A1A1A]" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-[75%] border-l border-[#9A7B69]/20 bg-white/95 backdrop-blur-md shadow-lg p-0 z-[100]"
      >
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <Button 
              variant="ghost" 
              className="rounded-full p-2 hover:bg-gray-100" 
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
            <div className="w-full flex justify-center">
              <Logo size="medium" showText={true} />
            </div>
          </div>
          
          {/* Menu items */}
          <div className="flex-grow overflow-y-auto py-4 px-2">
            <nav className="space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-xl py-5 font-medium",
                        isActive 
                          ? "text-[#9A7B69] bg-[#9A7B69]/5"
                          : "hover:text-[#9A7B69] hover:bg-[#9A7B69]/5"
                      )}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <Icon className="mr-3 h-[22px] w-[22px]" />
                      {t(item.label)}
                    </Button>
                  </motion.div>
                );
              })}
              
              {/* Post a Job button - highlighted */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  className="w-full mt-4 text-xl py-6 font-bold bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600"
                  onClick={() => handleNavigation("/post-job")}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  {t("Post a Job")}
                </Button>
              </motion.div>

              {/* Show Dashboard link if user is logged in */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-lg py-4 font-medium"
                    onClick={() => handleNavigation("/dashboard")}
                  >
                    {t("Your Dashboard")}
                  </Button>
                </motion.div>
              )}

              {/* Sign out button if user is logged in */}
              {user && handleSignOut && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full mt-2 text-lg py-4 font-medium text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleSignOut}
                  >
                    {t("Sign Out")}
                  </Button>
                </motion.div>
              )}
            </nav>
            
            {/* Language switcher */}
            <div className="mt-8 px-2">
              <p className="text-sm text-gray-500 mb-2">{t("Select language")}</p>
              <div className="flex rounded-full p-1 bg-gray-100">
                <Button
                  variant="ghost"
                  className={cn(
                    "flex-1 rounded-full py-2 text-base",
                    !isVietnamese 
                      ? "bg-white shadow-sm text-[#9A7B69] font-medium" 
                      : "text-gray-600"
                  )}
                  onClick={() => !isVietnamese || toggleLanguage()}
                >
                  <Globe className="mr-2 h-4 w-4" /> English
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex-1 rounded-full py-2 text-base",
                    isVietnamese 
                      ? "bg-white shadow-sm text-[#9A7B69] font-medium" 
                      : "text-gray-600"
                  )}
                  onClick={() => isVietnamese || toggleLanguage()}
                >
                  <Globe className="mr-2 h-4 w-4" /> Tiếng Việt
                </Button>
              </div>
            </div>
          </div>
          
          {/* Footer with Inspired by Sunshine */}
          <div className="mt-auto p-4 border-t border-gray-100">
            <p className="text-center text-base bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text text-transparent font-medium">
              {t("Inspired by Sunshine ☀️")}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
