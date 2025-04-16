
import { useState, useEffect } from 'react';

// Define the types for our referral system
interface ReferralStats {
  completedReferrals: number;
  pendingReferrals: number;
  earnedCredits: number;
}

interface ReferralProgress {
  percentage: number;
  nextMilestone: number;
  nextMilestoneIn: number;
  level: number;
}

export const useReferralSystem = () => {
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    completedReferrals: 3,
    pendingReferrals: 2,
    earnedCredits: 45
  });

  const [referralProgress, setReferralProgress] = useState<ReferralProgress>({
    percentage: 60,
    nextMilestone: 5,
    nextMilestoneIn: 2,
    level: 1
  });

  // In a real app, we would fetch this data from an API
  useEffect(() => {
    // Mock API call
    const fetchReferralData = () => {
      // This would be replaced with actual API calls
      console.log('Fetching referral data...');
      
      // We're just using the default values for now
    };

    fetchReferralData();
  }, []);

  return {
    referralStats,
    referralProgress
  };
};
