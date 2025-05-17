
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileButton } from '@/components/ui/mobile-button';
import { ChevronLeft, CreditCard, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions } from '@/utils/posting/types';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { jobPostingTranslations } from '@/translations/jobPostingForm';
import PricingCard from '../pricing/PricingCard';

interface ReviewAndPaymentSectionProps {
  formData: any;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: (pricingOptions: PricingOptions) => void;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

export const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  photoUploads,
  onBack,
  onSubmit,
  isSubmitting,
  pricingOptions,
  setPricingOptions
}) => {
  const { t } = useTranslation();
  const reviewTranslations = jobPostingTranslations.review;
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  
  const handleSubmit = async () => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      setShowPaymentSuccess(true);
      
      // Submit after showing success message briefly
      setTimeout(() => {
        onSubmit(pricingOptions);
      }, 1000);
    }, 1500);
  };
  
  const updatePricingOptions = (option: string, value: any) => {
    setPricingOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };
  
  // To be completed in future tasks
  const renderJobSummary = () => (
    <div className="space-y-3 bg-white rounded-lg border p-4">
      <h3 className="font-medium">{formData.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{formData.description}</p>
      
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">{formData.employment_type}</span>
        <span className="px-2 py-1 bg-green-50 text-green-700 rounded">{formData.salary_range}</span>
        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">{formData.experience_level}</span>
      </div>
      
      <div className="text-sm">
        <strong>Location:</strong> {formData.location}
      </div>
    </div>
  );
  
  // To be completed in future tasks
  const renderContactSummary = () => (
    <div className="bg-white rounded-lg border p-4">
      {formData.contact_info?.email && (
        <div className="mb-2">
          <strong>Email:</strong> {formData.contact_info.email}
        </div>
      )}
      {formData.contact_info?.phone && (
        <div className="mb-2">
          <strong>Phone:</strong> {formData.contact_info.phone}
        </div>
      )}
      {formData.contact_info?.owner_name && (
        <div className="mb-2">
          <strong>Contact:</strong> {formData.contact_info.owner_name}
        </div>
      )}
    </div>
  );
  
  // Return to simple view for stability check
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">{t(reviewTranslations.title)}</h2>
      
      <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {t({
            english: "Review your job listing details before finalizing your post.",
            vietnamese: "Xem lại chi tiết tin đăng việc làm trước khi hoàn tất bài đăng của bạn."
          })}
        </AlertDescription>
      </Alert>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">{t(reviewTranslations.jobSummary)}</h3>
          {renderJobSummary()}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">{t(reviewTranslations.contactSummary)}</h3>
          {renderContactSummary()}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">{t(reviewTranslations.pricingSummary)}</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <PricingCard
              isSelected={pricingOptions.selectedPricingTier === 'standard'}
              onSelect={() => updatePricingOptions('selectedPricingTier', 'standard')}
              tier="standard"
              pricingInfo={{
                id: 'standard',
                name: 'Standard',
                price: 9.99,
                description: 'Basic visibility for your job post',
                features: ['7-day listing', 'Standard search placement'],
                tier: 'standard'
              }}
            />
            <PricingCard
              isSelected={pricingOptions.selectedPricingTier === 'premium'}
              onSelect={() => updatePricingOptions('selectedPricingTier', 'premium')}
              tier="premium"
              pricingInfo={{
                id: 'premium',
                name: 'Premium',
                price: 19.99,
                description: 'Enhanced visibility and features',
                features: ['14-day listing', 'Featured in search results', 'Priority email alerts to artists'],
                popular: true,
                tier: 'premium'
              }}
            />
            <PricingCard
              isSelected={pricingOptions.selectedPricingTier === 'gold'}
              onSelect={() => updatePricingOptions('selectedPricingTier', 'gold')}
              tier="gold" 
              pricingInfo={{
                id: 'gold',
                name: 'Gold',
                price: 39.99,
                description: 'Maximum visibility and premium placement',
                features: ['30-day listing', 'Top search placement', 'Featured across the site', 'SMS alerts to matching artists'],
                tier: 'gold'
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting || processingPayment || showPaymentSuccess}
          className="mb-3 sm:mb-0"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {t(jobPostingTranslations.jobForm.back)}
        </Button>
        
        <MobileButton
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || processingPayment || showPaymentSuccess}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          {processingPayment ? (
            <>
              <CreditCard className="h-4 w-4 mr-2 animate-pulse" />
              {t({
                english: "Processing...",
                vietnamese: "Đang xử lý..."
              })}
            </>
          ) : showPaymentSuccess ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              {t({
                english: "Success!",
                vietnamese: "Thành công!"
              })}
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              {t(reviewTranslations.confirmAndPay)}
            </>
          )}
        </MobileButton>
      </div>
    </div>
  );
};
