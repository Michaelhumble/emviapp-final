
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Award, CheckCircle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { toTranslatableText } from './TranslationHelper';

const ReferralProgressCard = () => {
  const { userProfile } = useAuth();
  const { t } = useTranslation();
  
  // Default values if profile data is missing
  const referralCount = userProfile?.referral_count || 0;
  const referralCode = userProfile?.referral_code || '';
  
  // Referral tiers
  const tiers = [
    { count: 3, label: 'Community Builder', icon: Users, reached: referralCount >= 3 },
    { count: 5, label: 'Emvi Ambassador', icon: Award, reached: referralCount >= 5 },
    { count: 10, label: 'Influence Award', icon: Gift, reached: referralCount >= 10 },
  ];
  
  // Find next tier
  const nextTier = tiers.find(tier => !tier.reached) || tiers[tiers.length - 1];
  const progress = nextTier.reached ? 100 : (referralCount / nextTier.count) * 100;
  
  // Handle copy referral link
  const handleCopyReferralLink = () => {
    const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    // Use toast to show success message
  };
  
  return (
    <Card className="border-indigo-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-indigo-700">
          <Users className="mr-2 h-5 w-5 text-indigo-500" />
          {t(toTranslatableText("Referral Program"))}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              {referralCount} {t(toTranslatableText("referrals"))}
            </span>
            <span className="text-sm text-gray-500">
              {nextTier.reached ? 'Max level reached' : `${nextTier.count} needed for next tier`}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-3 mb-4">
          {tiers.map((tier, index) => (
            <div key={index} className="flex items-center">
              <div className={`rounded-full p-1 mr-3 ${tier.reached ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                <tier.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className={`text-sm font-medium ${tier.reached ? 'text-indigo-700' : 'text-gray-500'}`}>
                    {tier.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {tier.count} {t(toTranslatableText("referrals"))}
                  </span>
                </div>
                {tier.reached && (
                  <div className="flex items-center text-xs text-green-600 mt-0.5">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {t(toTranslatableText("Achieved"))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handleCopyReferralLink}
          className="w-full bg-indigo-500 hover:bg-indigo-600"
        >
          {t(toTranslatableText("Copy Referral Link"))}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReferralProgressCard;
