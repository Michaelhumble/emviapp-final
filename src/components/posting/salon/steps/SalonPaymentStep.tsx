
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import SalonPaymentOptions from "../SalonPaymentOptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSalonPostPricingSummary } from "@/utils/posting/salonPricing";

interface SalonPaymentStepProps {
  form: UseFormReturn<SalonFormValues>;
  pricingOptions: SalonPricingOptions;
  onPricingChange: (options: SalonPricingOptions) => void;
}

export const SalonPaymentStep = ({ 
  form, 
  pricingOptions, 
  onPricingChange 
}: SalonPaymentStepProps) => {
  const summary = getSalonPostPricingSummary(pricingOptions);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Complete Your Payment
        </h3>
        <p className="text-gray-600">
          Choose your listing duration and complete payment to publish your salon
        </p>
      </div>

      <SalonPaymentOptions
        form={form}
        selectedOptions={pricingOptions}
        onOptionsChange={onPricingChange}
      />

      {pricingOptions.selectedPricingTier && (
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{summary.planName} Plan ({summary.duration} month{summary.duration > 1 ? 's' : ''})</span>
                <span>${summary.basePrice}</span>
              </div>
              {summary.featuredAddon > 0 && (
                <div className="flex justify-between">
                  <span>VIP Featured Add-on</span>
                  <span>${summary.featuredAddon}</span>
                </div>
              )}
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${summary.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalonPaymentStep;
