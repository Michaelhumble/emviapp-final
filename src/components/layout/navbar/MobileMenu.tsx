
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { AlignJustify, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageToggle from "@/components/layout/LanguageToggle";
import EmviLogo from "@/components/branding/EmviLogo";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { mainNavigation } from "./config/navigationItems";

const MobileMenu = ({ user, handleSignOut }: { user: any; handleSignOut: any }) => {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden h-8 w-8 p-0">
          <AlignJustify className="h-5 w-5" />
          <span className="sr-only">Open mobile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] sm:w-80 mobile-glass-drawer overflow-y-auto">
        <div className="flex justify-between items-center">
          <EmviLogo size="small" />
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </div>
        
        <div className="mt-8 flex flex-col gap-6">
          {/* User Section */}
          {user && (
            <div className="flex items-center gap-3 mb-4 px-2">
              <Avatar className="h-11 w-11 border-2 border-purple-100">
                <AvatarImage src={user?.image} />
                <AvatarFallback className="bg-purple-100 text-purple-500">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          )}

          {/* Primary Links */}
          <div className="space-y-1.5">
            <SheetClose asChild>
              <Link to="/" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                <span>Home</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link to="/post-job" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                <span>{t("Post a Job")}</span>
                <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200 text-xs">
                  Free
                </Badge>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link to="/jobs" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                <span>{t("Jobs")}</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link to="/salons" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                <span>{t("Salons")}</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link to="/artists" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                <span>{t("Artists")}</span>
              </Link>
            </SheetClose>
          </div>

          {/* Secondary Links */}
          <div className="space-y-1.5">
            <SheetClose asChild>
              <Link to="/pricing" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                <span>{t("Pricing")}</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link to="/about" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                <span>{t("About")}</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link to="/contact" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                <span>{t("Contact")}</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link to="/help" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                <span>{t("Help")}</span>
              </Link>
            </SheetClose>
          </div>

          {/* User Account Links */}
          {user ? (
            <div className="mt-2 space-y-1.5 border-t border-gray-100 pt-4">
              <SheetClose asChild>
                <Link to="/dashboard" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                  <span>{t("Dashboard")}</span>
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link to="/profile" className={cn(navigationMenuTriggerStyle(), "w-full justify-start menu-item-enter")}>
                  <span>{t("Profile")}</span>
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  {t("Sign Out")}
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="mt-2 space-y-3 border-t border-gray-100 pt-4">
              <SheetClose asChild>
                <Link to="/sign-in">
                  <Button variant="outline" className="w-full">
                    {t("Sign In")}
                  </Button>
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link to="/sign-up">
                  <Button className="w-full">
                    {t("Sign Up")}
                  </Button>
                </Link>
              </SheetClose>
            </div>
          )}

          {/* Language Toggle */}
          <div className="mt-auto border-t border-gray-100 pt-4">
            <p className="text-xs text-muted-foreground mb-2">{t("Language")}</p>
            <LanguageToggle />
          </div>
        </div>
        
        {/* Credit Line */}
        <div className="mt-8 pt-4 text-center text-xs text-muted-foreground">
          <p>Inspired by Sunshine ☀️</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
