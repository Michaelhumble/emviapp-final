
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Gift, Users } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export interface CreditStatusCardProps {
  credits?: number;
  loading?: boolean;
}

const CreditStatusCard = ({ credits = 0, loading = false }: CreditStatusCardProps) => {
  const { isVietnamese } = useTranslation();
  
  // Translations
  const yourCreditsText = isVietnamese ? "Tín dụng của bạn" : "Your Credits";
  const buyCreditsText = isVietnamese ? "Mua tín dụng" : "Buy Credits";
  const earnFreeCreditsText = isVietnamese ? "Kiếm tín dụng miễn phí" : "Earn Free Credits";
  const completeProfileText = isVietnamese 
    ? "Hoàn thành hồ sơ và mời bạn bè để kiếm tới 50 tín dụng" 
    : "Complete your profile and invite friends to earn up to 50 credits";
  const seeWaysToEarnText = isVietnamese ? "Xem cách kiếm" : "See Ways to Earn";
  
  return (
    <Card className="border-emerald-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-emerald-700">
          <CreditCard className="mr-2 h-5 w-5 text-emerald-500" />
          {yourCreditsText}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-3xl font-bold text-emerald-600">{credits}</span>
            <span className="text-sm text-gray-500 ml-2">Credits</span>
          </div>
          <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
            {buyCreditsText}
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg border border-emerald-100">
            <div className="flex items-start">
              <Gift className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-emerald-800">
                  {earnFreeCreditsText}
                </h3>
                <p className="text-xs text-emerald-700 mb-2">
                  {completeProfileText}
                </p>
                <Button size="sm" variant="outline" className="bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  {seeWaysToEarnText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditStatusCard;
