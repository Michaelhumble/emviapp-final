
import React, { useState } from "react";
import { Menu, Flame, Home, Briefcase, Store, Scissors, Users, Info, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate } from "react-router-dom";
import { mainNavigation } from "./config/navigationItems";

// Define the MobileMenuProps interface
interface MobileMenuProps {
  user?: any;
  handleSignOut: () => Promise<void>;
}

// Map of navigation paths to their corresponding icons
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  '/': Home,
  '/jobs': Briefcase,
  '/salons': Store,
  '/artists': Scissors,
  '/freelancers': Users,
  '/about': Info,
  '/contact': Mail,
};

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const { t, toggleLanguage } = useTranslation();
  const navigate = useNavigate();
  
  const handleLinkClick = (path: string) => {
    navigate(path);
    setOpen(false);
  };
  
  const handleSignOutClick = async () => {
    await handleSignOut();
    setOpen(false);
  };
  
  const handleLanguageToggle = () => {
    toggleLanguage();
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[80%] px-6 py-4 rounded-l-xl shadow-lg">
          <div className="flex flex-col gap-6 h-full">
            {/* Post Job Button */}
            <Button 
              className="w-full rounded-full font-medium flex gap-2 items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-6"
              onClick={() => handleLinkClick("/post-job")}
            >
              <Flame className="h-5 w-5" />
              {t({ english: "Post a Job for Free", vietnamese: "Đăng việc miễn phí" })}
            </Button>
            
            {/* Language section */}
            <div className="mt-2">
              <h3 className="text-base font-medium text-purple-500 mb-3">Language</h3>
              <Button 
                variant="outline"
                className="w-full justify-start gap-2 rounded-md"
                onClick={handleLanguageToggle}
              >
                <Globe className="h-5 w-5" />
                <span>{t({ english: "English", vietnamese: "Tiếng Việt" })}</span>
              </Button>
            </div>
            
            {/* Navigation section */}
            <div>
              <h3 className="text-base font-medium text-purple-500 mb-3">Navigation</h3>
              <div className="flex flex-col space-y-1">
                {mainNavigation.map((item) => {
                  const IconComponent = iconMap[item.path] || Home;
                  return (
                    <Button 
                      key={item.path}
                      variant="ghost"
                      className="justify-start hover:bg-gray-100/80 text-gray-700"
                      onClick={() => handleLinkClick(item.path)}
                    >
                      <IconComponent className="mr-2 h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            
            {/* Account section */}
            <div>
              <h3 className="text-base font-medium text-red-400 mb-3">Account</h3>
              <div className="flex flex-col space-y-1">
                {user ? (
                  <>
                    <Button 
                      variant="ghost"
                      className="justify-start hover:bg-gray-100/80 text-gray-700"
                      onClick={() => handleLinkClick("/dashboard")}
                    >
                      <span className="mr-2">👤</span>
                      {t({
                        english: "Dashboard",
                        vietnamese: "Bảng điều khiển"
                      })}
                    </Button>
                    <Button 
                      variant="ghost"
                      className="justify-start hover:bg-gray-100/80 text-gray-700"
                      onClick={handleSignOutClick}
                    >
                      <span className="mr-2">🚪</span>
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
                      className="justify-start hover:bg-gray-100/80 text-gray-700"
                      onClick={() => handleLinkClick("/sign-in")}
                    >
                      <span className="mr-2">🔑</span>
                      {t({
                        english: "Sign In",
                        vietnamese: "Đăng nhập"
                      })}
                    </Button>
                    <Button 
                      variant="ghost"
                      className="justify-start hover:bg-gray-100/80 text-gray-700"
                      onClick={() => handleLinkClick("/sign-up")}
                    >
                      <span className="mr-2">✨</span>
                      {t({
                        english: "Sign Up",
                        vietnamese: "Đăng ký"
                      })}
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {/* Flexible space to push the footer to bottom */}
            <div className="flex-grow"></div>
            
            {/* Sunshine quote footer with gradient text */}
            <div className="flex justify-center mb-4 mt-auto">
              <p className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent px-2 py-1">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
