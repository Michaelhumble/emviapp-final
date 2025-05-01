
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserRole, UserProfile } from '../types/authTypes';
import { fetchUserProfile, createUserProfile, updateUserProfile } from '../userProfileService';
import { determineUserRole, persistUserRole } from '../utils/roleManagement';

/**
 * Hook to handle authentication methods
 * @param setLoading Function to update loading state
 * @param setUser Function to update user state
 * @param setUserProfile Function to update user profile state
 * @param setUserRole Function to update user role state
 * @param setIsNewUser Function to update new user state
 * @param setIsError Function to update error state
 */
export const useAuthMethods = (
  setLoading: (loading: boolean) => void,
  setUser: (user: any) => void,
  setUserProfile: (profile: UserProfile | null) => void,
  setUserRole: (role: UserRole) => void,
  setIsNewUser: (isNew: boolean) => void,
  setIsError: (isError: boolean) => void,
) => {
  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Success notification is handled by the auth state change listener
      return { data, error: null, success: true };
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error(error.message || "Failed to sign in");
      return { data: null, error, success: false };
    }
  };

  /**
   * Sign up with email, password, and optional user data
   */
  const signUp = async (email: string, password: string, userData: Partial<UserProfile> = {}) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            ...userData
          }
        }
      });
      
      if (error) throw error;
      
      // Mark as new user in localStorage
      localStorage.setItem('emviapp_new_user', 'true');
      setIsNewUser(true);
      
      // If user data includes role, persist it
      if (userData.role) {
        persistUserRole(userData.role);
      }
      
      return { success: true, userId: data.user?.id };
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Failed to sign up");
      return { success: false, error: error instanceof Error ? error : new Error(error.message || 'Unknown error') };
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Clear role and new user status from localStorage
      localStorage.removeItem('emviapp_user_role');
      localStorage.removeItem('emviapp_new_user');
      
      toast.success("Successfully signed out");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
      throw error;
    } finally {
      // Reset state even if there was an error
      setUserProfile(null);
      setUserRole('customer' as UserRole);
      setIsNewUser(false);
    }
  };

  /**
   * Refresh user profile data
   */
  const refreshUserProfile = async (userId: string) => {
    if (!userId) return false;
    
    try {
      setIsError(false);
      const profile = await fetchUserProfile(userId);
      
      if (profile) {
        setUserProfile(profile);
        const storedRole = localStorage.getItem('emviapp_user_role') as UserRole;
        const role = determineUserRole(null, profile.role, storedRole);
        
        if (role) {
          setUserRole(role);
          persistUserRole(role);
        }
        
        return true;
      } else {
        // Create profile if it doesn't exist
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          const newProfile = await createUserProfile(data.user);
          if (newProfile) {
            setUserProfile(newProfile);
            setIsNewUser(true);
            localStorage.setItem('emviapp_new_user', 'true');
            
            if (newProfile.role) {
              const role = determineUserRole(null, newProfile.role, null);
              if (role) {
                setUserRole(role);
                persistUserRole(role);
              }
            }
            
            return true;
          }
        }
      }
      
      return false;
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      setIsError(true);
      return false;
    }
  };

  /**
   * Update user's role
   */
  const updateUserRole = async (userId: string, role: UserRole) => {
    if (!userId) return;
    
    try {
      const updatedProfile = await updateUserProfile({ 
        id: userId,
        role
      });
      
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        
        // Determine and set the normalized role
        const normalizedRole = determineUserRole(null, role, null);
        if (normalizedRole) {
          setUserRole(normalizedRole);
          persistUserRole(normalizedRole);
        }
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update role. Please try again.');
    }
  };

  /**
   * Update user profile data
   */
  const updateProfile = async (userId: string, data: Partial<UserProfile>) => {
    if (!userId) {
      return { success: false, error: new Error('User not authenticated') };
    }
    
    try {
      const updatedProfile = await updateUserProfile({
        id: userId,
        ...data
      });
      
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        
        // Update role if it changed
        if (data.role) {
          const normalizedRole = determineUserRole(null, data.role, null);
          if (normalizedRole) {
            setUserRole(normalizedRole);
            persistUserRole(normalizedRole);
          }
        }
        
        return { success: true };
      }
      
      return { success: false, error: new Error('Failed to update profile') };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error : new Error('Unknown error occurred') 
      };
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    refreshUserProfile,
    updateUserRole,
    updateProfile
  };
};
