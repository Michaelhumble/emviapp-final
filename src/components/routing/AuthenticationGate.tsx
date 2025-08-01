import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useLocation } from 'react-router-dom';
import PremiumSignupPage from '@/pages/auth/PremiumSignupPage';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';

interface AuthenticationGateProps {
  children: React.ReactNode;
  onMobileBypass: () => void;
  isMobileBypassed: boolean;
}

/**
 * Authentication Gate that forces unauthenticated users to see only the signup page
 * and blocks access to all other app content until signup is complete.
 * Now uses global mobile bypass state management.
 */
const AuthenticationGate: React.FC<AuthenticationGateProps> = ({ 
  children, 
  onMobileBypass, 
  isMobileBypassed 
}) => {
  const { isSignedIn, loading } = useAuth();
  const location = useLocation();

  // Debug logging
  useEffect(() => {
    console.log('🔐 AuthenticationGate state:', { isSignedIn, loading, isMobileBypassed });
  }, [isSignedIn, loading, isMobileBypassed]);

  // Show loading while auth state is being determined
  if (loading) {
    return <SimpleLoadingFallback message="Loading..." />;
  }

  // If user is not signed in and hasn't bypassed on mobile, show premium signup page
  if (!isSignedIn && !isMobileBypassed) {
    return <PremiumSignupPage />;
  }

  // If user is signed in or has bypassed on mobile, allow access to the main app
  return <>{children}</>;
};

export default AuthenticationGate;