
import { AuthContextType, UserProfile, UserRole } from "../types";
import { useSession } from "./useSession";
import { useUserProfile } from "./useUserProfile";
import { useAuthMethods } from "./useAuthMethods";
import { updateUserProfile, createUserProfile, fetchUserProfile } from "../userProfileService";
import { supabase } from "@/integrations/supabase/client";

/**
 * Custom hook to handle auth provider logic
 */
export const useAuthProvider = (): AuthContextType => {
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

  // Wrap sign in method
  const signIn = async (email: string, password: string) => {
    return _signIn(email, password);
  };

  // Wrap sign up method
  const signUp = async (email: string, password: string, userData?: Partial<UserProfile>) => {
    const result = await _signUp(email, password);
    
    // Create user profile if sign up was successful
    if (result.user) {
      await createUserProfile(result.user);
      
      // Update with initial user data if provided
      if (userData && Object.keys(userData).length > 0) {
        await updateUserProfile({
          ...userData,
          id: result.user.id
        });
      }
    }
    
    return result;
  };

  // Wrap sign out method
  const signOut = async () => {
    return _signOut();
  };

  // Update user profile
  const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile | null> => {
    if (!user) return null;
    
    const updatedProfile = await updateUserProfile({
      ...data,
      id: user.id
    });
    
    // Refresh user profile after update
    if (updatedProfile) {
      await refreshUserProfile();
    }
    
    return updatedProfile;
  };

  // Set user role
  const setUserRole = async (role: UserRole): Promise<void> => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Update role in user metadata
      await supabase.auth.updateUser({
        data: { role }
      });
      
      // Update role in user profile
      await updateUserProfile({
        id: user.id,
        role
      });
      
      // Refresh user profile
      await refreshUserProfile();
    } finally {
      setLoading(false);
    }
  };

  // Update user email
  const updateEmail = async (newEmail: string): Promise<void> => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Update email in auth
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });
      
      if (error) throw error;
      
      // Update email in profile
      await updateUserProfile({
        id: user.id,
        email: newEmail
      });
    } finally {
      setLoading(false);
    }
  };

  // Update user password
  const updatePassword = async (newPassword: string): Promise<void> => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password (forgot password flow)
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });
      
      if (error) throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete user account
  const deleteAccount = async (): Promise<void> => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Delete user from database first
      const { error: dbError } = await supabase
        .from('users')
        .delete()
        .eq('id', user.id);
      
      if (dbError) throw dbError;
      
      // Delete user from auth
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) throw error;
      
      // Sign out
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  // Determine if user is signed in
  const isSignedIn = !!user;

  return {
    loading,
    isSignedIn,
    user,
    userRole,
    userProfile,
    session,
    isNewUser,
    clearIsNewUser,
    signIn,
    signOut,
    signUp,
    resetPassword,
    updateProfile,
    updatePassword,
    updateEmail,
    deleteAccount,
    refreshUserProfile,
    setUserRole
  };
};
