
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import EmviLogo from "@/components/branding/EmviLogo";
import MainNavigation from "./navbar/MainNavigation";
import { UserMenu } from "./navbar/UserMenu"; // Fixed import to use named export
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const { user, signOut, userRole } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("You've been signed out successfully");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between mx-auto h-16 px-4">
        <Link to="/" className="flex items-center">
          <EmviLogo className="h-8 w-auto" />
        </Link>

        {/* Main navigation */}
        <MainNavigation />

        {/* Auth buttons or user menu */}
        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu 
              user={user} 
              userRole={userRole} 
              handleSignOut={handleSignOut} 
            />
          ) : (
            <AuthButtons />
          )}
          
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
