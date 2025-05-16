
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { mainNavigation } from "./config/navigationItems";
import Logo from "@/components/ui/Logo";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";

// Define interface for the component props
interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, handleSignOut }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t, toggleLanguage, isVietnamese } = useTranslation();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  
  const handleSignOutClick = async () => {
    await handleSignOut();
    setOpen(false);
    toast.success(t("You've been signed out"));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-2 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] p-0 mobile-glass-drawer">
        <div className="flex flex-col h-full p-0">
          {/* Header with logo and close button */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex-grow flex justify-center">
              <Logo size="medium" showText={true} />
            </div>
            <Button 
              variant="ghost" 
              className="p-2" 
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Menu items */}
          <div className="flex-grow overflow-y-auto py-4 px-2">
            <nav className="space-y-1">
              {mainNavigation.map((item, index) => (
                <div className="menu-item-enter" style={{ animationDelay: `${index * 75}ms` }} key={item.path}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg py-6 font-medium"
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.icon && React.createElement(item.icon, { className: "mr-3 h-5 w-5" })}
                    {t(item.label)}
                  </Button>
                </div>
              ))}
            </nav>
            
            <div className="border-t border-gray-100 my-4"></div>
            
            {/* Auth section */}
            {user ? (
              <div className="space-y-2 px-2">
                <div className="menu-card p-4 mb-4">
                  <p className="text-sm text-gray-500">
                    {t("Signed in as")}
                  </p>
                  <p className="font-medium truncate">
                    {user.email}
                  </p>
                </div>
                
                <Button
                  variant="default"
                  className="w-full mb-2"
                  onClick={() => handleNavigation("/dashboard")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  {t("Dashboard")}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSignOutClick}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("Sign Out")}
                </Button>
              </div>
            ) : (
              <div className="space-y-3 px-2">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => handleNavigation("/sign-in")}
                >
                  {t("Sign In")}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigation("/sign-up")}
                >
                  {t("Create Account")}
                </Button>
              </div>
            )}
          </div>
          
          {/* Footer section */}
          <div className="border-t border-gray-100 p-4 space-y-4">
            <Button 
              variant="ghost" 
              className="w-full justify-center"
              onClick={toggleLanguage}
            >
              <Globe className="mr-2 h-4 w-4" />
              {isVietnamese ? "Switch to English" : "Chuyển sang Tiếng Việt"}
            </Button>
            
            <div className="text-center text-sm text-gray-500 pt-2">
              <p className="opacity-70">Inspired by Sunshine ☀️</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Add missing Lucide icon imports
import { LayoutDashboard, LogOut, Globe } from "lucide-react";

export default MobileMenu;
