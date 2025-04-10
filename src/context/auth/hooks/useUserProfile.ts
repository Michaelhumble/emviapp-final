
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { normalizeRole } from "@/utils/roles";
import { toast } from "sonner";

// Simple cache for profiles to avoid repeated fetching
const profileCache = new Map<string, {
  profile: UserProfile | null,
  timestamp: number,
  role: UserRole | null
}>();

// Cache expiration time - 5 minutes
const CACHE_EXPIRATION = 5 * 60 * 1000;

/**
 * Hook to handle user profile management with optimized loading
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  // Function to fetch user profile with optimized flow
  const getUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      setIsError(false);
      console.log("Fetching user profile for:", userId);
      
      // Check cache first
      const cachedData = profileCache.get(userId);
      const now = Date.now();
      
      if (cachedData && (now - cachedData.timestamp < CACHE_EXPIRATION)) {
        console.log("Using cached profile data");
        setUserProfile(cachedData.profile);
        setUserRole(cachedData.role);
        setLoading(false);
        return;
      }
      
      // Fetch both auth user and database profile in parallel
      const [authResponse, profileResponse] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from('users').select('*').eq('id', userId).single()
      ]);
      
      // Process auth user result
      const authUser = authResponse.data?.user;
      const authError = authResponse.error;
      let role: UserRole | null = null;
      
      if (authError) {
        console.error("Auth metadata fetch error:", authError);
      } else if (authUser?.user_metadata?.role) {
        role = normalizeRole(authUser.user_metadata.role as UserRole);
        console.log("Setting role from metadata:", role);
        setUserRole(role);
        localStorage.setItem('emviapp_user_role', role || '');
      }
      
      // Process profile result
      const profileError = profileResponse.error;
      const profile = profileResponse.data as unknown as UserProfile;
      
      if (profileError) {
        console.error("User profile fetch error:", profileError);
        
        // Try fallback to cached role if available
        if (!role) {
          const cachedRole = localStorage.getItem('emviapp_user_role');
          if (cachedRole) {
            const normalizedRole = normalizeRole(cachedRole as UserRole);
            setUserRole(normalizedRole);
          }
        }
        
        setIsError(true);
        setUserProfile(null);
      } else {
        console.log("User profile data retrieved successfully");
        setUserProfile(profile);
        
        // If we didn't get a role from metadata, use the database role
        if (!role && profile?.role) {
          role = normalizeRole(profile.role as UserRole);
          console.log("Setting role from database:", role);
          setUserRole(role);
          localStorage.setItem('emviapp_user_role', role || '');
          
          // Sync role back to auth (don't wait for this)
          if (profile.role) {
            supabase.auth.updateUser({
              data: { role: profile.role }
            }).catch(updateErr => {
              console.warn("Failed to update auth metadata with role:", updateErr);
            });
          }
        }
        
        // Store in cache
        profileCache.set(userId, {
          profile,
          role,
          timestamp: now
        });
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

  // Refresh user profile with cache busting
  const refreshUserProfile = useCallback(async () => {
    if (user) {
      console.log("Refreshing user profile");
      // Remove from cache to force fresh data
      profileCache.delete(user.id);
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
