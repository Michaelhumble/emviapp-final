
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ReferralStats {
  completedReferrals: number;
  credits: number;
}

export const useReferralSystem = () => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    completedReferrals: 0,
    credits: 0
  });
  const [nextMilestone, setNextMilestone] = useState<number | null>(null);

  // Generate referral link using user's referral code
  const referralLink = userProfile?.referral_code 
    ? `${window.location.origin}/signup?ref=${userProfile.referral_code}`
    : '';

  useEffect(() => {
    if (!user) return;
    fetchReferralStats();
  }, [user]);

  const fetchReferralStats = async () => {
    try {
      setLoading(true);
      const { data: userData, error } = await supabase
        .from('users')
        .select('referral_count, credits')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      // Get next milestone
      const { data: milestoneData } = await supabase
        .rpc('get_next_referral_milestone', { 
          current_count: userData?.referral_count || 0 
        });

      setNextMilestone(milestoneData);
      setReferralStats({
        completedReferrals: userData?.referral_count || 0,
        credits: userData?.credits || 0
      });
    } catch (err) {
      console.error('Error fetching referral stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = async () => {
    if (!referralLink) return;
    
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return {
    loading,
    referralStats,
    referralLink,
    nextMilestone,
    copyReferralLink
  };
};
