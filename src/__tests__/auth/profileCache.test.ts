
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { 
  profileCache, 
  cacheProfile, 
  getCachedProfile, 
  clearCacheForUser,
  getCacheStatus,
  CACHE_FRESH_DURATION,
  CACHE_STALE_DURATION
} from '@/context/auth/utils/profileCache';

describe('Profile caching module', () => {
  beforeEach(() => {
    // Clear the cache and localStorage before each test
    profileCache.clear();
    localStorage.clear();
    
    // Mock localStorage methods
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
      removeItem: vi.fn(),
      length: 0,
      key: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should store and retrieve profiles from cache', () => {
    const userId = 'test-user-123';
    const userProfile = {
      id: userId,
      email: 'test@example.com',
      full_name: 'Test User',
      role: 'artist'
    };
    
    // Cache the profile
    cacheProfile(userId, userProfile, 'artist');
    
    // Retrieve it from cache
    const cachedData = getCachedProfile(userId);
    
    expect(cachedData).not.toBeNull();
    expect(cachedData?.profile).toEqual(userProfile);
    expect(cachedData?.role).toBe('artist');
    expect(cachedData?.status).toBe('fresh');
  });

  it('should correctly determine cache status based on age', () => {
    const userId = 'test-user-123';
    const userProfile = {
      id: userId,
      email: 'test@example.com'
    };
    
    // Create cache entry with manipulated timestamp
    const now = Date.now();
    
    // Fresh entry (just created)
    cacheProfile(userId, userProfile, 'customer');
    let cachedData = getCachedProfile(userId);
    expect(cachedData?.status).toBe('fresh');
    
    // Stale entry (older than fresh duration but newer than stale duration)
    const staleTimestamp = now - CACHE_FRESH_DURATION - 1000; // 1 second older than fresh threshold
    profileCache.set(userId, {
      profile: userProfile,
      role: 'customer',
      timestamp: staleTimestamp,
      status: 'fresh' // Will be updated by getCachedProfile
    });
    
    cachedData = getCachedProfile(userId);
    expect(cachedData?.status).toBe('stale');
    
    // Expired entry (older than stale duration)
    const expiredTimestamp = now - CACHE_STALE_DURATION - 1000; // 1 second older than stale threshold
    profileCache.set(userId, {
      profile: userProfile,
      role: 'customer',
      timestamp: expiredTimestamp,
      status: 'stale' // Will be updated by getCachedProfile
    });
    
    cachedData = getCachedProfile(userId);
    expect(cachedData?.status).toBe('expired');
  });

  it('should clear cache for a specific user', () => {
    const userId1 = 'user-1';
    const userId2 = 'user-2';
    
    // Cache profiles for two different users
    cacheProfile(userId1, { id: userId1, email: 'user1@example.com' }, 'artist');
    cacheProfile(userId2, { id: userId2, email: 'user2@example.com' }, 'customer');
    
    // Verify both are cached
    expect(getCachedProfile(userId1)).not.toBeNull();
    expect(getCachedProfile(userId2)).not.toBeNull();
    
    // Clear cache for user 1
    clearCacheForUser(userId1);
    
    // Verify user 1 is no longer in cache but user 2 still is
    expect(getCachedProfile(userId1)).toBeNull();
    expect(getCachedProfile(userId2)).not.toBeNull();
  });

  it('should persist cached profiles to localStorage', () => {
    const userId = 'test-user-456';
    const userProfile = {
      id: userId,
      email: 'test456@example.com',
      role: 'salon'
    };
    
    cacheProfile(userId, userProfile, 'salon');
    
    // Verify localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalled();
    
    // The first argument should be the cache key
    const firstCallArgs = localStorage.setItem.mock.calls[0];
    expect(firstCallArgs[0]).toBe('emviapp_profile_cache');
    
    // The second argument should be a JSON string containing the profile
    const cacheObject = JSON.parse(firstCallArgs[1]);
    expect(cacheObject).toHaveProperty(userId);
    expect(cacheObject[userId].profile).toEqual(userProfile);
    expect(cacheObject[userId].role).toBe('salon');
  });
});
