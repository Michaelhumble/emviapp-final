
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { normalizeRole } from "@/utils/roles";

// Enhanced cache with better performance characteristics
interface ProfileCacheEntry {
  profile: UserProfile | null;
  timestamp: number;
  role: UserRole | null;
  status: 'fresh' | 'stale' | 'expired';
}

// Improved cache with proper Map typing and longer timeouts
const profileCache = new Map<string, ProfileCacheEntry>();

// Increased cache durations for better performance
const CACHE_FRESH_DURATION = 10 * 60 * 1000;   // 10 minutes fresh (doubled)
const CACHE_STALE_DURATION = 30 * 60 * 1000;   // 30 minutes stale (doubled)

/**
 * Optimized hook to handle user profile management with improved loading and caching
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  // Optimized profile fetching with parallel requests and better error handling
  const fetchFreshProfileData = useCallback(async (userId: string) => {
    console.log("Fetching fresh profile data for:", userId);
    
    try {
      // Use Promise.all for truly parallel requests
      const [authResponse, profileResponse] = await Promise.all([
        supabase.auth.getUser(),
        supabase.from('users').select('*').eq('id', userId).single()
      ]);
      
      // Process auth user result
      const authUser = authResponse.data?.user;
      const authError = authResponse.error;
      let role: UserRole | null = null;
      
      if (!authError && authUser?.user_metadata?.role) {
        role = normalizeRole(authUser.user_metadata.role as UserRole);
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
        return { profile: null, role };
      } else {
        console.log("User profile data retrieved successfully");
        setUserProfile(profile);
        
        // If we didn't get a role from metadata, use the database role
        if (!role && profile?.role) {
          role = normalizeRole(profile.role as UserRole);
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
        
        return { profile, role };
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsError(true);
      setUserProfile(null);
      return { profile: null, role: null };
    }
  }, []);

  // Optimized function to fetch user profile with improved caching
  const getUserProfile = useCallback(async (userId: string) => {
    try {
      const now = Date.now();
      setIsError(false);
      
      // Check cache first with optimized flow
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
        
        // Always use cached data first to improve perceived performance
        if (cachedData.status !== 'expired') {
          console.log(`Using ${cachedData.status} cached profile data from ${Math.round(age/1000)}s ago`);
          setUserProfile(cachedData.profile);
          setUserRole(cachedData.role);
          
          // For stale cache, trigger background refresh without waiting
          if (cachedData.status === 'stale') {
            console.log("Cache is stale, refreshing in background");
            setTimeout(() => fetchFreshProfileData(userId), 0);
          }
          
          // Don't block UI even for expired cache - load new data in background
          if (cachedData.status === 'expired') {
            console.log("Cache is expired, but using it temporarily while loading fresh data");
            setLoading(true); // Keep loading state active
            setTimeout(async () => {
              await fetchFreshProfileData(userId);
              setLoading(false);
            }, 0);
            return;
          }
          
          setLoading(false);
          return;
        }
      }
      
      // No usable cache, fetch fresh data
      setLoading(true);
      const result = await fetchFreshProfileData(userId);
      
      // If we successfully retrieved profile data, update state
      if (result.profile) {
        setUserProfile(result.profile);
        if (result.role) setUserRole(result.role);
      }
      
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
    } finally {
      setLoading(false);
    }
  }, [fetchFreshProfileData, setLoading]);
  
  // Refresh user profile with optimized caching
  const refreshUserProfile = useCallback(async () => {
    if (user) {
      console.log("Refreshing user profile");
      setLoading(true);
      try {
        // Instead of removing from cache completely, mark as stale to maintain UI
        const cachedEntry = profileCache.get(user.id);
        if (cachedEntry) {
          cachedEntry.status = 'stale';
          profileCache.set(user.id, cachedEntry);
        }
        
        // Fetch fresh data in parallel
        await fetchFreshProfileData(user.id);
        return true;
      } catch (error) {
        console.error("Error refreshing profile:", error);
        setIsError(true);
        return false;
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("Cannot refresh profile: no user");
      return false;
    }
  }, [user, fetchFreshProfileData, setLoading]);

  // Fetch user profile when user changes - optimized to reduce fetch frequency
  useEffect(() => {
    if (user) {
      console.log("User changed, fetching profile");
      
      // Check if we already have fresh data for this user
      const cachedData = profileCache.get(user.id);
      const now = Date.now();
      
      if (cachedData && now - cachedData.timestamp < CACHE_FRESH_DURATION) {
        // Use cached data without fetching again
        console.log("Using cached profile data for user change");
        setUserProfile(cachedData.profile);
        setUserRole(cachedData.role);
        setLoading(false);
        return;
      }
      
      // If no fresh data, fetch with slight delay
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
  }, [user, getUserProfile, setLoading]);

  return {
    userProfile,
    userRole,
    refreshUserProfile,
    isError
  };
};
