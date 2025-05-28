
import React from "react";
import { Button } from "@/components/ui/button";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";

export interface SalonPricingStepProps {
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  onNext: () => void;
  onBack: () => void;
  onPricingOptionsUpdate: (options: SalonPricingOptions) => void;
}

export const SalonPricingStep = ({ formData, selectedOptions, onNext, onBack, onPricingOptionsUpdate }: SalonPricingStepProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Gói đăng tin / Pricing Plan</h2>
        <p className="text-gray-600 mt-2">
          Chọn gói đăng tin phù hợp / Select the right pricing plan
        </p>
      </div>
      
      <div className="text-center py-8">
        <p className="text-gray-500">Pricing step coming soon...</p>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Quay lại / Back
        </Button>
        <Button type="button" onClick={onNext}>
          Tiếp tục / Continue
        </Button>
      </div>
    </div>
  );
};
