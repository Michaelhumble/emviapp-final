
import { useState, useEffect } from 'react';

// Define the types for our referral system
interface ReferralStats {
  completedReferrals: number;
  pendingReferrals: number;
  earnedCredits: number;
  credits?: number;
  estimatedEarnings?: number;
  totalReferrals?: number;
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
    earnedCredits: 45,
    credits: 45,
    estimatedEarnings: 150
  });

  const [referralProgress, setReferralProgress] = useState<ReferralProgress>({
    percentage: 60,
    nextMilestone: 5,
    nextMilestoneIn: 2,
    level: 1
  });

  const [loading, setLoading] = useState(true);
  const [referralCode] = useState('EMVI123');
  const [referralLink] = useState('https://emvi.app/join?ref=EMVI123');
  const [copied, setCopied] = useState(false);

  // In a real app, we would fetch this data from an API
  useEffect(() => {
    const fetchReferralData = () => {
      console.log('Fetching referral data...');
      // Mock API call completed
      setLoading(false);
    };

    fetchReferralData();
  }, []);

  const getMotivationalMessage = (language = 'English') => {
    const isVietnamese = language.toLowerCase() === 'vietnamese';
    return isVietnamese 
      ? 'Tiếp tục giới thiệu để nhận thêm phần thưởng!'
      : 'Keep referring to earn more rewards!';
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return {
    loading,
    referralCode,
    referralLink,
    referralStats,
    referralProgress,
    getMotivationalMessage,
    referrals: [], // Empty array to satisfy type requirements
    copied,
    copyReferralLink
  };
};
