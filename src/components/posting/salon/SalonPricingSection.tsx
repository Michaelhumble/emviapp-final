
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { getSalonPostPricingSummary, SalonPricingOptions } from '@/utils/posting/salonPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonPricingSectionProps {
  selectedOptions: SalonPricingOptions;
}

const SalonPricingSection = ({ selectedOptions }: SalonPricingSectionProps) => {
  const { t } = useTranslation();
  const summary = getSalonPostPricingSummary(selectedOptions);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-playfair font-bold mb-2">
          {t({
            english: 'Your Selected Plan',
            vietnamese: 'Gói Bạn Đã Chọn'
          })}
        </h2>
        <p className="text-gray-600">
          {t({
            english: 'Review your salon listing plan and pricing details',
            vietnamese: 'Xem lại gói tin đăng salon và chi tiết giá cả'
          })}
        </p>
      </div>

      <Card className="border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-600" />
            {summary.planName}
            {summary.savingsPercent && summary.savingsPercent > 0 && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                {t({
                  english: `Save ${summary.savingsPercent}%!`,
                  vietnamese: `Tiết kiệm ${summary.savingsPercent}%!`
                })}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Plan Features */}
            <div>
              <h4 className="font-medium mb-3">
                {t({
                  english: 'Included Features',
                  vietnamese: 'Tính Năng Bao Gồm'
                })}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {summary.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            {selectedOptions.featuredAddOn && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">
                    {t({
                      english: 'Featured Placement Add-On',
                      vietnamese: 'Gói Gắn Nổi Bật'
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {t({
                    english: 'Your salon will appear at the top of search results with a featured badge.',
                    vietnamese: 'Salon của bạn sẽ xuất hiện ở đầu kết quả tìm kiếm với huy hiệu nổi bật.'
                  })}
                </p>
              </div>
            )}

            {/* Pricing Breakdown */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">
                {t({
                  english: 'Pricing Breakdown',
                  vietnamese: 'Chi Tiết Giá'
                })}
              </h4>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>
                    {t({
                      english: 'Standard Listing',
                      vietnamese: 'Đăng Tin Cơ Bản'
                    })} ({summary.duration} {t({ english: 'month(s)', vietnamese: 'tháng' })})
                  </span>
                  <span>${summary.basePrice.toFixed(2)}</span>
                </div>

                {summary.duration > 1 && summary.perMonthPrice && (
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      {t({
                        english: 'Per month',
                        vietnamese: 'Mỗi tháng'
                      })}
                    </span>
                    <span>${summary.perMonthPrice.toFixed(2)}/month</span>
                  </div>
                )}

                {summary.addOns.featured > 0 && (
                  <div className="flex justify-between">
                    <span>
                      {t({
                        english: 'Featured Add-On',
                        vietnamese: 'Gói Gắn Nổi Bật'
                      })} ({summary.duration} × $10)
                    </span>
                    <span>${summary.addOns.featured.toFixed(2)}</span>
                  </div>
                )}

                {summary.autoRenewDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      {t({
                        english: 'Auto-Renew Discount (5%)',
                        vietnamese: 'Giảm Giá Tự Động Gia Hạn (5%)'
                      })}
                    </span>
                    <span>-${summary.autoRenewDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>
                      {t({
                        english: 'Total',
                        vietnamese: 'Tổng Cộng'
                      })}
                    </span>
                    <span className="text-purple-600">${summary.finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration Info */}
            <div className="text-sm text-gray-500 text-center">
              {t({
                english: `Your salon listing will be active for ${summary.duration} month${summary.duration > 1 ? 's' : ''}.`,
                vietnamese: `Tin đăng salon của bạn sẽ hoạt động trong ${summary.duration} tháng.`
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPricingSection;
