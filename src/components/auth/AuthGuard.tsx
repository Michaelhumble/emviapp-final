import React from "react";
import { Link } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiresAuth?: boolean;
}

/**
 * AuthGuard: A component that conditionally renders content based on auth state
 * - If requiresAuth is true, children are only shown to authenticated users
 * - Otherwise, fallback content is shown with login/signup buttons
 */
const AuthGuard = ({ 
  children, 
  fallback, 
  requiresAuth = true 
}: AuthGuardProps) => {
  const { isSignedIn } = useAuth();
  
  // If user is signed in or authentication is not required, show the content
  if (isSignedIn || !requiresAuth) {
    return <>{children}</>;
  }
  
  // Otherwise, show the fallback or default locked content
  return (
    <div className="relative">
      {fallback ? (
        <>{fallback}</>
      ) : (
        <div className="bg-gray-100 rounded-lg p-4 text-center my-2">
          <div className="flex justify-center mb-3">
            <Lock className="h-6 w-6 text-gray-500" />
          </div>
          <h4 className="text-sm font-medium mb-2">Sign in to view this content</h4>
          <p className="text-xs text-gray-600 mb-3">
            Create a free account to see contact details and access all features
          </p>
          <div className="flex justify-center space-x-3">
            <Link to="/auth/signin">
              <Button size="sm" variant="outline">Sign In</Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthGuard;
