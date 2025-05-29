
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { calculateSalonPostPrice, SalonPricingOptions, SalonPricingTier } from '@/utils/posting/salonPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonPostOptionsProps {
  options: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  isFirstPost?: boolean;
}

const SalonPostOptions: React.FC<SalonPostOptionsProps> = ({
  options,
  onOptionsChange,
  isFirstPost = false
}) => {
  const { t } = useTranslation();

  const handleOptionChange = (option: keyof SalonPricingOptions, value: boolean) => {
    const updatedOptions = {
      ...options,
      [option]: value
    };
    onOptionsChange(updatedOptions);
  };

  // Calculate the current price based on selected options
  const price = calculateSalonPostPrice(options);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t({
        english: 'Enhance Your Listing',
        vietnamese: 'Nâng cao tin đăng của bạn'
      })}</h3>
      <p className="text-sm text-gray-500">
        {t({
          english: 'Select additional options to increase visibility and attract more clients',
          vietnamese: 'Chọn các tùy chọn bổ sung để tăng khả năng hiển thị và thu hút nhiều khách hàng hơn'
        })}
      </p>

      <div className="space-y-3 pt-2">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="featuredAddOn"
            checked={options.featuredAddOn || false}
            onCheckedChange={(checked) => handleOptionChange('featuredAddOn', checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="featuredAddOn" className="text-sm font-medium">
              {t({
                english: 'Featured Placement',
                vietnamese: 'Gắn Nổi Bật'
              })}
              <span className="ml-2 text-sm font-normal text-gray-500">+$10/month</span>
            </Label>
            <p className="text-sm text-gray-500">
              {t({
                english: 'Show your salon at the top of search results',
                vietnamese: 'Hiển thị salon của bạn ở đầu kết quả tìm kiếm'
              })}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="autoRenew"
            checked={options.autoRenew || false}
            onCheckedChange={(checked) => handleOptionChange('autoRenew', checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="autoRenew" className="text-sm font-medium">
              {t({
                english: 'Auto-Renew',
                vietnamese: 'Tự động gia hạn'
              })}
              <span className="ml-2 text-sm font-normal text-green-600">Save 5%</span>
            </Label>
            <p className="text-sm text-gray-500">
              {t({
                english: 'Automatically renew your listing and save 5%',
                vietnamese: 'Tự động gia hạn tin đăng và tiết kiệm 5%'
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="font-medium">{t({
            english: 'Current Price',
            vietnamese: 'Giá hiện tại'
          })}:</span>
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default SalonPostOptions;
