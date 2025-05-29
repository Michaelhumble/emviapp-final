
import React from 'react';
import SalonPhotoUpload from '../SalonPostPhotoUpload';

interface SalonPhotoStepProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
}

export const SalonPhotoStep = ({ photos, onPhotosChange }: SalonPhotoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Photos / Hình Ảnh</h2>
        <p className="text-gray-600 mt-2">
          Upload photos to showcase your salon / Tải lên hình ảnh để giới thiệu salon của bạn
        </p>
      </div>
      
      <SalonPhotoUpload
        photoUploads={photos}
        setPhotoUploads={onPhotosChange}
        maxPhotos={8}
      />
    </div>
  );
};
