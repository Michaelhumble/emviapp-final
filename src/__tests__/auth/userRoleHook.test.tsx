
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn(),
        })),
      })),
    })),
  },
}));

describe('useUserRole hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return null role and loading=false when userId is undefined', async () => {
    const { result } = renderHook(() => useUserRole(undefined));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.userRole).toBeNull();
    expect(supabase.auth.getUser).not.toHaveBeenCalled();
  });

  it('should fetch role from auth metadata when available', async () => {
    // Setup mocks
    const userId = 'test-user-id';
    const metadataRole = 'artist';
    
    supabase.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: userId,
          user_metadata: { role: metadataRole }
        }
      },
      error: null
    });
    
    const { result } = renderHook(() => useUserRole(userId));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.userRole).toBe(metadataRole);
    expect(supabase.auth.getUser).toHaveBeenCalled();
    expect(supabase.from).not.toHaveBeenCalled(); // Shouldn't need to check database
  });

  it('should fall back to database role if metadata role is not available', async () => {
    const userId = 'test-user-id';
    const dbRole = 'salon';
    
    supabase.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: userId,
          user_metadata: {} // No role in metadata
        }
      },
      error: null
    });
    
    supabase.from().select().eq().maybeSingle.mockResolvedValue({
      data: { role: dbRole },
      error: null
    });
    
    const { result } = renderHook(() => useUserRole(userId));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.userRole).toBe(dbRole);
    expect(supabase.from).toHaveBeenCalled();
  });

  it('should fall back to localStorage role if metadata and database roles are not available', async () => {
    const userId = 'test-user-id';
    const localStorageRole = 'customer';
    
    localStorage.setItem('emviapp_user_role', localStorageRole);
    
    supabase.auth.getUser.mockResolvedValue({
      data: {
        user: {
          id: userId,
          user_metadata: {} // No role in metadata
        }
      },
      error: null
    });
    
    supabase.from().select().eq().maybeSingle.mockResolvedValue({
      data: null, // No role in database
      error: null
    });
    
    const { result } = renderHook(() => useUserRole(userId));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.userRole).toBe(localStorageRole);
  });

  it('should correctly implement the hasRole helper function', async () => {
    const userId = 'test-user-id';
    const role = 'artist';
    
    localStorage.setItem('emviapp_user_role', role);
    
    supabase.auth.getUser.mockRejectedValue(new Error('Network error'));
    
    const { result } = renderHook(() => useUserRole(userId));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Test the hasRole helper
    expect(result.current.hasRole('artist')).toBe(true);
    expect(result.current.hasRole('customer')).toBe(false);
    
    // Test with role variants
    expect(result.current.hasRole('nail tech')).toBe(true); // Should normalize to 'artist'
  });

  it('should handle API errors gracefully', async () => {
    const userId = 'test-user-id';
    const localStorageRole = 'freelancer';
    
    localStorage.setItem('emviapp_user_role', localStorageRole);
    
    supabase.auth.getUser.mockRejectedValue(new Error('Auth API error'));
    
    const { result } = renderHook(() => useUserRole(userId));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Should fall back to localStorage
    expect(result.current.userRole).toBe(localStorageRole);
  });
});
