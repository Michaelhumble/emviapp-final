
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";
import { UserMenu } from "./navbar/UserMenu";
import AuthButtons from "./navbar/AuthButtons";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { Button } from "@/components/ui/button";
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
import { PlusCircle, Store } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("You've been signed out successfully");
  };

  const onPostJobClick = () => {
    navigate("/post-job");
  };

  const onListSalonClick = () => {
    navigate("/post-salon");
  };

  const jobTooltipText = t("Was $29.99 – Free for a limited time!");
  const salonTooltipText = t("List your salon for sale on EmviApp!");

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

        {/* Auth buttons or user menu with language toggle and Both CTA buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Both CTA Buttons - side by side on desktop */}
          <div className="hidden md:flex items-center gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  {user ? (
                    <Button 
                      onClick={onPostJobClick} 
                      className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] text-white hover:from-[#8A6B59] hover:to-[#A8855A] shadow-md hover:shadow-lg transition-all duration-300 rounded-lg font-playfair font-semibold px-4 py-2.5 flex items-center gap-2 border border-[#8A6B59]/20 text-sm"
                    >
                      <PlusCircle className="h-4 w-4" />
                      {t("Post Job")}
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => navigate("/sign-in")}
                      className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] text-white hover:from-[#8A6B59] hover:to-[#A8855A] shadow-md hover:shadow-lg transition-all duration-300 rounded-lg font-playfair font-semibold px-4 py-2.5 flex items-center gap-2 border border-[#8A6B59]/20 text-sm"
                    >
                      <PlusCircle className="h-4 w-4" />
                      {t("Post Job")}
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent className="bg-[#FEF7CD] text-[#333] text-xs px-3 py-1.5 shadow-sm rounded-md border border-amber-200">
                  <p>{jobTooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  {user ? (
                    <Button 
                      onClick={onListSalonClick} 
                      variant="outline"
                      className="border-[#9A7B69] text-[#9A7B69] hover:bg-[#9A7B69] hover:text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg font-playfair font-semibold px-4 py-2.5 flex items-center gap-2 text-sm"
                    >
                      <Store className="h-4 w-4" />
                      {t("List Salon")}
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => navigate("/sign-in")}
                      variant="outline"
                      className="border-[#9A7B69] text-[#9A7B69] hover:bg-[#9A7B69] hover:text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg font-playfair font-semibold px-4 py-2.5 flex items-center gap-2 text-sm"
                    >
                      <Store className="h-4 w-4" />
                      {t("List Salon")}
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent className="bg-[#FEF7CD] text-[#333] text-xs px-3 py-1.5 shadow-sm rounded-md border border-amber-200">
                  <p>{salonTooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
