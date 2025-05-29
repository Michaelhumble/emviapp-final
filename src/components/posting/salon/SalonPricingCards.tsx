
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Eye, Calendar } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

interface SalonPricingCardsProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPricingCards: React.FC<SalonPricingCardsProps> = ({
  selectedOptions,
  onOptionsChange
}) => {
  const [featuredAddOn, setFeaturedAddOn] = useState(false);

  const pricingPlans = [
    {
      id: '1month',
      duration: 1,
      tier: 'basic' as const,
      name: '1 Month',
      nameVi: '1 Tháng',
      wasPrice: 24.99,
      price: 19.99,
      priceLabel: '$19.99',
      durationLabel: '/mo',
      description: 'Perfect for testing the waters',
      descriptionVi: 'Hoàn hảo để thử nghiệm',
      features: [
        'Basic visibility / Hiển thị cơ bản',
        '30-day duration / Thời hạn 30 ngày',
        'Standard placement / Vị trí tiêu chuẩn'
      ],
      icon: <Eye className="h-5 w-5 text-gray-500" />,
      popular: false
    },
    {
      id: '3months',
      duration: 3,
      tier: 'standard' as const,
      name: '3 Months',
      nameVi: '3 Tháng',
      wasPrice: 74.99,
      price: 54.99,
      priceLabel: '$54.99',
      durationLabel: '/3mo',
      description: 'Stand out from the crowd',
      descriptionVi: 'Nổi bật trong đám đông',
      features: [
        'Featured placement / Vị trí nổi bật',
        '3-month duration / Thời hạn 3 tháng',
        'Priority listing / Danh sách ưu tiên'
      ],
      icon: <Star className="h-5 w-5 text-amber-500" />,
      popular: true,
      badge: 'Most Popular',
      badgeVi: 'Phổ biến nhất'
    },
    {
      id: '6months',
      duration: 6,
      tier: 'featured' as const,
      name: '6 Months',
      nameVi: '6 Tháng',
      wasPrice: 149.99,
      price: 99.99,
      priceLabel: '$99.99',
      durationLabel: '/6mo',
      description: 'Maximum exposure and insights',
      descriptionVi: 'Tiếp xúc tối đa và thông tin chi tiết',
      features: [
        'Top placement / Vị trí hàng đầu',
        '6-month duration / Thời hạn 6 tháng',
        'Analytics dashboard / Bảng điều khiển phân tích'
      ],
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      popular: false
    },
    {
      id: '12months',
      duration: 12,
      tier: 'featured' as const,
      name: '12 Months',
      nameVi: '12 Tháng',
      wasPrice: 300,
      price: 145.99,
      priceLabel: '$145.99',
      durationLabel: '/year',
      description: 'White-glove service and exclusivity',
      descriptionVi: 'Dịch vụ cao cấp và độc quyền',
      features: [
        'Highest placement / Vị trí cao nhất',
        '12-month duration / Thời hạn 12 tháng',
        'Personal manager / Quản lý cá nhân'
      ],
      icon: <Calendar className="h-5 w-5 text-green-500" />,
      popular: false,
      badge: 'Best Value!',
      badgeVi: 'Giá trị tốt nhất!'
    }
  ];

  const handlePlanSelect = (duration: number, tier: SalonPricingOptions['selectedPricingTier']) => {
    onOptionsChange({
      ...selectedOptions,
      durationMonths: duration,
      selectedPricingTier: tier
    });
  };

  const calculateDiscount = (wasPrice: number, price: number) => {
    return Math.round(((wasPrice - price) / wasPrice) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Auto-renew and Nationwide toggles */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="flex items-center gap-3 bg-purple-50 rounded-lg p-3">
          <Switch 
            checked={selectedOptions.autoRenew || false}
            onCheckedChange={(checked) => onOptionsChange({
              ...selectedOptions,
              autoRenew: checked
            })}
          />
          <div className="text-sm">
            <span className="font-medium">Auto-renew (Save 5%)</span>
            <span className="text-gray-600 ml-2">/ Tự động gia hạn (Tiết kiệm 5%)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
          <Switch 
            checked={selectedOptions.isNationwide || false}
            onCheckedChange={(checked) => onOptionsChange({
              ...selectedOptions,
              isNationwide: checked
            })}
          />
          <div className="text-sm">
            <span className="font-medium">Nationwide visibility (+$5)</span>
            <span className="text-gray-600 ml-2">/ Hiển thị toàn quốc (+$5)</span>
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan, index) => {
          const isSelected = selectedOptions.durationMonths === plan.duration;
          const discount = calculateDiscount(plan.wasPrice, plan.price);
          
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-amber-500 text-white px-3 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              {plan.badge && !plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-green-500 text-white px-3 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <Card 
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  isSelected 
                    ? 'ring-2 ring-purple-500 border-purple-500 shadow-lg' 
                    : 'hover:border-purple-300 hover:shadow-md'
                } ${plan.popular ? 'border-amber-300 bg-gradient-to-b from-amber-50 to-white' : ''}`}
                onClick={() => handlePlanSelect(plan.duration, plan.tier)}
              >
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    {/* Icon */}
                    <div className="flex justify-center">
                      {plan.icon}
                    </div>

                    {/* Plan name */}
                    <div>
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className="text-sm text-gray-600">{plan.nameVi}</p>
                      <p className="text-xs text-gray-500 mt-1">{plan.description}</p>
                      <p className="text-xs text-gray-500">{plan.descriptionVi}</p>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">{plan.priceLabel}</span>
                        <span className="text-sm text-gray-500">{plan.durationLabel}</span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-500 line-through">${plan.wasPrice}</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                          {discount}% off
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-gray-600">
                        Giá cũ ${plan.wasPrice}, chỉ còn {plan.priceLabel}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 text-left">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Select button */}
                    <Button
                      className={`w-full ${
                        isSelected 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanSelect(plan.duration, plan.tier);
                      }}
                    >
                      {isSelected ? (
                        <span className="flex items-center gap-2">
                          <Check className="h-4 w-4" />
                          Selected / Đã chọn
                        </span>
                      ) : (
                        'Select / Chọn'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Featured add-on */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Switch 
              checked={featuredAddOn}
              onCheckedChange={setFeaturedAddOn}
            />
            <div>
              <p className="font-medium">Featured Add-on</p>
              <p className="text-sm text-gray-600">+$10 (one-time, applies to any plan)</p>
              <p className="text-sm text-gray-600">+$10 (một lần duy nhất cho bất kỳ gói nào)</p>
            </div>
          </div>
          <div className="text-lg font-bold text-yellow-600">+$10</div>
        </div>
      </div>
    </div>
  );
};

export default SalonPricingCards;
