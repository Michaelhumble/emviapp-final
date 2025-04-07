
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
import { Link } from "react-router-dom";

interface AuthActionProps {
  children: React.ReactNode;
  onAction: () => Promise<boolean> | boolean;
}

const AuthAction: React.FC<AuthActionProps> = ({ children, onAction }) => {
  const { isSignedIn } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleAction = async () => {
    if (isSignedIn) {
      await onAction();
    } else {
      setShowAuthDialog(true);
    }
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
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button className="w-full" asChild>
              <Link to="/auth/signin">Sign In</Link>
            </Button>
            <Button variant="secondary" className="w-full" asChild>
              <Link to="/auth/signup">Create Account</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthAction;
