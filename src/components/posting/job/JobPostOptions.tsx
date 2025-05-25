
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { getNationwidePrice } from '@/components/posting/smart-ad-options/pricing';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPostOptionsProps {
  options: PricingOptions;
  onOptionsChange: (options: PricingOptions) => void;
  isFirstPost?: boolean;
}

const JobPostOptions: React.FC<JobPostOptionsProps> = ({
  options,
  onOptionsChange,
  isFirstPost = false
}) => {
  const { t } = useTranslation();
  const [localOptions, setLocalOptions] = useState<PricingOptions>({
    ...options,
    isFirstPost
  });

  const handleOptionChange = (option: keyof PricingOptions, value: boolean) => {
    const updatedOptions: PricingOptions = {
      ...localOptions,
      [option]: value
    };
    setLocalOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  const handleTierChange = (tier: JobPricingTier) => {
    const updatedOptions: PricingOptions = {
      ...localOptions,
      selectedPricingTier: tier
    };
    setLocalOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium font-playfair">{t({
        english: 'Enhance Your Listing',
        vietnamese: 'Nâng cao tin đăng của bạn'
      })}</h3>
      <p className="text-sm text-gray-500">
        {t({
          english: 'Select additional options to increase visibility and attract more candidates',
          vietnamese: 'Chọn các tùy chọn bổ sung để tăng khả năng hiển thị và thu hút nhiều ứng viên hơn'
        })}
      </p>

      <RadioGroup
        value={localOptions.selectedPricingTier}
        onValueChange={(value) => handleTierChange(value as JobPricingTier)}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="free" id="free" />
          <Label htmlFor="free" className="text-sm font-medium">
            {t({
              english: 'Free',
              vietnamese: 'Miễn phí'
            })}
            <span className="ml-2 text-sm font-normal text-gray-500">$0.00</span>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="gold" id="gold" />
          <Label htmlFor="gold" className="text-sm font-medium">
            {t({
              english: 'Gold',
              vietnamese: 'Vàng'
            })}
            <span className="ml-2 text-sm font-normal text-gray-500">$19.99/month</span>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="premium" id="premium" />
          <Label htmlFor="premium" className="text-sm font-medium">
            {t({
              english: 'Premium',
              vietnamese: 'Cao cấp'
            })}
            <span className="ml-2 text-sm font-normal text-gray-500">$39.99/month</span>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="diamond" id="diamond" />
          <Label htmlFor="diamond" className="text-sm font-medium">
            {t({
              english: 'Diamond',
              vietnamese: 'Kim cương'
            })}
            <span className="ml-2 text-sm font-normal text-gray-500">$99.99/month</span>
          </Label>
        </div>
      </RadioGroup>

      <div className="space-y-3 pt-2">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="isNationwide"
            checked={localOptions.isNationwide || false}
            onCheckedChange={(checked) => handleOptionChange('isNationwide', checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="isNationwide" className="text-sm font-medium">
              {t({
                english: 'Nationwide Visibility',
                vietnamese: 'Hiển thị toàn quốc'
              })}
              <span className="ml-2 text-sm font-normal text-gray-500">{getNationwidePrice('job')}</span>
            </Label>
            <p className="text-sm text-gray-500">
              {t({
                english: 'Show your job to candidates across the country',
                vietnamese: 'Hiển thị công việc của bạn cho ứng viên trên toàn quốc'
              })}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="autoRenew"
            checked={localOptions.autoRenew || false}
            onCheckedChange={(checked) => handleOptionChange('autoRenew', checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="autoRenew" className="text-sm font-medium">
              {t({
                english: 'Auto-renew Monthly',
                vietnamese: 'Tự động gia hạn hàng tháng'
              })}
              <span className="ml-2 text-sm font-normal text-green-600">-5%</span>
            </Label>
            <p className="text-sm text-gray-500">
              {t({
                english: 'Get 5% discount when you enable auto-renewal',
                vietnamese: 'Nhận giảm giá 5% khi bạn bật tự động gia hạn'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostOptions;
