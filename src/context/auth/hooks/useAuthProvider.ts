
import { useCallback } from "react";
import { AuthContextType } from "../types";
import { useSession } from "./useSession";
import { useUserProfile } from "./useUserProfile";
import { useAuthMethods } from "./useAuthMethods";

/**
 * Custom hook to handle auth provider logic
 */
export const useAuthProvider = () => {
  // Use the session hook
  const { 
    session, 
    user, 
    loading, 
    isNewUser, 
    clearIsNewUser, 
    setLoading 
  } = useSession();

  // Use the user profile hook
  const { 
    userProfile, 
    userRole, 
    refreshUserProfile 
  } = useUserProfile(user, setLoading);

  // Use the auth methods hook
  const { 
    signIn, 
    signUp, 
    signOut 
  } = useAuthMethods(setLoading);

  // Compile context value
  const authContextValue: AuthContextType = {
    session,
    user,
    userProfile,
    userRole,
    loading,
    isSignedIn: !!user,
    isNewUser,
    clearIsNewUser,
    signIn,
    signUp,
    signOut,
    refreshUserProfile,
  };

  return authContextValue;
};
