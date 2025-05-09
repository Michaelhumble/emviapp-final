
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { useTranslation } from '@/hooks/useTranslation';
import { Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { JobPricingOption, PricingOptions, PostType } from '@/utils/posting/types';
import { jobPricingOptions, calculateFinalPrice } from '@/utils/posting/jobPricing';
import { format, addDays } from 'date-fns';

interface ReviewAndPaymentSectionProps {
  postType: PostType;
  jobData?: any;
  onNextStep: () => void;
  onPrevStep: () => void;
  isFirstPost: boolean;
  pricingOptions: PricingOptions;
  onPricingChange: (pricingTier: string) => void;
  onUpdatePricing: (options: Partial<PricingOptions>) => void;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  postType,
  jobData,
  onNextStep,
  onPrevStep,
  isFirstPost,
  pricingOptions,
  onPricingChange,
  onUpdatePricing,
}) => {
  const { t, isVietnamese } = useTranslation();
  const [duration, setDuration] = useState(1);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Selected pricing tier from pricing options
  const selectedPricingTier = pricingOptions.selectedPricingTier || 'standard';
  const autoRenew = pricingOptions.autoRenew || false;

  // Get the selected pricing option details
  const selectedPricing = jobPricingOptions.find(p => p.id === selectedPricingTier);
  const basePrice = selectedPricing?.price || 0;
  const isFreeTier = selectedPricingTier === 'free';
  
  // Get pricing with discount applied
  const { originalPrice, finalPrice, discountPercentage } = calculateFinalPrice(
    basePrice,
    duration,
    selectedPricingTier,
    autoRenew
  );

  // Calculate renewal date - 30 days from today
  const renewalDate = useMemo(() => {
    const date = addDays(new Date(), 30);
    return isVietnamese
      ? format(date, 'd \'tháng\' M, yyyy')
      : format(date, 'MMMM d, yyyy');
  }, [isVietnamese]);
  
  // Calculate discounted renewal price (20% off)
  const renewalPrice = useMemo(() => {
    if (!selectedPricing) return 0;
    return basePrice * 0.8; // 20% off
  }, [basePrice, selectedPricing]);

  // Handle auto-renew toggle
  const handleAutoRenewChange = (checked: boolean) => {
    onUpdatePricing({ autoRenew: checked });
  };

  const handleDurationChange = (value: string) => {
    setDuration(parseInt(value, 10));
  };

  const handlePricingChange = (pricingId: string) => {
    onPricingChange(pricingId);
  };

  const handleSubmitPayment = () => {
    setShowPaymentConfirmation(true);
  };

  const handleConfirmPayment = async () => {
    setIsPaymentProcessing(true);
    setErrorMessage(null);
    
    // Here would be the actual payment processing logic
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      onNextStep();
    } catch (error) {
      setErrorMessage(t(
        'There was an error processing your payment. Please try again.',
        'Đã xảy ra lỗi khi xử lý thanh toán của bạn. Vui lòng thử lại.'
      ));
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-5 gap-8">
        <div className="space-y-6 md:col-span-3">
          {/* Review section */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              {t('Review Your Job Posting', 'Xem lại tin tuyển dụng của bạn')}
            </h3>
            {/* Job preview content would go here */}
            <div className="my-4 p-4 bg-gray-50 rounded-md">
              <h4 className="font-semibold">{jobData?.title || 'Job Title'}</h4>
              <div className="text-sm text-gray-500 mt-1">
                {jobData?.location || 'Location'}
              </div>
              <div className="mt-3">
                {jobData?.description || 'Job description would appear here.'}
              </div>
            </div>
          </div>
          
          {/* Pricing options section */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              {t('Choose Your Pricing Plan', 'Chọn gói đăng tin')}
            </h3>
            
            <div className="space-y-4">
              {/* Pricing tier selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobPricingOptions.map((option) => (
                  <div 
                    key={option.id}
                    className={cn(
                      "border rounded-lg p-4 cursor-pointer hover:border-purple-400 transition-all",
                      selectedPricingTier === option.id ? "border-purple-500 bg-purple-50" : "border-gray-200"
                    )}
                    onClick={() => handlePricingChange(option.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{option.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {isVietnamese ? option.vietnameseDescription : option.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${option.price}</div>
                        {option.wasPrice && (
                          <div className="text-xs text-gray-500 line-through">${option.wasPrice}</div>
                        )}
                      </div>
                    </div>
                    
                    {option.features && option.features.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {option.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <Check size={14} className="mr-2 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {option.popular && (
                      <div className="absolute -top-2 -right-2">
                        <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                          {t('POPULAR', 'PHỔ BIẾN')}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Duration selection */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  {t('Duration', 'Thời hạn')}
                </label>
                <Select value={duration.toString()} onValueChange={handleDurationChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('Select Duration', 'Chọn thời hạn')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">{t('1 Month', '1 Tháng')}</SelectItem>
                      <SelectItem value="3">{t('3 Months (10% off)', '3 Tháng (Giảm 10%)')}</SelectItem>
                      <SelectItem value="6">{t('6 Months (20% off)', '6 Tháng (Giảm 20%)')}</SelectItem>
                      <SelectItem value="12">{t('12 Months (30% off)', '12 Tháng (Giảm 30%)')}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Auto-renew option - only shown for paid plans */}
              {!isFreeTier && (
                <div className="mt-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="auto-renew" 
                              checked={autoRenew}
                              onCheckedChange={handleAutoRenewChange}
                            />
                            <label htmlFor="auto-renew" className="cursor-pointer text-sm font-medium">
                              {t(
                                'Enable Auto-Renew and Save 20%', 
                                'Bật Tự động gia hạn và Tiết kiệm 20%'
                              )}
                            </label>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">
                            {t(
                              'You can cancel anytime. We\'ll remind you before billing.',
                              'Bạn có thể hủy bất kỳ lúc nào. Chúng tôi sẽ nhắc bạn trước khi tính phí.'
                            )}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  {/* New renewal info display - only shown when autoRenew is true */}
                  {autoRenew && !isFreeTier && (
                    <div className="text-xs text-gray-500 ml-10">
                      {isVietnamese 
                        ? `Bạn sẽ bị tính phí $${renewalPrice.toFixed(2)} mỗi 30 ngày bắt đầu từ ${renewalDate} (trừ khi hủy).`
                        : `You'll be billed $${renewalPrice.toFixed(2)} every 30 days starting ${renewalDate} (unless canceled).`
                      }
                    </div>
                  )}
                </div>
              )}
              
              {errorMessage && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              
              <div className="flex justify-between pt-4 mt-4 border-t">
                <Button variant="outline" onClick={onPrevStep}>
                  {t('Back', 'Quay lại')}
                </Button>
                <Button onClick={handleSubmitPayment} disabled={isPaymentProcessing}>
                  {isPaymentProcessing 
                    ? t('Processing...', 'Đang xử lý...') 
                    : t('Proceed to Payment', 'Tiến hành thanh toán')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-4">
            <PaymentSummary
              basePrice={basePrice}
              duration={duration}
              autoRenew={autoRenew}
              originalPrice={originalPrice}
              finalPrice={finalPrice}
              discountPercentage={discountPercentage}
              onProceedToPayment={handleSubmitPayment}
            />
          </div>
        </div>
      </div>
      
      {/* Payment confirmation modal would typically be imported as a separate component */}
      {showPaymentConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              {t('Confirm Payment', 'Xác nhận thanh toán')}
            </h3>
            <p>
              {t(
                'You will be charged',
                'Bạn sẽ bị tính phí'
              )}{' '}
              <strong>${finalPrice.toFixed(2)}</strong>
            </p>
            {discountPercentage > 0 && (
              <p className="text-sm text-green-600">
                {t('You are saving', 'Bạn tiết kiệm được')}{' '}
                {discountPercentage}%
              </p>
            )}
            <div className="flex justify-end space-x-4 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowPaymentConfirmation(false)}
                disabled={isPaymentProcessing}
              >
                {t('Cancel', 'Hủy')}
              </Button>
              <Button 
                onClick={handleConfirmPayment}
                disabled={isPaymentProcessing}
              >
                {isPaymentProcessing 
                  ? t('Processing...', 'Đang xử lý...') 
                  : t('Confirm & Pay', 'Xác nhận & Thanh toán')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewAndPaymentSection;
