
import React from 'react';
import { AuthContext } from './AuthContext';
import { UserRole, UserProfile, AuthContextType } from './types/authTypes';
import { useAuthState } from './hooks/useAuthState';
import { useAuthSession } from './hooks/useAuthSession';
import { useAuthMethods } from './hooks/useAuthMethods';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication Provider component
 * @description Manages auth state and provides auth methods throughout the app
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Use our new hooks to manage auth state
  const {
    session,
    setSession,
    user,
    setUser,
    userProfile,
    setUserProfile,
    userRole,
    setUserRole,
    loading,
    setLoading,
    isNewUser,
    setIsNewUser,
    isError,
    setIsError,
    clearIsNewUser
  } = useAuthState();

  // Get authentication session data
  const authSession = useAuthSession();
  
  // Use the session data to update our state
  React.useEffect(() => {
    if (authSession.user) {
      setUser(authSession.user);
    }
    if (authSession.session) {
      setSession(authSession.session);
    }
    if (authSession.isNewUser) {
      setIsNewUser(true);
    }
    setLoading(authSession.loading);
  }, [authSession, setUser, setSession, setIsNewUser, setLoading]);

  // Initialize auth methods
  const {
    signIn,
    signUp,
    signOut,
    refreshUserProfile: refreshProfile,
    updateUserRole: updateRole,
    updateProfile: updateUserProfile
  } = useAuthMethods(
    setLoading,
    setUser,
    setUserProfile,
    setUserRole,
    setIsNewUser,
    setIsError
  );

  // Wrap clearIsNewUser to ensure both implementations are called
  const handleClearIsNewUser = () => {
    clearIsNewUser();
    if (authSession.clearIsNewUser) {
      authSession.clearIsNewUser();
    }
  };

  // Wrapper for refreshUserProfile to include userId
  const refreshUserProfile = async (): Promise<boolean> => {
    if (!user) return false;
    return refreshProfile(user.id);
  };

  // Wrapper for updateUserRole to include userId
  const updateUserRole = async (role: UserRole): Promise<void> => {
    if (!user) return;
    return updateRole(user.id, role);
  };

  // Wrapper for updateProfile to include userId
  const updateProfile = async (data: Partial<UserProfile>): Promise<{ success: boolean; error?: Error }> => {
    if (!user) {
      return { success: false, error: new Error('User not authenticated') };
    }
    return updateUserProfile(userProfile?.id || user.id, data);
  };

  // Construct auth context value
  const authContextValue: AuthContextType = {
    user,
    userProfile,
    userRole,
    loading,
    isSignedIn: !!user,
    isError,
    isNewUser,
    clearIsNewUser: handleClearIsNewUser,
    signIn,
    signUp,
    signOut,
    refreshUserProfile,
    updateUserRole,
    updateProfile
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
