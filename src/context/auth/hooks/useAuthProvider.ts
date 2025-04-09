
import { AuthContextType } from "../types";
import { useSession } from "./useSession";
import { useUserProfile } from "./useUserProfile";
import { useAuthMethods } from "./useAuthMethods";
import { updateUserProfile } from "../userProfileService";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "../types";

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

  const signUp = async (email: string, password: string, userData?: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    const result = await _signUp(email, password);
    return {
      success: !result.error,
      error: result.error ? String(result.error) : undefined
    };
  };

  const signOut = async (): Promise<void> => {
    await _signOut();
  };

  // Update profile method
  const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile | null> => {
    if (!user) return null;
    const result = await updateUserProfile({
      ...data,
      id: user.id
    });
    if (result) {
      await refreshUserProfile();
    }
    return result;
  };

  // Reset password function
  const resetPassword = async (email: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  // Update password function
  const updatePassword = async (newPassword: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  };

  // Update email function
  const updateEmail = async (newEmail: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error updating email:', error);
      throw error;
    }
  };

  // Delete account function
  const deleteAccount = async (): Promise<void> => {
    try {
      // This would typically be handled by a server-side function
      // for security reasons. This is a placeholder.
      throw new Error('Account deletion requires a server-side function');
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  };

  // Set user role
  const setUserRole = async (role: UserRole): Promise<void> => {
    if (!user) return;
    
    try {
      await updateProfile({ role });
    } catch (error) {
      console.error('Error updating user role:', error);
    }
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
    resetPassword,
    updateProfile,
    updatePassword,
    updateEmail,
    deleteAccount,
    refreshUserProfile,
    setUserRole
  };

  return authContextValue;
};
