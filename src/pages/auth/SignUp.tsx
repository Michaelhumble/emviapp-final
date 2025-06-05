
import EnhancedSignUpForm from "@/components/auth/EnhancedSignUpForm";
import { useLocation } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const SignUp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="large" showText={true} />
        </div>
        <EnhancedSignUpForm redirectUrl={redirectUrl} />
      </div>
    </div>
  );
};

export default SignUp;
