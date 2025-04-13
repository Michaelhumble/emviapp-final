
import { useState } from 'react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/context/auth/types';

interface SignUpData {
  email: string;
  password: string;
  role: UserRole;
}

interface UseSignUpReturn {
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  loading: boolean;
  error: string | null;
}

export const useSignUp = (): UseSignUpReturn => {
  const { signUp: authSignUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signUp = async (data: SignUpData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      setError(null);

      // Basic validation
      if (!data.email || !data.password) {
        setError('Email and password are required');
        return { success: false, error: 'Email and password are required' };
      }

      if (data.password.length < 6) {
        setError('Password must be at least 6 characters');
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Call the signup method from auth context with user metadata
      const result = await authSignUp(data.email, data.password, {
        role: data.role
      });

      // Handle errors
      if (!result.success) {
        // Convert Error object to string if necessary
        const errorMessage = result.error ? 
          (typeof result.error === 'string' ? result.error : result.error.message || 'Failed to create account') 
          : 'Failed to create account';
        
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      // Redirect on success
      if (result.success) {
        // Navigate to verify email or welcome page
        navigate('/auth/verify-email');
        return { success: true };
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    signUp,
    loading,
    error,
  };
};
