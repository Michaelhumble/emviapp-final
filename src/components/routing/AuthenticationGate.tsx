import React, { useState, useEffect } from 'react';
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
 * On mobile, allows bypassing with hamburger menu but FOMO persists on revisits.
 */
const AuthenticationGate: React.FC<AuthenticationGateProps> = ({ children }) => {
  const { isSignedIn, loading } = useAuth();
  const location = useLocation();
  const [isMobileBypassed, setIsMobileBypassed] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('🔐 AuthenticationGate state:', { isSignedIn, loading, isMobileBypassed });
  }, [isSignedIn, loading, isMobileBypassed]);

  // Reset bypass state on page reload/revisit for unsigned users
  useEffect(() => {
    if (!isSignedIn) {
      setIsMobileBypassed(false);
    }
  }, [isSignedIn]);

  // Show loading while auth state is being determined
  if (loading) {
    return <SimpleLoadingFallback message="Loading..." />;
  }

  // If user is not signed in, show premium signup page unless bypassed on mobile
  if (!isSignedIn && !isMobileBypassed) {
    return <PremiumSignupPage onMobileBypass={() => {
      console.log('🔄 Mobile bypass triggered!');
      setIsMobileBypassed(true);
    }} />;
  }

  // If user is signed in or has bypassed on mobile, allow access to the main app
  return <>{children}</>;
};

export default AuthenticationGate;