
import React from "react";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";

interface SalonReviewStepProps {
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  onBack: () => void;
}

const SalonReviewStep = ({ formData, selectedOptions, onBack }: SalonReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Xem lại & Thanh toán / Review & Payment</h2>
        <p className="text-gray-600 mt-2">
          Xem lại thông tin và hoàn tất thanh toán / Review your information and complete payment
        </p>
      </div>
      
      <div className="text-center py-8">
        <p className="text-gray-500">Review and payment step coming soon...</p>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Quay lại / Back
        </Button>
        <Button type="button" disabled>
          Thanh toán / Pay
        </Button>
      </div>
    </div>
  );
};

export default SalonReviewStep;
