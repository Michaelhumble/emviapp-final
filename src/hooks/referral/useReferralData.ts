
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
          setReferralLink(`https://emvi.app/join?ref=${code}`);
        }
        
        // Fetch referrals
        if (user.id) {
          // Query referrals data
          const { data, error } = await supabase
            .from('referrals')
            .select(`
              id,
              referred_id,
              created_at,
              status,
              verified_at
            `)
            .eq('referrer_id', user.id)
            .order('created_at', { ascending: false });
            
          if (!error && data) {
            // For each referral, fetch the user data separately
            const formattedReferrals: Referral[] = await Promise.all(
              data.map(async (item) => {
                // Fetch the user data for the referred user
                const { data: userData, error: userError } = await supabase
                  .from('users')
                  .select('full_name, email')
                  .eq('id', item.referred_id)
                  .single();
                
                return {
                  id: item.id,
                  referredId: item.referred_id,
                  referredName: userData?.full_name || 'Unknown User',
                  status: item.status === 'completed' ? 'completed' : 'pending',
                  createdAt: item.created_at,
                  completedAt: item.verified_at || undefined
                };
              })
            );
            
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
