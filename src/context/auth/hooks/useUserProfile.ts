
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { normalizeRole } from "@/utils/roles";
import { getCachedProfile, clearCacheForUser } from "../utils/profileCache";
import { fetchFreshProfileData } from "../utils/profileFetcher";

/**
 * REFACTOR: Simplified hook with auth metadata as single source of truth
 * Removed all localStorage interactions and complex fallback strategies
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);

  // Optimized function to fetch user profile with auth metadata as primary source
  const getUserProfile = useCallback(async (userId: string) => {
    try {
      setIsError(false);
      
      // Check cache first with optimized flow - always use cached data first
      const cachedData = getCachedProfile(userId);
      
      if (cachedData && cachedData.profile) {
        const cacheStatus = cachedData.status;
        
        // Populate UI immediately with cached data
        console.log(`Using ${cacheStatus} cached profile data`);
        setUserProfile(cachedData.profile);
        if (cachedData.role) setUserRole(cachedData.role);
        
        // If not fresh, trigger background refresh but don't block UI
        if (cacheStatus !== 'fresh') {
          console.log(`Cache is ${cacheStatus}, refreshing in background`);
          
          setTimeout(() => {
            fetchFreshProfileData(userId).then(result => {
              if (result.profile) {
                setUserProfile(result.profile);
                if (result.role) setUserRole(result.role);
                setLastRefreshTime(Date.now());
              }
            }).catch(err => {
              console.warn("Background refresh failed:", err);
            });
          }, 100);
        }
        
        setLoading(false);
        return;
      }
      
      // No usable cache, fetch fresh data with loading indicator
      setLoading(true);
      const result = await fetchFreshProfileData(userId);
      
      // Update state with fresh data
      if (result.profile) {
        setUserProfile(result.profile);
        if (result.role) setUserRole(result.role);
        setLastRefreshTime(Date.now());
      } else if (result.role) {
        // We got a role but no profile
        setUserRole(result.role);
      }
      // REFACTOR: Removed localStorage fallback - clean error handling
      
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      setIsError(true);
      
      // REFACTOR: No localStorage fallback - clean error state
      setUserRole(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);
  
  // Force refresh user profile with simplified error handling
  const refreshUserProfile = useCallback(async () => {
    if (user) {
      console.log("Forcing profile refresh");
      clearCacheForUser(user.id);
      
      setLoading(true);
      try {
        const result = await fetchFreshProfileData(user.id);
        
        if (result.profile) {
          setUserProfile(result.profile);
        }
        if (result.role) {
          setUserRole(result.role);
        }
        
        setLastRefreshTime(Date.now());
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

  // Simplified effect to fetch profile data when user changes
  useEffect(() => {
    if (user) {
      console.log("User changed or initialized, fetching profile");
      
      // Check if we already have fresh data for this user
      const cachedData = getCachedProfile(user.id);
      
      if (cachedData && cachedData.status === 'fresh' && cachedData.profile) {
        console.log("Using cached profile data for user change");
        setUserProfile(cachedData.profile);
        setUserRole(cachedData.role);
        setLoading(false);
        return;
      }
      
      // If no fresh data, fetch with minimal delay
      const timer = setTimeout(() => {
        getUserProfile(user.id);
      }, 10);
      
      return () => clearTimeout(timer);
    } else {
      console.log("No user, clearing profile data");
      setUserProfile(null);
      setUserRole(null);
      setLoading(false);
    }
  }, [user, getUserProfile, setLoading]);

  return {
    userProfile,
    userRole,
    refreshUserProfile,
    isError,
    lastRefreshTime
  };
};
