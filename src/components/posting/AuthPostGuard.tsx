
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";

interface AuthPostGuardProps {
  children: React.ReactNode;
}

/**
 * AuthPostGuard: A component that ensures users are authenticated before they can post
 * - Redirects unauthenticated users to the sign-in page
 */
const AuthPostGuard = ({ children }: AuthPostGuardProps) => {
  const { isSignedIn, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !isSignedIn) {
      // Redirect to sign-in page if not authenticated
      navigate("/auth/signin?redirect=/jobs");
    }
  }, [isSignedIn, loading, navigate]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!isSignedIn) {
    return null; // Will redirect via useEffect
  }
  
  return <>{children}</>;
};

export default AuthPostGuard;
