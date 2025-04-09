
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { UserRole } from "@/context/auth/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { navigateToRoleDashboard } from "@/utils/navigation";
import { normalizeUserRole } from "@/utils/roleUtils";

export const useRoleSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("artist"); // Default to artist instead of customer
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
    console.log(`[useRoleSignUp] Starting sign-up with explicit role: ${selectedRole}`);

    try {
      // IMPORTANT: Explicitly pass the selected role to signUp method
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
      console.log(`[useRoleSignUp] User created with ID: ${userId} and role: ${selectedRole}`);
      
      // Double-check that role was properly set in the database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();
        
      if (userError) {
        console.error("[useRoleSignUp] Error verifying user role:", userError);
      } else {
        console.log(`[useRoleSignUp] Database has role: ${userData?.role}`);
        
        // If role doesn't match or isn't set, update it directly
        if (!userData?.role || userData.role !== selectedRole) {
          console.warn(`[useRoleSignUp] Role mismatch! Fixing role in database from ${userData?.role || 'none'} to ${selectedRole}`);
          
          const { error: updateError } = await supabase
            .from('users')
            .update({ role: selectedRole })
            .eq('id', userId);
            
          if (updateError) {
            console.error("[useRoleSignUp] Failed to update role in database:", updateError);
          }
        }
      }
      
      // Also ensure auth metadata has the correct role - CRITICAL for proper routing
      await supabase.auth.updateUser({
        data: { role: selectedRole }
      });
      
      console.log("[useRoleSignUp] Updated auth metadata with role:", selectedRole);
      
      // Force a session refresh to get the updated metadata
      await supabase.auth.refreshSession();
      
      toast.success("Account created successfully!");
      
      // Navigate to the appropriate dashboard based on role - Now with extra logging
      console.log(`[useRoleSignUp] About to navigate using role: ${selectedRole}`);
      const normalizedRole = normalizeUserRole(selectedRole);
      console.log(`[useRoleSignUp] Normalized role for navigation: ${normalizedRole}`);
      
      if (normalizedRole === 'salon_owner') {
        console.log("[useRoleSignUp] Explicit navigation for salon owner to: /dashboard/salon_owner");
        navigate("/dashboard/salon_owner");
      } else {
        console.log("[useRoleSignUp] Using navigation utility for role:", selectedRole);
        navigateToRoleDashboard(navigate, selectedRole);
      }
      
    } catch (error) {
      console.error("[useRoleSignUp] Unexpected error:", error);
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
