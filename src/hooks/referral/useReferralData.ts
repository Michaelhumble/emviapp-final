
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { ReferralData } from '@/components/referral/types';

export const useReferralData = () => {
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralLink, setReferralLink] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<ReferralData[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    
    const fetchReferralData = async () => {
      setLoading(true);
      
      try {
        // Fetch user's referral code
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('referral_code, credits')
          .eq('id', user.id)
          .single();
          
        if (userError) {
          console.error('Error fetching user referral code:', userError);
          setLoading(false);
          return;
        }
        
        const code = userData.referral_code || `EMVI${user.id.substring(0, 6)}`;
        setReferralCode(code);
        setReferralLink(`https://emviapp.com/signup?ref=${code}`);
        
        // Fetch referrals data
        const { data: referralsData, error: referralsError } = await supabase
          .from('referrals')
          .select(`
            id,
            referred_id,
            status,
            milestone_reached,
            milestone_type,
            created_at,
            verified_at,
            users!referred_id(full_name, email)
          `)
          .eq('referrer_id', user.id)
          .order('created_at', { ascending: false });
          
        if (referralsError) {
          console.error('Error fetching referrals:', referralsError);
          setLoading(false);
          return;
        }
        
        const processedReferrals: ReferralData[] = (referralsData || []).map((ref: any) => ({
          id: ref.id || '',
          referredEmail: ref.users?.email || 'hidden@email.com',
          referredName: ref.users?.full_name || 'New User',
          status: ref.status || 'pending',
          milestoneReached: ref.milestone_reached || false,
          milestoneType: ref.milestone_type || undefined,
          createdAt: ref.created_at || new Date().toISOString(),
          verifiedAt: ref.verified_at || undefined,
        }));
        
        setReferrals(processedReferrals);
      } catch (error) {
        console.error('Error in fetchReferralData:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReferralData();
    
    // Set up real-time subscription for referral updates
    const channel = supabase
      .channel('referral-updates')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'referrals',
        filter: `referrer_id=eq.${user.id}`,
      }, () => {
        fetchReferralData();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return {
    loading,
    referralCode,
    referralLink,
    referrals
  };
};
