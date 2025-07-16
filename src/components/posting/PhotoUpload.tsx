
import React from 'react';
import PhotoUploader from '@/components/posting/PhotoUploader';

interface PhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ 
  photoUploads, 
  setPhotoUploads, 
  maxPhotos = 5 
}) => {
  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Add Photos</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {maxPhotos === 1 ? (
            "Upload 1 photo (max 5MB) for your listing"
          ) : (
            `Upload up to ${maxPhotos} photos (max 5MB each) for your listing`
          )}
        </p>
      </div>
      
      <PhotoUploader
        files={photoUploads}
        onChange={handlePhotoChange}
        maxFiles={maxPhotos}
        accept="image/*"
      />
    </div>
  );
};

export default PhotoUpload;
