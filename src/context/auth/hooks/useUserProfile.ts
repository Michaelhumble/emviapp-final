
import { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { UserProfile, UserRole } from "../types";
import { normalizeRole } from "@/utils/roles";
import { getCachedProfile, clearCacheForUser } from "../utils/profileCache";
import { fetchFreshProfileData } from "../utils/profileFetcher";

/**
 * Optimized hook to handle user profile management with improved loading and caching
 */
export const useUserProfile = (user: User | null, setLoading: (loading: boolean) => void) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);

  // Optimized function to fetch user profile with progressive loading strategy
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
          // Don't show loading spinner for background refresh
          console.log(`Cache is ${cacheStatus}, refreshing in background`);
          
          // Using setTimeout to ensure this runs after current execution
          setTimeout(() => {
            fetchFreshProfileData(userId).then(result => {
              if (result.profile) {
                setUserProfile(result.profile);
                if (result.role) setUserRole(result.role);
                setLastRefreshTime(Date.now());
              }
            }).catch(err => {
              console.warn("Background refresh failed:", err);
              // Don't set error state for background refresh failures
            });
          }, 100);
        }
        
        // Always mark as not loading when using cache
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
      } else {
        // Fallback to localStorage for role if available
        const cachedRole = localStorage.getItem('emviapp_user_role');
        if (cachedRole) {
          setUserRole(normalizeRole(cachedRole as UserRole));
        }
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
  
  // Force refresh user profile with optimized error handling
  const refreshUserProfile = useCallback(async () => {
    if (user) {
      console.log("Forcing profile refresh");
      // Clear existing cache to ensure fresh data
      clearCacheForUser(user.id);
      
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

  // Optimized effect to fetch profile data when user changes
  useEffect(() => {
    if (user) {
      console.log("User changed or initialized, fetching profile");
      
      // Check if we already have fresh data for this user
      const cachedData = getCachedProfile(user.id);
      
      if (cachedData && cachedData.status === 'fresh' && cachedData.profile) {
        // Use cached data without fetching again
        console.log("Using cached profile data for user change");
        setUserProfile(cachedData.profile);
        setUserRole(cachedData.role);
        setLoading(false);
        return;
      }
      
      // If no fresh data or after a short delay to not block UI rendering
      const timer = setTimeout(() => {
        getUserProfile(user.id);
      }, 10); // Minimal delay to prioritize UI rendering
      
      return () => clearTimeout(timer);
    } else {
      console.log("No user, clearing profile data");
      // Clear user profile and role when logged out
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
