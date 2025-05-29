
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import SalonPricingPlans from "../SalonPricingPlans";
import { SalonPricingTier, SalonPricingOptions } from "@/utils/posting/salonPricing";
import { Button } from "@/components/ui/button";
import { useStripe } from "@/hooks/useStripe";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SalonPaymentStepProps {
  form: UseFormReturn<SalonFormValues>;
  onPaymentComplete?: () => void;
}

export const SalonPaymentStep = ({ form, onPaymentComplete }: SalonPaymentStepProps) => {
  const { isLoading, initiatePayment } = useStripe();
  
  const selectedOptions: SalonPricingOptions = {
    selectedPricingTier: form.watch("selectedPricingTier"),
    featuredAddon: form.watch("featuredAddon")
  };

  const handlePlanSelect = (tier: SalonPricingTier) => {
    form.setValue("selectedPricingTier", tier);
  };

  const handleFeaturedAddonChange = (featured: boolean) => {
    form.setValue("featuredAddon", featured);
  };

  const handleContinueToPayment = async () => {
    if (!selectedOptions.selectedPricingTier) {
      toast.error("Please select a pricing plan first");
      return;
    }

    const formData = form.getValues();
    
    try {
      const success = await initiatePayment(selectedOptions, formData);
      if (success && onPaymentComplete) {
        onPaymentComplete();
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const isValidSelection = Boolean(selectedOptions.selectedPricingTier);

  return (
    <div className="space-y-8">
      <SalonPricingPlans 
        selectedOptions={selectedOptions}
        onPlanSelect={handlePlanSelect}
        onFeaturedAddonChange={handleFeaturedAddonChange}
      />
      
      <div className="flex justify-center pt-6">
        <Button
          onClick={handleContinueToPayment}
          disabled={!isValidSelection || isLoading}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Pay & Publish Listing
            </>
          )}
        </Button>
      </div>
      
      {!isValidSelection && (
        <p className="text-center text-gray-500 text-sm">
          Please select a pricing plan to continue
        </p>
      )}
    </div>
  );
};

export default SalonPaymentStep;
