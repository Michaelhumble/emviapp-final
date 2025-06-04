
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useReferralStatsDb } from "@/hooks/useReferralStatsDb";
import { Gift, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

const MysteryRewardClaim = () => {
  const { user, userProfile } = useAuth();
  const { creditsEarned } = useReferralStatsDb();
  const [hasUnclaimedReward, setHasUnclaimedReward] = useState(false);
  const [isClaimingReward, setIsClaimingReward] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check for unclaimed rewards based on user activity
    if (user && userProfile) {
      const lastLoginDate = new Date(userProfile.created_at || '').getTime();
      const daysSinceJoin = Math.floor((Date.now() - lastLoginDate) / (1000 * 60 * 60 * 24));
      
      // Show mystery reward if:
      // - User has been active for 3+ days
      // - Has earned some credits
      // - Random chance (30%)
      const shouldShowReward = daysSinceJoin >= 3 && 
                              creditsEarned >= 5 && 
                              Math.random() > 0.7 &&
                              !localStorage.getItem(`mystery_reward_claimed_${user.id}`);
      
      setHasUnclaimedReward(shouldShowReward);
    }
  }, [user, userProfile, creditsEarned]);

  const handleClaimReward = async () => {
    if (!user) return;
    
    setIsClaimingReward(true);
    
    // Simulate claiming reward
    setTimeout(() => {
      const rewardAmount = Math.floor(Math.random() * 15) + 5; // 5-20 credits
      toast.success(`🎉 You claimed ${rewardAmount} mystery credits!`);
      
      // Mark as claimed
      localStorage.setItem(`mystery_reward_claimed_${user.id}`, 'true');
      setHasUnclaimedReward(false);
      setIsClaimingReward(false);
    }, 1500);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    // Hide for 24 hours
    localStorage.setItem(`mystery_reward_dismissed_${user?.id}`, Date.now().toString());
  };

  // Don't render if no unclaimed reward or dismissed
  if (!hasUnclaimedReward || isDismissed) {
    return null;
  }

  // Check if dismissed in last 24 hours
  const dismissedTime = localStorage.getItem(`mystery_reward_dismissed_${user?.id}`);
  if (dismissedTime && Date.now() - parseInt(dismissedTime) < 24 * 60 * 60 * 1000) {
    return null;
  }

  return (
    <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="relative">
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <X className="h-3 w-3 text-gray-500" />
        </button>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative">
            <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-pulse">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 p-1 bg-yellow-400 rounded-full">
              <Sparkles className="h-2 w-2 text-yellow-800" />
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm">Mystery Reward Available!</h4>
            <p className="text-xs text-gray-600">You've earned a surprise bonus 🎁</p>
          </div>
        </div>

        <div className="text-center mb-3">
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
            <Sparkles className="h-3 w-3 text-purple-600 mr-1" />
            <span className="text-xs font-medium text-purple-700">
              5-20 Credits Inside
            </span>
          </div>
        </div>

        <Button 
          onClick={handleClaimReward}
          disabled={isClaimingReward}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          size="sm"
        >
          {isClaimingReward ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Opening...
            </>
          ) : (
            <>
              <Gift className="h-4 w-4 mr-2" />
              Claim Mystery Reward
            </>
          )}
        </Button>

        <p className="text-center text-xs text-gray-500 mt-2">
          ✨ Limited time offer
        </p>
      </div>
    </div>
  );
};

export default MysteryRewardClaim;
