
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonContactSection } from "../SalonContactSection";

interface SalonContactStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonContactStep = ({ form }: SalonContactStepProps) => {
  return <SalonContactSection form={form} />;
};

export default SalonContactStep;
