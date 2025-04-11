
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import EmviLogo from "@/components/branding/EmviLogo";
import MainNavigation from "./navbar/MainNavigation";
import { UserMenu } from "./navbar/UserMenu";
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [signOutFn, setSignOutFn] = useState<() => Promise<void>>(() => async () => {
    console.log("Default sign out function");
  });
  
  // Safely try to get auth context
  try {
    const auth = useAuth();
    if (auth && auth.user) {
      if (user !== auth.user) {
        setUser(auth.user);
      }
      if (signOutFn !== auth.signOut) {
        setSignOutFn(() => auth.signOut);
      }
    }
  } catch (error) {
    console.error("Auth context not available in Navbar:", error);
  }

  const handleSignOut = async () => {
    try {
      await signOutFn();
      window.location.href = "/";
      toast.success("You've been signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between mx-auto h-16 px-4">
        <Link to="/" className="flex items-center">
          <EmviLogo size="small" />
        </Link>

        {/* Main navigation */}
        <MainNavigation />

        {/* Auth buttons or user menu */}
        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu />
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
