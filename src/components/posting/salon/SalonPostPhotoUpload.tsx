
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { SalonPhotosSection } from "./SalonPhotosSection";

export interface SalonPostPhotoUploadProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostPhotoUpload = ({ form }: SalonPostPhotoUploadProps) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);

  return (
    <SalonPhotosSection 
      photoUploads={photoUploads}
      setPhotoUploads={setPhotoUploads}
      maxPhotos={10}
    />
  );
};

export default SalonPostPhotoUpload;
