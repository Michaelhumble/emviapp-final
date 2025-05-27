
import React from "react";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import SalonPlanSelectionSection from "../SalonPlanSelectionSection";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RotateCcw } from "lucide-react";

interface SalonPricingStepProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPricingStep = ({ selectedOptions, onOptionsChange, form }: SalonPricingStepProps) => {
  const handleAutoRenewChange = (checked: boolean) => {
    onOptionsChange({
      ...selectedOptions,
      autoRenew: checked
    });
    form.setValue('autoRenew', checked);
  };

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

      {/* Auto-renew Option */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <FormField
          control={form.control}
          name="autoRenew"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value || selectedOptions.autoRenew}
                  onCheckedChange={handleAutoRenewChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Tự động gia hạn / Auto-renew listing
                </FormLabel>
                <p className="text-sm text-gray-600">
                  Tiết kiệm 10% khi tự động gia hạn listing sau 30 ngày / Save 10% with auto-renewal after 30 days
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
