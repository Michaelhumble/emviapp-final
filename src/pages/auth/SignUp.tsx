
import SignUpForm from "@/components/auth/SignUpForm";
import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const location = useLocation();
  // Pass redirect URL to SignUpForm
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <SignUpForm redirectUrl={redirectUrl} />
    </div>
  );
};

export default SignUp;
