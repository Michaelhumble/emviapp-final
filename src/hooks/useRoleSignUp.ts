
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
      
      // First, sign up the user with Supabase Auth
      const signUpResponse = await signUp(email, password);
      
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
      
      // Explicitly update user metadata with the selected role
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { role: selectedRole }
      });
      
      if (metadataError) {
        console.error("[SignUp] Error updating user metadata:", metadataError);
        // Continue anyway as we'll also update the public.users table
      } else {
        console.log(`[SignUp] Successfully set role in auth metadata: ${selectedRole}`);
      }
      
      // Update role in the public.users table
      const { error: roleUpdateError } = await supabase
        .from('users')
        .update({ role: selectedRole })
        .eq('id', userId);
      
      if (roleUpdateError) {
        console.error("[SignUp] Error updating user role:", roleUpdateError);
        setError("Account created but role could not be saved. Please contact support.");
        setIsSubmitting(false);
        return;
      }
      
      console.log(`[SignUp] Successfully set role in users table: ${selectedRole}`);
      
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
