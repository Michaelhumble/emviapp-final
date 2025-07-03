
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

const AuthButtons = () => {
  const location = useLocation();
  const currentPath = encodeURIComponent(location.pathname + location.search);
  const { isSignedIn, signOut } = useAuth();
  
  return (
    <>
      {isSignedIn ? (
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
