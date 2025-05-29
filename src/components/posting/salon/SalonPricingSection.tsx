
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown } from 'lucide-react';
import { getSalonPostPricingSummary, SalonPricingOptions } from '@/utils/posting/salonPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonPricingSectionProps {
  options: SalonPricingOptions;
}

const SalonPricingSection: React.FC<SalonPricingSectionProps> = ({ options }) => {
  const { t } = useTranslation();
  const summary = getSalonPostPricingSummary(options);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
          {t({
            english: 'Pricing Summary',
            vietnamese: 'Tóm Tắt Giá'
          })}
        </h2>
      </div>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Crown className="h-5 w-5" />
            {summary.planName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span>{t({
                english: 'Base Price:',
                vietnamese: 'Giá Cơ Bản:'
              })}</span>
              <span className="font-bold">${summary.basePrice.toFixed(2)}</span>
            </div>

            {Object.entries(summary.addOns).map(([key, value]) => 
              value > 0 && (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span>+${value.toFixed(2)}</span>
                </div>
              )
            )}

            {summary.discounts.duration > 0 && (
              <div className="flex justify-between items-center text-sm text-green-600">
                <span>{t({
                  english: 'Duration Discount:',
                  vietnamese: 'Giảm Giá Thời Gian:'
                })}</span>
                <span>-${summary.discounts.duration.toFixed(2)}</span>
              </div>
            )}

            {summary.discounts.autoRenew > 0 && (
              <div className="flex justify-between items-center text-sm text-green-600">
                <span>{t({
                  english: 'Auto-Renew Discount:',
                  vietnamese: 'Giảm Giá Tự Động Gia Hạn:'
                })}</span>
                <span>-${summary.discounts.autoRenew.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>{t({
                  english: 'Total:',
                  vietnamese: 'Tổng Cộng:'
                })}</span>
                <span className="text-purple-600">${summary.finalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-green-700">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {t({
                    english: `Active for ${summary.duration} month${summary.duration > 1 ? 's' : ''}`,
                    vietnamese: `Hiệu lực trong ${summary.duration} tháng`
                  })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPricingSection;
