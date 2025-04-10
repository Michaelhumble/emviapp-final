
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { normalizeRole } from "@/utils/roles";
import { toast } from "sonner";

/**
 * Hook to handle user profile management
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  // Function to fetch user profile
  const getUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      setIsError(false);
      console.log("Fetching user profile for:", userId);
      
      // First, try to get role from auth metadata (most accurate)
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error("Auth metadata fetch error:", authError);
      } else {
        console.log("Auth user data:", authUser);
      }
      
      if (!authError && authUser?.user_metadata?.role) {
        // Check for role in user metadata
        const metadataRole = authUser?.user_metadata?.role as UserRole | null;
        
        if (metadataRole) {
          const normalizedRole = normalizeRole(metadataRole);
          console.log("Setting role from metadata:", normalizedRole);
          setUserRole(normalizedRole);
          localStorage.setItem('emviapp_user_role', normalizedRole || '');
        }
      }
      
      // Always also get the profile from the database
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("User profile fetch error:", error);
        setIsError(true);
        throw error;
      }
      
      if (profile) {
        console.log("User profile data retrieved successfully");
        setUserProfile(profile as unknown as UserProfile);
        
        // If we didn't get a role from metadata, use the database role
        if (!authUser?.user_metadata?.role && profile.role) {
          const normalizedRole = normalizeRole(profile.role as UserRole);
          console.log("Setting role from database:", normalizedRole);
          setUserRole(normalizedRole);
          
          // Store role in localStorage for redundancy
          localStorage.setItem('emviapp_user_role', normalizedRole || '');
          
          // Since metadata didn't have role, update it (sync back to auth)
          if (profile.role) {
            try {
              await supabase.auth.updateUser({
                data: { role: profile.role }
              });
            } catch (updateErr) {
              // Silent error - continue anyway
              console.warn("Failed to update auth metadata with role:", updateErr);
            }
          }
        }
      } else {
        console.warn("No user profile found in database");
        // Fallback to cached role only if no profile and no metadata role
        if (!authUser?.user_metadata?.role) {
          const cachedRole = localStorage.getItem('emviapp_user_role');
          if (cachedRole) {
            const normalizedRole = normalizeRole(cachedRole as UserRole);
            setUserRole(normalizedRole);
          } else {
            setUserRole(null);
          }
        }
        
        setUserProfile(null);
      }
    } catch (err) {
      console.error("Error in getUserProfile:", err);
      setIsError(true);
      
      // Final fallback - check localStorage
      const cachedRole = localStorage.getItem('emviapp_user_role');
      if (cachedRole && !userRole) {
        const normalizedRole = normalizeRole(cachedRole as UserRole);
        setUserRole(normalizedRole);
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
      console.log("Refreshing user profile");
      await getUserProfile(user.id);
    } else {
      console.warn("Cannot refresh profile: no user");
    }
  }, [user]);

  // Fetch user profile when user changes
  useEffect(() => {
    if (user) {
      console.log("User changed, fetching profile");
      // Use a slight delay to avoid potential deadlocks with Supabase client
      const timer = setTimeout(() => {
        getUserProfile(user.id);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      console.log("No user, clearing profile data");
      // Clear user profile and role when logged out
      setUserProfile(null);
      setUserRole(null);
    }
  }, [user]);

  return {
    userProfile,
    userRole,
    refreshUserProfile,
    isError
  };
};
