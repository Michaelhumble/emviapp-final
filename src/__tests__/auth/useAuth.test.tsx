
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/context/auth';
import { AuthProvider } from '@/context/auth';
import { UserRole } from '@/context/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import React from 'react';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      getSession: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      updateUser: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          maybeSingle: vi.fn(),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(),
      })),
      upsert: vi.fn(),
    })),
  },
}));

// Mock router context
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/test', search: '' }),
}));

// Wrapper for testing hooks that need AuthProvider
const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;

describe('useAuth hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    // Setup mock for getSession
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
      error: null,
    });

    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.userProfile).toBeNull();
    expect(result.current.userRole).toBe('customer');
    expect(result.current.loading).toBe(true);
    expect(result.current.isSignedIn).toBe(false);
  });

  it('should update state when user signs in', async () => {
    // Setup mocks for authentication
    const mockUser = { id: 'test-user-id', email: 'test@example.com' } as User;
    const mockSession = { user: mockUser } as Session;
    
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });

    (supabase.auth.getUser as any).mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const userProfile = { 
      id: 'test-user-id', 
      role: 'artist' as UserRole,
      email: 'test@example.com'
    };

    const mockSingle = vi.fn().mockResolvedValue({
      data: userProfile,
      error: null,
    });

    const mockEq = vi.fn().mockReturnValue({
      single: mockSingle,
    });

    const mockSelect = vi.fn().mockReturnValue({
      eq: mockEq,
    });

    const mockFrom = vi.fn().mockReturnValue({
      select: mockSelect,
    });

    // Setup mock chain
    (supabase.from as any) = mockFrom;

    const { result, rerender } = renderHook(() => useAuth(), { wrapper });

    // Wait for auth state to update
    await act(async () => {
      // Simulate onAuthStateChange event
      const authStateChangeHandler = (supabase.auth.onAuthStateChange as any).mock.calls[0][0];
      authStateChangeHandler('SIGNED_IN', mockSession);
      
      // Force re-render to ensure state updates
      rerender();
    });

    // Verify the auth state has been updated
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isSignedIn).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('should handle sign out correctly', async () => {
    // Setup initial signed-in state
    const mockUser = { id: 'test-user-id', email: 'test@example.com' } as User;
    
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: { user: mockUser } },
      error: null,
    });

    (supabase.auth.signOut as any).mockResolvedValue({ error: null });

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Wait for initial auth state
    await act(async () => {
      // Simulate onAuthStateChange event for sign in
      const authStateChangeHandler = (supabase.auth.onAuthStateChange as any).mock.calls[0][0];
      authStateChangeHandler('SIGNED_IN', { user: mockUser });
    });

    // Perform sign out
    await act(async () => {
      await result.current.signOut();
      
      // Simulate onAuthStateChange event for sign out
      const authStateChangeHandler = (supabase.auth.onAuthStateChange as any).mock.calls[0][0];
      authStateChangeHandler('SIGNED_OUT', null);
    });

    // Verify sign out effects
    expect(supabase.auth.signOut).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.userProfile).toBeNull();
    expect(result.current.isSignedIn).toBe(false);
  });
});
