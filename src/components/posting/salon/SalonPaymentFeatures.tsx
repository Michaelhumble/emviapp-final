
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, Star, Crown, Globe, TrendingUp } from 'lucide-react';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

interface SalonPaymentFeaturesProps {
  selectedOptions: SalonPricingOptions;
}

const SalonPaymentFeatures: React.FC<SalonPaymentFeaturesProps> = ({ selectedOptions }) => {
  const getFeatures = () => {
    const baseFeatures = [
      { icon: Clock, text: `${selectedOptions.durationMonths} tháng hiển thị` },
      { icon: Star, text: "Hỗ trợ cơ bản" }
    ];

    if (selectedOptions.isNationwide) {
      baseFeatures.push({ icon: Globe, text: "Hiển thị toàn quốc" });
    }

    if (selectedOptions.fastSalePackage) {
      baseFeatures.push({ icon: Zap, text: "Gói bán nhanh" });
    }

    if (selectedOptions.featuredBoost) {
      baseFeatures.push({ icon: TrendingUp, text: "Tăng độ nổi bật" });
    }

    if (selectedOptions.selectedPricingTier === 'premium') {
      baseFeatures.push({ icon: Crown, text: "Hiển thị ưu tiên" });
    }

    return baseFeatures;
  };

  const features = getFeatures();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Tính năng đã chọn
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm">{feature.text}</span>
              </div>
            );
          })}
        </div>
        
        {selectedOptions.fastSalePackage && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Gói Bán Nhanh</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Tin đăng của bạn sẽ hiển thị ở vị trí đầu và có nhãn "Bán Gấp"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonPaymentFeatures;
