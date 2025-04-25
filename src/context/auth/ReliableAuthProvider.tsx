
import React, { useEffect } from 'react';
import { AuthContext } from './context';
import { useAuthProvider } from './hooks/useAuthProvider';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const ReliableAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the auth provider hook to handle authentication logic
  const auth = useAuthProvider();
  // Use navigate for redirecting on auth failures
  let navigate;
  
  try {
    navigate = useNavigate();
  } catch (error) {
    // This component might be used outside Router context
    console.warn('ReliableAuthProvider used outside Router context');
  }
  
  useEffect(() => {
    // Monitor for critical auth errors and provide user feedback
    if (auth.isError) {
      toast.error("Authentication system unavailable", {
        description: "We're having trouble connecting to our authentication service. Please try refreshing.",
        duration: 8000,
      });
      
      // Only redirect if navigate is available (inside Router context)
      if (navigate && !auth.loading && !auth.isSignedIn) {
        setTimeout(() => navigate('/auth/signin'), 1000);
      }
    }
  }, [auth.isError, auth.loading, auth.isSignedIn, navigate]);

  // Add state recovery attempt if session data seems corrupted
  useEffect(() => {
    // If session state seems inconsistent (user without session or vice versa),
    // try to recover by refreshing the auth state
    const hasInconsistentState = auth.user && !auth.session;
    
    if (hasInconsistentState) {
      console.warn("Detected inconsistent auth state, attempting recovery...");
      // Add a small delay to avoid immediate refresh
      const recoveryTimeout = setTimeout(() => {
        auth.refreshUserProfile?.();
      }, 500);
      
      return () => clearTimeout(recoveryTimeout);
    }
  }, [auth.user, auth.session, auth.refreshUserProfile]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default ReliableAuthProvider;
