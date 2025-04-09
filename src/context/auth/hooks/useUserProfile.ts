
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
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
      
      // First, try to get role from auth metadata (most accurate)
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error("[UserProfile] Error fetching auth user:", authError);
      } else {
        // Check for role in user metadata
        const metadataRole = authUser?.user_metadata?.role as UserRole | null;
        console.log("[UserProfile] Role from auth metadata:", metadataRole);
        
        if (metadataRole) {
          setUserRole(metadataRole);
          localStorage.setItem('emviapp_user_role', metadataRole);
        }
      }
      
      // Always also get the profile from the database
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
        
        // If we didn't get a role from metadata, use the database role
        if (!authUser?.user_metadata?.role && profile.role) {
          console.log("[UserProfile] Using role from database:", profile.role);
          setUserRole(profile.role as UserRole);
          
          // Store role in localStorage for redundancy
          localStorage.setItem('emviapp_user_role', profile.role);
          
          // Since metadata didn't have role, update it (sync back to auth)
          if (profile.role) {
            try {
              await supabase.auth.updateUser({
                data: { role: profile.role }
              });
              console.log("[UserProfile] Updated auth metadata with role:", profile.role);
            } catch (updateErr) {
              console.error("[UserProfile] Error updating auth metadata:", updateErr);
            }
          }
        }
      } else {
        console.log("[UserProfile] No profile found for user:", userId);
        
        // Fallback to cached role only if no profile and no metadata role
        if (!authUser?.user_metadata?.role) {
          const cachedRole = localStorage.getItem('emviapp_user_role');
          if (cachedRole) {
            console.log("[UserProfile] Using cached role from localStorage:", cachedRole);
            setUserRole(cachedRole as UserRole);
          } else {
            console.log("[UserProfile] No cached role found, role remains null");
            setUserRole(null);
          }
        }
        
        setUserProfile(null);
      }
    } catch (err) {
      console.error("[UserProfile] Error in getUserProfile:", err);
      
      // Final fallback - check localStorage
      const cachedRole = localStorage.getItem('emviapp_user_role');
      if (cachedRole && !userRole) {
        console.log("[UserProfile] After error, using cached role from localStorage:", cachedRole);
        setUserRole(cachedRole as UserRole);
      } else {
        setUserRole(null);
      }
      
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
