
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useReferralProgress } from './referral/useReferralProgress';
import { useReferralStats } from './referral/useReferralStats';
import { useReferralData } from './referral/useReferralData';
import { useReferralUtils } from './referral/useReferralUtils';
import { ReferralStats, ReferralProgress, Referral } from '@/components/referral/types';

export const useReferralSystem = () => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    completedReferrals: 0,
    pendingReferrals: 0, 
    totalReferrals: 0,
    credits: 0,
    estimatedEarnings: 0
  });
  const [nextMilestone, setNextMilestone] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  // Generate referral code and link using user's referral code
  const referralCode = userProfile?.referral_code || '';
  const referralLink = userProfile?.referral_code 
    ? `${window.location.origin}/signup?ref=${userProfile.referral_code}`
    : '';

  // Get referral progress data
  const referralProgress = useReferralProgress(referralStats);
  
  // Get motivational messages
  const { getMotivationalMessage } = useReferralUtils();

  useEffect(() => {
    if (!user) return;
    fetchReferralStats();
    fetchReferrals();
  }, [user]);

  const fetchReferralStats = async () => {
    try {
      setLoading(true);
      const { data: userData, error } = await supabase
        .from('users')
        .select('referral_count, credits')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching referral stats:', error);
        return;
      }

      // Get next milestone safely - ensure we have a number for current_count
      const currentCount = userData?.referral_count !== undefined ? 
        Number(userData.referral_count) : 0;
      
      const { data: milestoneData } = await supabase
        .rpc('get_next_referral_milestone', { 
          current_count: currentCount 
        });

      setNextMilestone(milestoneData);
      
      // Safely extract referral count and credits with fallback, ensuring they're numbers
      const referralCount = userData?.referral_count !== undefined ? 
        Number(userData.referral_count) : 0;
      const credits = userData?.credits !== undefined ? 
        Number(userData.credits) : 0;
      
      // Calculate completed and pending referrals (for demo)
      const completedReferrals = referralCount;
      const pendingReferrals = Math.max(0, Math.floor(referralCount * 0.2)); // Simulated value
      
      setReferralStats({
        completedReferrals,
        pendingReferrals,
        totalReferrals: completedReferrals + pendingReferrals,
        credits,
        estimatedEarnings: completedReferrals * 10 // $10 per completed referral
      });
    } catch (err) {
      console.error('Error fetching referral stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReferrals = async () => {
    try {
      if (!user?.id) return;
      
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching referrals:', error);
        return;
      }
      
      // Transform data into Referral type with explicit type casting for status
      const formattedReferrals: Referral[] = data.map(item => ({
        id: item.id,
        referredId: item.referred_id,
        referredName: `User ${item.referred_id.substring(0, 4)}`, // Placeholder name
        status: item.status === 'completed' ? 'completed' : 'pending',
        createdAt: item.created_at,
        completedAt: item.verified_at
      }));
      
      setReferrals(formattedReferrals);
    } catch (err) {
      console.error('Error fetching referrals:', err);
    }
  };

  const copyReferralLink = async () => {
    if (!referralLink) return;
    
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return {
    loading,
    referralStats,
    referralLink,
    referralCode,
    nextMilestone,
    referralProgress,
    referrals,
    copied,
    copyReferralLink,
    getMotivationalMessage
  };
};
