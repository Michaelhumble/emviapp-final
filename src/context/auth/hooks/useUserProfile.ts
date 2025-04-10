
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { normalizeRole } from "@/utils/roles";
import { getCachedProfile, getCacheStatus } from "../utils/profileCache";
import { fetchFreshProfileData } from "../utils/profileFetcher";

/**
 * Optimized hook to handle user profile management with improved loading and caching
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  // Optimized function to fetch user profile with improved caching
  const getUserProfile = useCallback(async (userId: string) => {
    try {
      setIsError(false);
      
      // Check cache first with optimized flow
      const cachedData = getCachedProfile(userId);
      if (cachedData) {
        const cacheStatus = cachedData.status;
        
        // Always use cached data first to improve perceived performance
        if (cacheStatus !== 'expired') {
          console.log(`Using ${cacheStatus} cached profile data`);
          setUserProfile(cachedData.profile);
          setUserRole(cachedData.role);
          
          // For stale cache, trigger background refresh without waiting
          if (cacheStatus === 'stale') {
            console.log("Cache is stale, refreshing in background");
            setTimeout(() => fetchFreshProfileData(userId), 0);
          }
          
          // Don't block UI even for expired cache - load new data in background
          if (cacheStatus === 'expired') {
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
  }, [setLoading, userRole]);
  
  // Refresh user profile with optimized caching
  const refreshUserProfile = useCallback(async () => {
    if (user) {
      console.log("Refreshing user profile");
      setLoading(true);
      try {
        // Fetch fresh data
        const result = await fetchFreshProfileData(user.id);
        
        // Update the state with new data
        if (result.profile) {
          setUserProfile(result.profile);
        }
        if (result.role) {
          setUserRole(result.role);
        }
        
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
  }, [user, setLoading]);

  // Fetch user profile when user changes - optimized to reduce fetch frequency
  useEffect(() => {
    if (user) {
      console.log("User changed, fetching profile");
      
      // Check if we already have fresh data for this user
      const cachedData = getCachedProfile(user.id);
      
      if (cachedData && cachedData.status === 'fresh') {
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
