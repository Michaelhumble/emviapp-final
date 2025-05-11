
import React, { useState } from 'react';
import { toast } from 'sonner';
import { PricingOptions } from '@/utils/posting/types';
import { calculateFinalPrice, getStripeProductId, validatePricingOptions, calculateJobPostPrice, getDiscountPercentage } from '@/utils/posting/jobPricing';
import { usePostPayment } from '@/hooks/usePostPayment';
import PaymentSummary from './PaymentSummary';
import UpsellModal from './UpsellModal'; 

interface ReviewAndPaymentSectionProps {
  pricingId: string;
  duration: number;
  autoRenew: boolean;
  jobDetails: any;
  pricingOptions: PricingOptions;
  onValidationError?: (message: string) => void;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  pricingId,
  duration,
  autoRenew,
  jobDetails,
  pricingOptions,
  onValidationError
}) => {
  const { initiatePayment, isLoading } = usePostPayment();
  const [showUpsellModal, setShowUpsellModal] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(duration);
  const [selectedAutoRenew, setSelectedAutoRenew] = useState<boolean>(autoRenew);
  
  // Calculate prices using the direct calculation approach
  const basePrice = calculateJobPostPrice(pricingId);
  const originalPrice = basePrice * selectedDuration;
  const finalPrice = calculateFinalPrice(basePrice, selectedDuration, selectedAutoRenew);
  const discountPercentage = getDiscountPercentage(originalPrice, finalPrice);

  const handleProceedToPayment = async () => {
    // For paid plans, show the upsell modal first
    if (pricingId === 'premium' || pricingId === 'gold') {
      setShowUpsellModal(true);
      return;
    }
    
    // For free or standard plans, proceed directly to payment/submission
    processPayment();
  };

  const handleUpsellConfirm = (duration: number, autoRenew: boolean) => {
    setSelectedDuration(duration);
    setSelectedAutoRenew(autoRenew);
    setShowUpsellModal(false);
    
    // Process payment with the updated values
    processPayment(duration, autoRenew);
  };

  const processPayment = async (
    processDuration: number = selectedDuration, 
    processAutoRenew: boolean = selectedAutoRenew
  ) => {
    try {
      // Update the pricing options with the selected duration and auto-renew status
      const updatedPricingOptions = {
        ...pricingOptions,
        selectedPricingTier: pricingId,
        durationMonths: processDuration,
        autoRenew: processAutoRenew
      };
      
      // Validate that pricing options are valid using our exported function
      if (!validatePricingOptions(updatedPricingOptions)) {
        const errorMsg = "Invalid pricing configuration. Please select a pricing tier and duration.";
        toast.error(errorMsg);
        if (onValidationError) onValidationError(errorMsg);
        return;
      }
      
      const result = await initiatePayment('job', jobDetails, updatedPricingOptions);
      
      if (!result.success) {
        toast.error("Failed to process payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("An error occurred while processing your payment. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <PaymentSummary
        basePrice={basePrice}
        duration={selectedDuration}
        autoRenew={selectedAutoRenew}
        originalPrice={originalPrice}
        finalPrice={finalPrice}
        discountPercentage={discountPercentage}
        onProceedToPayment={handleProceedToPayment}
        isFreePlan={pricingId === 'free'}
        isSubmitting={isLoading}
        isDisabled={!pricingId || !selectedDuration}
      />

      {/* Upsell Modal with enhanced display */}
      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        selectedTier={pricingId}
        basePrice={basePrice}
        onConfirm={handleUpsellConfirm}
        showUrgencyLabel={true}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
