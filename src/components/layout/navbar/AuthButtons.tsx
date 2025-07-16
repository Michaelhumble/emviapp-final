
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

const AuthButtons = () => {
  const location = useLocation();
  const currentPath = encodeURIComponent(location.pathname + location.search);
  const { isSignedIn, signOut, user, loading } = useAuth();
  
  // CRITICAL: Show loading state to prevent button flickering
  // During auth state changes, show nothing until state is resolved
  if (loading) {
    return (
      <div className="w-24 h-9 bg-gray-100 animate-pulse rounded-md flex-shrink-0" />
    );
  }

  // SINGLE SOURCE OF TRUTH: Use only the centralized isSignedIn from auth context
  // Do NOT use local state - this caused the original issues
  return (
    <>
      {isSignedIn ? (
        // AUTHENTICATED STATE: Show only Sign Out button
        <Button 
          onClick={signOut}
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          Sign Out
        </Button>
      ) : (
        // UNAUTHENTICATED STATE: Show Sign In and Sign Up buttons
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
