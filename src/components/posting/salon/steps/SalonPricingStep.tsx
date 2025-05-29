
import React from "react";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { motion } from "framer-motion";
import { Check, Star, Crown, Diamond, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface SalonPricingStepProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPricingStep = ({ selectedOptions, onOptionsChange, form }: SalonPricingStepProps) => {
  const handleOptionsChange = (options: SalonPricingOptions) => {
    onOptionsChange(options);
    form.setValue('autoRenew', options.autoRenew || false);
  };

  const handlePlanSelect = (duration: number, price: number) => {
    handleOptionsChange({
      ...selectedOptions,
      duration,
      basePrice: price
    });
  };

  const pricingPlans = [
    {
      duration: 1,
      name: "1 Month",
      nameVi: "1 Tháng",
      originalPrice: 24.99,
      currentPrice: 19.99,
      discount: "20% off",
      icon: <Check className="h-5 w-5 text-gray-500" />,
      features: [
        "Basic visibility",
        "30-day duration", 
        "Standard placement",
        "Email support"
      ],
      featuresVi: [
        "Hiển thị cơ bản",
        "Thời hạn 30 ngày",
        "Vị trí tiêu chuẩn", 
        "Hỗ trợ email"
      ]
    },
    {
      duration: 3,
      name: "3 Months",
      nameVi: "3 Tháng", 
      originalPrice: 74.99,
      currentPrice: 54.99,
      discount: "27% off",
      badge: "Most Popular",
      badgeVi: "Phổ biến nhất",
      badgeColor: "bg-orange-500",
      icon: <Star className="h-5 w-5 text-amber-500" />,
      features: [
        "Featured placement",
        "90-day duration",
        "Priority listing",
        "Phone support"
      ],
      featuresVi: [
        "Vị trí nổi bật",
        "Thời hạn 90 ngày", 
        "Ưu tiên hiển thị",
        "Hỗ trợ điện thoại"
      ]
    },
    {
      duration: 6,
      name: "6 Months", 
      nameVi: "6 Tháng",
      originalPrice: 149.99,
      currentPrice: 99.99,
      discount: "33% off",
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      features: [
        "Premium placement",
        "180-day duration",
        "Enhanced visibility", 
        "Priority support"
      ],
      featuresVi: [
        "Vị trí cao cấp",
        "Thời hạn 180 ngày",
        "Tăng cường hiển thị",
        "Hỗ trợ ưu tiên"
      ]
    },
    {
      duration: 12,
      name: "12 Months",
      nameVi: "12 Tháng",
      originalPrice: 300,
      currentPrice: 145.99,
      discount: "51% off", 
      badge: "Best Value",
      badgeVi: "Giá trị tốt nhất",
      badgeColor: "bg-green-500",
      icon: <Diamond className="h-5 w-5 text-cyan-500" />,
      features: [
        "Maximum exposure",
        "365-day duration",
        "Top placement",
        "Dedicated support"
      ],
      featuresVi: [
        "Phơi bày tối đa",
        "Thời hạn 365 ngày",
        "Vị trí hàng đầu", 
        "Hỗ trợ chuyên dụng"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6">
              Chọn Gói Đăng Tin
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Select the perfect plan to showcase your salon and connect with serious buyers.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chọn gói hoàn hảo để giới thiệu salon và kết nối với người mua nghiêm túc.
            </p>
          </motion.div>
        </div>

        {/* Auto-renew and Nationwide Toggles */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 bg-purple-50 px-6 py-3 rounded-full border border-purple-200">
            <Switch
              checked={selectedOptions.autoRenew || false}
              onCheckedChange={(checked) => 
                handleOptionsChange({ ...selectedOptions, autoRenew: checked })
              }
            />
            <div>
              <span className="font-medium text-purple-800">Auto-renew (Save 5%)</span>
              <p className="text-sm text-purple-600">Tự động gia hạn (Tiết kiệm 5%)</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full border border-blue-200">
            <Switch
              checked={selectedOptions.nationwide || false}
              onCheckedChange={(checked) => 
                handleOptionsChange({ ...selectedOptions, nationwide: checked })
              }
            />
            <div>
              <span className="font-medium text-blue-800">Nationwide visibility (+$5)</span>
              <p className="text-sm text-blue-600">Hiển thị toàn quốc (+$5)</p>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.duration}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative"
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 h-full ${
                  selectedOptions.duration === plan.duration
                    ? 'ring-2 ring-purple-500 border-purple-500 shadow-lg'
                    : 'hover:border-purple-300 hover:shadow-md'
                }`}
                onClick={() => handlePlanSelect(plan.duration, plan.currentPrice)}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.badgeColor} text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg`}>
                    {plan.badge}
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    {plan.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-lg font-medium text-gray-700">{plan.nameVi}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ${plan.currentPrice}
                      </span>
                      <span className="text-sm text-gray-500">
                        {plan.duration === 12 ? '/year' : plan.duration === 1 ? '/mo' : `/${plan.duration}mo`}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg text-gray-400 line-through">
                        ${plan.originalPrice}
                      </span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {plan.discount}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-gray-700">{feature}</span>
                          <br />
                          <span className="text-gray-500 text-xs">{plan.featuresVi[idx]}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full transition-all duration-300 ${
                      selectedOptions.duration === plan.duration
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan.duration, plan.currentPrice);
                    }}
                  >
                    {selectedOptions.duration === plan.duration ? (
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        Selected
                      </div>
                    ) : (
                      'Select Plan'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Add-on */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Featured Add-on</h3>
                    <p className="text-base text-gray-700">Gói Nổi Bật Bổ Sung</p>
                    <p className="text-sm text-gray-600 mt-1">
                      + $10 (one-time, applies to any plan)
                    </p>
                    <p className="text-sm text-gray-600">
                      + $10 (một lần duy nhất cho bất kỳ gói nào)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Switch
                    checked={selectedOptions.featured || false}
                    onCheckedChange={(checked) => 
                      handleOptionsChange({ ...selectedOptions, featured: checked })
                    }
                  />
                  <span className="font-bold text-xl text-yellow-700">+$10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
