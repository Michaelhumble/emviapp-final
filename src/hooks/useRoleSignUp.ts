
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
    
    if (!selectedRole) {
      setError("Please select a role to continue");
      return;
    }
    
    setIsSubmitting(true);

    try {
      console.log(`[SignUp] Starting sign-up with explicitly selected role: ${selectedRole}`);
      
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
      console.log(`[SignUp] User created with ID: ${userId} and role: ${selectedRole}`);
      
      // Double-check that role was properly set - CRITICAL FIX HERE
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();
        
      if (userError) {
        console.error("[SignUp] Error verifying user role:", userError);
      } else {
        console.log(`[SignUp] Role verification - Database has role: ${userData?.role}`);
        
        // If role doesn't match or isn't set, update it directly - IMPROVED ERROR HANDLING
        if (!userData?.role || userData.role !== selectedRole) {
          console.warn(`[SignUp] Role mismatch! Fixing role in database from ${userData?.role || 'none'} to ${selectedRole}`);
          
          const { error: updateError } = await supabase
            .from('users')
            .update({ role: selectedRole })
            .eq('id', userId);
            
          if (updateError) {
            console.error("[SignUp] Failed to update role in database:", updateError);
            // Continue anyway, we'll try again with auth metadata
          }
        }
      }
      
      // Also ensure auth metadata has the correct role - CRITICAL FIX
      await supabase.auth.updateUser({
        data: { role: selectedRole }
      });
      
      console.log("[SignUp] Updated auth metadata with role:", selectedRole);
      
      // Force a small delay to let database updates complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Force a session refresh to get the updated metadata
      await supabase.auth.refreshSession();
      
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
