"use client";

import { Button } from "@/components/ui/button";
import { Chrome, Phone as PhoneIcon, Facebook, AlertTriangle, Info } from "lucide-react";
import { useLocation } from "react-router-dom";
import { signInWithGoogle, signInWithFacebook } from "@/services/auth";
import { toast } from "sonner";
import React from "react";
import { getAuthCallbackUrl } from "@/utils/auth/getAuthCallbackUrl";
import { validateAuthProvider, getProviderErrorMessage } from "@/utils/authConfig";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ENV, mask } from "@/config/env";

interface SocialAuthButtonsProps {
  mode: "signin" | "signup";
  onPhoneClick: () => void;
  variant?: "full" | "compact";
  showDiagnostics?: boolean;
  selectedRole?: string;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ mode, onPhoneClick, variant = "full", showDiagnostics = false, selectedRole }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectParam = params.get("redirect");
  const redirectTo = getAuthCallbackUrl();
  
  console.info('OAuth redirectTo =', redirectTo);
  
  // Use centralized environment configuration
  const { GOOGLE_ENABLED, GOOGLE_CLIENT_ID } = ENV;
  
  // Provider availability based on feature flags and configuration
  const googleEnabled = validateAuthProvider('google');
  const phoneEnabled = validateAuthProvider('phone');
  const facebookEnabled = validateAuthProvider('facebook');

  // Dev-only diagnostics control
  const isProd = process.env.NODE_ENV === "production";
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const diagFlag = search?.get("diag") === "1";
  const showDiag = !isProd && (showDiagnostics || diagFlag);

  const handleGoogle = async () => {
    if (!googleEnabled) {
      console.warn('🚫 [GOOGLE AUTH] Google OAuth is disabled');
      toast.error(getProviderErrorMessage('google'));
      return;
    }
    
    try {
      console.log('🔧 [GOOGLE AUTH] Button clicked, initiating OAuth flow...');
      toast.loading('Redirecting to Google...', { id: 'google-auth' });
      
      const result = await signInWithGoogle(undefined, selectedRole);
      
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

  const handleFacebook = async () => {
    if (!facebookEnabled) {
      console.warn('🚫 [FACEBOOK AUTH] Facebook OAuth is disabled');
      toast.error(getProviderErrorMessage('facebook'));
      return;
    }
    
    try {
      console.log('🔧 [FACEBOOK AUTH] Button clicked, initiating OAuth flow...');
      toast.loading('Redirecting to Facebook...', { id: 'facebook-auth' });
      
      const result = await signInWithFacebook(undefined, selectedRole);
      
      if (!result.success) {
        toast.dismiss('facebook-auth');
        // Handle structured error response
        const errorMsg = result.error?.userMessage || result.error?.message || 'Facebook sign-in failed';
        console.error('❌ [FACEBOOK AUTH] Failed:', errorMsg);
        throw new Error(errorMsg);
      } else {
        // Success - user should be redirected by Facebook
        console.log('✅ [FACEBOOK AUTH] OAuth initiated, user will be redirected');
      }
    } catch (e: any) {
      toast.dismiss('facebook-auth');
      console.error("❌ [FACEBOOK AUTH] Button handler error:", e);
      toast.error(e?.message || "Facebook sign-in failed. Please try email sign-in instead.");
    }
  };


  return (
    <div className={variant === "compact" ? "mt-4" : "mt-6"}>
      <div className={variant === "compact" ? "relative my-4" : "relative my-6"}>
        <div className="absolute inset-0 border-t border-neutral-200" />
        <div className="relative mx-auto -mt-3 w-fit bg-white px-2 text-xs text-neutral-500">OR</div>
      </div>

      <div className={`flex flex-col ${variant === "compact" ? "gap-3" : "gap-3"}`}>
        {/* Google */}
        {googleEnabled && (
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 active:scale-[0.99]"
            aria-label="Continue with Google"
          >
            Continue with Google
          </button>
        )}

        {/* Facebook - only if enabled & id present */}
        {facebookEnabled && import.meta.env?.VITE_FACEBOOK_CLIENT_ID && (
          <button
            type="button"
            onClick={handleFacebook}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 active:scale-[0.99]"
            aria-label="Continue with Facebook"
          >
            Continue with Facebook
          </button>
        )}
      </div>

      {/* Dev-only diagnostics */}
      {showDiag && (
        <div className="mt-2 text-xs text-neutral-500 space-y-1">
          {/* Diagnostic banners for OAuth configuration */}
          {!ENV.GOOGLE_ENABLED && (
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Google sign-in disabled. Set <code className="bg-blue-100 px-1 rounded">VITE_GOOGLE_ENABLED=true</code> in <code>.env.local</code>.
              </AlertDescription>
            </Alert>
          )}
          
          {ENV.GOOGLE_ENABLED && !ENV.GOOGLE_CLIENT_ID && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Missing <code className="bg-red-100 px-1 rounded">VITE_GOOGLE_CLIENT_ID</code>. Set this in <code>.env.local</code> file.
              </AlertDescription>
            </Alert>
          )}

          {/* Facebook diagnostic banners */}
          {!import.meta.env?.VITE_FACEBOOK_ENABLED && (
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Facebook sign-in disabled. Set <code className="bg-blue-100 px-1 rounded">VITE_FACEBOOK_ENABLED=true</code> in <code>.env.local</code>.
              </AlertDescription>
            </Alert>
          )}
          
          {import.meta.env?.VITE_FACEBOOK_ENABLED && !import.meta.env?.VITE_FACEBOOK_CLIENT_ID && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Missing <code className="bg-red-100 px-1 rounded">VITE_FACEBOOK_CLIENT_ID</code>. Set this in <code>.env.local</code> file.
              </AlertDescription>
            </Alert>
          )}

          {/* Google ID Status Line */}
          {ENV.GOOGLE_CLIENT_ID && (
            <div className="text-center px-2">
              Frontend ID: {mask(ENV.GOOGLE_CLIENT_ID)} • Supabase ID: check dashboard • Status: ✅ ready
            </div>
          )}

          {/* Facebook ID Status Line */}
          {import.meta.env?.VITE_FACEBOOK_CLIENT_ID && (
            <div className="text-center px-2">
              Frontend ID: {mask(import.meta.env.VITE_FACEBOOK_CLIENT_ID)} • Supabase ID: check dashboard • Status: ✅ ready
            </div>
          )}
        </div>
      )}

      {/* Show alternative if no social providers are available */}
      {!googleEnabled && !facebookEnabled && (
        <div className="mt-4 text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
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
