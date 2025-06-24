
import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";
import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const SignUp = () => {
  const location = useLocation();
  // Pass redirect URL to EnhancedSignUpForm
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');

  return (
    <div style={{ backgroundColor: '#E3F2FD' }} className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </div>
        <EnhancedSignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
