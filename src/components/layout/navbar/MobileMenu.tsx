
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useTranslation } from "@/hooks/useTranslation";
import { Link, useNavigate } from "react-router-dom";
import { mainNavigation } from "./config/navigationItems";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { UserType } from "@/context/auth/types";

type MobileMenuProps = {
  user: UserType | null;
  handleSignOut: () => Promise<void>;
};

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleLinkClick = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  
  const handleSignOutClick = async () => {
    await handleSignOut();
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Menu className="h-5 w-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="pt-2 pb-6">
          <div className="px-4">
            {/* Language toggle in mobile menu */}
            <div className="flex justify-center my-4">
              <LanguageToggle minimal={false} />
            </div>
            
            {/* Main navigation items */}
            <div className="flex flex-col space-y-3 mt-4">
              {mainNavigation.map((item) => (
                <Button 
                  key={item.path}
                  variant="ghost"
                  className="justify-start hover:bg-accent"
                  onClick={() => handleLinkClick(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              {user ? (
                <>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start mb-2 hover:bg-accent"
                    onClick={() => handleLinkClick("/dashboard")}
                  >
                    {t({
                      english: "Dashboard",
                      vietnamese: "Bảng điều khiển"
                    })}
                  </Button>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start mb-2 hover:bg-accent"
                    onClick={() => handleLinkClick("/profile")}
                  >
                    {t({
                      english: "Profile",
                      vietnamese: "Hồ sơ"
                    })}
                  </Button>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start mb-2 hover:bg-accent"
                    onClick={handleSignOutClick}
                  >
                    {t({
                      english: "Sign Out",
                      vietnamese: "Đăng xuất"
                    })}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start mb-2 hover:bg-accent"
                    onClick={() => handleLinkClick("/sign-in")}
                  >
                    {t({
                      english: "Sign In",
                      vietnamese: "Đăng nhập"
                    })}
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full mb-2"
                    onClick={() => handleLinkClick("/sign-up")}
                  >
                    {t({
                      english: "Sign Up",
                      vietnamese: "Đăng ký"
                    })}
                  </Button>
                </>
              )}
            </div>
            
            {/* Enhanced "Inspired by Sunshine" text with more elegant styling */}
            <div className="mt-6 pt-4 text-center">
              <p className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent opacity-90">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
