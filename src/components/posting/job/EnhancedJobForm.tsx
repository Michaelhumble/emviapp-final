
import React, { useState, useCallback } from 'react';
import { JobFormValues } from './jobFormSchema';
import { JobForm } from './JobForm';
import JobPostOptions from './JobPostOptions';
import { PricingOptions } from '@/utils/posting/types';
import PaymentConfirmationModal from '@/components/posting/PaymentConfirmationModal';
import { usePostPayment } from '@/hooks/usePostPayment';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';

interface EnhancedJobFormProps {
  onSubmit: (values: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => Promise<void>;
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
  
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [formValues, setFormValues] = useState<JobFormValues>(); // Add state to store form values
  
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
    if (!formValues) return; // Guard against undefined values
    
    setIsPaymentModalOpen(false);
    setIsSubmitting(true);
    
    try {
      await onSubmit(formValues, photoUploads, pricingOptions);
      
      // Initiate payment after successful form submission
      const paymentResult = await initiatePayment('job', formValues, pricingOptions);
      
      if (paymentResult?.success) {
        toast.success("Job post submitted successfully!");
        navigate('/dashboard');
      } else {
        toast.error("Failed to submit job post.");
      }
    } catch (error: any) {
      console.error("Error during job post submission:", error);
      toast.error(`Job post submission failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Update translation usage example
  const placeholderText = t("Enter job details here...");
  
  return (
    <div className="space-y-6">
      <JobForm
        onSubmit={handleSubmit}
        photoUploads={photoUploads}
        setPhotoUploads={setPhotoUploads}
        isSubmitting={isSubmitting}
      />
      
      <JobPostOptions
        pricingOptions={pricingOptions}
        setPricingOptions={setPricingOptions}
      />
      
      <PaymentConfirmationModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirmPayment={confirmPayment}
        amount={paymentAmount}
        options={pricingOptions}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
      />
    </div>
  );
};

export default EnhancedJobForm;
