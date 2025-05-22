
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Check, CheckCircle2, Info, Lock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatCurrency } from '@/lib/utils';
import { PRICING_PLANS, DURATION_OPTIONS, calculateTotalPrice } from '@/utils/posting/pricingConfig';

interface PricingGridProps {
  onSelectPlan?: (tier: string, durationMonths: number, autoRenew: boolean) => void;
  showDiamondPlan?: boolean;
}

export const PricingGrid = ({ onSelectPlan, showDiamondPlan = false }: PricingGridProps) => {
  const { t, isVietnamese } = useTranslation();
  const [selectedDuration, setSelectedDuration] = useState(1); // Default to monthly
  const [autoRenew, setAutoRenew] = useState(true); // Default to auto-renew

  // Filter out hidden plans unless specifically shown
  const displayPlans = PRICING_PLANS.filter(plan => 
    !plan.hidden || (plan.tier === 'diamond' && showDiamondPlan)
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Duration selector */}
      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-xl font-medium mb-4">
          {t({
            english: "Select Subscription Duration",
            vietnamese: "Chọn Thời Hạn Đăng Ký"
          })}
        </h2>
        
        <div className="bg-gray-100 p-1.5 rounded-lg grid grid-cols-4 gap-1 w-full max-w-md">
          {DURATION_OPTIONS.map((option) => (
            <button
              key={option.months}
              onClick={() => setSelectedDuration(option.months)}
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                selectedDuration === option.months
                  ? "bg-white shadow-sm text-purple-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {isVietnamese ? option.vietnameseLabel : option.label}
              {option.discount > 0 && (
                <span className="ml-1 text-xs text-green-600 font-semibold">
                  -{option.discount}%
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Auto-renew toggle */}
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="auto-renew"
            checked={autoRenew}
            onChange={() => setAutoRenew(!autoRenew)}
            className="rounded text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="auto-renew" className="text-sm">
            {t({
              english: "Enable Auto-renew (save an additional 5%)",
              vietnamese: "Bật tự động gia hạn (tiết kiệm thêm 5%)"
            })}
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  {t({
                    english: "You can cancel auto-renewal anytime from your dashboard",
                    vietnamese: "Bạn có thể hủy tự động gia hạn bất kỳ lúc nào từ bảng điều khiển"
                  })}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Pricing cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayPlans.map((plan) => {
          // Skip free plan for longer durations
          if (plan.tier === 'free' && selectedDuration > 1) {
            return null;
          }

          const { finalPrice, originalPrice, discountPercentage, savings } = calculateTotalPrice(
            plan.tier, 
            selectedDuration, 
            autoRenew
          );
          
          const isPopular = plan.tier === 'premium';
          const isDiamond = plan.tier === 'diamond';

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * displayPlans.indexOf(plan) }}
              className={`relative rounded-xl border overflow-hidden ${
                isPopular
                  ? "border-purple-200 shadow-lg"
                  : isDiamond
                  ? "border-blue-200 shadow-md"
                  : "border-gray-200"
              }`}
            >
              {/* Popular badge */}
              {isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs px-3 py-1 transform rotate-45 translate-x-2 translate-y-3 font-semibold">
                    {t({
                      english: "POPULAR",
                      vietnamese: "PHỔ BIẾN"
                    })}
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div 
                className={`px-6 py-4 ${
                  isPopular 
                    ? "bg-gradient-to-br from-purple-50 to-indigo-50" 
                    : isDiamond 
                    ? "bg-gradient-to-br from-blue-50 to-cyan-50" 
                    : "bg-white"
                }`}
              >
                <h3 className="text-lg font-bold">
                  {plan.name}
                  {isDiamond && (
                    <Lock className="h-4 w-4 ml-2 inline-block text-blue-500" />
                  )}
                </h3>
                
                {/* Price display */}
                <div className="mt-2">
                  <span className="text-3xl font-extrabold">
                    {formatCurrency(finalPrice)}
                  </span>
                  
                  {selectedDuration === 1 ? (
                    <span className="text-gray-500 ml-1">/mo</span>
                  ) : (
                    <span className="text-gray-500 ml-1">
                      /{t({
                        english: `${selectedDuration} months`,
                        vietnamese: `${selectedDuration} tháng`
                      })}
                    </span>
                  )}
                </div>
                
                {/* Original price & savings */}
                {discountPercentage > 0 && (
                  <div className="mt-1 text-sm">
                    <span className="text-gray-500 line-through mr-2">
                      {formatCurrency(originalPrice)}
                    </span>
                    <span className="text-green-600 font-medium">
                      Save {formatCurrency(savings)}
                    </span>
                  </div>
                )}
                
                {/* Description */}
                <p className="mt-3 text-sm text-gray-600">
                  {isVietnamese ? plan.vietnameseDescription : plan.description}
                </p>
              </div>

              {/* Features list */}
              <div className="px-6 py-4 bg-white">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="flex-shrink-0 mr-2 mt-0.5">
                        <CheckCircle2 className={`h-4 w-4 ${
                          isPopular ? "text-purple-500" : 
                          isDiamond ? "text-blue-500" :
                          "text-green-500"
                        }`} />
                      </span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Select button */}
                <div className="mt-6">
                  <Button
                    onClick={() => onSelectPlan?.(plan.tier, selectedDuration, autoRenew)}
                    className={`w-full ${
                      isPopular
                        ? "bg-purple-600 hover:bg-purple-700"
                        : isDiamond
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    }`}
                    disabled={isDiamond && !showDiamondPlan}
                  >
                    {isDiamond && !showDiamondPlan ? (
                      t({
                        english: "Apply to Unlock",
                        vietnamese: "Đăng ký để mở khóa"
                      })
                    ) : (
                      t({
                        english: "Select Plan",
                        vietnamese: "Chọn gói"
                      })
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Diamond plan teaser (when not showing the full diamond plan) */}
      {!showDiamondPlan && (
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
            onClick={() => onSelectPlan?.('diamond', 1, true)}
          >
            <Star className="mr-2 h-4 w-4" />
            {t({
              english: "Apply for Diamond Plan",
              vietnamese: "Đăng ký gói Kim Cương"
            })}
          </Button>
          <p className="mt-2 text-sm text-gray-500">
            {t({
              english: "Our premium service with custom pricing and full-service recruitment",
              vietnamese: "Dịch vụ cao cấp với giá tùy chỉnh và tuyển dụng toàn diện"
            })}
          </p>
        </div>
      )}
    </div>
  );
};
