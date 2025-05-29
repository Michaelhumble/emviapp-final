
import React from 'react';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { Camera, Info, Upload } from 'lucide-react';
import PhotoUploader from '@/components/posting/PhotoUploader';

interface PhotoUploadStepProps {
  formData: SalonFormValues;
  photos: File[];
  pricing: SalonPricingOptions;
  updateFormData: (data: Partial<SalonFormValues>) => void;
  updatePhotos: (photos: File[]) => void;
  updatePricing: (pricing: SalonPricingOptions) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const PhotoUploadStep = ({ 
  photos, 
  updatePhotos 
}: PhotoUploadStepProps) => {
  const handlePhotoChange = (files: File[]) => {
    updatePhotos(files);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-purple-100 p-3 rounded-full mr-3">
            <Camera className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">📸 Hình Ảnh Salon / Salon Photos</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tải lên hình ảnh đẹp để thu hút người mua. Hình ảnh chất lượng cao sẽ giúp salon của bạn nổi bật!
          <br />
          Upload beautiful photos to attract buyers. High-quality images will make your salon stand out!
        </p>
      </div>

      {/* Photo Upload Area */}
      <PhotoUploader
        files={photos}
        onChange={handlePhotoChange}
        maxFiles={8}
        accept="image/*"
      />

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

      {photos.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-yellow-600 mr-2">⚠️</span>
            <span className="text-yellow-800 font-medium">
              Cần ít nhất 1 hình ảnh để tiếp tục / At least 1 photo required to continue
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
