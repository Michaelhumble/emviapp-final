
import React from 'react';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { Camera, Info } from 'lucide-react';

interface PhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ 
  photoUploads, 
  setPhotoUploads, 
  maxPhotos = 8 
}) => {
  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <Camera className="w-6 h-6 text-purple-600" />
          </div>
          <span className="ml-3 text-xl font-medium">📸 Hình Ảnh Salon / Salon Photos</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload beautiful photos to attract buyers. High-quality images will make your salon stand out!
          <br />
          <span className="text-purple-600 font-medium">
            Tải lên hình ảnh đẹp để thu hút người mua. Hình ảnh chất lượng cao sẽ giúp salon của bạn nổi bật!
          </span>
        </p>
      </div>

      {/* Photo Upload Counter */}
      <div className="text-center mb-4">
        <span className="text-sm font-medium text-gray-600">
          Ảnh đã tải lên ({photoUploads.length}/8) / Uploaded Photos ({photoUploads.length}/8)
        </span>
      </div>

      {/* Photo Upload Area */}
      <PhotoUploader
        files={photoUploads}
        onChange={handlePhotoChange}
        maxFiles={maxPhotos}
        accept="image/*"
      />

      {/* Main Photo Indicator */}
      {photoUploads.length > 0 && (
        <div className="text-center">
          <div className="bg-purple-100 px-3 py-1 rounded-full inline-block">
            <span className="text-purple-800 text-sm font-medium">Ảnh chính / Main</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Nhấp để chọn hoặc kéo thả hình ảnh
          </p>
        </div>
      )}

      {/* Photo Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Info className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-medium text-blue-900">💡 Mẹo chụp ảnh hiệu quả / Photo Tips</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span className="text-blue-800">
              Chụp ảnh tổng quan không gian salon / Take overview shots of the salon space
            </span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span className="text-blue-800">
              Chụp các khu vực làm việc và thiết bị / Capture work areas and equipment
            </span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span className="text-blue-800">
              Đảm bảo ánh sáng tốt, tránh mờ / Ensure good lighting, avoid blur
            </span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span className="text-blue-800">
              Ảnh đầu tiên sẽ là ảnh đại diện / First photo will be the main display image
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
