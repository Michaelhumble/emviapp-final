
import { ReferralStats, ReferralProgress } from './types';
import { Card } from '@/components/ui/card';
import { Trophy, Gift, Crown, Star, Lock, Unlock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ReferralMilestonesProps {
  referralStats: ReferralStats;
  referralProgress: ReferralProgress;
}

const ReferralMilestones = ({ referralStats, referralProgress }: ReferralMilestonesProps) => {
  const { t } = useTranslation();
  
  // Define milestones based on target requirements
  const milestones = [
    {
      tier: 1,
      icon: Gift,
      name: t('referral.milestone.first'),
      description: t('referral.milestone.first_desc'),
      requirement: referralStats.targetMilestone * 1,
    },
    {
      tier: 2,
      icon: Trophy,
      name: t('referral.milestone.second'),
      description: t('referral.milestone.second_desc'),
      requirement: referralStats.targetMilestone * 2,
    },
    {
      tier: 3,
      icon: Star,
      name: t('referral.milestone.third'),
      description: t('referral.milestone.third_desc'),
      requirement: referralStats.targetMilestone * 3,
    },
    {
      tier: 4,
      icon: Crown,
      name: t('referral.milestone.fourth'),
      description: t('referral.milestone.fourth_desc'),
      requirement: referralStats.targetMilestone * 4,
    },
  ];
  
  return (
    <div className="space-y-3">
      {milestones.map((milestone) => {
        const isUnlocked = referralStats.completedReferrals >= milestone.requirement;
        const isNext = !isUnlocked && 
          referralStats.completedReferrals >= (milestone.tier - 1) * referralStats.targetMilestone &&
          referralStats.completedReferrals < milestone.requirement;
        
        return (
          <Card 
            key={milestone.tier} 
            className={`p-3 border transition-all ${
              isUnlocked 
                ? 'border-green-200 bg-green-50' 
                : isNext 
                  ? 'border-amber-200 bg-amber-50'
                  : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                isUnlocked 
                  ? 'bg-green-500'
                  : isNext
                    ? 'bg-amber-500'
                    : 'bg-gray-300'
              }`}>
                {isUnlocked ? (
                  <Unlock className="h-5 w-5 text-white" />
                ) : (
                  <Lock className="h-5 w-5 text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium">
                    {milestone.name}
                  </div>
                  <div className="text-sm">
                    {referralStats.completedReferrals}/{milestone.requirement}
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 mt-1">
                  {milestone.description}
                </div>
                
                {isNext && (
                  <div className="text-xs text-amber-700 font-medium mt-1">
                    {t('referral.milestone.almost_there', { 
                      count: referralProgress.nextMilestoneIn
                    })}
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ReferralMilestones;
