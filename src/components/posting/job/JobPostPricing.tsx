
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  
  // Calculate price based on selections
  const priceInfo = calculateTotalPrice(selectedPricingTier, durationMonths, autoRenew);
  
  const handleSelectPlan = (tier: string, duration: number, renewOption: boolean) => {
    setSelectedPricingTier(tier as JobPricingTier);
    setDurationMonths(duration);
    setAutoRenew(renewOption);
    setShowConfirm(true);
    
    // If it's the diamond tier, handle specially
    if (tier === 'diamond') {
      // You could redirect to a special Diamond application page or show a modal
      console.log("Diamond tier selected - show application form");
      return;
    }
  };
  
  const handleConfirmPlan = () => {
    // For regular tiers, continue with the selected options
    const options: PricingOptions = {
      selectedPricingTier,
      durationMonths,
      autoRenew,
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

      {!showConfirm ? (
        <>
          {/* Grid of pricing options */}
          <PricingGrid onSelectPlan={handleSelectPlan} />

          {/* Special note about Diamond tier */}
          <div className="text-center text-sm text-gray-500 mt-4">
            {t({
              english: "Need a comprehensive recruiting solution? Contact us about our Diamond tier for enterprise-level service.",
              vietnamese: "Cần giải pháp tuyển dụng toàn diện? Liên hệ với chúng tôi về gói Kim Cương dành cho dịch vụ cấp doanh nghiệp."
            })}
          </div>
        </>
      ) : (
        <Card className="border-green-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-3">
              {t({
                english: "Selected Plan",
                vietnamese: "Gói Đã Chọn"
              })}
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">
                  {PRICING_PLANS.find(p => p.tier === selectedPricingTier)?.name || selectedPricingTier}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span>
                  {durationMonths} {t({
                    english: durationMonths > 1 ? "months" : "month",
                    vietnamese: "tháng"
                  })}
                </span>
              </div>
              
              {/* Price info */}
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="text-gray-600">
                  {t({
                    english: "Total Price:",
                    vietnamese: "Tổng tiền:"
                  })}
                </span>
                <div>
                  {priceInfo.discountPercentage > 0 && (
                    <span className="line-through text-gray-400 mr-2">
                      {formatCurrency(priceInfo.originalPrice)}
                    </span>
                  )}
                  <span className="font-medium">
                    {formatCurrency(priceInfo.finalPrice)}
                  </span>
                </div>
              </div>
              
              {/* Auto-renew toggle */}
              <div className="flex items-center justify-between pt-4 pb-2">
                <div>
                  <Label htmlFor="auto-renew-toggle" className="font-medium">
                    {t({
                      english: "Auto-renew subscription",
                      vietnamese: "Tự động gia hạn"
                    })}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t({
                      english: "Get an additional 5% discount",
                      vietnamese: "Nhận thêm 5% giảm giá"
                    })}
                  </p>
                </div>
                <Switch 
                  id="auto-renew-toggle"
                  checked={autoRenew}
                  onCheckedChange={setAutoRenew}
                />
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirm(false)}
              >
                {t({
                  english: "Change Plan",
                  vietnamese: "Đổi Gói"
                })}
              </Button>
              
              <Button 
                onClick={handleConfirmPlan}
              >
                {priceInfo.finalPrice > 0 ? t({
                  english: "Continue to Payment",
                  vietnamese: "Tiếp tục đến Thanh toán"
                }) : t({
                  english: "Post for Free",
                  vietnamese: "Đăng Miễn phí"
                })}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
