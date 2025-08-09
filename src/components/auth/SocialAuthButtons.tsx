import { Button } from "@/components/ui/button";

import { Chrome, Phone as PhoneIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { signInWithGoogle } from "@/services/auth";
import { toast } from "sonner";
import React from "react";

interface SocialAuthButtonsProps {
  mode: "signin" | "signup";
  onPhoneClick: () => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ mode, onPhoneClick }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectParam = params.get("redirect");
  const redirectTo = `${window.location.origin}/auth/redirect${redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ''}`;
  // Feature flag: enable/disable Phone option via localStorage 'ENABLE_PHONE' (defaults to true)
  const phoneEnabled = (localStorage.getItem('ENABLE_PHONE') ?? 'true') !== 'false';

  const handleGoogle = async () => {
    try {
      await signInWithGoogle(redirectTo);
    } catch (e: any) {
      console.error("Google auth error", e);
      toast.error(e?.message || "Failed to start Google sign-in");
    }
  };


  return (
    <div className="space-y-2">
      <div className={`grid grid-cols-1 ${phoneEnabled ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-2`}>
        <Button variant="outline" className="w-full justify-center" onClick={handleGoogle}>
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
        {phoneEnabled && (
          <Button variant="secondary" className="w-full justify-center" onClick={onPhoneClick}>
            <PhoneIcon className="mr-2 h-4 w-4" />
            {mode === "signup" ? "Sign up with phone" : "Sign in with phone"}
          </Button>
        )}
      </div>
    </div>
  );
};
