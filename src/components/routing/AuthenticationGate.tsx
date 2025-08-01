import React from 'react';
import { useAuth } from '@/context/auth';
import { useLocation } from 'react-router-dom';
import PremiumSignupPage from '@/pages/auth/PremiumSignupPage';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';

interface AuthenticationGateProps {
  children: React.ReactNode;
}

/**
 * Authentication Gate that forces unauthenticated users to see only the signup page
 * and blocks access to all other app content until signup is complete.
 */
const AuthenticationGate: React.FC<AuthenticationGateProps> = ({ children }) => {
  const { isSignedIn, loading } = useAuth();
  const location = useLocation();

  // Show loading while auth state is being determined
  if (loading) {
    return <SimpleLoadingFallback message="Loading..." />;
  }

  // If user is not signed in, show only the premium signup page
  // regardless of what route they're trying to access
  if (!isSignedIn) {
    return <PremiumSignupPage />;
  }

  // If user is signed in, allow access to the main app
  return <>{children}</>;
};

export default AuthenticationGate;