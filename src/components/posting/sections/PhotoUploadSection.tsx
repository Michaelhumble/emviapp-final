
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface PhotoUploadSectionProps {
  form: UseFormReturn<any>;
  onNext?: () => void;
  onBack?: () => void;
  onPhotoUploadsChange?: (photos: File[]) => void;
  maxPhotos?: number;
  isSubmitting?: boolean;
  photoUploads?: File[];
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ 
  form,
  onNext,
  onBack,
  onPhotoUploadsChange,
  maxPhotos = 5,
  isSubmitting = false,
  photoUploads = []
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onPhotoUploadsChange) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(file => 
        file.type.startsWith('image/')
      ).slice(0, maxPhotos - photoUploads.length);
      
      onPhotoUploadsChange([...photoUploads, ...validFiles]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Photos (Optional)</h2>
        <p className="text-sm text-muted-foreground mt-1">Upload photos of your salon or workspace</p>
      </div>
      
      <div className="grid gap-6">
        <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-xl bg-gray-50">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-center text-gray-500 mb-4">
            Drag and drop your images here, or click to browse
            <br />
            <span className="text-xs">
              Maximum {maxPhotos} photos, JPG, PNG or GIF, max 5MB each
            </span>
          </p>
          
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={isSubmitting || photoUploads.length >= maxPhotos}
          />
          
          <label htmlFor="photo-upload">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              disabled={isSubmitting || photoUploads.length >= maxPhotos}
              asChild
            >
              <span>Select Images</span>
            </Button>
          </label>
        </div>

        {photoUploads.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {photoUploads.map((file, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        {onBack && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
        )}

        {onNext && (
          <Button 
            type="button" 
            onClick={onNext}
            disabled={isSubmitting}
            className="ml-auto"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadSection;
