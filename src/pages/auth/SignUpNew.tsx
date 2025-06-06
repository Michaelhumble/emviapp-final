
import { EnhancedSignUpForm } from "@/components/auth/EnhancedSignUpForm";
import Logo from "@/components/ui/Logo";

const SignUpNew = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </div>
        <EnhancedSignUpForm />
      </div>
    </div>
  );
};

export default SignUpNew;
