
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { SalonPhotosSection } from "./SalonPhotosSection";

export interface SalonPostPhotoUploadProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: (photos: File[]) => void;
}

export const SalonPostPhotoUpload = ({ form, photoUploads, setPhotoUploads }: SalonPostPhotoUploadProps) => {
  return (
    <SalonPhotosSection 
      photoUploads={photoUploads}
      setPhotoUploads={setPhotoUploads}
      maxPhotos={10}
    />
  );
};

export default SalonPostPhotoUpload;
