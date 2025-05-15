
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
}

const JobPostPhotoUpload: React.FC<JobPostPhotoUploadProps> = ({
  photoUploads,
  setPhotoUploads,
  maxPhotos = 5
}) => {
  const { isVietnamese } = useTranslation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPhotoUploads(prev => {
      const newFiles = [...prev];
      acceptedFiles.forEach(file => {
        if (newFiles.length < maxPhotos && !newFiles.some(f => f.name === file.name)) {
          newFiles.push(file);
        }
      });
      return newFiles;
    });
  }, [maxPhotos, setPhotoUploads]);

  const removePhoto = (index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5242880, // 5MB
    disabled: photoUploads.length >= maxPhotos
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {isVietnamese ? "Hình ảnh" : "Photos"}
        </h3>
        <span className="text-sm text-muted-foreground">
          {photoUploads.length}/{maxPhotos} {isVietnamese ? "hình ảnh" : "photos"}
        </span>
      </div>

      {photoUploads.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
          {photoUploads.map((file, index) => (
            <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                onClick={() => removePhoto(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/50'
        } ${photoUploads.length >= maxPhotos ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
        {isDragActive ? (
          <p>{isVietnamese ? "Thả để tải lên" : "Drop to upload"}</p>
        ) : (
          <>
            <p className="text-sm font-medium mb-1">
              {isVietnamese ? "Kéo và thả hình ảnh vào đây" : "Drag & drop images here"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isVietnamese 
                ? `Tối đa ${maxPhotos} hình ảnh (JPG, PNG, GIF, tối đa 5MB mỗi ảnh)`
                : `Up to ${maxPhotos} images (JPG, PNG, GIF, max 5MB each)`}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default JobPostPhotoUpload;
