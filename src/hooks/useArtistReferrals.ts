
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface ReferralStats {
  referralCode: string;
  referralCount: number;
  creditsEarned: number;
  pendingReferrals: number;
}

export function useArtistReferrals() {
  const { user, userProfile } = useAuth();
  const [stats, setStats] = useState<ReferralStats>({
    referralCode: '',
    referralCount: 0,
    creditsEarned: 0,
    pendingReferrals: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user && userProfile) {
      fetchReferralStats();
    } else {
      setIsLoading(false);
    }
  }, [user, userProfile]);

  const fetchReferralStats = async () => {
    if (!user || !userProfile) return;

    setIsLoading(true);
    setError(null);

    try {
      // Get referral code from user profile
      const referralCode = userProfile.referral_code || '';

      if (!referralCode) {
        // If no referral code exists, try to generate one
        await generateReferralCode();
        setIsLoading(false);
        return;
      }

      // Count total referrals
      const { data: referralData, error: referralError } = await supabase
        .from('referrals')
        .select('id', { count: 'exact' })
        .eq('referrer_id', user.id);

      if (referralError) throw new Error(referralError.message);

      // Count pending referrals
      const { data: pendingData, error: pendingError } = await supabase
        .from('referrals')
        .select('id', { count: 'exact' })
        .eq('referrer_id', user.id)
        .eq('status', 'pending');

      if (pendingError) throw new Error(pendingError.message);

      // Sum up credits earned from referrals
      const { data: creditsData, error: creditsError } = await supabase
        .from('customer_credits')
        .select('value')
        .eq('user_id', user.id)
        .eq('action_type', 'referral');

      if (creditsError) throw new Error(creditsError.message);

      const creditsEarned = creditsData?.reduce((sum, item) => sum + item.value, 0) || 0;

      setStats({
        referralCode,
        referralCount: referralData?.length || 0,
        creditsEarned,
        pendingReferrals: pendingData?.length || 0
      });
    } catch (err) {
      console.error('Error fetching referral stats:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch referral stats'));
    } finally {
      setIsLoading(false);
    }
  };

  const generateReferralCode = async () => {
    if (!user) return;

    try {
      // Call the database function to generate a referral code
      const { data: functionData, error: functionError } = await supabase
        .rpc('generate_referral_code', { user_id: user.id });

      if (functionError) throw new Error(functionError.message);

      // Refresh data to get the new referral code
      fetchReferralStats();
      return true;
    } catch (err) {
      console.error('Error generating referral code:', err);
      toast.error('Failed to generate referral code');
      return false;
    }
  };

  const copyReferralLink = () => {
    if (!stats.referralCode) {
      toast.error('No referral code available');
      return false;
    }

    try {
      const referralLink = `${window.location.origin}/join?ref=${stats.referralCode}`;
      navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied to clipboard!');
      return true;
    } catch (err) {
      console.error('Error copying referral link:', err);
      toast.error('Failed to copy referral link');
      return false;
    }
  };

  return {
    stats,
    isLoading,
    error,
    copyReferralLink,
    generateReferralCode,
    refreshStats: fetchReferralStats
  };
}
