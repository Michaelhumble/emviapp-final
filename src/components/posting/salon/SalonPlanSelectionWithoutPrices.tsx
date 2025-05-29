
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { SalonPricingTier, DURATION_OPTIONS, calculateSalonPostPrice } from '@/utils/posting/salonPricing';

interface SalonPlanSelectionProps {
  onPricingSelect: (tier: SalonPricingTier, finalPrice: number) => void;
  selectedTier?: SalonPricingTier;
}

const SalonPlanSelectionWithoutPrices: React.FC<SalonPlanSelectionProps> = ({
  onPricingSelect,
  selectedTier = 'standard'
}) => {
  const { t } = useTranslation();
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [featuredAddOn, setFeaturedAddOn] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);

  const handleDurationSelect = (months: number) => {
    setSelectedDuration(months);
    const finalPrice = calculateSalonPostPrice({
      selectedPricingTier: 'standard',
      durationMonths: months,
      featuredAddOn,
      autoRenew
    });
    onPricingSelect('standard', finalPrice);
  };

  const handleAddOnChange = (addon: string, checked: boolean) => {
    if (addon === 'featured') {
      setFeaturedAddOn(checked);
    } else if (addon === 'autoRenew') {
      setAutoRenew(checked);
    }
    
    const finalPrice = calculateSalonPostPrice({
      selectedPricingTier: 'standard',
      durationMonths: selectedDuration,
      featuredAddOn: addon === 'featured' ? checked : featuredAddOn,
      autoRenew: addon === 'autoRenew' ? checked : autoRenew
    });
    onPricingSelect('standard', finalPrice);
  };

  return (
    <div className="space-y-8">
      {/* Duration Selection */}
      <div>
        <h3 className="text-2xl font-playfair font-semibold mb-6 text-center">
          {t({
            english: 'Choose Your Plan Duration',
            vietnamese: 'Chọn Thời Hạn Đăng Tin'
          })}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DURATION_OPTIONS.map((option, index) => (
            <motion.div
              key={option.months}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`
                  cursor-pointer transition-all duration-300 hover:shadow-xl
                  ${selectedDuration === option.months
                    ? 'ring-2 ring-blue-500 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50'
                    : 'hover:shadow-md'
                  }
                `}
                onClick={() => handleDurationSelect(option.months)}
              >
                <CardHeader className="text-center pb-2">
                  {option.savingsPercent > 0 && (
                    <Badge className="mx-auto mb-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      {t({
                        english: `Save ${option.savingsPercent}%!`,
                        vietnamese: `Tiết kiệm ${option.savingsPercent}%!`
                      })}
                    </Badge>
                  )}
                  <CardTitle className="text-lg">
                    {option.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${option.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    ${(option.price / option.months).toFixed(2)}/month
                  </div>
                  {selectedDuration === option.months && (
                    <div className="flex items-center justify-center text-blue-600">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">
                        {t({
                          english: 'Selected',
                          vietnamese: 'Đã Chọn'
                        })}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add-Ons */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">
          {t({
            english: 'Enhance Your Listing',
            vietnamese: 'Nâng Cao Tin Đăng'
          })}
        </h3>

        <Card className="p-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="featured"
              checked={featuredAddOn}
              onCheckedChange={(checked) => handleAddOnChange('featured', checked === true)}
            />
            <div className="space-y-1">
              <div className="flex items-center">
                <label htmlFor="featured" className="font-medium text-gray-900">
                  {t({
                    english: 'Featured Placement',
                    vietnamese: 'Đăng Tin Nổi Bật'
                  })}
                </label>
                <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                  <Sparkles className="h-3 w-3 mr-1 text-amber-600" />
                  +$10.00/month
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {t({
                  english: 'Show your salon at the top of search results and get 5x more views',
                  vietnamese: 'Hiển thị salon của bạn ở đầu kết quả tìm kiếm và nhận gấp 5 lần lượt xem'
                })}
              </p>
            </div>
          </div>

          <div className="border-t my-4 pt-4 flex items-start space-x-3">
            <Checkbox
              id="autoRenew"
              checked={autoRenew}
              onCheckedChange={(checked) => handleAddOnChange('autoRenew', checked === true)}
            />
            <div className="space-y-1">
              <div className="flex items-center">
                <label htmlFor="autoRenew" className="font-medium text-gray-900">
                  {t({
                    english: 'Auto-Renew',
                    vietnamese: 'Tự Động Gia Hạn'
                  })}
                </label>
                <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                  {t({
                    english: 'Save 5%',
                    vietnamese: 'Tiết kiệm 5%'
                  })}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {t({
                  english: 'Never lose visibility with automatic renewal at the end of your plan',
                  vietnamese: 'Không bao giờ mất khả năng hiển thị với tính năng tự động gia hạn vào cuối kỳ'
                })}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Price Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 shadow-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-700 mb-2">
            {t({
              english: 'Total Price:',
              vietnamese: 'Tổng Giá:'
            })} 
            <span className="ml-2">
              ${calculateSalonPostPrice({
                selectedPricingTier: 'standard',
                durationMonths: selectedDuration,
                featuredAddOn,
                autoRenew
              }).toFixed(2)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SalonPlanSelectionWithoutPrices;
