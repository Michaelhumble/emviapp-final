
import { ReferralStats, ReferralProgress } from '@/components/referral/types';

// Define milestone levels
const MILESTONES = [
  { level: 1, count: 0 },
  { level: 2, count: 3 },
  { level: 3, count: 5 },
  { level: 4, count: 10 },
  { level: 5, count: 25 },
  { level: 6, count: 50 }
];

// Define rewards for each milestone
const MILESTONE_REWARDS = [
  { level: 1, milestone: 0, reward: 'Basic Profile', achieved: true },
  { level: 2, milestone: 3, reward: 'Community Builder Badge', achieved: false },
  { level: 3, milestone: 5, reward: 'Emvi Ambassador Badge', achieved: false },
  { level: 4, milestone: 10, reward: 'Featured Artist Boost', achieved: false },
  { level: 5, milestone: 25, reward: 'Premium Profile Features', achieved: false },
  { level: 6, milestone: 50, reward: 'Elite Status Benefits', achieved: false }
];

export const useReferralProgress = (referralStats: ReferralStats): ReferralProgress => {
  const totalReferrals = referralStats.completedReferrals;
  
  // Find current level
  let currentLevel = 1;
  let currentMilestone = 0;
  let nextMilestone = 3; // Default first milestone
  
  for (let i = MILESTONES.length - 1; i >= 0; i--) {
    if (totalReferrals >= MILESTONES[i].count) {
      currentLevel = MILESTONES[i].level;
      currentMilestone = MILESTONES[i].count;
      
      // Find next milestone
      if (i < MILESTONES.length - 1) {
        nextMilestone = MILESTONES[i + 1].count;
      } else {
        nextMilestone = currentMilestone; // Already at max level
      }
      
      break;
    }
  }
  
  // Calculate progress percentage to next level
  const nextMilestoneIn = nextMilestone - totalReferrals;
  const milestoneRange = nextMilestone - currentMilestone;
  const progressInLevel = totalReferrals - currentMilestone;
  const percentage = milestoneRange === 0 ? 100 : (progressInLevel / milestoneRange) * 100;
  
  // Update achievement status for rewards
  const updatedRewards = MILESTONE_REWARDS.map(reward => ({
    ...reward,
    achieved: totalReferrals >= reward.milestone
  }));
  
  return {
    level: currentLevel,
    currentMilestone,
    nextMilestone,
    nextMilestoneIn,
    percentage,
    rewards: updatedRewards
  };
};
