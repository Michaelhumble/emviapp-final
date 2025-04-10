
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { BoostStatus } from "./useProfileBoost";
import { useAuth } from "@/context/auth";

export const useCreditRedemption = (
  credits: number,
  boostStatus: BoostStatus,
  refreshUser: () => Promise<boolean> 
) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
  const [redeemSuccess, setRedeemSuccess] = useState<Record<string, boolean>>({});

  const handleRedeemAction = async (
    rewardName: string,
    creditCost: number,
    rewardId: string
  ) => {
    if (credits < creditCost) {
      toast.error("You don't have enough credits for this reward");
      return;
    }

    if (isProcessing[rewardId]) return;

    // Set processing state
    setIsProcessing(prev => ({ ...prev, [rewardId]: true }));

    try {
      // Check for profile boost special case
      if (rewardId === "profileBoost") {
        if (boostStatus.isActive) {
          toast.error("You already have an active profile boost");
          setIsProcessing(prev => ({ ...prev, [rewardId]: false }));
          return;
        }
        
        await handleProfileBoost(creditCost);
      } else {
        // Handle other reward types here
        await handleGenericReward(creditCost, rewardName, rewardId);
      }
      
      // Update UI to show success
      setRedeemSuccess(prev => ({ ...prev, [rewardId]: true }));
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setRedeemSuccess(prev => ({ ...prev, [rewardId]: false }));
      }, 3000);
      
      // Refresh user profile to get updated credits
      try {
        await refreshUser();
      } catch (error) {
        console.error("Failed to refresh user profile:", error);
      }
      
    } catch (error) {
      console.error(`Error redeeming ${rewardName}:`, error);
      toast.error(`Failed to redeem ${rewardName}. Please try again.`);
    } finally {
      // Set processing state back to false
      setIsProcessing(prev => ({ ...prev, [rewardId]: false }));
    }
  };

  // Handle profile boost reward
  const handleProfileBoost = async (creditCost: number) => {
    if (!user) return;
    
    // Calculate 30 days from now for boost expiry
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    // First deduct credits
    const { error: creditError } = await supabase
      .from('users')
      .update({ 
        credits: credits - creditCost,
        boosted_until: thirtyDaysFromNow.toISOString() 
      })
      .eq('id', user.id);
    
    if (creditError) throw creditError;
    
    toast.success(`Profile boost activated for 30 days!`);
  };
  
  // Handle other generic rewards
  const handleGenericReward = async (creditCost: number, rewardName: string, rewardId: string) => {
    if (!user) return;
    
    // Deduct credits 
    const { error: creditError } = await supabase
      .from('users')
      .update({ credits: credits - creditCost })
      .eq('id', user.id);
    
    if (creditError) throw creditError;
    
    // Log the redemption in a separate table (if needed)
    const { error: logError } = await supabase
      .from('credit_earnings')
      .insert({
        user_id: user.id,
        amount: -creditCost,
        type: 'redemption',
        status: 'completed',
        metadata: { 
          reward_name: rewardName,
          reward_id: rewardId
        }
      });
    
    if (logError) {
      console.error("Failed to log redemption:", logError);
      // Non-critical error, don't throw
    }
    
    toast.success(`You've redeemed ${rewardName}!`);
  };

  return {
    isProcessing,
    redeemSuccess,
    handleRedeemAction
  };
};
