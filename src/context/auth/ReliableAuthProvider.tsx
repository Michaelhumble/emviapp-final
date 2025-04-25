
import React, { useEffect } from 'react';
import { AuthContext } from './context';
import { useAuthProvider } from './hooks/useAuthProvider';
import { toast } from 'sonner';

export const ReliableAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the auth provider hook to handle authentication logic
  const auth = useAuthProvider();
  
  useEffect(() => {
    // Monitor for critical auth errors and provide user feedback
    if (auth.isError) {
      toast.error("Authentication system unavailable", {
        description: "We're having trouble connecting to our authentication service. Please try refreshing.",
        duration: 8000,
      });
    }
  }, [auth.isError]);

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
