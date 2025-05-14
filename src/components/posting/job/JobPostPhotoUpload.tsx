
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
  translations?: {
    dragDropText: string;
    photoCount: (count: number, max: number) => string;
  };
}

const JobPostPhotoUpload: React.FC<JobPostPhotoUploadProps> = ({
  photoUploads,
  setPhotoUploads,
  maxPhotos = 5,
  translations
}) => {
  const { isVietnamese } = useTranslation();
  
  const defaultTranslations = {
    dragDropText: isVietnamese 
      ? 'Kéo thả hình ảnh vào đây hoặc bấm để chọn – Gợi ý: Thêm hình sẽ giúp bài đăng nổi bật hơn!' 
      : 'Drag and drop images or click to select',
    photoCount: (count: number, max: number) => isVietnamese 
      ? `${count} / ${max} ảnh được thêm` 
      : `${count} / ${max} photos added`
  };
  
  const finalTranslations = translations || defaultTranslations;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file drops, ensuring we don't exceed max photos
    setPhotoUploads(current => {
      const availableSlots = maxPhotos - current.length;
      if (availableSlots <= 0) return current;
      
      const newFiles = acceptedFiles.slice(0, availableSlots);
      return [...current, ...newFiles];
    });
  }, [setPhotoUploads, maxPhotos]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: Math.max(0, maxPhotos - photoUploads.length),
    disabled: photoUploads.length >= maxPhotos
  });

  const removePhoto = (index: number) => {
    setPhotoUploads(current => current.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Dropzone */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-200 ease-in-out
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 hover:scale-[1.01]'}`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 font-inter">
          {finalTranslations.dragDropText}
        </p>
        <p className="mt-1 text-xs text-gray-500 font-inter">
          {finalTranslations.photoCount(photoUploads.length, maxPhotos)}
        </p>
      </div>

      {/* Preview of uploaded images */}
      {photoUploads.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {photoUploads.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload preview ${index + 1}`}
                className="h-24 w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(index);
                }}
                className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostPhotoUpload;
