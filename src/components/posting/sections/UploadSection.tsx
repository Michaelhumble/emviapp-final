
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface UploadSectionProps {
  uploads: File[];
  setUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
}

const UploadSection: React.FC<UploadSectionProps> = ({ 
  uploads, 
  setUploads, 
  maxPhotos = 5
}) => {
  const { t } = useTranslation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Limit to maxPhotos
    const totalPhotos = [...uploads, ...acceptedFiles];
    if (totalPhotos.length > maxPhotos) {
      alert(`You can upload a maximum of ${maxPhotos} photos.`);
      // Only take the first maxPhotos - uploads.length photos
      const newPhotos = acceptedFiles.slice(0, maxPhotos - uploads.length);
      setUploads(prev => [...prev, ...newPhotos]);
    } else {
      setUploads(prev => [...prev, ...acceptedFiles]);
    }
  }, [uploads, setUploads, maxPhotos]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    }
  });

  const removePhoto = (index: number) => {
    setUploads(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">
          {t({
            english: 'Add Photos',
            vietnamese: 'Thêm Hình Ảnh'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: `Upload up to ${maxPhotos} photos to showcase your salon and position`,
            vietnamese: `Tải lên tối đa ${maxPhotos} hình ảnh để giới thiệu salon và vị trí của bạn`
          })}
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-gray-400" />
          {isDragActive ? (
            <p className="text-base font-medium text-primary">
              {t({
                english: 'Drop the photos here...',
                vietnamese: 'Thả ảnh vào đây...'
              })}
            </p>
          ) : (
            <div>
              <p className="text-base font-medium text-gray-700">
                {t({
                  english: 'Drag & drop photos here, or click to select files',
                  vietnamese: 'Kéo & thả ảnh vào đây, hoặc nhấp để chọn tệp'
                })}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {t({
                  english: `${maxPhotos - uploads.length} photos remaining`,
                  vietnamese: `Còn lại ${maxPhotos - uploads.length} ảnh`
                })}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Preview uploaded files */}
      {uploads.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {uploads.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg border overflow-hidden bg-gray-100">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(index);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: Math.max(0, maxPhotos - uploads.length) }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square rounded-lg border border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
              <ImageIcon className="h-8 w-8 text-gray-300" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadSection;
