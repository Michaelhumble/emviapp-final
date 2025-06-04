
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/context/auth/types';
import { toast } from 'sonner';

export const useRoleBasedSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    // Check URL for referral code when component loads
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferrer(ref);
      console.log("Referral code detected:", ref);
    }
  }, []);

  const signUp = async (email: string, password: string, role: UserRole) => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return false;
    }

    setLoading(true);
    try {
      // Prepare user metadata with role and referral info
      const userData = {
        role: role,
        user_type: role, // For backward compatibility
        ...(referrer ? { referred_by_referral_code: referrer } : {})
      };

      console.log("Signing up with metadata:", userData);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) {
        if (error.message.includes('already')) {
          toast.error('This email is already registered. Please sign in instead.');
        } else {
          toast.error(error.message);
        }
        return false;
      }

      if (data?.user) {
        // First, process the referral if there was one
        if (referrer && data.user.id) {
          try {
            const { data: referralData, error: referralError } = await supabase.rpc(
              "process_referral",
              {
                referral_code: referrer,
                new_user_id: data.user.id
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

        // Store the role in localStorage for access during initial auth state
        localStorage.setItem('emviapp_user_role', role);
        toast.success('Account created successfully! Redirecting...');
        return true;
      }

      return false;
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    signUp,
    loading,
    referrer
  };
};
