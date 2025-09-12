import { Button } from "@/components/ui/button";
import { Chrome, Phone as PhoneIcon, Facebook, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useLocation } from "react-router-dom";
import { signInWithGoogle } from "@/services/auth";
import { toast } from "sonner";
import React from "react";
import { getAuthCallbackUrl } from "@/utils/getBaseUrl";
import { AUTH_CONFIG, validateAuthProvider, getProviderErrorMessage } from "@/utils/authConfig";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGoogleAuthValidation } from "@/hooks/useGoogleAuthValidation";

interface SocialAuthButtonsProps {
  mode: "signin" | "signup";
  onPhoneClick: () => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ mode, onPhoneClick }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectParam = params.get("redirect");
  const redirectTo = getAuthCallbackUrl(`/auth/callback${redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ''}`);
  const googleValidation = useGoogleAuthValidation();
  
  // Get environment variables for diagnostic display
  const googleEnabledFlag = (import.meta.env?.VITE_GOOGLE_ENABLED ?? 'true');
  const googleClientId = (import.meta.env as any)?.VITE_GOOGLE_CLIENT_ID as string | undefined;
  
  // Provider availability based on feature flags and configuration
  const googleEnabled = validateAuthProvider('google');
  const phoneEnabled = validateAuthProvider('phone');
  const facebookEnabled = validateAuthProvider('facebook');

  const handleGoogle = async () => {
    if (!googleEnabled) {
      console.warn('🚫 [GOOGLE AUTH] Google OAuth is disabled');
      toast.error(getProviderErrorMessage('google'));
      return;
    }
    
    try {
      console.log('🔧 [GOOGLE AUTH] Button clicked, initiating OAuth flow...');
      toast.loading('Redirecting to Google...', { id: 'google-auth' });
      
      const result = await signInWithGoogle(redirectTo);
      
      if (!result.success) {
        toast.dismiss('google-auth');
        // Handle structured error response
        const errorMsg = result.error?.userMessage || result.error?.message || 'Google sign-in failed';
        console.error('❌ [GOOGLE AUTH] Failed:', errorMsg);
        throw new Error(errorMsg);
      } else {
        // Success - user should be redirected by Google
        console.log('✅ [GOOGLE AUTH] OAuth initiated, user will be redirected');
      }
    } catch (e: any) {
      toast.dismiss('google-auth');
      console.error("❌ [GOOGLE AUTH] Button handler error:", e);
      toast.error(e?.message || "Google sign-in failed. Please try email sign-in instead.");
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
      {/* Diagnostic banners for Google OAuth configuration */}
      {googleEnabledFlag !== 'true' && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Google sign-in disabled. Set <code className="bg-blue-100 px-1 rounded">VITE_GOOGLE_ENABLED=true</code> in Environment/Secrets.
          </AlertDescription>
        </Alert>
      )}
      
      {googleEnabledFlag === 'true' && !googleClientId && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Missing <code className="bg-red-100 px-1 rounded">VITE_GOOGLE_CLIENT_ID</code>. Set this in Lovable → Environment/Secrets.
          </AlertDescription>
        </Alert>
      )}

      {/* Primary providers (Google, Facebook) */}
      {(googleEnabled || facebookEnabled) && (
        <div className={`grid grid-cols-1 ${googleEnabled && facebookEnabled ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-2`}>
          {googleEnabled && (
            <>
              <Button variant="outline" className="w-full justify-center h-12" onClick={handleGoogle}>
                <Chrome className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
              
              {/* Google ID Status Line */}
              {googleClientId && (
                <div className="text-xs text-muted-foreground text-center px-2">
                  Frontend ID: ...{googleClientId.slice(-4)} • Supabase ID: ...{googleValidation.supabaseClientId === 'check-supabase-dashboard' ? 'check' : 'TBD'} • Status: {googleValidation.isMatching ? '✅ match' : '❌ mismatch'}
                </div>
              )}
            </>
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
