
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import NationwideOption from '@/components/posting/smart-ad-options/NationwideOption';
import FastSalePackage from '@/components/posting/smart-ad-options/FastSalePackage';
import { useTranslation } from '@/hooks/useTranslation';
import { durationOptions, DurationSelectorProps } from '@/utils/posting/upsellOptions';
import { PricingOptions } from '@/utils/posting/types';

export interface JobPostOptionsProps {
  isFirstPost?: boolean;
  hasReferrals?: boolean;
  setPricingOptions: (options: Partial<PricingOptions>) => void;
  pricingOptions: PricingOptions;
}

const JobPostOptions: React.FC<JobPostOptionsProps> = ({ 
  isFirstPost = false,
  hasReferrals = false,
  setPricingOptions,
  pricingOptions
}) => {
  const { t } = useTranslation();
  
  const handleNationwideChange = (checked: boolean) => {
    setPricingOptions({ isNationwide: checked });
  };
  
  const handleFastSaleChange = (checked: boolean) => {
    setPricingOptions({ fastSalePackage: checked });
  };

  const handleDurationChange = (months: number) => {
    setPricingOptions({ durationMonths: months });
  };

  const handleAutoRenewChange = (checked: boolean) => {
    setPricingOptions({ autoRenew: checked });
  };

  // Use safe access to pricingOptions with fallbacks
  const selectedTier = pricingOptions?.selectedPricingTier || 'standard';
  const durationMonths = pricingOptions?.durationMonths || 1;
  const isNationwide = pricingOptions?.isNationwide || false;
  const fastSalePackage = pricingOptions?.fastSalePackage || false;
  const autoRenew = pricingOptions?.autoRenew || false;

  // Only show auto-renew option for subscription plans
  const showAutoRenew = selectedTier !== 'free';

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            {t("Job Post Options", "Tuỳ chọn đăng tuyển")}
          </CardTitle>
          <CardDescription>
            {t("Choose options to maximize your post's reach", "Chọn các tùy chọn để tối đa hóa phạm vi tiếp cận của bài đăng")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Nationwide Visibility Option */}
          <NationwideOption 
            postType="job"
            isFirstPost={isFirstPost}
            onChange={handleNationwideChange}
            defaultChecked={isNationwide}
          />
          
          {/* Fast Sale Package */}
          <FastSalePackage 
            onChange={handleFastSaleChange}
            defaultChecked={fastSalePackage}
          />
          
          <Separator className="my-4" />
          
          {/* Duration Selector */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm">
              {t("Post Duration", "Thời hạn đăng bài")}
            </h3>
            <DurationSelector 
              selectedMonths={durationMonths}
              onChange={handleDurationChange}
            />
          </div>
          
          {/* Auto Renew Option - Only show for paid plans */}
          {showAutoRenew && (
            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="auto-renew"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  checked={autoRenew}
                  onChange={(e) => handleAutoRenewChange(e.target.checked)}
                />
                <label htmlFor="auto-renew" className="text-sm font-medium text-gray-700">
                  {t("Auto-renew my plan (can cancel anytime)", "Tự động gia hạn gói của tôi (có thể hủy bất kỳ lúc nào)")}
                </label>
              </div>
              <p className="text-xs text-gray-500 ml-6 mt-1">
                {t("Avoid interruption in visibility by auto-renewing at the end of your term", "Tránh gián đoạn hiển thị bằng cách tự động gia hạn vào cuối thời hạn")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Duration Selector Component
const DurationSelector: React.FC<DurationSelectorProps> = ({ selectedMonths, onChange }) => {
  const { t, isVietnamese } = useTranslation();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {durationOptions.map((option) => (
        <button
          key={option.months}
          type="button"
          onClick={() => onChange(option.months)}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors ${
            selectedMonths === option.months
              ? "bg-primary/10 border-primary text-primary font-medium"
              : "bg-background border-border hover:bg-muted/50"
          }`}
        >
          <span className="text-lg font-medium">{option.months}</span>
          <span className="text-xs">
            {isVietnamese ? option.vietnameseLabel : option.label}
          </span>
          {option.discount > 0 && (
            <span className="text-xs text-green-600 mt-1">
              -{option.discount}%
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default JobPostOptions;
