
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export interface PhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
  onNext?: () => void;
  onPrevious?: () => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  photoUploads,
  setPhotoUploads,
  maxPhotos = 5,
  onNext,
  onPrevious
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (photoUploads.length + acceptedFiles.length > maxPhotos) {
      toast.error(`You can only upload up to ${maxPhotos} photos`);
      const remainingSlots = Math.max(0, maxPhotos - photoUploads.length);
      if (remainingSlots > 0) {
        setPhotoUploads(prev => [...prev, ...acceptedFiles.slice(0, remainingSlots)]);
      }
    } else {
      setPhotoUploads(prev => [...prev, ...acceptedFiles]);
    }
  }, [photoUploads, setPhotoUploads, maxPhotos]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  const removePhoto = (index: number) => {
    setPhotoUploads(photoUploads.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Upload Photos</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add photos to make your job posting stand out (up to {maxPhotos})
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-sm font-medium">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop photos here, or click to select'}
          </p>
          <p className="text-xs text-gray-500">
            Supports: JPG, PNG, GIF (max {maxPhotos} photos)
          </p>
        </div>
      </div>

      {photoUploads.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium text-sm mb-2">Uploaded Photos ({photoUploads.length}/{maxPhotos})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photoUploads.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-70 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-gray-700" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {(onPrevious || onNext) && (
        <div className="flex justify-between mt-8">
          {onPrevious && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onPrevious}
            >
              Previous
            </Button>
          )}
          
          {onNext && (
            <Button 
              type="button"
              onClick={onNext}
              className="ml-auto"
            >
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
