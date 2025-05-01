
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSession } from '@/context/auth/hooks/useSession';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  },
}));

// Mock router context
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('useSession hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
    });

    const { result } = renderHook(() => useSession());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
    expect(result.current.isNewUser).toBe(false);
  });

  it('should update state on auth state change', async () => {
    const mockUser = { id: 'test-id', email: 'test@example.com', user_metadata: { role: 'artist' } };
    const mockSession = { user: mockUser } as unknown as Session;
    
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: mockSession },
    });

    const { result } = renderHook(() => useSession());

    // Simulate auth state change
    const authStateChangeHandler = (supabase.auth.onAuthStateChange as any).mock.calls[0][0];
    vi.advanceTimersByTime(0); // advance timers to process promise
    authStateChangeHandler('SIGNED_IN', mockSession);

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.session).toEqual(mockSession);
    expect(result.current.loading).toBe(false);
    expect(localStorage.getItem('emviapp_user_role')).toBe('artist');
  });

  it('should handle sign up event correctly', async () => {
    const mockUser = { id: 'new-user', email: 'new@example.com', user_metadata: { role: 'customer' } };
    const mockSession = { user: mockUser } as unknown as Session;
    
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
    });

    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    const { result } = renderHook(() => useSession());

    // Simulate SIGNED_UP event
    const authStateChangeHandler = (supabase.auth.onAuthStateChange as any).mock.calls[0][0];
    authStateChangeHandler('SIGNED_UP', mockSession);

    expect(result.current.isNewUser).toBe(true);
    expect(localStorage.getItem('emviapp_new_user')).toBe('true');
    expect(localStorage.getItem('emviapp_user_role')).toBe('customer');
  });

  it('should clear new user status correctly', () => {
    // Set up initial state as new user
    localStorage.setItem('emviapp_new_user', 'true');
    
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
    });

    const { result } = renderHook(() => useSession());

    // Call the clearIsNewUser function
    result.current.clearIsNewUser();

    expect(result.current.isNewUser).toBe(false);
    expect(localStorage.getItem('emviapp_new_user')).toBeNull();
  });
});
