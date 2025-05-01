
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/auth';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import RoleSelectionModal from '@/components/auth/RoleSelectionModal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
      resend: vi.fn(),
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

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock services
vi.mock('@/services/auth', () => ({
  signInWithEmail: vi.fn(),
  signUpWithEmail: vi.fn(),
  signOut: vi.fn(),
}));

// Mock router hooks
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/auth/signin', search: '' }),
}));

// Mock role selection hooks
vi.mock('@/hooks/useRoleBasedSignUp', () => ({
  useRoleBasedSignUp: () => ({
    signUp: vi.fn().mockResolvedValue(true),
    loading: false,
  }),
}));

vi.mock('@/hooks/useRoleSignUp', () => ({
  useRoleSignUp: () => ({
    email: '',
    setEmail: vi.fn(),
    password: '',
    setPassword: vi.fn(),
    confirmPassword: '',
    setConfirmPassword: vi.fn(),
    selectedRole: 'customer',
    setSelectedRole: vi.fn(),
    isSubmitting: false,
    error: null,
    referrer: '',
    handleSubmit: vi.fn(),
  }),
}));

vi.mock('@/components/auth/roles/useRoleSelection', () => ({
  useRoleSelection: () => ({
    selectedRole: 'artist',
    setSelectedRole: vi.fn(),
    isSubmitting: false,
    handleRoleSelection: vi.fn(),
  }),
}));

describe('Authentication Flow Integration', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  
  describe('Sign In Page', () => {
    it('should render the sign in form', () => {
      const { signInWithEmail } = require('@/services/auth');
      signInWithEmail.mockResolvedValue({ success: false, error: new Error('Invalid credentials') });

      render(
        <MemoryRouter>
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </MemoryRouter>
      );
      
      expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });
    
    it('should handle form submission with error', async () => {
      const { signInWithEmail } = require('@/services/auth');
      signInWithEmail.mockResolvedValue({ success: false, error: new Error('Invalid credentials') });

      render(
        <MemoryRouter>
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </MemoryRouter>
      );
      
      // Fill the form
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      
      await waitFor(() => {
        expect(signInWithEmail).toHaveBeenCalledWith('test@example.com', 'password123');
      });
      
      // Should display error
      expect(screen.getByText(/Invalid login credentials/i)).toBeInTheDocument();
    });
  });
  
  describe('Sign Up Page', () => {
    it('should render the sign up form', () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <SignUp />
          </AuthProvider>
        </MemoryRouter>
      );
      
      expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
    });
  });
  
  describe('Role Selection Modal', () => {
    it('should render the role selection modal when open', () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <RoleSelectionModal open={true} onOpenChange={vi.fn()} userId="test-user-id" />
          </AuthProvider>
        </MemoryRouter>
      );
      
      expect(screen.getByText(/Welcome to EmviApp!/i)).toBeInTheDocument();
      expect(screen.getByText(/Tell us how you'd like to use the platform/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument();
    });
    
    it('should not render when closed', () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <RoleSelectionModal open={false} onOpenChange={vi.fn()} userId="test-user-id" />
          </AuthProvider>
        </MemoryRouter>
      );
      
      expect(screen.queryByText(/Welcome to EmviApp!/i)).not.toBeInTheDocument();
    });
  });
  
  describe('Authentication State Integration', () => {
    it('should handle a complete sign-in and role selection flow', async () => {
      const mockSignIn = vi.fn().mockResolvedValue({ success: true });
      const mockNavigate = vi.fn();
      
      vi.mock('@/context/auth', () => ({
        ...vi.importActual('@/context/auth'),
        useAuth: () => ({
          signIn: mockSignIn,
          user: null,
          loading: false,
          userRole: null,
          isSignedIn: false,
        }),
        AuthProvider: ({ children }) => <>{children}</>,
      }));
      
      vi.mock('react-router-dom', () => ({
        ...vi.importActual('react-router-dom'),
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: '/auth/signin', search: '' }),
      }));

      render(
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      );
      
      // Fill the form
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
      
      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
      
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalled();
      });
      
      // User would be redirected to dashboard after successful sign in
      // We're not testing the actual navigation since we mocked useNavigate
    });
  });
});
