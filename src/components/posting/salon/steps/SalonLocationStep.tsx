
import React from "react";
import { Button } from "@/components/ui/button";
import { SalonFormValues } from "../salonFormSchema";

export interface SalonLocationStepProps {
  formData: Partial<SalonFormValues>;
  onNext: () => void;
  onBack: () => void;
  onFormDataUpdate: (data: Partial<SalonFormValues>) => void;
}

export const SalonLocationStep = ({ formData, onNext, onBack, onFormDataUpdate }: SalonLocationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Địa điểm / Location</h2>
        <p className="text-gray-600 mt-2">
          Thông tin địa điểm salon của bạn / Your salon location information
        </p>
      </div>
      
      <div className="text-center py-8">
        <p className="text-gray-500">Location step coming soon...</p>
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
