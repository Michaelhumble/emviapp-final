
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Menu, 
  X, 
  Home, 
  Briefcase, 
  Store, 
  Globe, 
  LogIn, 
  UserCircle, 
  LogOut,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useTranslation } from "@/hooks/useTranslation";

interface MobileMenuProps {
  user: any;
  handleSignOut: () => Promise<void>;
}

const MobileMenu = ({ user, handleSignOut }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const onPostJobClick = () => {
    setOpen(false);
    navigate("/post-job");
  };

  const tooltipText = t(
    "Was $29.99 – Free for a limited time!",
    "Giá gốc $29.99 – Hiện đang miễn phí!"
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="mobile-glass-drawer w-[80%] rounded-l-2xl shadow-xl">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl font-medium pl-1">Menu</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 hover:bg-black/5 rounded-full"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>

        <div className="flex flex-col gap-4">
          {/* Post Job Button - mobile */}
          <div className="px-2 mb-2">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={user ? onPostJobClick : () => {
                      setOpen(false);
                      navigate("/sign-in");
                    }} 
                    className="bg-purple-600 text-white hover:bg-purple-700 w-full rounded-full h-11 font-medium shadow-sm"
                  >
                    <Flame className="mr-1 h-4 w-4" />
                    {t("Post a Job for Free", "Đăng việc miễn phí")}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-[#FEF7CD] text-[#333] text-xs px-3 py-1.5 shadow-sm rounded-md border border-amber-200">
                  <p>{tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Language toggle */}
          <div className="px-2 py-3 mb-0 bg-gray-50/80 rounded-lg">
            <p className="text-xs font-medium mb-2 text-gray-500 pl-1">{t("Language", "Ngôn ngữ")}</p>
            <div className="pl-1">
              <LanguageToggle />
            </div>
          </div>
          
          {/* Navigation Menu */}
          <div className="mt-1">
            <p className="text-xs font-medium mb-1 text-gray-500 pl-3">{t("Navigation", "Điều hướng")}</p>
            <nav className="space-y-0.5">
              <Link
                to="/"
                className="flex items-center pl-3 py-2.5 hover:bg-gray-50 rounded-lg menu-item-enter transition-all"
                onClick={() => setOpen(false)}
              >
                <Home className="h-4 w-4 text-gray-500 mr-3" />
                <span>{t("Home", "Trang chủ")}</span>
              </Link>
              <Link
                to="/jobs"
                className="flex items-center pl-3 py-2.5 hover:bg-gray-50 rounded-lg menu-item-enter transition-all"
                onClick={() => setOpen(false)}
              >
                <Briefcase className="h-4 w-4 text-gray-500 mr-3" />
                <span>{t("Jobs", "Việc làm")}</span>
              </Link>
              <Link
                to="/salons"
                className="flex items-center pl-3 py-2.5 hover:bg-gray-50 rounded-lg menu-item-enter transition-all"
                onClick={() => setOpen(false)}
              >
                <Store className="h-4 w-4 text-gray-500 mr-3" />
                <span>{t("Salons", "Tiệm")}</span>
              </Link>
            </nav>
          </div>
          
          {/* Auth/Account links */}
          <div className="mt-1">
            <p className="text-xs font-medium mb-1 text-gray-500 pl-3">{t("Account", "Tài khoản")}</p>
            {user ? (
              <div className="space-y-0.5">
                <Link
                  to="/dashboard"
                  className="flex items-center pl-3 py-2.5 hover:bg-gray-50 rounded-lg menu-item-enter transition-all"
                  onClick={() => setOpen(false)}
                >
                  <UserCircle className="h-4 w-4 text-gray-500 mr-3" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center pl-3 py-2.5 hover:bg-gray-50 rounded-lg menu-item-enter transition-all"
                  onClick={() => setOpen(false)}
                >
                  <UserCircle className="h-4 w-4 text-gray-500 mr-3" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setOpen(false);
                  }}
                  className="w-full flex items-center pl-3 py-2.5 hover:bg-gray-50 rounded-lg menu-item-enter transition-all text-red-500"
                >
                  <LogOut className="h-4 w-4 text-red-400 mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-0.5">
                <Link
                  to="/sign-in"
                  className="flex items-center pl-3 py-2.5 hover:bg-gray-50 rounded-lg menu-item-enter transition-all"
                  onClick={() => setOpen(false)}
                >
                  <LogIn className="h-4 w-4 text-gray-500 mr-3" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/sign-up"
                  className="flex items-center pl-3 py-2.5 hover:bg-gray-50 rounded-lg menu-item-enter transition-all"
                  onClick={() => setOpen(false)}
                >
                  <UserCircle className="h-4 w-4 text-gray-500 mr-3" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
