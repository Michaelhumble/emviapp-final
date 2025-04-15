
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import EmviLogo from "@/components/branding/EmviLogo";
import MainNavigation from "./navbar/MainNavigation";
import { UserMenu } from "./navbar/UserMenu";
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";
import LanguageToggle from "@/components/layout/LanguageToggle";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if we're on an explore page
  const isExplorePage = 
    location.pathname.includes('/artists') || 
    location.pathname.includes('/salons') || 
    location.pathname.includes('/jobs') || 
    location.pathname.includes('/salon-marketplace') || 
    location.pathname.includes('/freelancers') ||
    location.pathname.includes('/explore');
  
  // Determine if we're on a profile setup page
  const isProfileSetupPage = 
    location.pathname.includes('/profile/') && 
    location.pathname.includes('/setup');

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("You've been signed out successfully");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between mx-auto h-16 px-4">
        <Link to="/" className="flex items-center">
          <EmviLogo size="small" />
        </Link>

        {/* Main navigation (hidden on mobile) */}
        <div className="hidden md:block">
          <MainNavigation />
        </div>

        {/* Auth buttons or user menu with language toggle */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language toggle always visible */}
          <LanguageToggle minimal={true} className="mr-1" />
          
          {/* Auth buttons or user menu (hidden on mobile) */}
          <div className="hidden md:block">
            {user ? (
              <UserMenu />
            ) : (
              <AuthButtons />
            )}
          </div>
          
          {/* Mobile menu button */}
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
