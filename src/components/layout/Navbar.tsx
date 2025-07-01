
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";
import { UserMenu } from "./navbar/UserMenu";
import AuthButtons from "./navbar/AuthButtons";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { Button } from "@/components/ui/button";
import PostYourSalonButton from "@/components/buttons/PostYourSalonButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/use-mobile";
import { mainNavigationItems } from "@/components/layout/navbar/config/navigationItems";
import MobileMenu from "@/components/layout/MobileMenu";
import { useState } from "react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("You've been signed out successfully");
  };

  const onPostJobClick = () => {
    navigate("/post-job");
  };

  const tooltipText = t("Was $29.99 – Free for a limited time!");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between mx-auto h-16 px-4">
        {/* Logo - using large size to match the footer */}
        <Link to="/" className="flex items-center">
          <Logo size="large" showText={true} />
        </Link>

        {/* Main navigation - centered (hidden on mobile) */}
        <div className="hidden md:flex justify-center flex-grow">
          <nav className="flex items-center space-x-1">
            {mainNavigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-purple-700 bg-purple-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {t({
                  english: item.title,
                  vietnamese: item.vietnameseTitle || item.title
                })}
              </Link>
            ))}
          </nav>
        </div>

        {/* Auth buttons or user menu with language toggle and Post Job button */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Post Job Button - only visible on desktop */}
          <div className="hidden md:block">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  {user ? (
                    <Button 
                      onClick={onPostJobClick} 
                      className="bg-purple-600 text-white hover:bg-purple-700 rounded-lg"
                    >
                      {t("Post a Job for Free")}
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => navigate("/sign-in")}
                      className="bg-purple-600 text-white hover:bg-purple-700 rounded-lg"
                    >
                      {t("Post a Job for Free")}
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent className="bg-[#FEF7CD] text-[#333] text-xs px-3 py-1.5 shadow-sm rounded-md border border-amber-200">
                  <p>{tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Post Your Salon Button - only visible on desktop */}
          <div className="hidden md:block">
            <PostYourSalonButton 
              variant="outline" 
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            />
          </div>
          
          {/* Language toggle always visible on desktop */}
          <div className="hidden md:block">
            <LanguageToggle minimal={true} className="mr-1" />
          </div>
          
          {/* Auth buttons or user menu (hidden on mobile) */}
          <div className="hidden md:block">
            {user ? (
              <UserMenu />
            ) : (
              <AuthButtons />
            )}
          </div>
          
          {/* Mobile menu hamburger button - always visible on mobile */}
          <div className="md:hidden">
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
