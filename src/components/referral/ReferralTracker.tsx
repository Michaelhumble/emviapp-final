
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/useTranslation';
import { Users } from 'lucide-react';

const ReferralTracker = () => {
  const { t } = useTranslation();
  
  // Mock data
  const referrals = {
    completed: 3,
    target: 10,
    percentage: 30
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Users className="h-5 w-5 mr-2 text-purple-500" />
          {t('Referral Progress')}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="text-2xl font-bold mb-2 flex items-baseline">
          {referrals.completed}
          <span className="text-sm ml-1 font-normal text-gray-500">
            / {referrals.target} {t('referrals')}
          </span>
        </div>
        
        <Progress 
          value={referrals.percentage} 
          className="h-2 mb-3" 
        />
        
        <p className="text-sm text-gray-600">
          {t('Invite more friends to earn EmviApp credits')}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReferralTracker;
