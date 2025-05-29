
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import SalonPricingPlans from "../SalonPricingPlans";
import { SalonPricingTier, SalonPricingOptions } from "@/utils/posting/salonPricing";

interface SalonPaymentStepProps {
  form: UseFormReturn<SalonFormValues>;
  onPaymentComplete?: () => void;
}

export const SalonPaymentStep = ({ form, onPaymentComplete }: SalonPaymentStepProps) => {
  const selectedOptions: SalonPricingOptions = {
    selectedPricingTier: form.watch("selectedPricingTier"),
    featuredAddon: form.watch("featuredAddon")
  };

  const handlePlanSelect = (tier: SalonPricingTier) => {
    form.setValue("selectedPricingTier", tier);
  };

  return (
    <div className="space-y-8">
      <SalonPricingPlans 
        selectedOptions={selectedOptions}
        onPlanSelect={handlePlanSelect}
      />
    </div>
  );
};

export default SalonPaymentStep;
