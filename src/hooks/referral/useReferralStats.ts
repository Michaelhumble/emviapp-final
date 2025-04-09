
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { ReferralStats } from '@/components/referral/types';

export const useReferralStats = () => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    completedReferrals: 0,
    pendingReferrals: 0,
    totalReferrals: 0,
    credits: 0,
    estimatedEarnings: 0
  });

  useEffect(() => {
    if (user) {
      fetchReferralStats();
    } else {
      setLoading(false);
    }
  }, [user, userProfile]);

  const fetchReferralStats = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // In a full implementation, this would fetch actual stats from the database
      // For now, we'll create mock stats based on the user profile
      const referralCount = userProfile?.referral_count || 0;
      const credits = userProfile?.credits || 0;
      
      // Calculate completed and pending referrals
      const completedReferrals = Math.min(referralCount, 3); // Mock data
      const pendingReferrals = Math.max(0, referralCount - completedReferrals);
      
      // Estimated earnings (mock calculation)
      const estimatedEarnings = completedReferrals * 10; // $10 per completed referral
      
      setReferralStats({
        completedReferrals,
        pendingReferrals,
        totalReferrals: completedReferrals + pendingReferrals,
        credits,
        estimatedEarnings
      });
    } catch (error) {
      console.error('Error fetching referral stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    referralStats
  };
};
