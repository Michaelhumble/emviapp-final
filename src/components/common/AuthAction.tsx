
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthActionProps {
  children?: React.ReactNode;  // Make children optional
  onAction: () => Promise<boolean> | boolean;
  creditMessage?: string;
  redirectPath?: string;
  customTitle?: string;
  fallbackContent?: React.ReactNode;
  authenticatedContent?: React.ReactNode;
}

const AuthAction: React.FC<AuthActionProps> = ({ 
  children, 
  onAction,
  creditMessage,
  redirectPath,
  customTitle = "Sign in to continue",
  fallbackContent,
  authenticatedContent
}) => {
  const { isSignedIn, user, loading } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // CRITICAL: Close auth dialog when user successfully signs in
  // This ensures that after authentication, protected content is immediately accessible
  useEffect(() => {
    if (isSignedIn && showAuthDialog) {
      console.log('🔐 AuthAction: User signed in, closing auth dialog');
      setShowAuthDialog(false);
    }
  }, [isSignedIn, showAuthDialog]);

  // LOADING STATE: Show nothing while auth is resolving to prevent premature prompts
  if (loading) {
    return null;
  }

  const handleAction = async () => {
    if (isSignedIn) {
      const result = await onAction();
      if (redirectPath && result) {
        navigate(redirectPath);
      }
    } else {
      setShowAuthDialog(true);
    }
  };

  const handleNavigation = (path: string) => {
    // Store the current path or redirectPath as the return destination
    const returnPath = redirectPath || location.pathname + location.search;
    const encodedRedirect = encodeURIComponent(returnPath);
    navigate(`${path}?redirect=${encodedRedirect}`);
    setShowAuthDialog(false);
  };

  // If authenticated content is provided and user is signed in, render that instead
  if (isSignedIn && authenticatedContent) {
    return <>{authenticatedContent}</>;
  }

  // If fallback content is provided and user is not signed in, render that without click handler
  if (!isSignedIn && fallbackContent) {
    return (
      <>
        <div onClick={handleAction} className="cursor-pointer">
          {fallbackContent}
        </div>

        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{customTitle}</DialogTitle>
              <DialogDescription>
                Create a free Emvi account to connect with top salons near you.
                {creditMessage && (
                  <span className="block mt-2 text-pink-600 font-medium">
                    {creditMessage}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleNavigation('/signin')}
                >
                  Sign In
                </Button>
              <Button 
                variant="secondary" 
                className="w-full" 
                onClick={() => handleNavigation('/signup')}
              >
                Create Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <div onClick={handleAction} className="cursor-pointer">
        {children || null}
      </div>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{customTitle}</DialogTitle>
            <DialogDescription>
              Create a free Emvi account to connect with top salons near you.
              {creditMessage && (
                <span className="block mt-2 text-pink-600 font-medium">
                  {creditMessage}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button 
              className="w-full" 
              onClick={() => handleNavigation('/signin')}
            >
              Sign In
            </Button>
            <Button 
              variant="secondary" 
              className="w-full" 
              onClick={() => handleNavigation('/signup')}
            >
              Create Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthAction;
