
import SignUpForm from "@/components/auth/SignUpForm";
import { Card } from "@/components/ui/card";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
