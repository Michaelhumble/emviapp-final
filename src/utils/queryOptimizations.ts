// Query optimization utilities for reducing redundant API calls
import { QueryClient } from '@tanstack/react-query';

// Cache settings for different data types
export const cacheConfig = {
  // User profile data - rarely changes
  profile: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  },
  
  // Static/reference data - changes infrequently
  static: {
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  },
  
  // Dynamic data - needs to be fresh
  dynamic: {
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 5 * 60 * 1000, // 5 minutes
  },
  
  // Real-time data - always fresh
  realtime: {
    staleTime: 0,
    cacheTime: 1 * 60 * 1000, // 1 minute
  }
};

// Batch query helper to combine multiple similar queries
export const batchQueries = {
  // Batch profile-related queries
  async batchProfileQueries(supabase: any, userId: string) {
    const [profile, role, completedTasks] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('profiles').select('role').eq('id', userId).single(),
      supabase.from('profiles').select('completed_profile_tasks,role').eq('id', userId).single()
    ]);
    
    return {
      profile: profile.data,
      role: role.data?.role,
      completedTasks: completedTasks.data?.completed_profile_tasks,
      error: profile.error || role.error || completedTasks.error
    };
  },

  // Batch dashboard data
  async batchDashboardQueries(supabase: any, userId: string) {
    const [salons, activity, notifications] = await Promise.all([
      supabase.from('salons').select('*').eq('owner_id', userId).order('created_at', { desc: true }),
      supabase.from('activity_log').select('*').eq('user_id', userId).order('created_at', { desc: true }).limit(100),
      supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { desc: true }).limit(50)
    ]);
    
    return {
      salons: salons.data || [],
      activity: activity.data || [],
      notifications: notifications.data || [],
      error: salons.error || activity.error || notifications.error
    };
  }
};

// Debounce utility for reducing API calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Request deduplication for identical queries
const pendingRequests = new Map<string, Promise<any>>();

export const dedupRequest = async <T>(
  key: string,
  requestFn: () => Promise<T>
): Promise<T> => {
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key)!;
  }
  
  const promise = requestFn();
  pendingRequests.set(key, promise);
  
  try {
    const result = await promise;
    pendingRequests.delete(key);
    return result;
  } catch (error) {
    pendingRequests.delete(key);
    throw error;
  }
};

// Image optimization helpers
export const imageOptimizations = {
  // Generate optimized image URLs for different contexts
  optimizeUrl(url: string, options: { width?: number; quality?: number; format?: 'webp' | 'jpg' | 'png' } = {}) {
    if (!url) return url;
    
    const { width = 800, quality = 85, format = 'webp' } = options;
    
    // For Supabase storage URLs
    if (url.includes('supabase.co/storage')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}width=${width}&quality=${quality}&format=${format}`;
    }
    
    // For Unsplash URLs
    if (url.includes('unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}w=${width}&q=${quality}&fm=${format}&auto=format`;
    }
    
    return url;
  },
  
  // Generate srcSet for responsive images
  generateSrcSet(baseUrl: string, sizes: number[] = [320, 640, 768, 1024, 1200]) {
    return sizes
      .map(size => `${this.optimizeUrl(baseUrl, { width: size })} ${size}w`)
      .join(', ');
  }
};

// Performance monitoring
export const performanceMonitor = {
  markStart(label: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${label}-start`);
    }
  },
  
  markEnd(label: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${label}-end`);
      window.performance.measure(label, `${label}-start`, `${label}-end`);
      
      // Log slow operations in development
      if (process.env.NODE_ENV === 'development') {
        const measures = window.performance.getEntriesByName(label);
        const lastMeasure = measures[measures.length - 1];
        if (lastMeasure && lastMeasure.duration > 100) {
          console.warn(`Slow operation detected: ${label} took ${lastMeasure.duration.toFixed(2)}ms`);
        }
      }
    }
  }
};