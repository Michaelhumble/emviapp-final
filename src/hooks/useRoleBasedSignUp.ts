
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
    console.log("Starting sign up process for:", email, "with role:", role);
    
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

      console.log("Supabase auth.signUp response:", { data, error });

      if (error) {
        console.error("Sign up error from Supabase:", error);
        
        // Show specific error messages based on error type
        if (error.message.includes('already')) {
          toast.error('This email is already registered. Please sign in instead.');
        } else if (error.message.includes('permission denied')) {
          toast.error('Database permission error. Please contact support.');
          console.error("Database permission error details:", error);
        } else if (error.message.includes('SQLSTATE')) {
          toast.error('Database error occurred during account creation. Please try again or contact support.');
          console.error("Database SQL error details:", error);
        } else if (error.message.includes('Invalid')) {
          toast.error('Invalid email or password format. Please check and try again.');
        } else {
          toast.error(`Sign up failed: ${error.message}`);
        }
        return false;
      }

      if (!data?.user) {
        console.error("No user data returned from sign up");
        toast.error('Account creation failed - no user data returned. Please try again.');
        return false;
      }

      console.log("User created successfully:", data.user.id);

      // Process referral if there was one
      if (referrer && data.user.id) {
        console.log("Processing referral for user:", data.user.id);
        try {
          const { data: referralData, error: referralError } = await supabase.rpc(
            "process_referral",
            {
              referral_code: referrer,
              new_user_id: data.user.id
            }
          );
          
          console.log("Referral processing result:", { referralData, referralError });
          
          if (referralError) {
            console.error("Referral processing error:", referralError);
            // Don't fail the whole sign-up for referral errors
            toast.warning('Account created successfully, but referral processing failed.');
          } else if (referralData) {
            console.log("Referral processed successfully!");
            toast.success('Account created successfully! Referral bonus applied.');
          } else {
            console.log("Referral processed but no data returned");
            toast.success('Account created successfully!');
          }
        } catch (referralErr) {
          console.error("Error processing referral:", referralErr);
          toast.warning('Account created successfully, but referral processing encountered an error.');
        }
      } else {
        toast.success('Account created successfully!');
      }

      // Store the role in localStorage for access during initial auth state
      localStorage.setItem('emviapp_user_role', role);
      console.log("Sign up completed successfully, role stored:", role);
      return true;

    } catch (error: any) {
      console.error('Unexpected signup error:', error);
      
      // Handle different types of unexpected errors
      if (error?.message) {
        if (error.message.includes('fetch')) {
          toast.error('Network error during sign up. Please check your connection and try again.');
        } else if (error.message.includes('timeout')) {
          toast.error('Sign up timed out. Please try again.');
        } else {
          toast.error(`Sign up failed: ${error.message}`);
        }
      } else {
        toast.error('An unexpected error occurred during sign up. Please try again.');
      }
      
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
