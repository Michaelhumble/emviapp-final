
import React from "react";
import { type SalonPricingTier } from "@/utils/posting/salonPricing";
import SalonPlanSelectionWithoutPrices from "../SalonPlanSelectionWithoutPrices";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";

interface SalonPricingOptions {
  selectedPricingTier: SalonPricingTier;
  durationMonths?: number;
  featuredAddOn?: boolean;
  autoRenew?: boolean;
  isFirstPost?: boolean;
}

interface SalonPricingStepProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPricingStep = ({ selectedOptions, onOptionsChange, form }: SalonPricingStepProps) => {
  const handlePricingSelect = (tier: SalonPricingTier, finalPrice: number) => {
    const updatedOptions = {
      ...selectedOptions,
      selectedPricingTier: tier
    };
    onOptionsChange(updatedOptions);
    form.setValue('autoRenew', updatedOptions.autoRenew || false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Pricing Plan / Chọn Gói Đăng Tin</h2>
        <p className="text-gray-600 mt-2">
          Choose the plan and duration that fits your needs / Chọn gói và thời hạn đăng tin phù hợp với nhu cầu của bạn
        </p>
      </div>
      
      <SalonPlanSelectionWithoutPrices
        onPricingSelect={handlePricingSelect}
        selectedTier={selectedOptions.selectedPricingTier}
      />
    </div>
  );
};
