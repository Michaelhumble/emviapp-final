
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ReferralStats, ReferralProgress, ReferralData } from '@/components/referral/types';

export const useReferralSystem = () => {
  const { user, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralLink, setReferralLink] = useState<string>('');
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 0,
    pendingReferrals: 0,
    completedReferrals: 0,
    targetMilestone: 5, // Default milestone target
  });
  const [referralProgress, setReferralProgress] = useState<ReferralProgress>({
    percentage: 0,
    nextMilestoneIn: 5,
    currentTier: 0,
    nextTier: 1,
  });
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    
    const fetchReferralData = async () => {
      setLoading(true);
      
      try {
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
        
        const { data: statsData, error: statsError } = await supabase
          .rpc('get_user_referral_stats', { user_id: user.id });
          
        if (statsError) {
          console.error('Error fetching referral stats:', statsError);
          setLoading(false);
          return;
        }
        
        const statsObject = Array.isArray(statsData) ? statsData[0] : statsData;
        const referralCount = statsObject.referral_count || 0;
        
        const total = processedReferrals.length;
        const completed = processedReferrals.filter(r => r.status === 'completed').length;
        const pending = total - completed;
        
        let targetMilestone = 5; // Default
        if (userRole === 'artist' || userRole === 'nail technician/artist') {
          targetMilestone = 3;
        } else if (userRole === 'salon' || userRole === 'owner') {
          targetMilestone = 2;
        }
        
        const currentTier = Math.floor(referralCount / targetMilestone);
        const nextMilestoneIn = targetMilestone - (referralCount % targetMilestone);
        const percentage = ((referralCount % targetMilestone) / targetMilestone) * 100;
        
        setReferralStats({
          totalReferrals: total,
          pendingReferrals: pending,
          completedReferrals: completed,
          targetMilestone,
        });
        
        setReferralProgress({
          percentage,
          nextMilestoneIn,
          currentTier,
          nextTier: currentTier + 1,
        });
        
      } catch (error) {
        console.error('Error in fetchReferralData:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReferralData();
    
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
  }, [user?.id, userRole]);
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true);
        toast.success('Referral link copied to clipboard!');
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
        toast.error('Failed to copy link. Please try again.');
      });
  };

  const getMotivationalMessage = (preferred_language: string = 'English') => {
    const isVietnamese = preferred_language?.toLowerCase() === 'vietnamese' || preferred_language?.toLowerCase() === 'tiếng việt';
    
    if (referralProgress.nextMilestoneIn <= 1) {
      return isVietnamese ? 'Gần tới phần thưởng rồi!' : 'Almost there!';
    } else if (referralStats.completedReferrals === 0) {
      return isVietnamese ? 'Mời bạn bè và nhận thưởng từ Emvi!' : 'Invite friends and earn rewards from Emvi!';
    } else {
      const message = isVietnamese 
        ? `Bạn đã giới thiệu ${referralStats.completedReferrals} người. Chỉ cần thêm ${referralProgress.nextMilestoneIn} để mở khóa phần thưởng!`
        : `You've referred ${referralStats.completedReferrals} friends. Just ${referralProgress.nextMilestoneIn} more to unlock a bonus reward!`;
      return message;
    }
  };
  
  return {
    loading,
    referralCode,
    referralLink,
    referralStats,
    referralProgress,
    referrals,
    copied,
    copyReferralLink,
    getMotivationalMessage,
  };
};
