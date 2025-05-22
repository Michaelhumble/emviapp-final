
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PRICING_PLANS, DURATION_OPTIONS, calculateTotalPrice } from '@/utils/posting/pricingConfig';
import { formatCurrency } from '@/lib/utils';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import { PricingGrid } from '@/components/pricing/PricingGrid';

interface JobPostPricingProps {
  onContinue: (options: PricingOptions) => void;
  isFirstPost?: boolean;
}

export const JobPostPricing: React.FC<JobPostPricingProps> = ({
  onContinue,
  isFirstPost = false
}) => {
  const { t } = useTranslation();
  const [selectedPricingTier, setSelectedPricingTier] = useState<JobPricingTier>('standard');
  const [durationMonths, setDurationMonths] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  
  const handleSelectPlan = (tier: string, duration: number, renewOption: boolean) => {
    setSelectedPricingTier(tier as JobPricingTier);
    setDurationMonths(duration);
    setAutoRenew(renewOption);
    
    // If it's the diamond tier, handle specially
    if (tier === 'diamond') {
      // You could redirect to a special Diamond application page or show a modal
      console.log("Diamond tier selected - show application form");
      return;
    }
    
    // For regular tiers, continue with the selected options
    const options: PricingOptions = {
      selectedPricingTier: tier as JobPricingTier,
      durationMonths: duration,
      autoRenew: renewOption,
      isFirstPost
    };
    
    onContinue(options);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-medium mb-2">
          {t({
            english: "Choose Your Job Posting Plan",
            vietnamese: "Chọn Gói Đăng Tin Tuyển Dụng"
          })}
        </h2>
        <p className="text-gray-600">
          {t({
            english: "Select the plan that best fits your hiring needs. All plans include visibility to qualified candidates.",
            vietnamese: "Chọn gói phù hợp nhất với nhu cầu tuyển dụng của bạn. Tất cả các gói đều hiển thị cho các ứng viên đủ điều kiện."
          })}
        </p>
      </div>
      
      {/* First post notification */}
      {isFirstPost && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-green-800">
              {t({
                english: "Special Offer: First Post Free!",
                vietnamese: "Ưu đãi đặc biệt: Bài đăng đầu tiên miễn phí!"
              })}
            </h3>
            <p className="text-sm text-green-700 mt-1">
              {t({
                english: "Your first job posting is on us. Choose any standard, premium or gold plan at no cost.",
                vietnamese: "Bài đăng đầu tiên của bạn là miễn phí. Chọn bất kỳ gói tiêu chuẩn, cao cấp hoặc vàng nào mà không mất phí."
              })}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Grid of pricing options */}
      <PricingGrid onSelectPlan={handleSelectPlan} />

      {/* Special note about Diamond tier */}
      <div className="text-center text-sm text-gray-500 mt-4">
        {t({
          english: "Need a comprehensive recruiting solution? Contact us about our Diamond tier for enterprise-level service.",
          vietnamese: "Cần giải pháp tuyển dụng toàn diện? Liên hệ với chúng tôi về gói Kim Cương dành cho dịch vụ cấp doanh nghiệp."
        })}
      </div>
    </div>
  );
};
