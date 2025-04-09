
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Referral } from '@/components/referral/types';

export const useReferralData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string>('');
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    if (user) {
      fetchReferralData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchReferralData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Fetch user's referral code
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('referral_code')
        .eq('id', user.id)
        .single();
      
      if (userError) throw userError;
      
      const referralCode = userData?.referral_code || null;
      setReferralCode(referralCode);
      
      // Create referral link
      const baseUrl = window.location.origin;
      setReferralLink(referralCode ? `${baseUrl}/join?ref=${referralCode}` : `${baseUrl}/join`);
      
      // Fetch referrals
      // In a full implementation, this would fetch actual referrals from the database
      // For now, we'll use mock data
      const mockReferrals: Referral[] = [
        {
          id: '1',
          referredId: 'user1',
          referredName: 'Jennifer Tran',
          status: 'completed',
          createdAt: '2025-03-01T12:00:00Z',
          completedAt: '2025-03-03T15:30:00Z',
          reward: 20
        },
        {
          id: '2',
          referredId: 'user2',
          referredName: 'Mike Lee',
          status: 'completed',
          createdAt: '2025-03-10T09:15:00Z',
          completedAt: '2025-03-12T14:20:00Z',
          reward: 20
        },
        {
          id: '3',
          referredId: 'user3',
          status: 'pending',
          createdAt: '2025-04-05T10:30:00Z'
        }
      ];
      
      setReferrals(mockReferrals);
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    referralCode,
    referralLink,
    referrals
  };
};
