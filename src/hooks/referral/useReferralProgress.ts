
import { ReferralStats, ReferralProgress } from '@/components/referral/types';

export const useReferralProgress = (stats: ReferralStats): ReferralProgress => {
  // Define milestones
  const milestones = [3, 5, 10, 25, 50, 100];
  
  // Find next milestone
  let nextMilestone = milestones[0];
  let level = 0;
  
  for (let i = 0; i < milestones.length; i++) {
    if (stats.completedReferrals < milestones[i]) {
      nextMilestone = milestones[i];
      level = i;
      break;
    }
    
    // If we've reached the last milestone
    if (i === milestones.length - 1) {
      nextMilestone = milestones[i] + 50; // Add a new milestone
      level = i + 1;
    }
  }
  
  // Calculate how many more referrals needed
  const nextMilestoneIn = Math.max(0, nextMilestone - stats.completedReferrals);
  
  // Calculate percentage toward next milestone
  let percentage = 0;
  if (level === 0) {
    percentage = (stats.completedReferrals / nextMilestone) * 100;
  } else {
    const prevMilestone = milestones[level - 1];
    const range = nextMilestone - prevMilestone;
    const progress = stats.completedReferrals - prevMilestone;
    percentage = (progress / range) * 100;
  }
  
  return {
    percentage: Math.min(100, Math.round(percentage)),
    nextMilestone,
    nextMilestoneIn,
    level
  };
};
