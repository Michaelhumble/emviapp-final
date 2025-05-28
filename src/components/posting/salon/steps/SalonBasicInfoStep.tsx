
import React from "react";
import { Button } from "@/components/ui/button";
import { SalonFormValues } from "../salonFormSchema";

interface SalonBasicInfoStepProps {
  formData: Partial<SalonFormValues>;
  onNext: () => void;
  onFormDataUpdate: (data: Partial<SalonFormValues>) => void;
}

const SalonBasicInfoStep = ({ formData, onNext, onFormDataUpdate }: SalonBasicInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Thông tin cơ bản / Basic Information</h2>
        <p className="text-gray-600 mt-2">
          Thông tin cơ bản về salon của bạn / Basic information about your salon
        </p>
      </div>
      
      <div className="text-center py-8">
        <p className="text-gray-500">Basic info step coming soon...</p>
      </div>

      <div className="flex justify-end pt-6">
        <Button type="button" onClick={onNext}>
          Tiếp tục / Continue
        </Button>
      </div>
    </div>
  );
};

export default SalonBasicInfoStep;
