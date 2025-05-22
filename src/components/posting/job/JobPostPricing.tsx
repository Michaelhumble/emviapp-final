
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PricingGrid } from '@/components/pricing/PricingGrid';
import { PricingOptions } from '@/utils/posting/types';
import { DURATION_OPTIONS } from '@/utils/posting/pricingConfig';
import { DurationSelector } from '@/components/posting/pricing/DurationSelector';
import { SummaryTotals } from '@/components/posting/pricing/SummaryTotals';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPostPricingProps {
  onContinue: (options: PricingOptions) => void;
  isFirstPost?: boolean;
}

export const JobPostPricing: React.FC<JobPostPricingProps> = ({ 
  onContinue,
  isFirstPost = false
}) => {
  const { t } = useTranslation();
  const [selectedPricingTier, setSelectedPricingTier] = useState<string>('standard');
  const [durationMonths, setDurationMonths] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  const [isNationwide, setIsNationwide] = useState<boolean>(false);
  
  const handleDurationChange = (months: number) => {
    setDurationMonths(months);
  };
  
  const handleSelectPlan = (tier: string) => {
    setSelectedPricingTier(tier);
    
    // User has selected a plan, now we show duration options
    // This could scroll to the duration section or otherwise highlight it
  };
  
  const handleContinue = () => {
    // Create the options object to pass to the parent component
    const options: PricingOptions = {
      selectedPricingTier: selectedPricingTier as any,
      durationMonths,
      autoRenew,
      isFirstPost,
      isNationwide
    };
    
    onContinue(options);
  };
  
  return (
    <div className="space-y-8">
      {/* Plan Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Choose a Plan</h3>
        <PricingGrid onSelectPlan={handleSelectPlan} />
      </div>
      
      {/* Duration Selection */}
      <div className="mt-8">
        <DurationSelector
          durationMonths={durationMonths}
          onDurationChange={handleDurationChange}
          selectedPricingTier={selectedPricingTier}
          isDiamondPlan={selectedPricingTier === 'diamond'}
        />
      </div>
      
      {/* Additional Options */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="auto-renew" className="cursor-pointer">Auto-renew subscription</Label>
              <p className="text-xs text-muted-foreground">
                {t({
                  english: "Get an additional 5% discount",
                  vietnamese: "Nhận thêm 5% giảm giá"
                })}
              </p>
            </div>
            <Switch 
              id="auto-renew"
              checked={autoRenew}
              onCheckedChange={setAutoRenew}
            />
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="space-y-1">
              <Label htmlFor="nationwide" className="cursor-pointer">
                {t({
                  english: "Show nationwide (all states)",
                  vietnamese: "Hiển thị toàn quốc (tất cả các tiểu bang)"
                })}
              </Label>
              <p className="text-xs text-muted-foreground">+$5.00 (one-time fee)</p>
            </div>
            <Switch 
              id="nationwide"
              checked={isNationwide}
              onCheckedChange={setIsNationwide}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Summary & Continue */}
      <div>
        <SummaryTotals 
          selectedTier={selectedPricingTier}
          durationMonths={durationMonths}
          autoRenew={autoRenew}
          isFirstPost={isFirstPost}
        />
        
        <button
          className="w-full mt-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 font-medium"
          onClick={handleContinue}
        >
          {isFirstPost && selectedPricingTier !== 'diamond' ? (
            "Post for Free"
          ) : (
            "Continue to Payment"
          )}
        </button>
      </div>
    </div>
  );
};

export default JobPostPricing;
