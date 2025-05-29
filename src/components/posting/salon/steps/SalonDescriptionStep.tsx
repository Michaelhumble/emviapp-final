
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPostDescription } from "../SalonPostDescription";

interface SalonDescriptionStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonDescriptionStep = ({ form }: SalonDescriptionStepProps) => {
  return <SalonPostDescription form={form} />;
};

export default SalonDescriptionStep;
