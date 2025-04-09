
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { fetchUserProfile } from "../userProfileService";
import { supabase } from "@/integrations/supabase/client";

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
      
      // Direct database query to ensure we get the latest data
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (profile) {
        console.log("[UserProfile] Profile fetched successfully:", profile);
        setUserProfile(profile as unknown as UserProfile);
        
        // Make sure we have a valid role (not just null or undefined)
        if (profile.role) {
          setUserRole(profile.role as UserRole);
          
          // Store role in localStorage for redundancy
          localStorage.setItem('emviapp_user_role', profile.role);
          console.log("[UserProfile] Role saved to localStorage:", profile.role);
        } else {
          console.log("[UserProfile] No role found in profile, checking localStorage");
          // Check localStorage if profile doesn't have a role
          const cachedRole = localStorage.getItem('emviapp_user_role');
          if (cachedRole) {
            console.log("[UserProfile] Using cached role from localStorage:", cachedRole);
            setUserRole(cachedRole as UserRole);
          } else {
            console.log("[UserProfile] No role found in localStorage, defaulting to null");
            setUserRole(null);
          }
        }
      } else {
        console.log("[UserProfile] No profile found for user:", userId);
        
        // Check if we have a cached role in localStorage
        const cachedRole = localStorage.getItem('emviapp_user_role');
        if (cachedRole) {
          console.log("[UserProfile] Using cached role from localStorage:", cachedRole);
          setUserRole(cachedRole as UserRole);
        } else {
          console.log("[UserProfile] No cached role found, role remains null");
          setUserRole(null);
        }
        
        setUserProfile(null);
      }
    } catch (err) {
      console.error("[UserProfile] Error in getUserProfile:", err);
      setUserRole(null);
      setUserProfile(null);
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
      // Use a slight delay to avoid potential deadlocks with Supabase client
      const timer = setTimeout(() => {
        getUserProfile(user.id);
      }, 10);
      return () => clearTimeout(timer);
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
