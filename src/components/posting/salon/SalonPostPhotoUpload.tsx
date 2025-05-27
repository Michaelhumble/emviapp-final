
import React from 'react';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import PhotoUploader from '@/components/posting/PhotoUploader';

interface SalonPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  showValidationError?: boolean;
}

export const SalonPostPhotoUpload: React.FC<SalonPostPhotoUploadProps> = ({
  photoUploads,
  setPhotoUploads,
  showValidationError = false
}) => {
  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Salon Photos *</Label>
        <p className="text-sm text-gray-600 mt-1">
          Upload high-quality photos of your salon to attract buyers (up to 10 photos)
        </p>
      </div>

      {showValidationError && photoUploads.length === 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please upload at least 1 photo to continue. Photos help buyers visualize your salon.
          </AlertDescription>
        </Alert>
      )}
      
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

      {photoUploads.length > 0 && (
        <div className="text-sm text-green-600 font-medium">
          ✓ {photoUploads.length} photo{photoUploads.length !== 1 ? 's' : ''} uploaded
        </div>
      )}
    </div>
  );
};
