
import React from 'react';
import PhotoUploader from '@/components/posting/PhotoUploader';

interface SalonPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
}

const SalonPhotoUpload: React.FC<SalonPhotoUploadProps> = ({ 
  photoUploads, 
  setPhotoUploads, 
  maxPhotos = 8 
}) => {
  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Tải lên hình ảnh salon để thu hút người mua / Upload salon photos to attract buyers (tối đa {maxPhotos} ảnh / max {maxPhotos} photos)
      </p>
      
      <PhotoUploader
        files={photoUploads}
        onChange={handlePhotoChange}
        maxFiles={maxPhotos}
        accept="image/*"
      />
    </div>
  );
};

export default SalonPhotoUpload;
