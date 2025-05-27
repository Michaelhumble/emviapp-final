
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonIdentityStep } from "./SalonIdentityStep";

interface SalonBasicInfoStepProps {
  formData: Partial<SalonFormValues>;
  onNext: () => void;
  onFormDataUpdate: (data: Partial<SalonFormValues>) => void;
}

const SalonBasicInfoStep = ({ formData, onNext, onFormDataUpdate }: SalonBasicInfoStepProps) => {
  // This is a wrapper around SalonIdentityStep to maintain compatibility
  const mockForm = {
    control: {} as any,
    setValue: () => {},
    getValues: () => formData,
    watch: () => {},
  } as UseFormReturn<SalonFormValues>;

  return <SalonIdentityStep form={mockForm} />;
};

export default SalonBasicInfoStep;
