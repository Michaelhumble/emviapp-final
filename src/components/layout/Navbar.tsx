
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";
import MainNavigation from "./navbar/MainNavigation";
import { UserMenu } from "./navbar/UserMenu";
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "@/hooks/useTranslation";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
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
      <div className="container flex items-center justify-between mx-auto h-20 px-4">
        {/* Logo - increased height to accommodate larger logo */}
        <Link to="/" className="flex items-center">
          <Logo size="large" showText={true} />
        </Link>

        {/* Main navigation - centered (hidden on mobile) */}
        <div className="hidden md:flex justify-center flex-grow">
          <MainNavigation />
        </div>

        {/* Auth buttons or user menu with language toggle and Post Job button */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Post Job Button - visible on all screen sizes */}
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
          
          {/* Enhanced premium mobile menu */}
          <MobileMenu 
            user={user}
            handleSignOut={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
