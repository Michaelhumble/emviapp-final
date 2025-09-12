import { Button } from "@/components/ui/button";
import { Chrome, Phone as PhoneIcon, Facebook } from "lucide-react";
import { useLocation } from "react-router-dom";
import { signInWithGoogle } from "@/services/auth";
import { toast } from "sonner";
import React from "react";
import { getAuthCallbackUrl } from "@/utils/getBaseUrl";
import { AUTH_CONFIG, validateAuthProvider, getProviderErrorMessage } from "@/utils/authConfig";

interface SocialAuthButtonsProps {
  mode: "signin" | "signup";
  onPhoneClick: () => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ mode, onPhoneClick }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectParam = params.get("redirect");
  const redirectTo = getAuthCallbackUrl(`/auth/redirect${redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ''}`);
  
  // Provider availability based on feature flags and configuration
  const googleEnabled = validateAuthProvider('google');
  const phoneEnabled = validateAuthProvider('phone');
  const facebookEnabled = validateAuthProvider('facebook');

  const handleGoogle = async () => {
    if (!googleEnabled) {
      toast.error(getProviderErrorMessage('google'));
      return;
    }
    
    try {
      console.log('🔧 [GOOGLE AUTH] Starting Google OAuth flow...');
      await signInWithGoogle(redirectTo);
    } catch (e: any) {
      console.error("❌ [GOOGLE AUTH] Error:", e);
      toast.error(e?.message || "Failed to start Google sign-in");
    }
  };

  const handlePhone = () => {
    if (!phoneEnabled) {
      toast.error(getProviderErrorMessage('phone'));
      return;
    }
    onPhoneClick();
  };

  const handleFacebook = () => {
    if (!facebookEnabled) {
      toast.error(getProviderErrorMessage('facebook'));
      return;
    }
    // TODO: Implement Facebook OAuth
    toast.info("Facebook sign-in coming soon! Please use email or Google for now.");
  };


  // Count enabled providers to determine grid layout
  const enabledProviders = [googleEnabled, phoneEnabled, facebookEnabled].filter(Boolean).length;
  const gridCols = enabledProviders >= 2 ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <div className="space-y-3">
      {/* Primary providers (Google, Facebook) */}
      {(googleEnabled || facebookEnabled) && (
        <div className={`grid grid-cols-1 ${googleEnabled && facebookEnabled ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-2`}>
          {googleEnabled && (
            <Button variant="outline" className="w-full justify-center h-12" onClick={handleGoogle}>
              <Chrome className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          )}
          {facebookEnabled && (
            <Button variant="outline" className="w-full justify-center h-12" onClick={handleFacebook}>
              <Facebook className="mr-2 h-4 w-4" />
              Continue with Facebook
            </Button>
          )}
        </div>
      )}
      
      {/* Phone provider */}
      {phoneEnabled && (
        <Button variant="secondary" className="w-full justify-center h-12" onClick={handlePhone}>
          <PhoneIcon className="mr-2 h-4 w-4" />
          {mode === "signup" ? "Sign up with phone" : "Sign in with phone"}
        </Button>
      )}
      
      {/* Show alternative if no social providers are available */}
      {!googleEnabled && !phoneEnabled && !facebookEnabled && (
        <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-700 font-medium">
            Social sign-in methods are temporarily unavailable.
          </p>
          <p className="text-xs text-amber-600 mt-1">
            Please use email {mode} below.
          </p>
        </div>
      )}
    </div>
  );
};
