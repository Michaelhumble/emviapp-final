
import { useMemo } from 'react';
import { ReferralStats, ReferralProgress } from '@/components/referral/types';

export const useReferralProgress = (stats: ReferralStats): ReferralProgress => {
  return useMemo(() => {
    // Define milestones
    const milestones = [3, 5, 10, 25, 50, 100];
    
    // Find next milestone
    const currentCount = stats.completedReferrals;
    let nextMilestone = milestones[0];
    
    for (const milestone of milestones) {
      if (milestone > currentCount) {
        nextMilestone = milestone;
        break;
      }
    }
    
    // If we've passed all milestones, use the last one
    if (currentCount >= milestones[milestones.length - 1]) {
      nextMilestone = milestones[milestones.length - 1] + 50; // Add another milestone
    }
    
    // Calculate progress
    const prevMilestone = nextMilestone === milestones[0] ? 0 : 
      milestones[milestones.indexOf(nextMilestone) - 1] || 0;
    
    // Calculate percentage (from previous milestone to next)
    const range = nextMilestone - prevMilestone;
    const position = currentCount - prevMilestone;
    const percentage = Math.min(Math.floor((position / range) * 100), 100);
    
    // Calculate how many more referrals needed for next milestone
    const nextMilestoneIn = nextMilestone - currentCount;
    
    return {
      percentage,
      nextMilestone,
      nextMilestoneIn
    };
  }, [stats.completedReferrals]);
};
