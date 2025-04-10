
import { UserProfile, UserRole } from "../types";

// Define cache entry structure
export interface ProfileCacheEntry {
  profile: UserProfile | null;
  timestamp: number;
  role: UserRole | null;
  status: 'fresh' | 'stale' | 'expired';
}

// Cache durations - optimized for faster initial loads (longer fresh duration)
export const CACHE_FRESH_DURATION = 30 * 60 * 1000;   // 30 minutes fresh (extended from 10)
export const CACHE_STALE_DURATION = 60 * 60 * 1000;   // 60 minutes stale (extended from 30)

// Create a profile cache with Map
export const profileCache = new Map<string, ProfileCacheEntry>();

// Also create a localStorage backup cache for persistent data between sessions
const LOCAL_STORAGE_CACHE_KEY = 'emviapp_profile_cache';

/**
 * Initialize the cache from localStorage on module load
 */
(() => {
  try {
    const cachedData = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
    if (cachedData) {
      const parsedCache = JSON.parse(cachedData);
      // Convert the object back to a Map
      if (parsedCache && typeof parsedCache === 'object') {
        Object.entries(parsedCache).forEach(([key, value]) => {
          profileCache.set(key, value as ProfileCacheEntry);
        });
        console.log("Initialized profile cache from localStorage");
      }
    }
  } catch (e) {
    console.warn("Could not initialize profile cache from localStorage", e);
  }
})();

/**
 * Get cache entry status based on age
 */
export const getCacheStatus = (cachedData: ProfileCacheEntry): 'fresh' | 'stale' | 'expired' => {
  const now = Date.now();
  const age = now - cachedData.timestamp;
  
  if (age < CACHE_FRESH_DURATION) {
    return 'fresh';
  } else if (age < CACHE_STALE_DURATION) {
    return 'stale';
  } else {
    return 'expired';
  }
};

/**
 * Store profile in cache and persist to localStorage
 */
export const cacheProfile = (
  userId: string, 
  profile: UserProfile | null, 
  role: UserRole | null
): void => {
  const cacheEntry: ProfileCacheEntry = {
    profile,
    role,
    timestamp: Date.now(),
    status: 'fresh'
  };
  
  // Update in-memory cache
  profileCache.set(userId, cacheEntry);
  
  // Persist to localStorage for browser session persistence
  try {
    // Convert Map to plain object for localStorage
    const cacheObject: Record<string, ProfileCacheEntry> = {};
    
    profileCache.forEach((value, key) => {
      cacheObject[key] = value;
    });
    
    localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(cacheObject));
  } catch (e) {
    console.warn("Failed to persist profile cache to localStorage", e);
  }
};

/**
 * Get cached profile if available
 */
export const getCachedProfile = (
  userId: string
): ProfileCacheEntry | null => {
  const cachedData = profileCache.get(userId);
  
  if (!cachedData) {
    return null;
  }
  
  // Update cache status based on age
  cachedData.status = getCacheStatus(cachedData);
  
  return cachedData;
};

/**
 * Clear cache entry for a specific user
 */
export const clearCacheForUser = (userId: string): void => {
  profileCache.delete(userId);
  
  // Update localStorage
  try {
    const cacheObject: Record<string, ProfileCacheEntry> = {};
    
    profileCache.forEach((value, key) => {
      cacheObject[key] = value;
    });
    
    localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(cacheObject));
  } catch (e) {
    console.warn("Failed to update localStorage after clearing cache", e);
  }
};
