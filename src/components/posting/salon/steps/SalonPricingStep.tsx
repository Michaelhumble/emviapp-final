
import React from "react";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import SalonPlanSelectionSection from "../SalonPlanSelectionSection";

interface SalonPricingStepProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

export const SalonPricingStep = ({ selectedOptions, onOptionsChange }: SalonPricingStepProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Chọn Gói Đăng Tin / Pricing Plan</h2>
        <p className="text-gray-600 mt-2">
          Chọn gói đăng tin phù hợp với nhu cầu của bạn / Choose the posting plan that fits your needs
        </p>
      </div>
      
      <SalonPlanSelectionSection
        selectedOptions={selectedOptions}
        onOptionsChange={onOptionsChange}
        onNext={() => {}} // Will be handled by parent wizard
        onBack={() => {}} // Will be handled by parent wizard
        hideNavigation={true}
      />
    </div>
  );
};
