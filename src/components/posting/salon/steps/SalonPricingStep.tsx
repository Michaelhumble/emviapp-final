
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check, Star, Crown, Diamond, Zap } from 'lucide-react';

interface SalonPricingStepProps {
  pricingOptions: any;
  setPricingOptions: React.Dispatch<React.SetStateAction<any>>;
}

const SalonPricingStep: React.FC<SalonPricingStepProps> = ({ 
  pricingOptions, 
  setPricingOptions 
}) => {
  const [selectedPlan, setSelectedPlan] = useState('3-month');
  const [autoRenew, setAutoRenew] = useState(true);
  const [nationwide, setNationwide] = useState(false);

  const plans = [
    {
      id: '1-month',
      name: 'Basic Listing',
      nameVi: 'Gói Cơ Bản',
      duration: '1 Month',
      durationVi: '1 Tháng',
      price: '$19.99',
      originalPrice: '$24.99',
      discount: '20% off',
      discountVi: 'Giảm 20%',
      period: '/mo',
      periodVi: '/tháng',
      description: 'Perfect for testing the waters',
      descriptionVi: 'Hoàn hảo để thử nghiệm thị trường',
      features: [
        { en: 'Basic visibility', vi: 'Hiển thị cơ bản' },
        { en: '30-day duration', vi: 'Thời hạn 30 ngày' },
        { en: 'Standard placement', vi: 'Vị trí tiêu chuẩn' }
      ],
      icon: <Check className="h-5 w-5" />,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      buttonColor: 'bg-gray-700 hover:bg-gray-800 text-white'
    },
    {
      id: '3-month',
      name: 'Gold Featured',
      nameVi: 'Gói Vàng Nổi Bật',
      duration: '3 Months',
      durationVi: '3 Tháng',
      price: '$54.99',
      originalPrice: '$74.99',
      discount: '27% off',
      discountVi: 'Giảm 27%',
      period: '/3mo',
      periodVi: '/3 tháng',
      description: 'Stand out from the crowd',
      descriptionVi: 'Nổi bật giữa đám đông',
      features: [
        { en: 'Featured placement', vi: 'Vị trí nổi bật' },
        { en: 'Gold badge', vi: 'Huy hiệu vàng' },
        { en: 'Priority listing', vi: 'Ưu tiên hiển thị' },
        { en: 'Enhanced visibility', vi: 'Tăng khả năng hiển thị' }
      ],
      icon: <Star className="h-5 w-5" />,
      bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      borderColor: 'border-yellow-400',
      buttonColor: 'bg-orange-600 hover:bg-orange-700 text-white',
      badge: 'Most Popular',
      badgeVi: 'Phổ Biến Nhất',
      badgeCount: '8 left',
      badgeCountVi: 'Còn 8',
      isPopular: true
    },
    {
      id: '6-month',
      name: 'Premium Listing',
      nameVi: 'Gói Cao Cấp',
      duration: '6 Months',
      durationVi: '6 Tháng',
      price: '$99.99',
      originalPrice: '$149.99',
      discount: '33% off',
      discountVi: 'Giảm 33%',
      period: '/6mo',
      periodVi: '/6 tháng',
      description: 'Maximum exposure and insights',
      descriptionVi: 'Phơi bày tối đa và thông tin chi tiết',
      features: [
        { en: 'Top placement', vi: 'Vị trí hàng đầu' },
        { en: 'Premium badge', vi: 'Huy hiệu cao cấp' },
        { en: 'Analytics dashboard', vi: 'Bảng điều khiển phân tích' },
        { en: 'Priority support', vi: 'Hỗ trợ ưu tiên' }
      ],
      icon: <Crown className="h-5 w-5" />,
      bgColor: 'bg-white',
      borderColor: 'border-purple-300',
      buttonColor: 'bg-purple-600 hover:bg-purple-700 text-white'
    },
    {
      id: '12-month',
      name: 'Diamond Exclusive',
      nameVi: 'Gói Kim Cương Độc Quyền',
      duration: '12 Months',
      durationVi: '12 Tháng',
      price: '$145.99',
      originalPrice: '$300.00',
      discount: '51% off',
      discountVi: 'Giảm 51%',
      period: '/year',
      periodVi: '/năm',
      description: 'White-glove service and exclusivity',
      descriptionVi: 'Dịch vụ cao cấp và độc quyền',
      features: [
        { en: 'Highest placement', vi: 'Vị trí cao nhất' },
        { en: 'Diamond badge', vi: 'Huy hiệu kim cương' },
        { en: 'Personal manager', vi: 'Quản lý cá nhân' },
        { en: 'Exclusive analytics', vi: 'Phân tích độc quyền' }
      ],
      icon: <Diamond className="h-5 w-5" />,
      bgColor: 'bg-white',
      borderColor: 'border-cyan-300',
      buttonColor: 'bg-cyan-600 hover:bg-cyan-700 text-white',
      badge: 'Best Value',
      badgeVi: 'Giá Trị Tốt Nhất',
      badgeCount: '2 left',
      badgeCountVi: 'Còn 2'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setPricingOptions({
      ...pricingOptions,
      selectedPlan: planId,
      autoRenew,
      nationwide
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Pricing Plan / Chọn Gói Đăng Tin
          </h2>
          <p className="text-gray-600 text-lg">
            Choose the plan and duration that fits your needs / Chọn gói và thời hạn đăng tin phù hợp với nhu cầu của bạn
          </p>
        </div>

        {/* Sub Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Chọn Gói Đăng Tin / Choose Your Listing Plan
          </h3>
          <p className="text-gray-600">
            Chọn thời hạn phù hợp để salon của bạn tiếp cận đúng đối tượng khách hàng.<br />
            Select the right duration to reach your target buyers effectively.
          </p>
        </div>

        {/* Toggle Options */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center space-x-3">
            <Switch
              checked={autoRenew}
              onCheckedChange={setAutoRenew}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className="text-sm font-medium">
              Auto-renew (Save 5%) / Tự động gia hạn (Tiết kiệm 5%)
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Switch
              checked={nationwide}
              onCheckedChange={setNationwide}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className="text-sm font-medium">
              Nationwide visibility (+$5) / Hiển thị toàn quốc (+5$)
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-orange-500 text-white px-3 py-1 text-xs font-medium">
                    {plan.badge} / {plan.badgeVi}
                  </Badge>
                </div>
              )}
              
              {plan.badge && !plan.isPopular && (
                <div className="absolute -top-3 right-4 z-10">
                  <Badge className="bg-red-500 text-white px-2 py-1 text-xs">
                    {plan.badgeCount} / {plan.badgeCountVi}
                  </Badge>
                </div>
              )}

              <Card 
                className={`relative h-full transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  selectedPlan === plan.id 
                    ? 'ring-2 ring-purple-500 shadow-lg' 
                    : 'hover:shadow-md'
                } ${plan.borderColor} ${
                  plan.id === '3-month' 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                    : plan.bgColor
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                <CardContent className="p-6">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                      plan.id === '3-month' ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      <div className={plan.id === '3-month' ? 'text-white' : 'text-gray-600'}>
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold mb-1 ${
                      plan.id === '3-month' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${
                      plan.id === '3-month' ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {plan.nameVi}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className={`text-3xl font-bold mb-1 ${
                      plan.id === '3-month' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {plan.price}
                      <span className={`text-lg font-normal ${
                        plan.id === '3-month' ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {plan.period}
                      </span>
                    </div>
                    <div className={`text-sm ${
                      plan.id === '3-month' ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      <span className="line-through mr-2">{plan.originalPrice}</span>
                      <Badge className={`text-xs ${
                        plan.id === '3-month' 
                          ? 'bg-white/20 text-white border-white/30' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {plan.discount}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-center text-sm mb-6 ${
                    plan.id === '3-month' ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {plan.description}<br />
                    <em>{plan.descriptionVi}</em>
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className={`h-4 w-4 mt-0.5 mr-3 flex-shrink-0 ${
                          plan.id === '3-month' ? 'text-white' : 'text-green-500'
                        }`} />
                        <div className={`text-sm ${
                          plan.id === '3-month' ? 'text-white/90' : 'text-gray-600'
                        }`}>
                          {feature.en}<br />
                          <em className="text-xs">{feature.vi}</em>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <Button 
                    className={`w-full ${
                      selectedPlan === plan.id 
                        ? plan.id === '3-month'
                          ? 'bg-white text-orange-600 hover:bg-gray-50'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                        : plan.buttonColor
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {selectedPlan === plan.id ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Selected / Đã Chọn
                      </>
                    ) : (
                      plan.id === '1-month' ? 'Start Free / Bắt Đầu Miễn Phí' :
                      plan.id === '3-month' ? 'Select Gold / Chọn Vàng' :
                      plan.id === '6-month' ? 'Upgrade Premium / Nâng Cấp' :
                      'Apply Diamond / Chọn Kim Cương'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Premium Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-400 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="h-6 w-6 mr-3" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      Featured Boost / Tăng Cường Nổi Bật
                    </h4>
                    <p className="text-white/90 text-sm">
                      Stand out with premium placement / Nổi bật với vị trí cao cấp
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">+$10</div>
                  <div className="text-xs text-white/80">one-time / một lần</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SalonPricingStep;
