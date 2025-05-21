
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Limit the number of files that can be uploaded
    const availableSlots = maxPhotos - uploads.length;
    const filesToAdd = acceptedFiles.slice(0, availableSlots);
    
    setUploads(prev => [...prev, ...filesToAdd]);
  }, [uploads, setUploads, maxPhotos]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: maxPhotos - uploads.length,
    disabled: uploads.length >= maxPhotos
  });
  
  const removeFile = (indexToRemove: number) => {
    setUploads(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Upload Photos</h2>
        <p className="text-sm text-muted-foreground mt-1">Add photos of your salon or workspace (optional)</p>
      </div>
      
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
        } ${uploads.length >= maxPhotos ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <Upload className="h-10 w-10 text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">
            {isDragActive 
              ? 'Drop the images here...' 
              : uploads.length >= maxPhotos 
                ? `Maximum ${maxPhotos} images reached` 
                : 'Drag & drop images here, or click to select'
            }
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {`${uploads.length} of ${maxPhotos} images uploaded`}
          </p>
        </div>
      </div>
      
      {uploads.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {uploads.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-md overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`Upload preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadSection;
