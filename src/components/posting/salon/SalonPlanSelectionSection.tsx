
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Check, Star } from 'lucide-react';
import { DURATION_OPTIONS, SalonPricingTier, SalonPricingOptions } from '@/utils/posting/salonPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonPlanSelectionSectionProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPlanSelectionSection = ({ selectedOptions, onOptionsChange }: SalonPlanSelectionSectionProps) => {
  const { t } = useTranslation();

  const handleDurationSelect = (months: number, price: number) => {
    const updatedOptions = {
      ...selectedOptions,
      selectedPricingTier: 'standard' as SalonPricingTier,
      durationMonths: months
    };
    onOptionsChange(updatedOptions);
  };

  const handleFeaturedToggle = (checked: boolean) => {
    const updatedOptions = {
      ...selectedOptions,
      featuredAddOn: checked
    };
    onOptionsChange(updatedOptions);
  };

  const calculateTotal = () => {
    const durationOption = DURATION_OPTIONS.find(d => d.months === selectedOptions.durationMonths);
    const basePrice = durationOption?.price || 19.99;
    const featuredCost = selectedOptions.featuredAddOn ? (selectedOptions.durationMonths || 1) * 10 : 0;
    return basePrice + featuredCost;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-bold mb-4">
          {t({
            english: 'Choose Your Plan',
            vietnamese: 'Chọn Gói Của Bạn'
          })}
        </h2>
        <p className="text-gray-600">
          {t({
            english: 'Select the duration that works best for your salon listing',
            vietnamese: 'Chọn thời hạn phù hợp nhất cho tin đăng salon của bạn'
          })}
        </p>
      </div>

      {/* Duration Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {DURATION_OPTIONS.map((option) => {
          const isSelected = selectedOptions.durationMonths === option.months;
          const perMonthPrice = option.price / option.months;
          
          return (
            <Card 
              key={option.months}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'border-purple-500 bg-purple-50 shadow-md' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => handleDurationSelect(option.months, option.price)}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  {option.savingsPercent > 0 && (
                    <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                      {t({
                        english: `Save ${option.savingsPercent}%!`,
                        vietnamese: `Tiết kiệm ${option.savingsPercent}%!`
                      })}
                    </div>
                  )}
                  
                  <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    ${option.price}
                  </div>
                  
                  {option.months > 1 && (
                    <div className="text-sm text-gray-500 mb-3">
                      ${perMonthPrice.toFixed(2)}/month
                    </div>
                  )}
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t({ english: 'Basic listing', vietnamese: 'Đăng tin cơ bản' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t({ english: 'Search visibility', vietnamese: 'Hiển thị tìm kiếm' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{t({ english: 'Photo gallery', vietnamese: 'Thư viện ảnh' })}</span>
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-purple-600 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Featured Add-On */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="featured-addon"
              checked={selectedOptions.featuredAddOn || false}
              onCheckedChange={handleFeaturedToggle}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="featured-addon" className="flex items-center gap-2 text-lg font-semibold cursor-pointer">
                <Star className="h-5 w-5 text-yellow-500" />
                {t({
                  english: 'Featured Placement',
                  vietnamese: 'Gắn Nổi Bật'
                })}
                <span className="text-yellow-600 font-bold">+$10.00/month</span>
              </Label>
              <p className="text-gray-600 mt-2">
                {t({
                  english: 'Salon appears at the top of the page!',
                  vietnamese: 'Salon xuất hiện ở đầu trang!'
                })}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{t({ english: 'Priority placement', vietnamese: 'Vị trí ưu tiên' })}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{t({ english: 'Featured badge', vietnamese: 'Huy hiệu nổi bật' })}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{t({ english: 'Increased visibility', vietnamese: 'Tăng khả năng hiển thị' })}</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">
            {t({
              english: 'Price Summary',
              vietnamese: 'Tóm Tắt Giá'
            })}
          </h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{t({ english: 'Standard Listing', vietnamese: 'Đăng Tin Cơ Bản' })} ({selectedOptions.durationMonths || 1} {t({ english: 'month(s)', vietnamese: 'tháng' })})</span>
              <span>${DURATION_OPTIONS.find(d => d.months === selectedOptions.durationMonths)?.price || 19.99}</span>
            </div>
            
            {selectedOptions.featuredAddOn && (
              <div className="flex justify-between">
                <span>{t({ english: 'Featured Add-On', vietnamese: 'Gắn Nổi Bật' })} ({selectedOptions.durationMonths || 1} × $10)</span>
                <span>${(selectedOptions.durationMonths || 1) * 10}</span>
              </div>
            )}
            
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>{t({ english: 'Total', vietnamese: 'Tổng Cộng' })}</span>
                <span className="text-purple-600">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPlanSelectionSection;
