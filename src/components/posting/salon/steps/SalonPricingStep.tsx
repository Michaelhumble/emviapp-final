
import React from "react";
import { motion } from "framer-motion";
import { type SalonPricingTier, SalonPricingOptions } from "@/utils/posting/salonPricing";
import SalonPlanSelectionWithoutPrices from "../SalonPlanSelectionWithoutPrices";
import SalonPostOptions from "../SalonPostOptions";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, TrendingUp, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SalonPricingStepProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  form: UseFormReturn<SalonFormValues>;
}

const pricingPlans = [
  {
    duration: 1,
    originalPrice: 24.99,
    salePrice: 19.99,
    savings: 20,
    label: { english: 'Quick Sale', vietnamese: 'Bán Nhanh' },
    popular: false
  },
  {
    duration: 3,
    originalPrice: 74.99,
    salePrice: 54.99,
    savings: 27,
    label: { english: 'Most Popular', vietnamese: 'Phổ Biến Nhất' },
    popular: true
  },
  {
    duration: 6,
    originalPrice: 149.99,
    salePrice: 99.99,
    savings: 33,
    label: { english: 'Great Value', vietnamese: 'Giá Trị Tốt' },
    popular: false
  },
  {
    duration: 12,
    originalPrice: 300.00,
    salePrice: 145.99,
    savings: 51,
    label: { english: 'Best Value!', vietnamese: 'Tiết Kiệm Nhất!' },
    popular: false,
    bestValue: true
  }
];

export const SalonPricingStep = ({ selectedOptions, onOptionsChange, form }: SalonPricingStepProps) => {
  const { t } = useTranslation();
  
  const handlePricingSelect = (tier: SalonPricingTier, finalPrice: number) => {
    const updatedOptions = {
      ...selectedOptions,
      selectedPricingTier: tier
    };
    onOptionsChange(updatedOptions);
    form.setValue('autoRenew', updatedOptions.autoRenew || false);
  };

  const handleOptionsChange = (options: SalonPricingOptions) => {
    onOptionsChange(options);
    form.setValue('autoRenew', options.autoRenew || false);
  };

  const handleDurationSelect = (months: number) => {
    const updatedOptions = {
      ...selectedOptions,
      durationMonths: months
    };
    onOptionsChange(updatedOptions);
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          {t({
            english: 'Choose Your Success Plan',
            vietnamese: 'Chọn Gói Thành Công'
          })}
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {t({
            english: 'Get maximum exposure for your salon with our premium listing packages',
            vietnamese: 'Tối đa hóa sự tiếp cận cho salon với các gói đăng tin cao cấp'
          })}
        </p>
      </motion.div>

      {/* FOMO Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-600" />
            <span className="text-red-700 font-semibold">
              {t({
                english: 'Limited Time: Deep Discounts Available!',
                vietnamese: 'Thời Gian Có Hạn: Giảm Giá Sâu!'
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-600" />
            <span className="text-orange-700 font-medium">
              {t({
                english: '127 salons upgraded this week',
                vietnamese: '127 salon đã nâng cấp tuần này'
              })}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.duration}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <Card 
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                selectedOptions.durationMonths === plan.duration
                  ? 'ring-2 ring-purple-500 shadow-xl transform scale-105'
                  : 'hover:shadow-lg'
              } ${plan.bestValue ? 'border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50' : 'bg-white'}`}
              onClick={() => handleDurationSelect(plan.duration)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-4 py-1">
                    {t(plan.label)}
                  </Badge>
                </div>
              )}
              
              {plan.bestValue && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-600 text-white px-4 py-1 animate-pulse">
                    {t(plan.label)}
                  </Badge>
                </div>
              )}

              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <h3 className="font-bold text-lg mb-2">
                    {plan.duration} {t({
                      english: plan.duration === 1 ? 'Month' : 'Months',
                      vietnamese: plan.duration === 1 ? 'Tháng' : 'Tháng'
                    })}
                  </h3>
                  
                  {/* Original Price (crossed out) */}
                  <div className="text-sm text-gray-500 line-through mb-1">
                    {t({
                      english: `Was $${plan.originalPrice.toFixed(2)}`,
                      vietnamese: `Trước: $${plan.originalPrice.toFixed(2)}`
                    })}
                  </div>
                  
                  {/* Sale Price */}
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    ${plan.salePrice.toFixed(2)}
                  </div>
                  
                  {/* Per Month Calculation */}
                  {plan.duration > 1 && (
                    <div className="text-sm text-gray-600 mb-2">
                      ${(plan.salePrice / plan.duration).toFixed(2)}/
                      {t({
                        english: 'month',
                        vietnamese: 'tháng'
                      })}
                    </div>
                  )}
                  
                  {/* Savings Badge */}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    plan.bestValue 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    <TrendingUp className="h-3 w-3" />
                    {t({
                      english: `Save ${plan.savings}%!`,
                      vietnamese: `Tiết kiệm ${plan.savings}%!`
                    })}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>{t({
                      english: 'Premium visibility',
                      vietnamese: 'Hiển thị cao cấp'
                    })}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>{t({
                      english: 'Verified buyers only',
                      vietnamese: 'Chỉ người mua đã xác minh'
                    })}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add-on Options */}
      <div className="border-t pt-8 mt-8">
        <SalonPostOptions
          options={selectedOptions}
          onOptionsChange={handleOptionsChange}
          isFirstPost={false}
        />
      </div>

      {/* Trust & Promise Section */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mt-8">
        <div className="flex items-start gap-4">
          <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="text-blue-800">
            <h4 className="font-bold text-lg mb-2">
              {t({
                english: 'Our Promise to You',
                vietnamese: 'Cam Kết Của Chúng Tôi'
              })}
            </h4>
            <p className="leading-relaxed">
              {t({
                english: 'Your salon listing will reach thousands of verified, qualified buyers actively searching for businesses like yours. We guarantee premium placement and provide dedicated support throughout your selling journey.',
                vietnamese: 'Tin đăng salon của bạn sẽ tiếp cận hàng nghìn người mua đã xác minh, có đủ điều kiện đang tích cực tìm kiếm doanh nghiệp như của bạn. Chúng tôi đảm bảo vị trí cao cấp và hỗ trợ tận tình trong suốt hành trình bán hàng.'
              })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
