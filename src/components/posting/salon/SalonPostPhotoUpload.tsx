
import React from 'react';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Photo Upload Area */}
      <div>
        <PhotoUploader
          files={photoUploads}
          onChange={handlePhotoChange}
          maxFiles={maxPhotos}
          accept="image/*"
        />
      </div>

      {/* Photo Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 text-lg">💡</div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              Mẹo chụp ảnh hiệu quả / Photo Tips
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Chụp ảnh tổng quan không gian salon / Take overview shots of the salon space</li>
              <li>• Chụp các khu vực làm việc và thiết bị / Capture work areas and equipment</li>
              <li>• Đảm bảo ánh sáng tốt, tránh mờ / Ensure good lighting, avoid blur</li>
              <li>• Ảnh đầu tiên sẽ là ảnh đại diện / First photo will be the main display image</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Requirement alert */}
      {photoUploads.length === 0 && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            ⚠️ Cần ít nhất 1 hình ảnh để tiếp tục / At least 1 photo required to continue
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SalonPhotoUpload;
