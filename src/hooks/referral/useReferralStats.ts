
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { ReferralStats } from '@/components/referral/types';

export const useReferralStats = () => {
  const { user, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 0,
    pendingReferrals: 0,
    completedReferrals: 0,
    targetMilestone: 5, // Default milestone target
  });

  useEffect(() => {
    if (!user?.id) return;
    
    const fetchReferralStats = async () => {
      try {
        const { data: statsData, error: statsError } = await supabase
          .rpc('get_user_referral_stats', { user_id: user.id });
          
        if (statsError) {
          console.error('Error fetching referral stats:', statsError);
          return;
        }
        
        const statsObject = Array.isArray(statsData) ? statsData[0] : statsData;
        const referralCount = statsObject?.referral_count || 0;
        
        // Calculate target milestone based on user role
        let targetMilestone = 5; // Default
        if (userRole === 'artist' || userRole === 'nail technician/artist') {
          targetMilestone = 3;
        } else if (userRole === 'salon' || userRole === 'owner') {
          targetMilestone = 2;
        }
        
        setReferralStats(prevStats => ({
          ...prevStats,
          totalReferrals: referralCount,
          completedReferrals: referralCount,
          pendingReferrals: prevStats.totalReferrals - referralCount,
          targetMilestone,
        }));
      } catch (error) {
        console.error('Error in fetchReferralStats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReferralStats();
  }, [user?.id, userRole]);

  return {
    loading,
    referralStats
  };
};
