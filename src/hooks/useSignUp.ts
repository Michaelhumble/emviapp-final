
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const { signUp, user, isNewUser, clearIsNewUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check URL for referral code
  useEffect(() => {
    const refFromUrl = searchParams.get('ref');
    if (refFromUrl) {
      setReferralCode(refFromUrl);
      console.log('Referral code detected:', refFromUrl);
    }
  }, [searchParams]);

  // Redirect based on auth state
  useEffect(() => {
    // If signed in and role selection completed (not a new user)
    if (user && !isNewUser) {
      navigate("/dashboard");
    }
    
    // If signed in but needs to select role (new user)
    if (user && isNewUser) {
      setShowRoleModal(true);
    }
  }, [user, isNewUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Sign up the user
      const signUpResponse = await signUp(email, password);
      
      if (signUpResponse.error) {
        toast.error(signUpResponse.error.message || "Failed to sign up");
        return;
      }
      
      // If there's a referral code, process it
      if (referralCode && signUpResponse.data?.user?.id) {
        try {
          // Option 1: Use custom RPC function
          const { error: rpcError } = await supabase.rpc('process_referral', {
            referral_code: referralCode,
            new_user_id: signUpResponse.data.user.id
          });
          
          if (rpcError) {
            console.error('Error processing referral:', rpcError);
          } else {
            console.log('Referral processed successfully');
          }
          
          // Option 2: Direct update approach (if RPC fails)
          if (rpcError) {
            const { error: updateError } = await supabase
              .from('users')
              .update({ referred_by: referralCode })
              .eq('id', signUpResponse.data.user.id);
              
            if (updateError) {
              console.error('Error updating referral data:', updateError);
            }
          }
        } catch (refErr) {
          console.error('Unexpected error processing referral:', refErr);
        }
      }
      
      toast.success("Account created successfully!");
      
      // Show role selection modal - auth state changes will handle showing the modal
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
      console.error("Sign up error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleModalClose = (open: boolean) => {
    setShowRoleModal(open);
    if (!open) {
      // Clear new user flag when role modal is manually closed
      clearIsNewUser();
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    referralCode,
    showRoleModal,
    setShowRoleModal,
    handleSubmit,
    handleRoleModalClose,
    user
  };
};
