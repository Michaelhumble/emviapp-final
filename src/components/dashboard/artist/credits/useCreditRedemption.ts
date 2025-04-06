
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { CreditRedemptionHook, RedeemActions } from "./types";

export const useCreditRedemption = (): CreditRedemptionHook => {
  const { userProfile, updateUserProfile } = useAuth();
  const [isProcessing, setIsProcessing] = useState<RedeemActions>({});
  const [redeemSuccess, setRedeemSuccess] = useState<RedeemActions>({});

  const isRedeeming = (action: string): boolean => {
    return isProcessing[action] || false;
  };

  const redeemCredits = async (
    action: string, 
    creditAmount: number, 
    days: number = 0, 
    actionType: string
  ): Promise<boolean> => {
    if (!userProfile) {
      toast.error("You need to be logged in to redeem credits");
      return false;
    }

    const currentCredits = userProfile.credits || 0;
    
    if (currentCredits < creditAmount) {
      toast.error("You don't have enough credits for this action");
      return false;
    }

    try {
      // Update user profile with reduced credits
      const updatedProfile = await updateUserProfile({
        credits: currentCredits - creditAmount
      });

      if (updatedProfile) {
        // Record the successful transaction
        console.log(`Redeemed ${creditAmount} credits for ${actionType}`);
        return true;
      } else {
        toast.error("Failed to update your credits");
        return false;
      }
    } catch (error) {
      console.error("Error redeeming credits:", error);
      toast.error("An error occurred while redeeming credits");
      return false;
    }
  };

  // Main handler for redeeming actions
  const handleRedeemAction = async (
    action: string, 
    requiredCredits: number, 
    actionType: string
  ): Promise<void> => {
    setIsProcessing(prev => ({ ...prev, [action]: true }));
    setRedeemSuccess(prev => ({ ...prev, [action]: false }));
    
    try {
      const success = await redeemCredits(action, requiredCredits, 0, actionType);
      
      if (success) {
        setRedeemSuccess(prev => ({ ...prev, [action]: true }));
        toast.success(`Successfully redeemed ${requiredCredits} credits for ${actionType}`);
      }
    } catch (error) {
      console.error(`Error redeeming ${action}:`, error);
      toast.error(`Failed to redeem credits for ${actionType}`);
    } finally {
      setIsProcessing(prev => ({ ...prev, [action]: false }));
    }
  };

  return {
    isProcessing,
    redeemSuccess,
    handleRedeemAction,
    redeemCredits,
    isRedeeming
  };
};
