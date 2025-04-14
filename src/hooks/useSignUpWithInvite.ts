
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useSignUpWithInvite = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Extract salon ID from URL if present
  const urlParams = new URLSearchParams(window.location.search);
  const salonId = urlParams.get('salon_id');
  const invitedRole = urlParams.get('role') || 'artist';
  
  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      setError("Please fill out all fields");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: invitedRole || 'artist'
          }
        }
      });
      
      if (signUpError) {
        throw signUpError;
      }
      
      if (!data.user) {
        throw new Error("Failed to create user account");
      }
      
      // If this was an invite with a salon_id, link the user to the salon
      if (salonId) {
        const { error: linkError } = await supabase
          .from('user_salon_access')
          .insert({
            user_id: data.user.id,
            salon_id: salonId,
            access_type: invitedRole
          });
          
        if (linkError) {
          console.error("Error linking user to salon:", linkError);
          // Don't throw here, we want the sign-up to still work
          toast.error("There was an issue linking you to the salon, but your account was created successfully.");
        } else {
          toast.success("Your account has been created and linked to the salon!");
        }
      } else {
        toast.success("Your account has been created successfully!");
      }
      
      // Redirect to the appropriate dashboard
      setTimeout(() => {
        if (invitedRole === 'artist') {
          navigate('/dashboard/artist');
        } else if (invitedRole === 'manager') {
          navigate('/dashboard/manager');
        } else {
          navigate('/dashboard');
        }
      }, 1500);
      
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };
  
  return {
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    loading,
    error,
    handleSignUp,
    isInvite: !!salonId,
    salonId,
    invitedRole
  };
};
