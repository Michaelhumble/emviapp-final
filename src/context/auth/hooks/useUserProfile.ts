
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { fetchUserProfile } from "../userProfileService";

/**
 * Hook to handle user profile management
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Function to fetch user profile
  const getUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      
      console.log(`[Auth] Fetching profile for user: ${userId}`);
      const profile = await fetchUserProfile(userId);
      
      if (profile) {
        setUserProfile(profile);
        
        // Ensure the role is properly cast to UserRole type
        const profileRole = profile.role as UserRole;
        setUserRole(profileRole);
        
        // Debug log for role detection
        console.log(`[Auth] User profile loaded for ${userId} with role: ${profileRole}`);
      } else {
        console.warn(`[Auth] No profile found for user ${userId}`);
        setUserProfile(null);
        setUserRole(null);
      }
      
    } catch (err) {
      console.error("[Auth] Error in getUserProfile:", err);
      setUserProfile(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  // Refresh user profile
  const refreshUserProfile = useCallback(async () => {
    if (user) {
      console.log(`[Auth] Refreshing profile for user: ${user.id}`);
      await getUserProfile(user.id);
    }
  }, [user]);

  // Fetch user profile when user changes
  useEffect(() => {
    if (user) {
      console.log(`[Auth] User changed, fetching profile for: ${user.id}`);
      // Use setTimeout to avoid potential deadlocks with Supabase client
      setTimeout(() => {
        getUserProfile(user.id);
      }, 0);
    } else {
      // Clear user profile and role when logged out
      console.log(`[Auth] User logged out or no user, clearing profile data`);
      setUserProfile(null);
      setUserRole(null);
    }
  }, [user]);

  return {
    userProfile,
    userRole,
    refreshUserProfile
  };
};
