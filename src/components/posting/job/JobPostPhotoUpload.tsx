
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxFiles: number;
  validateUpload: (files: File[]) => { valid: boolean; message: string };
  placeholder: string;
  uploadLimitText: string;
}

const JobPostPhotoUpload: React.FC<JobPostPhotoUploadProps> = ({
  photoUploads,
  setPhotoUploads,
  maxFiles,
  validateUpload,
  placeholder,
  uploadLimitText
}) => {
  const [error, setError] = useState<string | null>(null);
  
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Validate if adding these files would exceed the max
      if (photoUploads.length + acceptedFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} images allowed`);
        return;
      }
      
      // Validate files
      const validation = validateUpload(acceptedFiles);
      if (!validation.valid) {
        setError(validation.message);
        return;
      }

      setError(null);
      setPhotoUploads(prev => [...prev, ...acceptedFiles]);
    },
    [maxFiles, photoUploads, setPhotoUploads, validateUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles: maxFiles - photoUploads.length
  });

  const removePhoto = (index: number) => {
    const newPhotos = [...photoUploads];
    newPhotos.splice(index, 1);
    setPhotoUploads(newPhotos);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 hover:scale-105 ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-200 hover:border-primary/50'
        } ${photoUploads.length >= maxFiles ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">
          {placeholder}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {uploadLimitText}
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {photoUploads.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {photoUploads.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative group aspect-square rounded-md overflow-hidden border shadow-sm"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 opacity-80 group-hover:opacity-100"
                onClick={() => removePhoto(index)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostPhotoUpload;
