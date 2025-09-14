import SignInForm from "@/components/auth/SignInForm";
import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { PhoneOtpDialog } from "@/components/auth/PhoneOtpDialog";
import { Helmet } from "react-helmet-async";
import { sanitizeRedirect } from "@/utils/redirectSanitizer";
import { AuthConfigStatus } from "@/components/auth/AuthConfigStatus";

const SignIn = () => {
  const location = useLocation();
  // Sanitize redirect param
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = sanitizeRedirect(queryParams.get("redirect"));
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <Helmet>
          <title>Sign in to EmviApp</title>
          <meta name="robots" content="noindex, nofollow" />
          <link rel="canonical" href="https://www.emvi.app/signin" />
        </Helmet>
        <div className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </div>
        <SignInForm redirectUrl={redirectUrl} />
        <SocialAuthButtons mode="signin" onPhoneClick={() => setPhoneDialogOpen(true)} variant="compact" showDiagnostics={false} />
        <PhoneOtpDialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen} />
        <div className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <a href="/auth/signup" className="text-indigo-600 hover:text-indigo-700 underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
