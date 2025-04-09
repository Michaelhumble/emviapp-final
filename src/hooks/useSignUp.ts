
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/context/auth/types";

export const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { signUp, user, isNewUser, clearIsNewUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const refFromUrl = searchParams.get('ref');
    if (refFromUrl) {
      setReferralCode(refFromUrl);
      console.log('Referral code detected:', refFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    console.log("Auth state in useSignUp:", { user, isNewUser, showRoleModal, selectedRole });
    
    if (user && isNewUser) {
      console.log("New user detected, redirecting to role selection");
      navigate("/choose-role");
    }
    
    if (user && !isNewUser && !showRoleModal) {
      console.log("User already has role, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [user, isNewUser, navigate, showRoleModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Make sure we don't have a role selected here since this is a general sign-up form
      // The role will be selected in the RoleSelectionModal
      const signUpResponse = await signUp(email, password, null); // Explicitly pass null to avoid any default role
      
      if (signUpResponse.error) {
        toast.error(signUpResponse.error.message || "Failed to sign up");
        setIsSubmitting(false);
        return;
      }
      
      console.log("Sign up successful, user created");
      
      if (referralCode && signUpResponse.data?.user?.id) {
        try {
          const { error: rpcError } = await supabase.rpc('process_referral', {
            referral_code: referralCode,
            new_user_id: signUpResponse.data.user.id
          });
          
          if (rpcError) {
            console.error('Error processing referral:', rpcError);
          } else {
            console.log('Referral processed successfully');
          }
          
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
      setShowRoleModal(true);
      
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
      clearIsNewUser();
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    console.log(`Selected role: ${role}`);
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
    selectedRole,
    handleRoleSelect,
    handleSubmit,
    handleRoleModalClose,
    user
  };
};
