
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
      const error = 'Please fill in all fields';
      console.error("Sign-up validation error:", error);
      toast.error(error);
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
        console.error("Error details:", {
          message: error.message,
          status: error.status,
          code: error.code,
          name: error.name
        });
        
        // Handle specific Supabase error types with detailed messages
        let errorMessage = error.message;
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead or use a different email address.';
        } else if (error.message.includes('already')) {
          errorMessage = 'This email is already registered. Please sign in instead.';
        } else if (error.message.includes('permission denied')) {
          errorMessage = `Database permission error: ${error.message}. Please contact support.`;
          console.error("Database permission error details:", error);
        } else if (error.message.includes('SQLSTATE')) {
          errorMessage = `Database error occurred during account creation: ${error.message}. Please try again or contact support.`;
          console.error("Database SQL error details:", error);
        } else if (error.message.includes('Invalid')) {
          errorMessage = `Invalid input: ${error.message}. Please check your email and password format.`;
        } else if (error.message.includes('weak password')) {
          errorMessage = 'Password is too weak. Please choose a stronger password with at least 6 characters.';
        } else if (error.message.includes('invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'Too many sign-up attempts. Please wait a moment before trying again.';
        } else if (error.status === 422) {
          errorMessage = `Validation error: ${error.message}`;
        } else if (error.status === 500) {
          errorMessage = `Server error: ${error.message}. Please try again or contact support.`;
        } else {
          // Show the exact Supabase error message for any other errors
          errorMessage = `Sign up failed: ${error.message}`;
        }
        
        toast.error(errorMessage);
        return false;
      }

      if (!data?.user) {
        const errorMsg = 'Account creation failed - no user data returned. Please try again.';
        console.error("No user data returned from sign up");
        toast.error(errorMsg);
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
            console.error("Referral error details:", {
              message: referralError.message,
              code: referralError.code,
              details: referralError.details,
              hint: referralError.hint
            });
            // Don't fail the whole sign-up for referral errors
            toast.warning(`Account created successfully, but referral processing failed: ${referralError.message}`);
          } else if (referralData) {
            console.log("Referral processed successfully!");
            toast.success('Account created successfully! Referral bonus applied.');
          } else {
            console.log("Referral processed but no data returned");
            toast.success('Account created successfully!');
          }
        } catch (referralErr: any) {
          console.error("Error processing referral:", referralErr);
          console.error("Referral exception details:", {
            message: referralErr.message,
            stack: referralErr.stack,
            name: referralErr.name
          });
          toast.warning(`Account created successfully, but referral processing encountered an error: ${referralErr.message || 'Unknown error'}`);
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
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code
      });
      
      // Handle different types of unexpected errors with specific messages
      let errorMessage = 'An unexpected error occurred during sign up.';
      
      if (error?.message) {
        if (error.message.includes('fetch')) {
          errorMessage = `Network error during sign up: ${error.message}. Please check your connection and try again.`;
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Sign up timed out. Please try again.';
        } else if (error.message.includes('cors')) {
          errorMessage = 'Connection error. Please refresh the page and try again.';
        } else {
          errorMessage = `Sign up failed: ${error.message}`;
        }
      } else {
        errorMessage = 'An unexpected error occurred during sign up. Please try again.';
      }
      
      toast.error(errorMessage);
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
