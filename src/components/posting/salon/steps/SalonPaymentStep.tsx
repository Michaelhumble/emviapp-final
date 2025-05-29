
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPaymentOptions } from "../SalonPaymentOptions";

interface SalonPaymentStepProps {
  form: UseFormReturn<SalonFormValues>;
  onPaymentComplete?: () => void;
}

export const SalonPaymentStep = ({ form, onPaymentComplete }: SalonPaymentStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h3>
        <p className="text-gray-600">
          Select a pricing plan to publish your salon listing
        </p>
      </div>

      <SalonPaymentOptions 
        form={form} 
        onPaymentComplete={onPaymentComplete}
      />
    </div>
  );
};

export default SalonPaymentStep;
