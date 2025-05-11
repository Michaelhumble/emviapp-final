
import React, { useState } from 'react';
import { toast } from 'sonner';
import { PricingOptions } from '@/utils/posting/types';
import { validatePricingOptions, getStripeProductId } from '@/utils/posting/jobPricing';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PriceDetails } from '@/types/PriceDetails';
import { PRICING_OPTIONS, getPricingOptionByDuration, applyAutoRenewDiscount } from '@/utils/jobPricingOptions';
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
  
  // Get the price details based on duration
  let priceDetails = getPricingOptionByDuration(selectedDuration);
  
  // If no price details found, use the first option as fallback
  if (!priceDetails) {
    priceDetails = PRICING_OPTIONS[0];
  }
  
  // Apply auto-renew discount if selected
  if (selectedAutoRenew) {
    priceDetails = applyAutoRenewDiscount(priceDetails, selectedAutoRenew);
  }

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
      const updatedPricingOptions: PricingOptions = {
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
      
      // Get the updated price details
      let updatedPriceDetails = getPricingOptionByDuration(processDuration);
      if (!updatedPriceDetails) {
        updatedPriceDetails = PRICING_OPTIONS[0];
      }
      
      // Apply auto-renew discount if selected
      if (processAutoRenew) {
        updatedPriceDetails = applyAutoRenewDiscount(updatedPriceDetails, processAutoRenew);
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
        priceDetails={priceDetails}
        autoRenew={selectedAutoRenew}
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
        onConfirm={handleUpsellConfirm}
        showUrgencyLabel={true}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
