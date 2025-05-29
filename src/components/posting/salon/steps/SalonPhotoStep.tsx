
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import SalonPhotoUpload from '../SalonPostPhotoUpload';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonPhotoStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonPhotoStep = ({ form, photoUploads, setPhotoUploads }: SalonPhotoStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">
          {t({
            english: 'Add Photos',
            vietnamese: 'Thêm Hình Ảnh'
          })}
        </h2>
        <p className="text-gray-600 mt-2">
          {t({
            english: 'Upload photos to showcase your salon and attract buyers',
            vietnamese: 'Tải lên hình ảnh để giới thiệu salon và thu hút người mua'
          })}
        </p>
      </div>
      
      <SalonPhotoUpload
        photoUploads={photoUploads}
        setPhotoUploads={setPhotoUploads}
        maxPhotos={8}
      />
    </div>
  );
};
