
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, X, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isUploading?: boolean;
}

const JobPostPhotoUpload: React.FC<JobPostPhotoUploadProps> = ({
  photoUploads,
  setPhotoUploads,
  isUploading = false
}) => {
  const { t } = useTranslation();
  const MAX_FILES = 4;
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Only add new files up to the maximum allowed
    const remainingSlots = MAX_FILES - photoUploads.length;
    const newFiles = acceptedFiles.slice(0, remainingSlots);
    
    if (newFiles.length > 0) {
      setPhotoUploads([...photoUploads, ...newFiles]);
    }
  }, [photoUploads, setPhotoUploads]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: MAX_FILES - photoUploads.length,
    disabled: photoUploads.length >= MAX_FILES || isUploading
  });
  
  const removePhoto = (index: number) => {
    const newPhotos = [...photoUploads];
    newPhotos.splice(index, 1);
    setPhotoUploads(newPhotos);
  };
  
  return (
    <div className="space-y-4">
      {photoUploads.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {photoUploads.map((file, index) => (
            <div key={index} className="relative border rounded overflow-hidden aspect-square">
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                disabled={isUploading}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {photoUploads.length < MAX_FILES && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:border-primary transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-sm text-muted-foreground">
                {t("Uploading...", "Đang tải lên...")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm font-medium">
                {t("Add photos (optional)", "Thêm hình ảnh (tùy chọn)")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t(
                  `Drag & drop or click to upload (${photoUploads.length}/${MAX_FILES})`,
                  `Kéo & thả hoặc nhấp để tải lên (${photoUploads.length}/${MAX_FILES})`
                )}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobPostPhotoUpload;
