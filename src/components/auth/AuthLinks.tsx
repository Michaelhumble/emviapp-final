
import { Link } from "react-router-dom";

export const SignUpLink = () => (
  <Link 
    to="/auth/signup" 
    className="text-sm text-primary hover:underline font-medium"
  >
    Create Account
  </Link>
);

export const ForgotPasswordLink = () => (
  <Link 
    to="/auth/forgot-password" 
    className="text-sm text-primary hover:underline font-medium"
  >
    Forgot Password?
  </Link>
);
