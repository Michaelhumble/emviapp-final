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
import { MainContent } from "@/components/layout/MainContent";
import { AriaLiveRegion } from "@/components/seo/AccessibilityHelpers";

const SignIn = () => {
  const location = useLocation();
  // Sanitize redirect param
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = sanitizeRedirect(queryParams.get("redirect"));
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white motion-reduce:bg-white">
      <MainContent className="w-full max-w-md">
        <Helmet>
          <title>Sign in to EmviApp</title>
          <meta name="robots" content="noindex, nofollow" />
          <link rel="canonical" href="https://www.emvi.app/signin" />
        </Helmet>
        
        <header className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </header>

        <h1 className="sr-only">Sign in to your EmviApp account</h1>
        
        <SignInForm redirectUrl={redirectUrl} />
        <SocialAuthButtons mode="signin" onPhoneClick={() => setPhoneDialogOpen(true)} variant="compact" showDiagnostics={false} />
        <PhoneOtpDialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen} />
        
        <div className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <a 
            href="/auth/signup" 
            className="text-indigo-600 hover:text-indigo-700 underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
          >
            Sign up
          </a>
        </div>

        {statusMessage && (
          <AriaLiveRegion message={statusMessage} priority="polite" />
        )}
      </MainContent>
    </div>
  );
};

export default SignIn;
