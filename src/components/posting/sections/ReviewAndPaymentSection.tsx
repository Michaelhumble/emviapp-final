import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { format, addDays } from 'date-fns';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import DurationSelector from '@/components/posting/DurationSelector';
import PricingDisplay from '@/components/posting/PricingDisplay';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { calculateFinalPrice, jobPricingOptions } from '@/utils/posting/jobPricing';
import { Job } from '@/types/job';
import { PricingOptions, PostType, JobPricingOption } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import StripeCheckout from '@/components/payments/StripeCheckout';
import PaymentConfirmationModal from '@/components/posting/PaymentConfirmationModal';

interface ReviewAndPaymentSectionProps {
  postType: PostType;
  jobData?: Partial<Job>;
  onNextStep: () => void;
  onPrevStep: () => void;
  isFirstPost?: boolean;
  pricingOptions: PricingOptions;
  onPricingChange: (pricingTier: string) => void;
  onUpdatePricing: (options: Partial<PricingOptions>) => void;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({ 
  postType, 
  jobData,
  onNextStep,
  onPrevStep,
  isFirstPost = false,
  pricingOptions,
  onPricingChange,
  onUpdatePricing
}) => {
  // Translation setup
  const { t } = useTranslation();
  
  // State
  const [selectedPricing, setSelectedPricing] = useState<string>(pricingOptions.selectedPricingTier || 'standard');
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(pricingOptions.autoRenew || false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  const navigate = useNavigate();
  
  // Get pricing details for the selected option
  const selectedOption = jobPricingOptions.find(option => option.id === selectedPricing) || jobPricingOptions[0];
  const basePrice = selectedOption.price;
  const isFreeTier = selectedPricing === 'free' || basePrice === 0;

  // Handle diamond plan special case - only 12 months option makes sense
  const isDiamondPlan = selectedPricing === 'diamond';
  
  // When diamond plan is selected, force 12 months duration
  useEffect(() => {
    if (isDiamondPlan && selectedDuration !== 12) {
      setSelectedDuration(12);
    }
  }, [selectedPricing, isDiamondPlan]);
  
  // Format dates for renewal info
  const today = new Date();
  const renewalDate = addDays(today, 30);
  const formattedRenewalDate = format(renewalDate, 'MMMM d, yyyy');
  const formattedRenewalDateVi = format(renewalDate, "d 'tháng' M, yyyy");
  
  // Calculate renewal price with 20% off for auto-renewal
  const renewalDiscount = 0.2; // 20% off
  const renewalPrice = basePrice * (1 - renewalDiscount);
  
  // Calculate price based on duration and discounts
  const { finalPrice, discountPercentage, originalPrice } = calculateFinalPrice(
    basePrice, 
    selectedDuration,
    selectedPricing,
    autoRenew
  );
  
  // Disable auto-renew for diamond plan with duration < 12 months
  const disableAutoRenew = isDiamondPlan && selectedDuration !== 12;
  
  // If auto-renew would be disabled, ensure it's not selected
  useEffect(() => {
    if (disableAutoRenew && autoRenew) {
      setAutoRenew(false);
      // Also update parent state
      onUpdatePricing({ autoRenew: false });
    }
  }, [disableAutoRenew]);
  
  // Update parent component with selected pricing and duration
  useEffect(() => {
    onPricingChange(selectedPricing);
    onUpdatePricing({ 
      selectedPricingTier: selectedPricing,
      autoRenew
    });
  }, [selectedPricing, autoRenew]);
  
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };
  
  const handleAutoRenewChange = (checked: boolean) => {
    setAutoRenew(checked);
  };
  
  const handleOpenPayment = () => {
    setIsPaymentDialogOpen(true);
  };
  
  const handleConfirmPayment = () => {
    setIsLoading(true);
    // This would be replaced with actual payment processing
    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmModalOpen(false);
      toast.success(t('Payment successful!', 'Thanh toán thành công!'), {
        description: t('Your post has been published.', 'Tin đăng của bạn đã được công bố.')
      });
      navigate('/dashboard');
    }, 2000);
  };
  
  // Opening the confirmation modal
  const handleProceedToPayment = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('Review & Payment', 'Xem lại & Thanh toán')}
        </h2>
        <p className="text-muted-foreground">{t('Choose your posting package and payment options.', 'Chọn gói đăng tin và các tùy chọn thanh toán.')}</p>
      </div>

      <Separator className="my-6" />

      {/* Pricing Tier Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('Select Your Plan', 'Chọn Gói Của Bạn')}</h3>
        
        <RadioGroup
          value={selectedPricing}
          onValueChange={setSelectedPricing}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {jobPricingOptions.map((option: JobPricingOption) => {
            const isPopular = option.popular;
            return (
              <div key={option.id} className="relative">
                {isPopular && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full px-2 py-1 z-10">
                    {t('Popular', 'Phổ biến')}
                  </div>
                )}
                <Label 
                  htmlFor={`plan-${option.id}`}
                  className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all hover:border-purple-500 ${selectedPricing === option.id ? 'border-2 border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200'}`}
                >
                  <RadioGroupItem 
                    value={option.id} 
                    id={`plan-${option.id}`}
                    className="sr-only"
                  />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{option.name}</div>
                      <div className="text-sm text-gray-500">{option.description}</div>
                    </div>
                    
                    <PricingDisplay 
                      basePrice={option.price} 
                      duration={selectedDuration}
                      pricingId={option.id}
                      autoRenew={autoRenew}
                    />
                  </div>
                  
                  <ul className="mt-4 space-y-2 text-sm">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {option.tag && (
                    <div className="mt-3 inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">
                      {option.tag}
                    </div>
                  )}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <Separator className="my-6" />
      
      {/* Duration Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('Choose Duration', 'Chọn Thời hạn')}</h3>
        <DurationSelector
          selectedDuration={selectedDuration}
          onChange={handleDurationChange}
          disableSelection={isFreeTier || isDiamondPlan}
          selectedPricing={selectedPricing}
        />
      </div>
      
      <Separator className="my-6" />
      
      {/* Auto-renew Option */}
      {!isFreeTier && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">{t('Enable Auto-Renew', 'Bật Tự động gia hạn')}</h3>
              <p className="text-sm text-gray-500">{t('Get 5% off when you enable auto-renew', 'Giảm 5% khi bạn bật tự động gia hạn')}</p>
            </div>
            <Switch 
              checked={autoRenew} 
              onCheckedChange={handleAutoRenewChange}
              disabled={disableAutoRenew}
            />
          </div>
          
          {/* Renewal information display */}
          {autoRenew && !isFreeTier && (
            <div className="text-sm text-gray-500">
              {t(
                `You'll be billed $${renewalPrice.toFixed(2)} every 30 days starting ${formattedRenewalDate} (unless canceled).`,
                `Bạn sẽ bị tính phí $${renewalPrice.toFixed(2)} mỗi 30 ngày bắt đầu từ ${formattedRenewalDateVi} (trừ khi hủy).`
              )}
              
              {/* Special messaging for Diamond yearly plan */}
              {isDiamondPlan && selectedDuration === 12 && (
                <div className="text-green-600 mt-1">
                  {t('Keep this price locked in each year. Cancel anytime.', 'Giữ giá này mỗi năm. Hủy bất kỳ lúc nào.')}
                </div>
              )}
            </div>
          )}
          
          <Separator className="my-6" />
        </div>
      )}
      
      {/* Payment Summary */}
      <PaymentSummary 
        basePrice={basePrice}
        duration={selectedDuration}
        autoRenew={autoRenew}
        originalPrice={originalPrice}
        finalPrice={finalPrice}
        discountPercentage={discountPercentage}
        onProceedToPayment={handleProceedToPayment}
      />
      
      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal 
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirmPayment={handleConfirmPayment}
        amount={finalPrice}
        options={pricingOptions}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
      />
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={onPrevStep}
        >
          {t('Previous', 'Trước')}
        </Button>
      </div>
    </div>
  );
};

export default ReviewAndPaymentSection;
