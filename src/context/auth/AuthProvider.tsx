
import React, { useState, useEffect, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { useSessionQuery } from '@/hooks/useSessionQuery';
import { useProfileQuery } from '@/hooks/useProfileQuery';
import { useRoleQuery } from '@/hooks/useRoleQuery';
import { UserProfile, UserRole, AuthContextType } from './types/authTypes';
import { useProfileSync } from '@/hooks/useProfileSync';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { AuthContext } from './AuthContext';

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
    signIn: sessionSignIn,
    signUp: sessionSignUp,
    signOut: sessionSignOut,
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
    refreshProfile,
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
    }
  }, [profileError, user]);

  // Initialize real-time profile synchronization
  useProfileSync();

  // Calculate final loading state
  const loading = sessionLoading || profileLoading || roleLoading;
  
  // Determine the effective role (roleQuery takes precedence)
  const effectiveRole = userRole || profileRole;

  /**
   * Wrapper for signIn function to ensure consistent return type
   */
  const handleSignIn = async (email: string, password: string): Promise<{ success: boolean; error?: Error; user?: User }> => {
    try {
      const result = await sessionSignIn({ email, password });
      if (result.error) {
        return { success: false, error: result.error as Error };
      }
      return { success: true, user: result.data?.user || undefined };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  /**
   * Wrapper for signUp function to ensure consistent return type
   */
  const handleSignUp = async (email: string, password: string, userData?: any): Promise<{ success: boolean; error?: Error; userId?: string }> => {
    try {
      const result = await sessionSignUp({ email, password, userData });
      if (result.error) {
        return { success: false, error: result.error as Error };
      }
      return { success: true, userId: result.data?.user?.id };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  /**
   * Wrapper for signOut function
   */
  const handleSignOut = async (): Promise<void> => {
    await sessionSignOut();
  };

  /**
   * Wrapper for refreshProfile function
   */
  const handleRefreshProfile = async (): Promise<boolean> => {
    try {
      await refreshProfile();
      return true;
    } catch (error) {
      console.error('Error refreshing profile:', error);
      return false;
    }
  };

  /**
   * Wrapper for updateUserRole function
   */
  const handleUpdateRole = async (role: UserRole): Promise<void> => {
    await updateUserRole(role);
  };

  // Construct auth context value with proper Promise wrappers
  const authContextValue: AuthContextType = {
    user,
    userProfile,
    userRole: effectiveRole as UserRole,
    session,
    loading,
    loggingIn: isSigningIn,
    loggingOut: isSigningOut,
    signingUp: isSigningUp,
    isSignedIn: !!user,
    isError: !!profileError,
    isNewUser,
    clearIsNewUser,
    error: authError,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    refreshUserProfile: handleRefreshProfile,
    updateUserRole: handleUpdateRole,
    updateProfile: async (data) => {
      try {
        await updateProfile(data);
        return { success: true };
      } catch (error) {
        return { success: false, error: error as Error };
      }
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
