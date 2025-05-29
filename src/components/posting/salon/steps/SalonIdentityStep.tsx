
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonIdentitySection } from "../SalonIdentitySection";

interface SalonIdentityStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentityStep = ({ form }: SalonIdentityStepProps) => {
  return <SalonIdentitySection form={form} />;
};

export default SalonIdentityStep;
