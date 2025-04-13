
import { useMemo } from 'react';
import { ReferralStats, ReferralProgress } from '@/components/referral/types';

export const useReferralProgress = (referralStats: ReferralStats | undefined) => {
  return useMemo(() => {
    if (!referralStats) {
      return {
        percentage: 0,
        nextMilestone: 5,
        nextMilestoneIn: 5,
        level: 0
      };
    }

    const { completedReferrals } = referralStats;
    let nextMilestone = 5;
    let level = 0;

    // Define milestones
    if (completedReferrals < 5) {
      nextMilestone = 5;
      level = 0;
    } else if (completedReferrals < 10) {
      nextMilestone = 10;
      level = 1;
    } else if (completedReferrals < 25) {
      nextMilestone = 25;
      level = 2;
    } else if (completedReferrals < 50) {
      nextMilestone = 50;
      level = 3;
    } else {
      nextMilestone = 100;
      level = 4;
    }

    const nextMilestoneIn = nextMilestone - completedReferrals;
    const percentage = (completedReferrals / nextMilestone) * 100;

    return {
      percentage,
      nextMilestone,
      nextMilestoneIn,
      level
    };
  }, [referralStats]);
};
