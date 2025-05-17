
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import PricingCard from './PricingCards';
import { 
  jobPricingOptions,
  calculateFinalPrice,
  isSubscriptionPlan
} from '@/utils/posting/jobPricing';
import { PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';

interface PricingStepProps {
  onSubmit: (options: PricingOptions) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export const PricingStep: React.FC<PricingStepProps> = ({ 
  onSubmit, 
  onBack, 
  isSubmitting = false 
}) => {
  const { t } = useTranslation();
  const [selectedPricing, setSelectedPricing] = useState<string>('free');
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const options: PricingOptions = {
      selectedPricingTier: selectedPricing,
      durationMonths: selectedDuration,
      autoRenew: autoRenew && isSubscriptionPlan(selectedPricing)
    };
    
    onSubmit(options);
  };
  
  const finalPrice = calculateFinalPrice(Number(selectedPricing), selectedDuration);
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6">
          {t({
            english: "Choose Your Posting Package",
            vietnamese: "Chọn Gói Đăng Tin"
          })}
        </h2>
        
        <p className="text-gray-600 mb-8">
          {t({
            english: "Select the visibility level for your job posting",
            vietnamese: "Chọn mức độ hiển thị cho tin tuyển dụng của bạn"
          })}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {jobPricingOptions.map((option) => (
            <PricingCard
              key={option.id}
              id={option.id}
              name={option.name}
              price={option.price}
              description={option.description}
              vietnameseDescription={option.vietnameseDescription}
              tag={option.tag}
              popular={option.popular}
              features={option.features}
              tier={option.tier}
              selectedPricing={selectedPricing}
              onChange={(id) => setSelectedPricing(id)}
            />
          ))}
        </div>
        
        <div className="mt-8 flex items-center justify-between">
          <Button 
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
          >
            {t({
              english: "Back to Job Details",
              vietnamese: "Quay lại Chi tiết công việc"
            })}
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>
                {t({
                  english: "Publishing...",
                  vietnamese: "Đang đăng..."
                })}
              </span>
            ) : (
              <span>
                {t({
                  english: "Publish Job",
                  vietnamese: "Đăng tin tuyển dụng"
                })}
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PricingStep;
