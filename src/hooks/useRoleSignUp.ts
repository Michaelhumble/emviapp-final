
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/context/auth/types";
import { navigateToRoleDashboard } from "@/utils/navigation";

export const useRoleSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referrer, setReferrer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferrer(ref);
      console.log("Referral code detected:", ref);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setIsSubmitting(true);
    console.log("Starting sign-up process...");

    try {
      // Create the auth user - the database trigger will handle the public.users insert
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: selectedRole,
            user_type: selectedRole,
            ...(referrer ? { referred_by_referral_code: referrer } : {})
          },
        },
      });
      
      console.log("Sign-up response:", { data, error: signUpError });
      
      if (signUpError) {
        console.error("Sign-up error:", signUpError);
        setError(signUpError.message);
        toast.error(signUpError.message || "Failed to sign up");
        setIsSubmitting(false);
        return;
      }
      
      if (!data.user) {
        throw new Error("User creation failed - no user returned");
      }

      console.log("User created successfully:", data.user.id);

      // Process referral if provided
      if (referrer && data.user) {
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

      // Store role and show success
      localStorage.setItem('emviapp_user_role', selectedRole);
      console.log("Sign-up completed successfully");
      
      toast.success("Account created successfully! Redirecting to dashboard...");
      
      setTimeout(() => {
        navigateToRoleDashboard(navigate, selectedRole);
      }, 1500);
      
    } catch (err: any) {
      console.error("Unexpected sign-up error:", err);
      setError(err.message || "An unexpected error occurred");
      toast.error(err.message || "Failed to sign up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    selectedRole,
    setSelectedRole,
    isSubmitting,
    error,
    referrer,
    handleSubmit
  };
};
