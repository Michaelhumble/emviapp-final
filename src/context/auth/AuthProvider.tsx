
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { UserRole, UserProfile, AuthContextType } from './types/authTypes';
import { useSessionQuery } from '@/hooks/useSessionQuery';
import { useProfileQuery } from '@/hooks/useProfileQuery';
import { useRoleQuery } from '@/hooks/useRoleQuery';
import { toast } from 'sonner';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication Provider component enhanced with React Query
 * @description Manages auth state and provides auth methods throughout the app
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use React Query hooks for authentication state management
  const {
    session,
    user,
    loading: sessionLoading,
    isNewUser,
    clearIsNewUser,
    signIn,
    signUp,
    signOut,
    isSigningIn,
    isSigningUp,
    isSigningOut,
    authError,
    retryAuthentication
  } = useSessionQuery();

  // Error recovery state
  const [showRecoveryAlert, setShowRecoveryAlert] = useState(false);

  // Show recovery alert when there's a persistent auth error
  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => {
        setShowRecoveryAlert(true);
      }, 2000); // Show recovery options after 2 seconds
      
      return () => clearTimeout(timer);
    } else {
      setShowRecoveryAlert(false);
    }
  }, [authError]);

  // Use Profile Query hook when we have a user
  const {
    profile: userProfile,
    role: profileRole,
    isLoading: profileLoading,
    isError: profileError,
    refreshProfile: refreshUserProfile,
    updateProfile,
    isUpdating: isUpdatingProfile
  } = useProfileQuery(user?.id);

  // Use Role Query for dedicated role management
  const {
    userRole,
    isLoading: roleLoading,
    updateRole: updateUserRole,
    isUpdating: isUpdatingRole,
    hasRole
  } = useRoleQuery(user?.id);

  // Handle profile fetch errors gracefully
  useEffect(() => {
    if (profileError && user) {
      console.error("Profile fetch error detected");
      // Show a recovery toast only once
      toast.error("Profile data error - Unable to load your profile data", {
        id: 'profile-error',
        duration: 8000,
        action: {
          label: "Retry",
          onClick: () => refreshUserProfile()
        }
      });
    }
  }, [profileError, user, refreshUserProfile]);

  // Calculate final loading state
  const loading = sessionLoading || profileLoading || roleLoading;
  
  // Determine the effective role (roleQuery takes precedence)
  const effectiveRole = userRole || profileRole;

  // Construct auth context value
  const authContextValue: AuthContextType = {
    user,
    userProfile,
    userRole: effectiveRole,
    loading,
    isSignedIn: !!user,
    isError: profileError,
    isNewUser,
    clearIsNewUser,
    signIn: (email, password) => signIn({ email, password }),
    signUp: (email, password, userData) => signUp({ email, password, userData }),
    signOut,
    refreshUserProfile,
    updateUserRole,
    updateProfile: (data: Partial<UserProfile>) => {
      return updateProfile(data);
    },
    hasRole
  };

  // If there's an auth error and the recovery alert should be shown,
  // present recovery options to the user
  if (authError && showRecoveryAlert && !loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 className="text-xl font-semibold mb-3">Authentication Error</h3>
          <p className="text-muted-foreground mb-6">
            {authError.message || "There was a problem with your authentication session."}
          </p>
          <div className="space-y-3">
            <Button 
              variant="default" 
              className="w-full" 
              onClick={retryAuthentication}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Authentication
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                window.location.href = "/sign-in";
              }}
            >
              Sign In Again
            </Button>
            <Button 
              variant="ghost" 
              className="w-full" 
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Clear Cache & Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
