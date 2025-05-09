import React, { useState, useEffect } from 'react';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import PricingCards from '@/components/posting/PricingCards';
import { PricingOptions, PostType } from '@/utils/posting/types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Job } from '@/types/job';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { format, addDays } from 'date-fns';
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
  const { t } = useTranslation();
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(pricingOptions.autoRenew || false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const selectedPricingId = pricingOptions.selectedPricingTier || 'standard';
  const selectedPricing = jobPricingOptions.find(option => option.id === selectedPricingId);
  
  // Check if it's the free tier
  const isFreeTier = selectedPricingId === 'free';
  
  // Check if it's the diamond tier
  const isDiamondTier = selectedPricingId === 'diamond';
  
  // Force 12 months for Diamond tier
  useEffect(() => {
    if (isDiamondTier && selectedDuration !== 12) {
      setSelectedDuration(12);
    }
  }, [isDiamondTier, selectedDuration]);
  
  // Calculate base price (0 for free tier)
  const basePrice = selectedPricing?.price || 0;
  
  // Calculate total with duration and auto-renew discount
  let total = basePrice * selectedDuration;
  let discountPercentage = 0;
  
  // Calculate discount percentages based on duration
  if (selectedDuration === 3) {
    discountPercentage = 10;
  } else if (selectedDuration === 6) {
    discountPercentage = 20;
  } else if (selectedDuration === 12) {
    discountPercentage = 30;
  }
  
  // For Diamond tier, set special discount only for yearly (12 months)
  if (isDiamondTier) {
    if (selectedDuration === 12) {
      // Diamond yearly plan has fixed discount
      const originalPrice = basePrice;
      const discountPrice = selectedPricing?.yearlyDiscountPrice || 999.99;
      discountPercentage = Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
      total = discountPrice;
    } else {
      // No discount for other durations
      discountPercentage = 0;
      total = basePrice;
    }
  } else {
    // Regular discount calculation for non-Diamond tiers
    if (autoRenew) {
      discountPercentage += 5;
    }
    
    // Apply the discount
    total = basePrice * selectedDuration * (1 - discountPercentage / 100);
  }
  
  // Original price before discount
  const originalPrice = basePrice * selectedDuration;
  
  // Format dates for renewal info
  const today = new Date();
  const renewalDate = addDays(today, 30);
  const formattedRenewalDate = format(renewalDate, 'MMMM d, yyyy');
  const formattedRenewalDateVi = format(renewalDate, "d 'tháng' M, yyyy");
  
  // Calculate renewal price with 20% off for auto-renewal
  const renewalDiscount = 0.2; // 20% off
  const renewalPrice = basePrice * (1 - renewalDiscount);
  const formattedRenewalPrice = formatCurrency(renewalPrice);
  
  const handlePricingChange = (pricingId: string) => {
    onPricingChange(pricingId);
    
    // Reset auto-renew for Diamond tier if not yearly
    if (pricingId === 'diamond' && selectedDuration !== 12) {
      setAutoRenew(false);
    }
  };
  
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
    
    // For Diamond tier, disable auto-renew for non-yearly options
    if (isDiamondTier && duration !== 12) {
      setAutoRenew(false);
    }
  };
  
  const handleAutoRenewChange = (checked: boolean) => {
    setAutoRenew(checked);
    onUpdatePricing({ ...pricingOptions, autoRenew: checked });
  };
  
  const handleProceedToPayment = () => {
    setConfirmationModalOpen(true);
  };
  
  const handleConfirmPayment = () => {
    // Here you would typically integrate with a payment gateway
    // After successful payment, proceed to the next step
    onNextStep();
    setConfirmationModalOpen(false);
  };
  
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">{t('Choose a Pricing Plan', 'Chọn Gói Giá')}</h2>
        
        <PricingCards 
          pricingOptions={jobPricingOptions}
          selectedPricing={selectedPricingId}
          onChange={handlePricingChange}
          selectedDuration={selectedDuration}
          onDurationChange={handleDurationChange}
        />
        
        {/* Auto-renew toggle - Only show for non-free tiers */}
        {!isFreeTier && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-renew" className="text-base font-medium">
                  {t('Enable Auto-Renew', 'Bật tự động gia hạn')}
                </Label>
                <p className="text-sm text-gray-500">
                  {isDiamondTier && selectedDuration === 12 
                    ? t('Lock in this discounted price yearly', 'Khóa mức giá này hàng năm') 
                    : t('Save an additional 5% on renewal', 'Tiết kiệm thêm 5% khi gia hạn')}
                </p>
              </div>
              <Switch 
                id="auto-renew" 
                checked={autoRenew} 
                onCheckedChange={handleAutoRenewChange} 
                disabled={isDiamondTier && selectedDuration !== 12}
              />
            </div>
            
            {/* Auto-renewal information message */}
            {autoRenew && !isFreeTier && (
              <div className="mt-2 text-xs text-gray-500">
                {t(
                  `You'll be billed ${formattedRenewalPrice} every 30 days starting ${formattedRenewalDate} (unless canceled).`,
                  `Bạn sẽ bị tính phí ${formattedRenewalPrice} mỗi 30 ngày bắt đầu từ ${formattedRenewalDateVi} (trừ khi hủy).`
                )}
              </div>
            )}
          </div>
        )}
        
        {/* First-time poster info */}
        {isFirstPost && (
          <Alert className="bg-blue-50 border-blue-100">
            <AlertDescription>
              {t('First-time posters receive special pricing!', 'Người đăng tin lần đầu được giá đặc biệt!')}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Diamond tier special messaging */}
        {isDiamondTier && selectedDuration !== 12 && (
          <Alert className="bg-amber-50 border-amber-100">
            <AlertDescription>
              {t('Select the 12-month option to unlock special discount pricing!', 'Chọn gói 12 tháng để mở khóa giá ưu đãi đặc biệt!')}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Payment Summary & CTA */}
        <div className="mt-8 bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-semibold mb-4">{t('Post Summary', 'Tóm tắt tin đăng')}</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>{t('Post type', 'Loại tin')}:</strong> {postType.toUpperCase()}</p>
                <p><strong>{t('Title', 'Tiêu đề')}:</strong> {jobData?.title || t('(Not provided)', '(Chưa cung cấp)')}</p>
                <p><strong>{t('Location', 'Địa điểm')}:</strong> {jobData?.location || t('(Not provided)', '(Chưa cung cấp)')}</p>
                <p><strong>{t('Contact', 'Liên hệ')}:</strong> {jobData?.contact_info?.phone || t('(Not provided)', '(Chưa cung cấp)')}</p>
              </div>
            </div>
            
            {/* Payment summary for review */}
            <div className="flex-1">
              <h3 className="font-semibold mb-4">{t('Payment Summary', 'Tóm tắt thanh toán')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t('Plan', 'Gói')}:</span>
                  <span>{selectedPricing?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('Duration', 'Thời hạn')}:</span>
                  <span>{selectedDuration} {selectedDuration === 1 ? t('month', 'tháng') : t('months', 'tháng')}</span>
                </div>
                {discountPercentage > 0 && (
                  <div className="flex justify-between">
                    <span>{t('Discount', 'Giảm giá')}:</span>
                    <span>-{discountPercentage}%</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>{t('Total', 'Tổng cộng')}:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              
              <button
                onClick={handleProceedToPayment}
                className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
              >
                {t('Proceed to Payment', 'Tiến hành thanh toán')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onPrevStep}
          className="px-4 py-2 border rounded hover:bg-gray-50 transition"
        >
          {t('Back', 'Quay lại')}
        </button>
      </div>
      
      {/* Payment confirmation modal */}
      {confirmationModalOpen && (
        <PaymentConfirmationModal
          open={confirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
          onConfirmPayment={onNextStep}
          amount={total}
          options={pricingOptions}
          originalPrice={originalPrice}
          discountPercentage={discountPercentage}
        />
      )}
    </div>
  );
};

export default ReviewAndPaymentSection;
