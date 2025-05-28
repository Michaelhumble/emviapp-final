
import React from "react";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import SalonPlanSelectionSection from "../SalonPlanSelectionSection";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";

interface SalonPricingStepProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPricingStep = ({ selectedOptions, onOptionsChange, form }: SalonPricingStepProps) => {
  const handleOptionsChange = (options: SalonPricingOptions) => {
    onOptionsChange(options);
    // Sync auto-renew option with form
    form.setValue('autoRenew', options.autoRenew || false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Pricing Plan / Chọn Gói Đăng Tin</h2>
        <p className="text-gray-600 mt-2">
          Choose the plan and duration that fits your needs / Chọn gói và thời hạn đăng tin phù hợp với nhu cầu của bạn
        </p>
      </div>
      
      <SalonPlanSelectionSection
        selectedOptions={selectedOptions}
        onOptionsChange={handleOptionsChange}
        onNext={() => {}} // Will be handled by parent wizard
        onBack={() => {}} // Will be handled by parent wizard
        hideNavigation={true}
      />
    </div>
  );
};
