
import SignInForm from "@/components/auth/SignInForm";
import { useLocation } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const SignIn = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');
  const message = queryParams.get('message');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo size="large" showText={true} />
        </div>
        <SignInForm redirectUrl={redirectUrl} message={message} />
      </div>
    </div>
  );
};

export default SignIn;
