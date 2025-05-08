
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import EmviLogo from "@/components/branding/EmviLogo";
import MainNavigation from "./navbar/MainNavigation";
import { UserMenu } from "./navbar/UserMenu";
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("You've been signed out successfully");
  };

  const onPostJobClick = () => {
    // This function will be implemented later
    // For now, it does nothing as requested
    console.log("Post job button clicked");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between mx-auto h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <EmviLogo size="small" />
        </Link>

        {/* Main navigation - centered (hidden on mobile) */}
        <div className="hidden md:flex justify-center flex-grow">
          <MainNavigation />
        </div>

        {/* Auth buttons or user menu with language toggle and Post Job button */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Post Job Button - visible on all screen sizes */}
          {user ? (
            <Button 
              onClick={onPostJobClick} 
              className="bg-primary text-white hover:bg-primary/90"
            >
              Đăng Tin Tuyển Thợ
            </Button>
          ) : (
            <Button 
              onClick={() => navigate("/sign-in")}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Đăng Tin Tuyển Thợ
            </Button>
          )}
          
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
