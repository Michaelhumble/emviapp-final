
import SignInForm from "@/components/auth/SignInForm";
import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { PhoneOtpDialog } from "@/components/auth/PhoneOtpDialog";

const SignIn = () => {
  const location = useLocation();
  // Pass redirect URL to SignInForm
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </div>
        <SocialAuthButtons mode="signin" onPhoneClick={() => setPhoneDialogOpen(true)} />
        <Separator className="my-4" />
        <PhoneOtpDialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen} />
        <SignInForm redirectUrl={redirectUrl} />
      </div>
    </div>
  );
};

export default SignIn;
