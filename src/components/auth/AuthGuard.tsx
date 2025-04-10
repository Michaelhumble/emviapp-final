
import React from "react";
import { Link } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiresAuth?: boolean;
  blurContent?: boolean;
}

/**
 * AuthGuard: A component that conditionally renders content based on auth state
 * - If requiresAuth is true, children are only shown to authenticated users
 * - Otherwise, fallback content is shown with login/signup buttons
 * - If blurContent is true, content is blurred instead of being replaced by fallback
 */
const AuthGuard = ({ 
  children, 
  fallback, 
  requiresAuth = true,
  blurContent = false
}: AuthGuardProps) => {
  const { isSignedIn } = useAuth();
  
  // If user is signed in or authentication is not required, show the content
  if (isSignedIn || !requiresAuth) {
    return <>{children}</>;
  }
  
  // If blurContent is true, show blurred content with overlay
  if (blurContent) {
    return (
      <div className="relative">
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/40 backdrop-blur-[1px] rounded-lg">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <Lock className="h-6 w-6 mx-auto mb-2 text-gray-500" />
            <h4 className="text-sm font-medium">Sign in to view contact info</h4>
            <p className="text-xs text-gray-500 mb-2">
              This information is hidden to protect our community
            </p>
            <div className="flex justify-center space-x-3 mt-3">
              <Link to="/auth/signin">
                <Button size="sm" variant="outline">Sign In</Button>
              </Link>
              <Link to="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
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
