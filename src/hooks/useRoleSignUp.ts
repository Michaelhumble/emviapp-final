
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { UserRole } from "@/context/auth/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { navigateToRoleDashboard } from "@/utils/navigation";

export const useRoleSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setIsSubmitting(true);

    try {
      console.log(`[SignUp] Starting sign-up with role: ${selectedRole}`);
      
      // Pass the selected role to signUp method
      const signUpResponse = await signUp(email, password, selectedRole);
      
      if (signUpResponse.error) {
        setError(signUpResponse.error.message || "Failed to sign up");
        setIsSubmitting(false);
        return;
      }
      
      if (!signUpResponse.data.user) {
        setError("No user data returned from sign-up");
        setIsSubmitting(false);
        return;
      }
      
      const userId = signUpResponse.data.user.id;
      console.log(`[SignUp] User created with ID: ${userId}`);
      
      // Log success
      toast.success("Account created successfully!");
      
      // Navigate to the appropriate dashboard based on role
      navigateToRoleDashboard(navigate, selectedRole);
      
    } catch (error) {
      console.error("[SignUp] Unexpected error:", error);
      setError("An unexpected error occurred. Please try again.");
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
    handleSubmit
  };
};
