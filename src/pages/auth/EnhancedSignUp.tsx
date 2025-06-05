
import EnhancedSignUpForm from "@/components/auth/EnhancedSignUpForm";
import { useLocation } from "react-router-dom";

const EnhancedSignUp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');

  return <EnhancedSignUpForm redirectUrl={redirectUrl} />;
};

export default EnhancedSignUp;
