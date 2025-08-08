
import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";
import Logo from "@/components/ui/Logo";
import { useState } from "react";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { Separator } from "@/components/ui/separator";
import { PhoneOtpDialog } from "@/components/auth/PhoneOtpDialog";

const SignUpNew = () => {
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  return (
    <div style={{ backgroundColor: '#FFF3E0' }} className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </div>
        <SocialAuthButtons mode="signup" onPhoneClick={() => setPhoneDialogOpen(true)} />
        <Separator className="my-4" />
        <PhoneOtpDialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen} />
        <EnhancedSignUpForm />
      </div>
    </div>
  );
};

export default SignUpNew;
