
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { normalizeUserRole } from "@/utils/navigation";

/**
 * Hook to handle user profile management with improved role handling
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [fetching, setFetching] = useState(false);

  // Function to fetch user profile with improved error handling and debugging
  const getUserProfile = useCallback(async (userId: string) => {
    if (fetching) return; // Prevent concurrent fetches
    
    try {
      console.log(`[Auth] Fetching profile for user: ${userId}`);
      setFetching(true);
      setLoading(true);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error("[Auth] Error fetching profile:", error);
        throw error;
      }
      
      if (data) {
        console.log(`[Auth] Profile loaded:`, data);
        setUserProfile(data as unknown as UserProfile);
        
        // Extract and normalize role
        const rawRole = data.role as string;
        console.log(`[Auth] Raw role from database:`, rawRole);
        
        // Normalize the role
        const normalizedRole = normalizeUserRole(rawRole);
        console.log(`[Auth] Normalized role:`, normalizedRole);
        
        // Store the normalized role
        setUserRole(normalizedRole);
        
        // Cache in localStorage for emergency fallback
        if (normalizedRole) {
          localStorage.setItem('emviapp_user_role', normalizedRole);
        }
      } else {
        console.warn(`[Auth] No profile found for user ${userId}`);
        setUserProfile(null);
        setUserRole(null);
        localStorage.removeItem('emviapp_user_role');
      }
    } catch (err) {
      console.error("[Auth] Error in getUserProfile:", err);
      setUserProfile(null);
      setUserRole(null);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  }, [setLoading, fetching]);

  // Refresh user profile - exposed function for manual refresh
  const refreshUserProfile = useCallback(async () => {
    if (user) {
      console.log(`[Auth] Manual profile refresh requested for: ${user.id}`);
      await getUserProfile(user.id);
    } else {
      console.warn('[Auth] Cannot refresh profile: No authenticated user');
    }
  }, [user, getUserProfile]);

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
      localStorage.removeItem('emviapp_user_role');
    }
  }, [user, getUserProfile]);

  // Emergency fallback - if for some reason the role isn't being set properly
  useEffect(() => {
    if (user && !userRole) {
      const cachedRole = localStorage.getItem('emviapp_user_role') as UserRole | null;
      if (cachedRole) {
        console.warn('[Auth] Using cached role from localStorage:', cachedRole);
        setUserRole(cachedRole);
      }
    }
  }, [user, userRole]);

  return {
    userProfile,
    userRole,
    refreshUserProfile
  };
};
