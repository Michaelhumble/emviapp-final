
import { useState, useEffect } from 'react';
import { ReferralStats, ReferralProgress, ReferralReward } from '@/components/referral/types';

export const useReferralProgress = (referralStats: ReferralStats | undefined) => {
  const [progress, setProgress] = useState<ReferralProgress>({
    level: 1,
    currentMilestone: 0,
    nextMilestone: 5,
    nextMilestoneIn: 5,
    percentage: 0,
    rewards: []
  });

  useEffect(() => {
    if (!referralStats) return;

    const completedReferrals = referralStats.completedReferrals || 0;
    
    // Define milestones
    const milestones = [0, 5, 10, 25, 50, 100];
    
    // Determine current level based on completed referrals
    let currentLevel = 1;
    let currentMilestone = 0;
    let nextMilestone = milestones[1];
    
    for (let i = 1; i < milestones.length; i++) {
      if (completedReferrals >= milestones[i]) {
        currentLevel = i + 1;
        currentMilestone = milestones[i];
        nextMilestone = milestones[i + 1] || milestones[i] * 2;
      } else {
        nextMilestone = milestones[i];
        break;
      }
    }
    
    // Calculate percentage and next milestone
    const nextMilestoneIn = nextMilestone - completedReferrals;
    const percentage = Math.min(100, (completedReferrals / nextMilestone) * 100);
    
    // Define rewards for each level
    const rewards: ReferralReward[] = [
      { level: 1, milestone: 5, reward: "50 Credits", achieved: completedReferrals >= 5 },
      { level: 2, milestone: 10, reward: "100 Credits", achieved: completedReferrals >= 10 },
      { level: 3, milestone: 25, reward: "250 Credits + 1 Month Pro", achieved: completedReferrals >= 25 },
      { level: 4, milestone: 50, reward: "500 Credits + 3 Months Pro", achieved: completedReferrals >= 50 },
      { level: 5, milestone: 100, reward: "1000 Credits + 1 Year Pro", achieved: completedReferrals >= 100 }
    ];
    
    setProgress({
      level: currentLevel,
      currentMilestone,
      nextMilestone,
      nextMilestoneIn,
      percentage,
      rewards
    });
  }, [referralStats]);

  return progress;
};
