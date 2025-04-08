
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { ReferralStats, ReferralProgress } from '@/components/referral/types';
import { useAuth } from '@/context/auth';
import { getReferralStats } from '@/utils/credits';
import { useTranslation } from '@/hooks/useTranslation';
import ReferralMilestones from '@/components/referral/ReferralMilestones';

const ReferralsPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    total: 0,
    verified: 0,
    pending: 0,
    completed: 0,
    completedReferrals: 0,
    totalReferrals: 0,
    pendingReferrals: 0,
    targetMilestone: 3,
    data: []
  });
  
  const [referralProgress, setReferralProgress] = useState<ReferralProgress>({
    percentage: 0,
    nextMilestoneIn: 0
  });
  
  useEffect(() => {
    const fetchReferralData = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        const stats = await getReferralStats(user.id);
        
        // Calculate the target milestone (can be customized based on user role)
        const targetMilestone = 3;
        
        // Calculate progress percentage
        const completed = stats.completed || 0;
        const percentage = Math.min((completed / targetMilestone) * 100, 100);
        
        // Calculate how many more referrals needed for next milestone
        const nextTier = Math.ceil(completed / targetMilestone);
        const nextMilestoneTarget = nextTier * targetMilestone;
        const nextMilestoneIn = nextMilestoneTarget - completed;
        
        setReferralStats({
          ...stats,
          targetMilestone,
          completedReferrals: completed,
          totalReferrals: stats.total,
          pendingReferrals: stats.pending
        });
        
        setReferralProgress({
          percentage,
          nextMilestoneIn
        });
        
      } catch (error) {
        console.error("Error fetching referral data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReferralData();
  }, [user?.id]);
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">
          {t({
            english: 'Your Referrals',
            vietnamese: 'Giới thiệu của bạn'
          })}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Milestones */}
            <ReferralMilestones 
              referralStats={referralStats}
              referralProgress={referralProgress}
            />
          </div>
          
          <div>
            {/* Referral Info */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReferralsPage;
