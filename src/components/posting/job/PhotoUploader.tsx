
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PhotoUploaderProps {
  uploads: File[];
  onUploadsChange: (files: File[]) => void;
  maxPhotos?: number;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  uploads,
  onUploadsChange,
  maxPhotos = 5
}) => {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB limit
    onDrop: (acceptedFiles) => {
      if (uploads.length + acceptedFiles.length > maxPhotos) {
        toast.error(`You can only upload up to ${maxPhotos} photos`);
        // Only add photos up to the max limit
        const remainingSlots = maxPhotos - uploads.length;
        if (remainingSlots > 0) {
          onUploadsChange([...uploads, ...acceptedFiles.slice(0, remainingSlots)]);
        }
      } else {
        onUploadsChange([...uploads, ...acceptedFiles]);
      }
    },
    onDropRejected: (rejections) => {
      rejections.forEach(rejection => {
        if (rejection.errors[0].code === 'file-too-large') {
          toast.error(`File is too large. Max size is 5MB`);
        } else {
          toast.error(rejection.errors[0].message);
        }
      });
    }
  });

  const handleRemove = (index: number) => {
    const newUploads = [...uploads];
    newUploads.splice(index, 1);
    onUploadsChange(newUploads);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-gray-600">
            {isDragActive
              ? "Drop your photos here"
              : "Drag & drop photos here or click to select"}
          </p>
          <p className="text-xs text-gray-500">
            JPG or PNG, max 5MB. Up to {maxPhotos} photos.
          </p>
        </div>
      </div>

      {uploads.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {uploads.map((file, index) => (
            <div 
              key={index} 
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
            >
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Upload ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  disabled={uploadingIndex === index}
                >
                  {uploadingIndex === index ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                {index + 1}/{uploads.length}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {uploads.length} of {maxPhotos} photos
        </p>
        {uploads.length > 0 && (
          <Button
            variant="outline" 
            size="sm"
            onClick={() => onUploadsChange([])}
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhotoUploader;
