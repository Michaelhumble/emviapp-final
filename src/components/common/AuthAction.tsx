
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
import { Link, useNavigate, useLocation } from "react-router-dom";

interface AuthActionProps {
  children: React.ReactNode;
  onAction: () => Promise<boolean> | boolean;
  creditMessage?: string; // Optional message about credits for this action
  redirectPath?: string; // Optional redirect path
}

const AuthAction: React.FC<AuthActionProps> = ({ 
  children, 
  onAction,
  creditMessage,
  redirectPath 
}) => {
  const { isSignedIn } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = redirectPath || location.pathname + location.search;

  const handleAction = async () => {
    if (isSignedIn) {
      await onAction();
    } else {
      setShowAuthDialog(true);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(`${path}?redirect=${encodeURIComponent(currentPath)}`);
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
            <DialogTitle>Sign in to continue</DialogTitle>
            <DialogDescription>
              Create a free Emvi account to connect with top artists near you.
              {creditMessage && (
                <span className="block mt-2 text-pink-600 font-medium">
                  {creditMessage}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button className="w-full" onClick={() => handleNavigation('/sign-in')}>
              Sign In
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => handleNavigation('/sign-up')}>
              Create Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthAction;
