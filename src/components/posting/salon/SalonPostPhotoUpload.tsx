
import React from 'react';
import { Label } from '@/components/ui/label';
import PhotoUploader from '@/components/posting/PhotoUploader';

interface SalonPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonPostPhotoUpload: React.FC<SalonPostPhotoUploadProps> = ({
  photoUploads,
  setPhotoUploads
}) => {
  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Salon Photos</Label>
        <p className="text-sm text-gray-600 mt-1">
          Upload high-quality photos of your salon to attract buyers (up to 10 photos)
        </p>
      </div>
      
      <PhotoUploader
        files={photoUploads}
        onChange={handlePhotoChange}
        maxFiles={10}
        accept="image/*"
      />
      
      <div className="text-xs text-gray-500">
        <p>Tips for great photos:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Include exterior and interior shots</li>
          <li>Show equipment and workstations</li>
          <li>Capture the salon's atmosphere and ambiance</li>
          <li>Ensure good lighting and clear images</li>
        </ul>
      </div>
    </div>
  );
};
