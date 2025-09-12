import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";
import { useState } from "react";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { Separator } from "@/components/ui/separator";
import { PhoneOtpDialog } from "@/components/auth/PhoneOtpDialog";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthConfigStatus } from "@/components/auth/AuthConfigStatus";

const SignUp = () => {
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Helmet>
        <title>Create your EmviApp account</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.emvi.app/signup" />
      </Helmet>
      <AuthConfigStatus />
      <SocialAuthButtons mode="signup" onPhoneClick={() => setPhoneDialogOpen(true)} />
      <Separator className="my-4" />
      <PhoneOtpDialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen} />
      <EnhancedSignUpForm />
    </div>
  );
};

export default SignUp;
