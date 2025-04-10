
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Referral } from '@/components/referral/types';

export const useReferralData = () => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState('');
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadReferralData = async () => {
      setLoading(true);
      
      try {
        // Get user's referral code
        const code = userProfile?.referral_code;
        setReferralCode(code || null);
        
        // Create referral link
        if (code) {
          setReferralLink(`https://emviapp.com/join?ref=${code}`);
        }
        
        // Fetch referrals
        if (user.id) {
          const { data, error } = await supabase
            .from('referrals')
            .select(`
              id,
              referred_id,
              created_at,
              status,
              verified_at,
              users:referred_id(full_name, email)
            `)
            .eq('referrer_id', user.id)
            .order('created_at', { ascending: false });
            
          if (!error && data) {
            const formattedReferrals: Referral[] = data.map(item => ({
              id: item.id,
              referredId: item.referred_id,
              referredName: item.users?.full_name || 'Unknown User',
              status: item.status === 'completed' ? 'completed' : 'pending',
              createdAt: item.created_at,
              completedAt: item.verified_at || undefined
            }));
            
            setReferrals(formattedReferrals);
          }
        }
      } catch (err) {
        console.error("Error loading referral data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadReferralData();
  }, [user, userProfile]);

  return {
    loading,
    referralCode,
    referralLink,
    referrals
  };
};
