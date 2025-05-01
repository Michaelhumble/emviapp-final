
import React from 'react';
import { AuthContext } from './AuthContext';
import { UserRole, UserProfile, AuthContextType } from './types/authTypes';
import { useSessionQuery } from '@/hooks/useSessionQuery';
import { useProfileQuery } from '@/hooks/useProfileQuery';
import { useRoleQuery } from '@/hooks/useRoleQuery';

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
    isSigningOut
  } = useSessionQuery();

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
    hasRole // Add the hasRole function from roleQuery
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
