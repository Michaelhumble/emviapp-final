
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPhotosSection } from "../SalonPhotosSection";

interface SalonPhotosStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPhotosStep = ({ form }: SalonPhotosStepProps) => {
  return <SalonPhotosSection photoUploads={[]} setPhotoUploads={() => {}} maxPhotos={10} />;
};

export default SalonPhotosStep;
