
import React from 'react';
import PhotoUploader from '@/components/posting/PhotoUploader';

interface PhotoUploadSectionProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ 
  photoUploads, 
  setPhotoUploads, 
  maxPhotos = 5,
  onNext,
  onPrevious,
  isLastStep = false
}) => {
  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Add Photos</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload photos to showcase your salon and position (up to {maxPhotos})
        </p>
      </div>
      
      <PhotoUploader
        files={photoUploads}
        onChange={handlePhotoChange}
        maxFiles={maxPhotos}
        accept="image/*"
      />

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {onPrevious && (
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 text-primary hover:underline"
          >
            Previous
          </button>
        )}
        
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 ml-auto"
          >
            {isLastStep ? 'Submit' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadSection;
