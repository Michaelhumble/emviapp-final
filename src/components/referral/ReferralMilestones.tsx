
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Gift, Crown, Star, Lock, Unlock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ReferralMilestonesProps {
  referralStats: any;
  referralProgress: any;
}

const ReferralMilestones = ({ referralStats, referralProgress }: ReferralMilestonesProps) => {
  const { t } = useTranslation();
  
  // Define milestones
  const milestones = [
    {
      tier: 1,
      icon: Gift,
      name: t('First Milestone'),
      description: t('Get 50 bonus credits'),
      requirement: 3,
    },
    {
      tier: 2,
      icon: Trophy,
      name: t('Second Milestone'),
      description: t('Get 100 bonus credits'),
      requirement: 6,
    },
    {
      tier: 3,
      icon: Star,
      name: t('Third Milestone'),
      description: t('Get Premium status for 1 month'),
      requirement: 9,
    },
    {
      tier: 4,
      icon: Crown,
      name: t('Fourth Milestone'),
      description: t('Get 500 bonus credits'),
      requirement: 12,
    },
  ];
  
  return (
    <div className="space-y-3">
      {milestones.map((milestone) => {
        const isUnlocked = (referralStats?.completedReferrals || 0) >= milestone.requirement;
        
        return (
          <Card 
            key={milestone.tier} 
            className={`p-3 border transition-all ${
              isUnlocked 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                isUnlocked 
                  ? 'bg-green-500'
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
                    {referralStats?.completedReferrals || 0}/{milestone.requirement}
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 mt-1">
                  {milestone.description}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ReferralMilestones;
