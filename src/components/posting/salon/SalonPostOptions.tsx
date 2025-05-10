import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PricingOptions } from '@/utils/posting/types';
import { calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonPostOptionsProps {
  options: PricingOptions;
  onOptionsChange: (options: PricingOptions) => void;
  isFirstPost?: boolean;
}

const SalonPostOptions: React.FC<SalonPostOptionsProps> = ({
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
    const updatedOptions = {
      ...localOptions,
      [option]: value
    };
    setLocalOptions(updatedOptions);
    onOptionsChange(updatedOptions);
  };

  // Calculate the current price based on selected options
  const price = calculateSalonPostPrice(localOptions);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t('Enhance Your Listing', 'Nâng cao tin đăng của bạn')}</h3>
      <p className="text-sm text-gray-500">
        {t(
          'Select additional options to increase visibility and attract more clients',
          'Chọn các tùy chọn bổ sung để tăng khả năng hiển thị và thu hút nhiều khách hàng hơn'
        )}
      </p>

      <div className="space-y-3 pt-2">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="isNationwide"
            checked={localOptions.isNationwide || false}
            onCheckedChange={(checked) => handleOptionChange('isNationwide', checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="isNationwide" className="text-sm font-medium">
              {t('Nationwide Visibility', 'Hiển thị toàn quốc')}
              <span className="ml-2 text-sm font-normal text-gray-500">+$10</span>
            </Label>
            <p className="text-sm text-gray-500">
              {t(
                'Show your salon to clients across the country',
                'Hiển thị salon của bạn cho khách hàng trên toàn quốc'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="fastSalePackage"
            checked={localOptions.fastSalePackage || false}
            onCheckedChange={(checked) => handleOptionChange('fastSalePackage', checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="fastSalePackage" className="text-sm font-medium">
              {t('Premium Promotion', 'Quảng cáo cao cấp')}
              <span className="ml-2 text-sm font-normal text-gray-500">+$20</span>
            </Label>
            <p className="text-sm text-gray-500">
              {t(
                'Boost visibility with premium placement and promotion',
                'Tăng khả năng hiển thị với vị trí và quảng cáo cao cấp'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="showAtTop"
            checked={localOptions.showAtTop || false}
            onCheckedChange={(checked) => handleOptionChange('showAtTop', checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="showAtTop" className="text-sm font-medium">
              {t('Featured Placement', 'Vị trí nổi bật')}
              <span className="ml-2 text-sm font-normal text-gray-500">+$15</span>
            </Label>
            <p className="text-sm text-gray-500">
              {t(
                'Show your salon at the top of search results',
                'Hiển thị salon của bạn ở đầu kết quả tìm kiếm'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="bundleWithJobPost"
            checked={localOptions.bundleWithJobPost || false}
            onCheckedChange={(checked) => handleOptionChange('bundleWithJobPost', checked === true)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="bundleWithJobPost" className="text-sm font-medium">
              {t('Bundle with Job Post', 'Gói với tin tuyển dụng')}
              <span className="ml-2 text-sm font-normal text-gray-500">+$15</span>
            </Label>
            <p className="text-sm text-gray-500">
              {t(
                'Add a job posting to find staff for your salon',
                'Thêm tin tuyển dụng để tìm nhân viên cho salon của bạn'
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('Current Price', 'Giá hiện tại')}:</span>
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default SalonPostOptions;
