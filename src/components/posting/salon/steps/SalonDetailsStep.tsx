
import React from "react";
import { Button } from "@/components/ui/button";
import { SalonFormValues } from "../salonFormSchema";

interface SalonDetailsStepProps {
  formData: Partial<SalonFormValues>;
  onNext: () => void;
  onBack: () => void;
  onFormDataUpdate: (data: Partial<SalonFormValues>) => void;
}

const SalonDetailsStep = ({ formData, onNext, onBack, onFormDataUpdate }: SalonDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Chi tiết & Hình ảnh / Details & Photos</h2>
        <p className="text-gray-600 mt-2">
          Thêm chi tiết và hình ảnh để làm cho danh sách của bạn nổi bật / Add details and photos to make your listing stand out
        </p>
      </div>
      
      <div className="text-center py-8">
        <p className="text-gray-500">Details step coming soon...</p>
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

export default SalonDetailsStep;
