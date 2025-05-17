
import React, { useState, useCallback } from 'react';
import { JobFormValues } from './jobFormSchema';
import { JobForm } from './JobForm';
import { PricingOptions } from '@/utils/posting/types';
import PaymentConfirmationModal from '@/components/posting/PaymentConfirmationModal';
import { usePostPayment } from '@/hooks/usePostPayment';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import JobPostOptions from './JobPostOptions';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';

interface EnhancedJobFormProps {
  onSubmit: (values: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ onSubmit }) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    isFirstPost: true,
    isRenewal: false,
    durationMonths: 1,
    isNationwide: false,
    fastSalePackage: false,
    showAtTop: false,
    bundleWithJobPost: false,
    hasReferrals: false,
    autoRenew: false,
    isHotListing: false
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { initiatePayment, isLoading } = usePostPayment();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formValues, setFormValues] = useState<JobFormValues>(); 
  
  // Calculate price based on options
  const priceDetails = calculateJobPostPrice(pricingOptions);
  
  const handlePricingChange = useCallback((pricingTier: string) => {
    setPricingOptions(prev => ({ ...prev, selectedPricingTier: pricingTier }));
  }, []);
  
  const handleUpdatePricing = useCallback((options: Partial<PricingOptions>) => {
    setPricingOptions(prev => ({ ...prev, ...options }));
  }, []);
  
  const handleSubmit = async (values: JobFormValues) => {
    setFormValues(values); // Store form values when submitted
    setIsPaymentModalOpen(true);
  };
  
  const confirmPayment = async () => {
    if (!formValues) return;
    
    setIsPaymentModalOpen(false);
    setIsSubmitting(true);
    
    try {
      // Call the parent onSubmit function to handle form data
      const success = await onSubmit(formValues, photoUploads, pricingOptions);
      
      if (success) {
        // If it's a free post, handle differently
        if (pricingOptions.selectedPricingTier === 'free') {
          const freeResult = await initiatePayment('job', formValues, pricingOptions);
          
          if (freeResult?.success) {
            toast.success(t({
              english: "Your free job listing has been published!",
              vietnamese: "Tin tuyển dụng miễn phí của bạn đã được xuất bản!"
            }));
            navigate('/post-success');
          } else {
            toast.error(t({
              english: "We couldn't process your free listing. Please try again.",
              vietnamese: "Chúng tôi không thể xử lý bài đăng miễn phí của bạn. Vui lòng thử lại."
            }));
          }
        } else {
          // For paid posts, initiate payment
          const paymentResult = await initiatePayment('job', formValues, pricingOptions);
          
          if (paymentResult?.success) {
            // Payment initiated successfully, user will be redirected to Stripe
            // No need for toast here as user is sent to Stripe
            console.log("Payment initiated, redirecting to Stripe...");
          } else {
            toast.error(t({
              english: "We couldn't process your payment. Please try again.",
              vietnamese: "Chúng tôi không thể xử lý thanh toán của bạn. Vui lòng thử lại."
            }));
          }
        }
      }
    } catch (error: any) {
      console.error("Error during job post submission:", error);
      toast.error(`${t({
        english: "Submission failed",
        vietnamese: "Gửi không thành công"
      })}: ${error.message || t({
        english: 'Unknown error',
        vietnamese: 'Lỗi không xác định'
      })}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <JobForm
        onSubmit={handleSubmit}
        photoUploads={photoUploads}
        setPhotoUploads={setPhotoUploads}
        isSubmitting={isSubmitting || isLoading}
      />
      
      <JobPostOptions
        pricingOptions={pricingOptions}
        setPricingOptions={setPricingOptions}
      />
      
      <PaymentConfirmationModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirmPayment={confirmPayment}
        amount={priceDetails.finalPrice}
        options={pricingOptions}
        originalPrice={priceDetails.originalPrice}
        discountPercentage={priceDetails.discountPercentage}
      />
    </div>
  );
};

export default EnhancedJobForm;
