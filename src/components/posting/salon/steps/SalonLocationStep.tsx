
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonLocationSection } from "../SalonLocationSection";

interface SalonLocationStepProps {
  form: UseFormReturn<SalonFormValues>;
}

const SalonLocationStep = ({ form }: SalonLocationStepProps) => {
  return <SalonLocationSection form={form} />;
};

export default SalonLocationStep;
