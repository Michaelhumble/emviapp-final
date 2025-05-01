
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/context/auth';
import { AuthProvider } from '@/context/auth';
import { UserRole } from '@/context/auth/types';
import { supabase } from '@/integrations/supabase/client';

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
const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

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
    supabase.auth.getSession.mockResolvedValue({
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
    const mockUser = { id: 'test-user-id', email: 'test@example.com' };
    const mockSession = { user: mockUser };
    
    supabase.auth.getSession.mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });

    supabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    supabase.from().select().eq().single.mockResolvedValue({
      data: { 
        id: 'test-user-id', 
        role: 'artist',
        email: 'test@example.com'
      },
      error: null,
    });

    const { result, rerender } = renderHook(() => useAuth(), { wrapper });

    // Wait for auth state to update
    await act(async () => {
      // Simulate onAuthStateChange event
      const authStateChangeHandler = supabase.auth.onAuthStateChange.mock.calls[0][0];
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
    const mockUser = { id: 'test-user-id', email: 'test@example.com' };
    
    supabase.auth.getSession.mockResolvedValue({
      data: { session: { user: mockUser } },
      error: null,
    });

    supabase.auth.signOut.mockResolvedValue({ error: null });

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Wait for initial auth state
    await act(async () => {
      // Simulate onAuthStateChange event for sign in
      const authStateChangeHandler = supabase.auth.onAuthStateChange.mock.calls[0][0];
      authStateChangeHandler('SIGNED_IN', { user: mockUser });
    });

    // Perform sign out
    await act(async () => {
      await result.current.signOut();
      
      // Simulate onAuthStateChange event for sign out
      const authStateChangeHandler = supabase.auth.onAuthStateChange.mock.calls[0][0];
      authStateChangeHandler('SIGNED_OUT', null);
    });

    // Verify sign out effects
    expect(supabase.auth.signOut).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.userProfile).toBeNull();
    expect(result.current.isSignedIn).toBe(false);
  });

  it('should handle role updates correctly', async () => {
    // Setup mocks
    const mockUser = { id: 'test-user-id', email: 'test@example.com' };
    const mockSession = { user: mockUser };
    const initialRole = 'customer';
    const newRole = 'artist' as UserRole;
    
    supabase.auth.getSession.mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });

    supabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    supabase.from().select().eq().single.mockResolvedValueOnce({
      data: { 
        id: 'test-user-id', 
        role: initialRole,
        email: 'test@example.com'
      },
      error: null,
    });

    supabase.from().update().eq.mockResolvedValue({
      data: { role: newRole },
      error: null,
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Wait for initial auth state
    await act(async () => {
      const authStateChangeHandler = supabase.auth.onAuthStateChange.mock.calls[0][0];
      authStateChangeHandler('SIGNED_IN', mockSession);
    });

    // Mock updateUserProfile to return success for role update
    supabase.from().select().eq().single.mockResolvedValueOnce({
      data: { 
        id: 'test-user-id', 
        role: newRole,
        email: 'test@example.com'
      },
      error: null,
    });

    // Update user role
    await act(async () => {
      await result.current.updateUserRole(newRole);
    });

    // Verify role was updated
    expect(result.current.userRole).toBe(newRole);
    expect(localStorage.getItem('emviapp_user_role')).toBe(newRole);
  });
});
