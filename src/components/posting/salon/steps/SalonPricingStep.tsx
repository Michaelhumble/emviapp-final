
import React from "react";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import SalonPricingCards from "../SalonPricingCards";
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
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold mb-4">
          Pricing Plan / Chọn Gói Đăng Tin
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the plan and duration that fits your needs / Chọn gói và thời hạn đăng tin phù hợp với nhu cầu của bạn
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">
            Chọn Gói Đăng Tin / Choose Your Listing Plan
          </h3>
          <p className="text-gray-600">
            Chọn thời hạn phù hợp để salon của bạn tiếp cận được đối tượng khách hàng.<br />
            Select the right duration to reach your target buyers effectively.
          </p>
        </div>
        
        <SalonPricingCards
          selectedOptions={selectedOptions}
          onOptionsChange={handleOptionsChange}
        />
      </div>
    </div>
  );
};
