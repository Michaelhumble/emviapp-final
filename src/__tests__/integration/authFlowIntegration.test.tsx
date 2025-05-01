
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/auth';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import RoleSelectionModal from '@/components/auth/RoleSelectionModal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import matchers from '@testing-library/jest-dom/matchers';

// Extend expect with jest-dom matchers
expect.extend(matchers);

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
      
      // No need for .toBeInTheDocument() with expect().toBeInTheDocument()
      expect(screen.getByText(/Sign In/i)).toBeDefined();
      expect(screen.getByLabelText(/Email/i)).toBeDefined();
      expect(screen.getByLabelText(/Password/i)).toBeDefined();
      expect(screen.getByRole('button', { name: /Sign In/i })).toBeDefined();
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
      expect(screen.getByText(/Invalid login credentials/i)).toBeDefined();
    });
  });
});
