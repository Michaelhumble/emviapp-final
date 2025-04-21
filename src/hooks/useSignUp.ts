
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/context/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const [referrerCode, setReferrerCode] = useState<string | null>(null);
  const navigate = useNavigate();

  // Extract referral code from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferrerCode(ref);
      console.log("Referral code detected:", ref);
    }
  }, []);

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

      // Enhanced metadata with referrer code if present
      const metadata: any = {
        role: data.role
      };
      
      if (referrerCode) {
        metadata.referred_by_referral_code = referrerCode;
      }

      // Call the signup method from auth context with user metadata
      const result = await authSignUp(data.email, data.password, metadata);

      // Handle errors
      if (!result.success) {
        // Convert Error object to string if necessary
        const errorMessage = result.error ? 
          (typeof result.error === 'string' ? result.error : result.error.message || 'Failed to create account') 
          : 'Failed to create account';
        
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      // Process referral if code was provided and signup was successful
      if (result.success && referrerCode) {
        try {
          // Call our Supabase function to process the referral
          const { data: referralData, error: referralError } = await supabase.rpc(
            "process_referral",
            {
              referral_code: referrerCode,
              new_user_id: result.userId // Changed from result.user.id
            }
          );
          
          if (referralError) {
            console.error("Referral processing error:", referralError);
          } else if (referralData) {
            console.log("Referral processed successfully!");
          }
        } catch (referralErr) {
          console.error("Error processing referral:", referralErr);
        }
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
