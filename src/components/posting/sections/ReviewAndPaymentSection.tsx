
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { getJobPostPricingSummary } from '@/utils/posting/jobPricing';
import { PaymentSummary } from '@/components/posting/PaymentSummary';
import UserMessages from '@/components/posting/smart-ad-options/UserMessages';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, CheckCircle, CreditCard, Info } from 'lucide-react';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { usePricing } from '@/context/pricing/PricingProvider';
import NationwideOption from '@/components/posting/smart-ad-options/NationwideOption';
import ShowAtTopOption from '@/components/posting/smart-ad-options/ShowAtTopOption';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ReviewAndPaymentSectionProps {
  onSubmit: () => void;
  isSubmitting: boolean;
  isFirstPost?: boolean;
  hasReferrals?: boolean;
  selectedPhotos?: File[];
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  onSubmit,
  isSubmitting,
  isFirstPost = false,
  hasReferrals = false,
  selectedPhotos
}) => {
  const { t } = useTranslation();
  const { pricingOptions, setPricingOptions } = usePricing();
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isNationwide, setIsNationwide] = useState(pricingOptions.isNationwide || false);
  const [showAtTop, setShowAtTop] = useState(false);

  // Update pricing options when nationwide changes
  React.useEffect(() => {
    setPricingOptions(prev => ({ ...prev, isNationwide: isNationwide }));
  }, [isNationwide, setPricingOptions]);

  // Calculate pricing summary
  const priceData = getJobPostPricingSummary({
    ...pricingOptions,
    isFirstPost: isFirstPost,
    isNationwide: isNationwide
  });

  // Handle nationwide option change
  const handleNationwideChange = (checked: boolean) => {
    setIsNationwide(checked);
  };

  // Handle show at top option change
  const handleShowAtTopChange = (checked: boolean) => {
    setShowAtTop(checked);
  };

  // Check if Diamond tier is selected
  const isDiamondTier = pricingOptions.selectedPricingTier === 'diamond';

  return (
    <Card className="col-span-2">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">{t({
          english: "Review & Payment",
          vietnamese: "Xem lại & Thanh toán"
        })}</h2>
        <p className="text-gray-500">{t({
          english: "Please review your job posting details and select a payment option.",
          vietnamese: "Vui lòng xem lại chi tiết tin tuyển dụng của bạn và chọn một tùy chọn thanh toán."
        })}</p>
        
        <Separator className="my-4" />
        
        <UserMessages 
          isFirstPost={isFirstPost}
          hasReferrals={hasReferrals}
          postType="job"
        />
        
        <div className="space-y-4">
          {/* Smart Ad Options */}
          <NationwideOption 
            onChange={handleNationwideChange}
            defaultChecked={isNationwide}
          />
          
          <ShowAtTopOption 
            onChange={handleShowAtTopChange}
          />
        </div>
        
        <PaymentSummary priceData={priceData} />
        
        {isDiamondTier && (
          <Alert variant="default" className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>{t({
              english: "Diamond Tier",
              vietnamese: "Gói Kim Cương"
            })}</AlertTitle>
            <AlertDescription>
              {t({
                english: "The Diamond tier requires an invitation. Please submit your job posting and our team will contact you.",
                vietnamese: "Gói Kim Cương yêu cầu lời mời. Vui lòng gửi tin tuyển dụng của bạn và đội ngũ của chúng tôi sẽ liên hệ với bạn."
              })}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mt-6 flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          />
          <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {t({
              english: "I agree to the terms and conditions",
              vietnamese: "Tôi đồng ý với các điều khoản và điều kiện"
            })}
          </label>
        </div>
        
        <Button 
          onClick={onSubmit}
          disabled={!termsAccepted || isSubmitting}
          className="w-full mt-4"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t({
                english: "Submitting...",
                vietnamese: "Đang gửi..."
              })}
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              {t({
                english: "Submit & Pay",
                vietnamese: "Gửi & Thanh toán"
              })}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ReviewAndPaymentSection;
