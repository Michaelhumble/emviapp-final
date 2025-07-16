
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";

const AuthButtons = () => {
  const location = useLocation();
  const currentPath = encodeURIComponent(location.pathname + location.search);
  const { isSignedIn, signOut, user, loading } = useAuth();
  
  // Force re-render when auth state changes to ensure UI updates immediately
  const [authState, setAuthState] = useState(isSignedIn);
  
  useEffect(() => {
    setAuthState(isSignedIn);
  }, [isSignedIn, user]);
  
  // Don't show buttons while loading to prevent flash
  if (loading) {
    return null;
  }

  return (
    <>
      {authState ? (
        // Show Sign Out button when signed in
        <Button 
          onClick={signOut}
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          Sign Out
        </Button>
      ) : (
        // Show Sign In and Sign Up when not signed in
        <>
          <Link to={`/sign-in?redirect=${currentPath}`}>
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to={`/auth/signup?redirect=${currentPath}`}>
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default AuthButtons;
