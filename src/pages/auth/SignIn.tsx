
import SignInForm from "@/components/auth/SignInForm";
import { Card } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import EmviLogo from "@/components/branding/EmviLogo";

/**
 * SignIn page component
 * Handles user authentication and redirects
 * 
 * @returns {JSX.Element} - Rendered sign in page
 */
const SignIn = () => {
  const location = useLocation();
  // Parse redirect URL from query parameters
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect');
  const errorParam = queryParams.get('error');
  
  const [initialError, setInitialError] = useState<string | null>(null);
  
  // Handle error parameters in URL
  useEffect(() => {
    if (errorParam === 'session_expired') {
      setInitialError('Your session has expired. Please sign in again.');
    } else if (errorParam === 'persistent_auth_error') {
      setInitialError('Authentication error. Please sign in again.');
    }
  }, [errorParam]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <EmviLogo size="large" />
        </div>
        <SignInForm 
          redirectUrl={redirectUrl}
          initialError={initialError} 
        />
      </div>
    </div>
  );
};

export default SignIn;
