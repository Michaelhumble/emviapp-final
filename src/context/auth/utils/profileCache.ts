
import { UserProfile, UserRole } from "../types";

// Define cache entry structure
export interface ProfileCacheEntry {
  profile: UserProfile | null;
  timestamp: number;
  role: UserRole | null;
  status: 'fresh' | 'stale' | 'expired';
}

// Cache durations
export const CACHE_FRESH_DURATION = 10 * 60 * 1000;   // 10 minutes fresh
export const CACHE_STALE_DURATION = 30 * 60 * 1000;   // 30 minutes stale

// Create a profile cache with Map
export const profileCache = new Map<string, ProfileCacheEntry>();

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
 * Store profile in cache
 */
export const cacheProfile = (
  userId: string, 
  profile: UserProfile | null, 
  role: UserRole | null
): void => {
  profileCache.set(userId, {
    profile,
    role,
    timestamp: Date.now(),
    status: 'fresh'
  });
};

/**
 * Get cached profile if available and not expired
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
