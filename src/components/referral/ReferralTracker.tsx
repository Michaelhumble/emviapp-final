
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Users, Copy, CheckCircle, Gift, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import { useTranslation } from '@/hooks/useTranslation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReferralList from './ReferralList';
import ReferralMilestones from './ReferralMilestones';

interface ReferralTrackerProps {
  className?: string;
}

const ReferralTracker = ({ className = '' }: ReferralTrackerProps) => {
  const { userProfile } = useAuth();
  const { t } = useTranslation();
  const {
    loading,
    referralLink,
    referralStats,
    referralProgress,
    referrals,
    copied,
    copyReferralLink,
    getMotivationalMessage,
  } = useReferralSystem();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Card className={`border-pink-100 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Users className="h-5 w-5 text-pink-500" />
            {t('referral.tracker_title', { defaultValue: 'Referral Rewards' })}
          </CardTitle>
          {referralStats.completedReferrals > 0 && (
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              {referralStats.completedReferrals} 
              <span className="ml-1 hidden sm:inline">{t('referral.verified_referrals')}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Motivational Message Banner */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-md mb-4 border border-pink-100">
          <p className="text-pink-700 text-sm font-medium">
            {getMotivationalMessage(userProfile?.preferred_language)}
          </p>
          
          {/* Progress Bar */}
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{referralStats.completedReferrals} / {referralStats.targetMilestone}</span>
              <span>{t('referral.next_milestone')}</span>
            </div>
            <Progress value={referralProgress.percentage} className="h-2" />
          </div>
        </div>
        
        {/* Copy Referral Link */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              {t('referral.your_link')}
            </label>
            <div className="flex">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md py-2 px-3 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                {referralLink}
              </div>
              <Button 
                variant="outline"
                className="rounded-l-none" 
                onClick={copyReferralLink}
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs for referral info */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">
              {t('referral.overview')}
            </TabsTrigger>
            <TabsTrigger value="details">
              {t('referral.details')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            <ReferralMilestones 
              referralStats={referralStats}
              referralProgress={referralProgress}
            />
          </TabsContent>
          
          <TabsContent value="details" className="pt-4">
            <ReferralList 
              referrals={referrals} 
              loading={loading}
            />
          </TabsContent>
        </Tabs>
        
        {/* Share Buttons */}
        <div className="mt-6">
          <Button 
            variant="default" 
            className="w-full bg-pink-600 hover:bg-pink-700"
            onClick={copyReferralLink}
          >
            <Gift className="h-4 w-4 mr-2" />
            {t('referral.share_with_friends')}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralTracker;
