
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import PricingCard from './PricingCards';
import { 
  jobPricingOptions,
  calculateFinalPrice,
  isSubscriptionPlan
} from '@/utils/posting/jobPricing';
import { PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowLeft, AlertTriangle, Check, Timer, Sparkles, TrendingUp, Star, Users } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

interface PricingStepProps {
  onSubmit: (options: PricingOptions) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export const PricingStep: React.FC<PricingStepProps> = ({ 
  onSubmit, 
  onBack, 
  isSubmitting = false 
}) => {
  const { t } = useTranslation();
  const [selectedPricing, setSelectedPricing] = useState<string>('premium'); // Default to premium
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(true); // Default to auto-renew
  const [showingExpiringOffer, setShowingExpiringOffer] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const options: PricingOptions = {
      selectedPricingTier: selectedPricing,
      durationMonths: selectedDuration,
      autoRenew: autoRenew && isSubscriptionPlan(selectedPricing)
    };
    
    onSubmit(options);
  };
  
  const finalPrice = calculateFinalPrice(Number(selectedPricing), selectedDuration);
  const discountPercentage = selectedDuration > 1 ? Math.round((1 - (finalPrice / (Number(selectedPricing) * selectedDuration))) * 100) : 0;
  
  const handleCloseExpiringOffer = () => {
    setShowingExpiringOffer(false);
  };
  
  // Get appropriate icon for the tier
  const getTierIcon = (tier: string) => {
    switch(tier) {
      case 'diamond':
        return <Sparkles className="h-5 w-5 text-blue-500" />;
      case 'gold':
        return <Star className="h-5 w-5 text-amber-500" />;
      case 'premium':
        return <TrendingUp className="h-5 w-5 text-purple-600" />;
      case 'standard':
        return <Check className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit}>
        {showingExpiringOffer && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 relative"
          >
            <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100">
              <CardContent className="p-4 pr-12">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <Timer className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-amber-900">
                      {t({
                        english: "Limited time offer",
                        vietnamese: "Ưu đãi có thời hạn"
                      })}
                    </h3>
                    <p className="text-xs text-amber-800">
                      {t({
                        english: "Get 20% off Diamond Plan for 24 hours. Ends today at midnight!",
                        vietnamese: "Giảm giá 20% Gói Kim Cương trong 24 giờ. Kết thúc hôm nay lúc nửa đêm!"
                      })}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCloseExpiringOffer}
                  className="absolute top-4 right-4 text-amber-700 hover:text-amber-900"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              {t({
                english: "Choose Your Posting Package",
                vietnamese: "Chọn Gói Đăng Tin"
              })}
            </h2>
            
            <p className="text-gray-600 mb-4">
              {t({
                english: "Select the visibility level for your job posting",
                vietnamese: "Chọn mức độ hiển thị cho tin tuyển dụng của bạn"
              })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobPricingOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <PricingCard
                  id={option.id}
                  name={option.name}
                  price={option.price}
                  description={option.description}
                  vietnameseDescription={option.vietnameseDescription}
                  tag={option.tag}
                  popular={option.popular}
                  features={option.features}
                  tier={option.tier}
                  selectedPricing={selectedPricing}
                  onChange={(id) => setSelectedPricing(id)}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Duration selection */}
          {selectedPricing !== 'free' && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">
                {t({
                  english: "Choose Duration & Save",
                  vietnamese: "Chọn Thời Hạn & Tiết Kiệm"
                })}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "relative rounded-lg border p-4 cursor-pointer transition-all",
                    selectedDuration === 1 ? "border-purple-200 bg-purple-50" : "border-gray-200 bg-white"
                  )}
                  onClick={() => setSelectedDuration(1)}
                >
                  <RadioGroup value={String(selectedDuration)} onValueChange={value => setSelectedDuration(Number(value))}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="duration-1" />
                      <Label htmlFor="duration-1" className="font-medium">
                        {t({
                          english: "1 Month",
                          vietnamese: "1 Tháng"
                        })}
                      </Label>
                    </div>
                  </RadioGroup>
                  <p className="mt-1 text-sm text-gray-500">
                    {t({
                      english: "Standard rate",
                      vietnamese: "Giá tiêu chuẩn"
                    })}
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "relative rounded-lg border p-4 cursor-pointer transition-all",
                    selectedDuration === 3 ? "border-purple-200 bg-purple-50" : "border-gray-200 bg-white"
                  )}
                  onClick={() => setSelectedDuration(3)}
                >
                  <Badge className="absolute -top-2 right-2 bg-green-600 text-xs">
                    <Check className="h-3 w-3 mr-1" /> 
                    {t({
                      english: "SAVE 10%",
                      vietnamese: "TIẾT KIỆM 10%"
                    })}
                  </Badge>
                  <RadioGroup value={String(selectedDuration)} onValueChange={value => setSelectedDuration(Number(value))}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="duration-3" />
                      <Label htmlFor="duration-3" className="font-medium">
                        {t({
                          english: "3 Months",
                          vietnamese: "3 Tháng"
                        })}
                      </Label>
                    </div>
                  </RadioGroup>
                  <p className="mt-1 text-sm text-gray-500">
                    {t({
                      english: "10% discount applied",
                      vietnamese: "Giảm giá 10% đã áp dụng"
                    })}
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "relative rounded-lg border p-4 cursor-pointer transition-all",
                    selectedDuration === 6 ? "border-purple-200 bg-purple-50" : "border-gray-200 bg-white"
                  )}
                  onClick={() => setSelectedDuration(6)}
                >
                  <Badge className="absolute -top-2 right-2 bg-green-600 text-xs">
                    <Check className="h-3 w-3 mr-1" /> 
                    {t({
                      english: "BEST VALUE",
                      vietnamese: "GIÁ TRỊ TỐT NHẤT"
                    })}
                  </Badge>
                  <RadioGroup value={String(selectedDuration)} onValueChange={value => setSelectedDuration(Number(value))}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="6" id="duration-6" />
                      <Label htmlFor="duration-6" className="font-medium">
                        {t({
                          english: "6 Months",
                          vietnamese: "6 Tháng"
                        })}
                      </Label>
                    </div>
                  </RadioGroup>
                  <p className="mt-1 text-sm text-gray-500">
                    {t({
                      english: "20% discount applied",
                      vietnamese: "Giảm giá 20% đã áp dụng"
                    })}
                  </p>
                </motion.div>
              </div>
            </div>
          )}
          
          {/* Auto-renew option for subscription plans */}
          {selectedPricing !== 'free' && isSubscriptionPlan(selectedPricing) && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="auto-renew"
                  checked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-5 w-5 mt-0.5"
                />
                <div className="ml-3">
                  <label htmlFor="auto-renew" className="text-sm font-medium text-gray-900">
                    {t({
                      english: "Auto-renew my plan (recommended)",
                      vietnamese: "Tự động gia hạn gói của tôi (khuyến nghị)"
                    })}
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    {t({
                      english: "Keep your listing active to receive applications continuously. Cancel anytime.",
                      vietnamese: "Giữ tin đăng của bạn hoạt động để nhận đơn ứng tuyển liên tục. Hủy bất cứ lúc nào."
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Social proof - recent hires */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-900">
                  {t({
                    english: "You're in good company",
                    vietnamese: "Bạn đang ở trong một công ty tốt"
                  })}
                </h3>
                <p className="text-xs text-blue-700">
                  {t({
                    english: "93% of Premium and Diamond plan users hire within 14 days",
                    vietnamese: "93% người dùng gói Premium và Kim Cương tuyển dụng trong vòng 14 ngày"
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Summary and submit buttons */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button 
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isSubmitting}
              className="order-2 sm:order-1 w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t({
                english: "Back to Job Details",
                vietnamese: "Quay lại Chi tiết công việc"
              })}
            </Button>
            
            <div className="flex flex-col order-1 sm:order-2 w-full sm:w-auto text-center sm:text-right mb-4 sm:mb-0">
              <div className="flex items-center justify-center sm:justify-end gap-2 mb-1">
                {getTierIcon(selectedPricing)}
                <span className="font-medium text-lg">
                  {t({
                    english: `${selectedDuration} Month${selectedDuration > 1 ? 's' : ''} of ${selectedPricing.charAt(0).toUpperCase()}${selectedPricing.slice(1)}`,
                    vietnamese: `${selectedDuration} Tháng ${selectedPricing.charAt(0).toUpperCase()}${selectedPricing.slice(1)}`
                  })}
                </span>
              </div>
              
              {discountPercentage > 0 && (
                <div className="text-sm text-green-600 font-medium flex items-center justify-center sm:justify-end">
                  <Check className="h-3 w-3 mr-1" />
                  {t({
                    english: `You save ${discountPercentage}%`,
                    vietnamese: `Bạn tiết kiệm ${discountPercentage}%`
                  })}
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="order-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white w-full sm:w-auto min-w-[150px]"
              size="lg"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t({
                    english: "Publishing...",
                    vietnamese: "Đang đăng..."
                  })}
                </span>
              ) : (
                <span className="flex items-center">
                  {t({
                    english: "Publish Job",
                    vietnamese: "Đăng tin tuyển dụng"
                  })}
                  <Sparkles className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PricingStep;
