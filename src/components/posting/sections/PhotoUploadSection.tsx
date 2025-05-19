
import React from 'react';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { Card } from '@/components/ui/card';

interface PhotoUploadSectionProps {
  onPhotoUpload: (files: File[]) => void;
  prevStep: () => void;
  nextStep: () => void;
  maxPhotos?: number;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  onPhotoUpload,
  prevStep,
  nextStep,
  maxPhotos = 5
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Photos</h2>
      <p className="text-gray-500 mb-6">Add photos of your salon, work environment, or any other relevant images.</p>
      
      <PhotoUploader 
        onChange={onPhotoUpload}
        maxFiles={maxPhotos}
      />
      
      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          onClick={prevStep}
        >
          Previous
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-primary text-white rounded-md"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PhotoUploadSection;
