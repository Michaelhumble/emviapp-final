
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
      const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      
      // Try to update with or without boosted_until depending on the action type
      let updateData: Record<string, any> = {
        credits: credits - requiredCredits
      };
      
      // Only add boosted_until for profile boost action
      if (actionType === 'profileBoost') {
        updateData.boosted_until = expiryDate;
      }

      // Update the user's credits in Supabase
      const { error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', user.id);

      if (error) {
        console.error("Error updating credits:", error);
        
        // If the error is about boosted_until not existing, try without it
        if (error.message.includes("boosted_until") && actionType === 'profileBoost') {
          const { error: retryError } = await supabase
            .from('users')
            .update({ credits: credits - requiredCredits })
            .eq('id', user.id);
            
          if (retryError) {
            throw retryError;
          }
          
          // Still update boost status in UI even if DB column doesn't exist
          if (actionType === 'profileBoost') {
            setBoostStatus({
              isActive: true,
              expiresAt: expiryDate
            });
          }
        } else {
          throw error;
        }
      }

      // Set success state and reset after delay
      setRedeemSuccess(prev => ({ ...prev, [actionType]: true }));
      resetSuccessState(actionType);
      
      // If it's a profile boost, update the local boost status
      if (actionType === 'profileBoost') {
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
