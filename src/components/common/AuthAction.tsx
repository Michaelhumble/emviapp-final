
import React, { useState } from "react";
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
  children: React.ReactNode;
  onAction: () => Promise<boolean> | boolean;
  creditMessage?: string;
  redirectPath?: string;
  customTitle?: string;
}

const AuthAction: React.FC<AuthActionProps> = ({ 
  children, 
  onAction,
  creditMessage,
  redirectPath,
  customTitle = "Sign in to continue"
}) => {
  const { isSignedIn } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    // Encode current location for redirect after login
    const currentPath = redirectPath || location.pathname + location.search;
    const encodedRedirect = encodeURIComponent(currentPath);
    navigate(`${path}?redirect=${encodedRedirect}`);
    setShowAuthDialog(false);
  };

  return (
    <>
      <div onClick={handleAction} className="cursor-pointer">
        {children}
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
              onClick={() => handleNavigation('/sign-in')}
            >
              Sign In
            </Button>
            <Button 
              variant="secondary" 
              className="w-full" 
              onClick={() => handleNavigation('/sign-up')}
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
