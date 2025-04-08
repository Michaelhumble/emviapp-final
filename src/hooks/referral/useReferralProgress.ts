
import { useState, useEffect } from 'react';
import { ReferralStats, ReferralProgress } from '@/components/referral/types';

export const useReferralProgress = (referralStats: ReferralStats) => {
  const [referralProgress, setReferralProgress] = useState<ReferralProgress>({
    percentage: 0,
    nextMilestoneIn: 5,
    currentTier: 0,
    nextTier: 1,
  });

  useEffect(() => {
    // Calculate referral progress and tiers
    const { completedReferrals, targetMilestone } = referralStats;
    
    const currentTier = Math.floor(completedReferrals / targetMilestone);
    const nextMilestoneIn = targetMilestone - (completedReferrals % targetMilestone);
    const percentage = ((completedReferrals % targetMilestone) / targetMilestone) * 100;
    
    setReferralProgress({
      percentage,
      nextMilestoneIn,
      currentTier,
      nextTier: currentTier + 1,
    });
  }, [referralStats]);

  return referralProgress;
};
