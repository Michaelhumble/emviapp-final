
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
      
      const profile = await fetchUserProfile(userId);
      
      if (profile) {
        setUserProfile(profile);
        setUserRole(profile.role as UserRole);
        
        // Debug log for role detection
        console.log(`[Auth] User profile loaded for ${userId} with role: ${profile.role}`);
      } else {
        console.warn(`[Auth] No profile found for user ${userId}`);
      }
      
    } catch (err) {
      console.error("Error in getUserProfile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh user profile
  const refreshUserProfile = useCallback(async () => {
    if (user) {
      await getUserProfile(user.id);
    }
  }, [user]);

  // Fetch user profile when user changes
  useEffect(() => {
    if (user) {
      // Use setTimeout to avoid potential deadlocks with Supabase client
      setTimeout(() => {
        getUserProfile(user.id);
      }, 0);
    } else {
      // Clear user profile and role when logged out
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
