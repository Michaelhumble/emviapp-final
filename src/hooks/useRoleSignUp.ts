
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
  const [fullName, setFullName] = useState("");
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

    if (!fullName.trim()) {
      setError("Full name is required");
      toast.error("Full name is required");
      return;
    }
    
    setIsSubmitting(true);

    try {
      console.log("Attempting sign up with:", { 
        email, 
        fullName: fullName.trim(), 
        selectedRole 
      });
      
      const signUpPayload = {
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: selectedRole,
            user_type: selectedRole,
            ...(referrer ? { referred_by_referral_code: referrer } : {})
          },
        },
      };
      
      console.log("Sign up payload:", signUpPayload);
      
      const { data, error: signUpError } = await supabase.auth.signUp(signUpPayload);
      
      console.log("Sign up response:", { data, error: signUpError });
      
      if (signUpError) {
        setError(signUpError.message);
        toast.error(signUpError.message || "Failed to sign up");
        setIsSubmitting(false);
        return;
      }
      
      if (!data.user) {
        throw new Error("User creation failed");
      }

      console.log("User created successfully:", data.user.id);

      // Try to update user role in the users table as backup
      const { error: updateError } = await supabase
        .from('users')
        .update({ role: selectedRole })
        .eq('id', data.user.id);

      if (updateError) {
        console.error("Error updating user role:", updateError);
      }

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

      localStorage.setItem('emviapp_user_role', selectedRole);
      
      toast.success("Account created successfully! Redirecting to dashboard...");
      
      setTimeout(() => {
        navigateToRoleDashboard(navigate, selectedRole);
      }, 1500);
      
    } catch (err: any) {
      console.error("Sign up error:", err);
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
    fullName,
    setFullName,
    selectedRole,
    setSelectedRole,
    isSubmitting,
    error,
    referrer,
    handleSubmit
  };
};
