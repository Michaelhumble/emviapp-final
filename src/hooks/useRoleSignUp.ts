
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/context/auth/types";

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
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: selectedRole, // Store user role in metadata
          },
        },
      });
      
      if (signUpError) {
        setError(signUpError.message);
        toast.error(signUpError.message || "Failed to sign up");
        setIsSubmitting(false);
        return;
      }
      
      // Success!
      toast.success("Account created successfully! Redirecting to dashboard...");
      
      // Redirect based on role
      setTimeout(() => {
        redirectBasedOnRole(selectedRole, navigate);
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      toast.error(err.message || "Failed to sign up. Please try again.");
      console.error("Sign up error:", err);
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

// Helper function to redirect based on role
const redirectBasedOnRole = (role: UserRole, navigate: any) => {
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      navigate('/dashboard/artist');
      break;
    case 'salon':
    case 'owner':
      navigate('/dashboard/salon');
      break;
    case 'customer':
      navigate('/dashboard/customer');
      break;
    case 'supplier':
    case 'vendor':
    case 'beauty supplier':
      navigate('/dashboard/supplier');
      break;
    case 'freelancer':
      navigate('/dashboard/freelancer');
      break;
    case 'other':
    default:
      navigate('/dashboard/other');
  }
};
