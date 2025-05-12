import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { PricingOptions } from '@/utils/posting/types';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';
import { RadioGroup } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info, Check } from 'lucide-react';
import AutoRenewSuggestionCard from '@/components/posting/AutoRenewSuggestionCard';
import PricingCards from '../PricingCards';
import DurationSelector from '../DurationSelector';

interface ReviewAndPaymentSectionProps {
  pricingOptions: PricingOptions;
  onPricingChange: (options: PricingOptions) => void;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  pricingOptions,
  onPricingChange,
}) => {
  const { t } = useTranslation();
  const [showAutoRenewPrompt, setShowAutoRenewPrompt] = useState(false);
  
  const handlePricingChange = (tierId: string) => {
    if ((tierId === 'standard' || tierId === 'premium') && tierId !== pricingOptions.selectedPricingTier) {
      setShowAutoRenewPrompt(true);
    } else {
      setShowAutoRenewPrompt(false);
    }
    onPricingChange({
      ...pricingOptions,
      selectedPricingTier: tierId,
    });
  };

  const handleUpgradeToGold = () => {
    onPricingChange({
      ...pricingOptions,
      selectedPricingTier: 'gold',
    });
    setShowAutoRenewPrompt(false);
  };

  const pricingResult = calculateJobPostPrice(pricingOptions);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        {t('Choose Your Plan', 'Chọn Gói Dịch Vụ Của Bạn')}
      </h3>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          {t(
            'Select the best plan for your hiring needs. Higher tier plans will attract more qualified candidates faster.',
            'Chọn gói phù hợp nhất với nhu cầu tuyển dụng của bạn. Các gói cao cấp sẽ thu hút nhiều ứng viên có trình độ hơn và nhanh hơn.'
          )}
        </p>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {jobPricingOptions
            .filter(option => !option.hidden)
            .sort((a, b) => {
              if (a.id === 'free') return 1;
              if (b.id === 'free') return -1;
              return a.price - b.price;
            })
            .map((option) => (
              <PricingCards
                key={option.id}
                id={option.id}
                name={option.name}
                price={option.price}
                wasPrice={option.wasPrice}
                description={option.vietnameseDescription || option.description}
                features={option.features}
                tier={option.tier}
                isSelected={pricingOptions.selectedPricingTier === option.id}
                onSelect={() => handlePricingChange(option.id)}
                tag={option.tag}
              />
            ))}
        </div>

        {showAutoRenewPrompt && (
          <AutoRenewSuggestionCard onUpgrade={handleUpgradeToGold} />
        )}

        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">
            {t('Select Duration', 'Chọn Thời Hạn')}
          </h4>
          <p className="text-sm text-gray-500 mb-3">
            {t('Choose how long you want your job posting to be active.', 'Chọn thời gian bạn muốn tin đăng việc của mình hoạt động.')}
          </p>
          <DurationSelector
            selectedDuration={pricingOptions.durationMonths || 1}
            onChange={(duration) => onPricingChange({ ...pricingOptions, durationMonths: duration })}
            selectedPricing={pricingOptions.selectedPricingTier}
          />
        </div>
      </div>

      <Card className="p-4 border-2 border-purple-100 bg-gradient-to-r from-purple-50 to-white shadow-sm">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-purple-900">
              {t('Payment Summary', 'Tóm Tắt Thanh Toán')}
            </h4>
            <div className="flex items-center text-gray-500 text-sm">
              <Info className="h-4 w-4 mr-1" />
              {t('Secure Payment', 'Thanh Toán An Toàn')}
            </div>
          </div>

          <Separator className="bg-purple-100" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {t('Selected Plan', 'Gói Đã Chọn')}
              </span>
              <span className="font-medium">
                {
                  jobPricingOptions.find(
                    (option) => option.id === pricingOptions.selectedPricingTier
                  )?.name
                }
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                {t('Duration', 'Thời Hạn')}
              </span>
              <span className="font-medium">
                {pricingOptions.durationMonths || 1} {t('months', 'tháng')}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                {t('Base Price', 'Giá Cơ Bản')}
              </span>
              <span className="font-medium">
                ${pricingResult.originalPrice.toFixed(2)}
              </span>
            </div>

            {pricingResult.discountPercentage > 0 && (
              <div className="flex justify-between text-green-600">
                <span>
                  {t('Discount', 'Giảm Giá')} ({pricingResult.discountPercentage}%)
                </span>
                <span>
                  -${(pricingResult.originalPrice - pricingResult.finalPrice).toFixed(2)}
                </span>
              </div>
            )}

            <Separator className="bg-purple-100" />

            <div className="flex justify-between font-bold text-lg">
              <span className="text-purple-900">
                {t('Total', 'Tổng Cộng')}
              </span>
              <span className="text-purple-900">
                ${pricingResult.finalPrice.toFixed(2)}
              </span>
            </div>

            {pricingOptions.selectedPricingTier !== 'free' && (
              <div className="bg-green-50 p-2 rounded-md mt-2">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-green-800">
                    {t(
                      'Your listing will be active for the full duration and can be renewed at any time.',
                      'Tin đăng của bạn sẽ hoạt động trong suốt thời gian và có thể được gia hạn bất kỳ lúc nào.'
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReviewAndPaymentSection;
