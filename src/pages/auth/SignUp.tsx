
import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";
import { useState } from "react";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { Separator } from "@/components/ui/separator";
import { PhoneOtpDialog } from "@/components/auth/PhoneOtpDialog";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <SocialAuthButtons mode="signup" onPhoneClick={() => setPhoneDialogOpen(true)} />
      <Separator className="my-4" />
      <PhoneOtpDialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen} />
      <EnhancedSignUpForm />
    </div>
  );
};

export default SignUp;
