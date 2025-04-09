
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
      console.log("[UserProfile] Fetching profile for user:", userId);
      
      const profile = await fetchUserProfile(userId);
      
      if (profile) {
        console.log("[UserProfile] Profile fetched successfully:", profile.role);
        setUserProfile(profile);
        setUserRole(profile.role as UserRole);
        
        // Store role in localStorage as a backup
        if (profile.role) {
          localStorage.setItem('emviapp_user_role', profile.role);
        }
      } else {
        console.log("[UserProfile] No profile found for user:", userId);
        
        // Check if we have a cached role in localStorage
        const cachedRole = localStorage.getItem('emviapp_user_role');
        if (cachedRole) {
          console.log("[UserProfile] Using cached role from localStorage:", cachedRole);
          setUserRole(cachedRole as UserRole);
        }
      }
      
    } catch (err) {
      console.error("[UserProfile] Error in getUserProfile:", err);
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
      
      // Don't clear localStorage here, as we want to remember the role
      // for the next login if needed
    }
  }, [user]);

  return {
    userProfile,
    userRole,
    refreshUserProfile
  };
};
