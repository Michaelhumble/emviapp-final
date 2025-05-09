
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Menu, 
  X, 
  User, 
  LogIn, 
  LogOut, 
  Home, 
  Briefcase, 
  Scissors, 
  MessageSquare, 
  Globe, 
  Info,
  Flame
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, handleSignOut }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const navItems = [
    { label: t("Home", "Trang chủ"), icon: <Home className="w-5 h-5" />, path: "/" },
    { label: t("Jobs", "Việc làm"), icon: <Briefcase className="w-5 h-5" />, path: "/jobs" },
    { label: t("Salons", "Tiệm"), icon: <Scissors className="w-5 h-5" />, path: "/salons" },
    { label: t("About", "Giới thiệu"), icon: <Info className="w-5 h-5" />, path: "/about" },
    { label: t("Contact", "Liên hệ"), icon: <MessageSquare className="w-5 h-5" />, path: "/contact" },
  ];

  const accountItems = user
    ? [
        { 
          label: t("Dashboard", "Bảng điều khiển"), 
          icon: <User className="w-5 h-5" />, 
          action: () => {
            navigate("/dashboard");
            setOpen(false);
          } 
        },
        { 
          label: t("Sign Out", "Đăng xuất"), 
          icon: <LogOut className="w-5 h-5" />, 
          action: () => {
            handleSignOut();
            setOpen(false);
          } 
        },
      ]
    : [
        { 
          label: t("Sign In", "Đăng nhập"), 
          icon: <LogIn className="w-5 h-5" />, 
          action: () => {
            navigate("/sign-in");
            setOpen(false);
          } 
        },
        { 
          label: t("Sign Up", "Đăng ký"), 
          icon: <User className="w-5 h-5" />, 
          action: () => {
            navigate("/sign-up");
            setOpen(false);
          } 
        },
      ];

  const onPostJobClick = () => {
    if (user) {
      navigate("/post-job");
    } else {
      navigate("/sign-in");
    }
    setOpen(false);
  };

  const tooltipText = t(
    "Was $29.99 – Free for a limited time!",
    "Giá gốc $29.99 – Hiện đang miễn phí!"
  );

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[70%] rounded-l-2xl border-l border-t border-b shadow-xl p-0" side="right">
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            {/* Post Job Button */}
            <div className="px-4 py-2 flex justify-center">
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={onPostJobClick}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-2.5"
                      size="lg"
                    >
                      <Flame className="mr-1.5 h-5 w-5" />
                      {t("Post a Job for Free", "Đăng việc miễn phí")}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#FEF7CD] text-[#333] text-xs px-3 py-1.5 shadow-md rounded-md border border-amber-200">
                    <p>{tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              {/* Language Section */}
              <div className="px-4 py-2">
                <h3 className="text-gray-500 font-medium px-1.5 mb-2 text-[15px]">
                  {t("Language", "Ngôn ngữ")}
                </h3>
                <div className="pl-4">
                  <LanguageToggle />
                </div>
              </div>
              
              {/* Navigation Section */}
              <div className="px-4 py-2">
                <h3 className="text-purple-600 font-medium px-1.5 mb-2 text-[15px]">
                  {t("Navigation", "Điều hướng")}
                </h3>
                <nav className="space-y-1.5 pl-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-3 py-2 text-gray-800 hover:text-purple-600 font-medium text-[15px] menu-item-enter"
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Account Section */}
              <div className="px-4 py-2">
                <h3 className="text-rose-500 font-medium px-1.5 mb-2 text-[15px]">
                  {t("Account", "Tài khoản")}
                </h3>
                <div className="space-y-1.5 pl-4">
                  {accountItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex w-full items-center gap-3 py-2 text-gray-800 hover:text-purple-600 font-medium text-left text-[15px] menu-item-enter"
                      onClick={item.action}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
