
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { format } from "date-fns";
import { BoostStatus } from "./types";

export const useCreditRedemption = (
  credits: number, 
  boostStatus: BoostStatus, 
  setBoostStatus: React.Dispatch<React.SetStateAction<BoostStatus>>,
  refreshUserProfile: () => Promise<void>
) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState<{ [key: string]: boolean }>({
    profileBoost: false,
    jobPost: false,
    marketplace: false
  });
  const [redeemSuccess, setRedeemSuccess] = useState<{ [key: string]: boolean }>({
    profileBoost: false,
    jobPost: false,
    marketplace: false
  });

  // Reset success state after a delay
  const resetSuccessState = (actionType: string) => {
    setTimeout(() => {
      setRedeemSuccess(prev => ({ ...prev, [actionType]: false }));
    }, 5000);
  };

  const handleRedeemAction = async (action: string, requiredCredits: number, actionType: string) => {
    if (!user) {
      toast.error("You must be logged in to redeem credits");
      return;
    }

    // Check if user has enough credits
    if (credits < requiredCredits) {
      toast.error(`You need ${requiredCredits} credits to use this feature. You currently have ${credits}.`);
      return;
    }

    // Set processing state
    setIsProcessing(prev => ({ ...prev, [actionType]: true }));

    try {
      // Calculate boost expiry date (7 days from now) if it's a profile boost
      const boostUpdate = actionType === 'profileBoost' 
        ? { boosted_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() }
        : {};

      // Update the user's credits in Supabase
      const { error } = await supabase
        .from('users')
        .update({ 
          credits: credits - requiredCredits,
          ...boostUpdate
        })
        .eq('id', user.id);

      if (error) {
        console.error("Error updating credits:", error);
        toast.error("Failed to redeem credits. Please try again.");
        return;
      }

      // Set success state and reset after delay
      setRedeemSuccess(prev => ({ ...prev, [actionType]: true }));
      resetSuccessState(actionType);
      
      // If it's a profile boost, update the local boost status
      if (actionType === 'profileBoost') {
        const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
        setBoostStatus({
          isActive: true,
          expiresAt: expiryDate
        });
        
        toast.success("✅ Boost Activated! You'll appear in top results for 7 days.", {
          description: `Your profile is now boosted until ${format(new Date(expiryDate), 'MMM dd, yyyy')}`
        });
      } else {
        toast.success(`Successfully redeemed ${requiredCredits} credits for ${action}!`, {
          description: `Your new balance is ${credits - requiredCredits} credits.`
        });
      }
      
      // Refresh user profile to get updated credit balance
      await refreshUserProfile();
    } catch (err) {
      console.error("Unexpected error during redemption:", err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsProcessing(prev => ({ ...prev, [actionType]: false }));
    }
  };

  return {
    isProcessing,
    redeemSuccess,
    handleRedeemAction
  };
};
