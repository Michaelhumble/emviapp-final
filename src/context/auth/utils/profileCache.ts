
import { UserProfile, UserRole } from '../types';

// Simple in-memory cache for profiles
const profileCache = new Map<string, { profile: UserProfile; role: UserRole | null; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cacheProfile = (userId: string, profile: UserProfile, role: UserRole | null) => {
  profileCache.set(userId, {
    profile,
    role,
    timestamp: Date.now()
  });
};

export const getCachedProfile = (userId: string): { profile: UserProfile; role: UserRole | null } | null => {
  const cached = profileCache.get(userId);
  if (!cached) return null;
  
  // Check if cache is expired
  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    profileCache.delete(userId);
    return null;
  }
  
  return {
    profile: cached.profile,
    role: cached.role
  };
};

export const clearProfileCache = (userId?: string) => {
  if (userId) {
    profileCache.delete(userId);
  } else {
    profileCache.clear();
  }
};
