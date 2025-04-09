
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
    signIn: _signIn, 
    signUp: _signUp, 
    signOut: _signOut 
  } = useAuthMethods(setLoading);

  // Wrap auth methods to match expected interface
  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const result = await _signIn(email, password);
    return {
      success: !result.error,
      error: result.error ? String(result.error) : undefined
    };
  };

  const signUp = async (email: string, password: string, options?: object): Promise<{ success: boolean; error?: string }> => {
    const result = await _signUp(email, password);
    return {
      success: !result.error,
      error: result.error ? String(result.error) : undefined
    };
  };

  const signOut = async (): Promise<void> => {
    await _signOut();
  };

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
