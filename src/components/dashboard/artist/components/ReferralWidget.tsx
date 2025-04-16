
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import { Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ReferralWidget = () => {
  const { referralStats, referralProgress } = useReferralSystem();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-purple-500" />
          Referral Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          {referralStats.completedReferrals}
          <span className="text-sm ml-1 font-normal text-gray-500">
            / {referralProgress.totalMilestone} referrals
          </span>
        </div>
        
        <Progress 
          value={(referralStats.completedReferrals / referralProgress.totalMilestone) * 100} 
          className="h-2 mb-3" 
        />
        
        <p className="text-sm text-gray-600">
          Invite more friends to earn credits and boost your profile
        </p>
      </CardContent>
    </Card>
  );
};

export default ReferralWidget;
