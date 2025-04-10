
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { normalizeRole } from "@/utils/roles";
import { toast } from "sonner";

// Enhanced cache for profiles with proper typing
interface ProfileCacheEntry {
  profile: UserProfile | null;
  timestamp: number;
  role: UserRole | null;
  status: 'fresh' | 'stale' | 'expired';
}

// Cache with proper Map typing
const profileCache = new Map<string, ProfileCacheEntry>();

// Cache durations - 5 minutes fresh, up to 15 minutes stale
const CACHE_FRESH_DURATION = 5 * 60 * 1000;    // 5 minutes
const CACHE_STALE_DURATION = 15 * 60 * 1000;   // 15 minutes

/**
 * Hook to handle user profile management with optimized loading and caching
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  // Function to fetch user profile with optimized flow
  const getUserProfile = async (userId: string) => {
    try {
      const now = Date.now();
      
      // Check cache first with proper status check
      const cachedData = profileCache.get(userId);
      if (cachedData) {
        const age = now - cachedData.timestamp;
        
        // Update cache status based on age
        if (age < CACHE_FRESH_DURATION) {
          cachedData.status = 'fresh';
        } else if (age < CACHE_STALE_DURATION) {
          cachedData.status = 'stale';
        } else {
          cachedData.status = 'expired';
        }
        
        // Use cache data for fresh or stale entries
        if (cachedData.status !== 'expired') {
          console.log(`Using ${cachedData.status} cached profile data from ${Math.round(age/1000)}s ago`);
          setUserProfile(cachedData.profile);
          setUserRole(cachedData.role);
          
          // If stale, trigger background refresh but don't wait for it
          if (cachedData.status === 'stale') {
            console.log("Cache is stale, refreshing in background");
            setLoading(false); // Don't block UI while refreshing stale data
            setTimeout(() => fetchFreshProfileData(userId), 0);
            return;
          }
          
          setLoading(false);
          return;
        }
      }
      
      // No usable cache, fetch fresh data
      await fetchFreshProfileData(userId);
      
    } catch (error) {
      console.error("Error in getUserProfile:", error);
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
      setLoading(false);
    }
  };
  
  // Function to fetch fresh profile data with parallel requests
  const fetchFreshProfileData = async (userId: string) => {
    console.log("Fetching fresh profile data for:", userId);
    setLoading(true);
    setIsError(false);
    
    try {
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
          timestamp: Date.now(),
          status: 'fresh'
        });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsError(true);
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
      return true;
    } else {
      console.warn("Cannot refresh profile: no user");
      return false;
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
