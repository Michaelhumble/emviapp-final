
import React from 'react';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

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
  const { t } = useTranslation();
  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">
          {t({
            english: 'Add Photos',
            vietnamese: 'Thêm Ảnh'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: `Upload photos to showcase your salon and position (up to ${maxPhotos})`,
            vietnamese: `Tải lên ảnh để giới thiệu salon và vị trí của bạn (tối đa ${maxPhotos})`
          })}
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
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
          >
            {t({
              english: 'Previous',
              vietnamese: 'Trước'
            })}
          </Button>
        )}
        
        {onNext && (
          <Button
            type="button"
            onClick={onNext}
            className="ml-auto"
          >
            {isLastStep ? 
              t({
                english: 'Submit',
                vietnamese: 'Gửi'
              }) : 
              t({
                english: 'Next',
                vietnamese: 'Tiếp theo'
              })
            }
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadSection;
