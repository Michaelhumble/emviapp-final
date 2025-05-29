
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Star, Crown, Zap, CheckCircle, Sparkles, Timer, TrendingUp } from 'lucide-react';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { calculateSalonPostPrice } from '@/utils/posting/salonPricing';

interface SalonPricingStepProps {
  pricing: SalonPricingOptions;
  setPricing: (pricing: SalonPricingOptions) => void;
}

const SalonPricingStep = ({ pricing, setPricing }: SalonPricingStepProps) => {
  const plans = [
    {
      id: 1,
      duration: 1,
      title: 'Quick Start',
      titleVi: 'Bắt đầu nhanh',
      price: 19.99,
      originalPrice: 24.99,
      discount: 20,
      tagline: 'Perfect for testing the waters',
      taglineVi: 'Hoàn hảo để thử nghiệm',
      features: [
        'Basic salon listing / Đăng tin cơ bản',
        'Search visibility / Hiển thị trong tìm kiếm',
        'Contact information / Thông tin liên hệ',
        'Photo gallery / Thư viện hình ảnh'
      ],
      badge: null,
      color: 'border-gray-200 hover:border-purple-300',
      selectedColor: 'border-purple-500 bg-purple-50'
    },
    {
      id: 3,
      duration: 3,
      title: 'Popular Choice',
      titleVi: 'Lựa chọn phổ biến',
      price: 54.99,
      originalPrice: 74.99,
      discount: 27,
      tagline: 'Stand out from the crowd',
      taglineVi: 'Nổi bật giữa đám đông',
      features: [
        'Everything in Quick Start / Mọi thứ trong Bắt đầu nhanh',
        'Priority placement / Ưu tiên hiển thị',
        'Enhanced visibility / Tăng cường hiển thị',
        'Email support / Hỗ trợ email'
      ],
      badge: 'Most Popular',
      badgeVi: 'Phổ biến nhất',
      color: 'border-yellow-300 hover:border-yellow-400',
      selectedColor: 'border-yellow-500 bg-yellow-50'
    },
    {
      id: 6,
      duration: 6,
      title: 'Best Value',
      titleVi: 'Giá trị tốt nhất',
      price: 99.99,
      originalPrice: 149.99,
      discount: 33,
      tagline: 'Maximum exposure and insights',
      taglineVi: 'Tiếp xúc tối đa và thông tin chi tiết',
      features: [
        'Everything in Popular / Mọi thứ trong Phổ biến',
        'Featured placement / Vị trí nổi bật',
        'Analytics dashboard / Bảng điều khiển phân tích',
        'Priority support / Hỗ trợ ưu tiên'
      ],
      badge: 'Best Value',
      badgeVi: 'Giá trị tốt nhất',
      color: 'border-purple-300 hover:border-purple-400',
      selectedColor: 'border-purple-500 bg-purple-50'
    },
    {
      id: 12,
      duration: 12,
      title: 'Premium Annual',
      titleVi: 'Cao cấp hàng năm',
      price: 145.99,
      originalPrice: 300.00,
      discount: 51,
      tagline: 'White-glove service and exclusivity',
      taglineVi: 'Dịch vụ cao cấp và độc quyền',
      features: [
        'Everything in Best Value / Mọi thứ trong Giá trị tốt nhất',
        'Top placement / Vị trí hàng đầu',
        'Personal manager / Quản lý cá nhân',
        'Exclusive analytics / Phân tích độc quyền'
      ],
      badge: 'Premium',
      badgeVi: 'Cao cấp',
      color: 'border-emerald-300 hover:border-emerald-400',
      selectedColor: 'border-emerald-500 bg-emerald-50'
    }
  ];

  const selectedPlan = plans.find(plan => plan.duration === pricing.durationMonths) || plans[1];
  const finalPrice = calculateSalonPostPrice(pricing);

  const handlePlanSelect = (duration: number) => {
    setPricing({
      ...pricing,
      durationMonths: duration
    });
  };

  const handleFeaturedToggle = (checked: boolean) => {
    setPricing({
      ...pricing,
      featuredAddOn: checked
    });
  };

  const handleAutoRenewToggle = (checked: boolean) => {
    setPricing({
      ...pricing,
      autoRenew: checked
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <Crown className="w-6 h-6 text-purple-600" />
          </div>
          <span className="ml-3 text-xl font-medium">💎 Choose Your Plan / Chọn gói của bạn</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to showcase your salon. All plans include premium features!
          <br />
          <span className="text-purple-600 font-medium">
            Chọn gói hoàn hảo để giới thiệu salon của bạn. Tất cả gói đều bao gồm tính năng cao cấp!
          </span>
        </p>
      </div>

      {/* Auto-renew and Nationwide toggles */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border">
          <Switch
            id="auto-renew"
            checked={pricing.autoRenew}
            onCheckedChange={handleAutoRenewToggle}
          />
          <label htmlFor="auto-renew" className="text-sm font-medium cursor-pointer">
            Auto-renew (Save 5%) / Tự động gia hạn (Tiết kiệm 5%)
          </label>
        </div>
        
        <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border">
          <Switch
            id="nationwide"
            checked={pricing.isNationwide}
            onCheckedChange={(checked) => setPricing({ ...pricing, isNationwide: checked })}
          />
          <label htmlFor="nationwide" className="text-sm font-medium cursor-pointer">
            Nationwide visibility (+$5) / Hiển thị toàn quốc (+$5)
          </label>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                pricing.durationMonths === plan.duration 
                  ? plan.selectedColor + ' ring-2 ring-purple-500 shadow-lg' 
                  : plan.color
              }`}
              onClick={() => handlePlanSelect(plan.duration)}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium px-3 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardContent className="p-6 relative">
                {pricing.durationMonths === plan.duration && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-purple-500" />
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{plan.titleVi}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${plan.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        /{plan.duration === 1 ? 'mo' : `${plan.duration}mo`}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-400 line-through">
                        ${plan.originalPrice.toFixed(2)}
                      </span>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        {plan.discount}% off
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {plan.tagline}
                    <br />
                    <span className="text-purple-600">{plan.taglineVi}</span>
                  </p>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  className={`w-full mt-6 ${
                    pricing.durationMonths === plan.duration
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handlePlanSelect(plan.duration)}
                >
                  {pricing.durationMonths === plan.duration ? 'Selected ✓' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Featured Add-on */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8"
      >
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-yellow-900">Featured Placement</h3>
                    <Badge className="bg-yellow-500 text-white text-xs">HOT</Badge>
                  </div>
                  <p className="text-sm text-yellow-800 mb-2">
                    Add Featured Placement for just $10 (one-time)
                    <br />
                    <span className="font-medium">Thêm Nổi Bật chỉ $10 một lần duy nhất</span>
                  </p>
                  <div className="flex items-center gap-2 text-xs text-yellow-700">
                    <Zap className="w-3 h-3" />
                    <span>10x more visibility • Ưu tiên hiển thị gấp 10 lần</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={pricing.featuredAddOn}
                  onCheckedChange={handleFeaturedToggle}
                  className="data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                />
                <label htmlFor="featured" className="cursor-pointer font-medium text-yellow-900">
                  Add Featured (+$10)
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Price Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-purple-900 mb-2">
                  Order Summary / Tóm tắt đơn hàng
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>{selectedPlan.title} ({selectedPlan.duration} months)</span>
                    <span>${selectedPlan.price.toFixed(2)}</span>
                  </div>
                  {pricing.featuredAddOn && (
                    <div className="flex justify-between text-yellow-700">
                      <span>Featured Placement (one-time)</span>
                      <span>+$10.00</span>
                    </div>
                  )}
                  {pricing.autoRenew && (
                    <div className="flex justify-between text-green-700">
                      <span>Auto-renew discount (5%)</span>
                      <span>-${(selectedPlan.price * 0.05).toFixed(2)}</span>
                    </div>
                  )}
                  {pricing.isNationwide && (
                    <div className="flex justify-between text-blue-700">
                      <span>Nationwide visibility</span>
                      <span>+$5.00</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">
                  ${finalPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  Total / Tổng cộng
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trust Elements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
            <span className="font-medium text-green-900">💰 Success Rate:</span>
          </div>
          <p className="text-green-800 text-sm">
            Salons with premium listings sell 3x faster!
            <br />
            <span className="text-green-600">Salon có gói cao cấp bán nhanh gấp 3 lần!</span>
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <Timer className="w-4 h-4 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">⚡ Quick Setup:</span>
          </div>
          <p className="text-blue-800 text-sm">
            Your listing goes live immediately after payment.
            <br />
            <span className="text-blue-600">Tin đăng của bạn được phát hành ngay sau khi thanh toán.</span>
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
            <span className="font-medium text-purple-900">🎯 Guarantee:</span>
          </div>
          <p className="text-purple-800 text-sm">
            30-day satisfaction guarantee or full refund.
            <br />
            <span className="text-purple-600">Bảo đảm hài lòng 30 ngày hoặc hoàn tiền đầy đủ.</span>
          </p>
        </div>
      </div>

      {/* Final Note */}
      <div className="text-center text-sm text-gray-600 mt-6 p-4 bg-gray-50 rounded-lg">
        <p>
          All listings expire after chosen duration unless renewed. First-time discounts apply only once per account.
          <br />
          <span className="text-purple-600">
            Tất cả tin đăng hết hạn sau thời gian đã chọn trừ khi gia hạn. Giá ưu đãi lần đầu chỉ áp dụng 1 lần cho mỗi tài khoản.
          </span>
        </p>
      </div>
    </div>
  );
};

export default SalonPricingStep;
