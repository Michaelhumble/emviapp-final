
import { AuthContextType } from "../types";
import { useSession } from "./useSession";
import { useUserProfile } from "./useUserProfile";
import { useAuthMethods } from "./useAuthMethods";
import { useCallback } from "react";

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

  // Debug function to force validation of user role
  const validateUserRole = useCallback(async () => {
    console.log("[Auth Provider] Force validating user role");
    if (user) {
      // Call refreshUserProfile but ignore the return value for validateUserRole
      await refreshUserProfile();
    }
  }, [user, refreshUserProfile]);

  // Compile context value
  const authContextType: AuthContextType = {
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
    refreshUserProfile: validateUserRole, // Use the wrapper function that returns void
    validateUserRole, // Add new force validation method
  };

  return authContextType;
};
