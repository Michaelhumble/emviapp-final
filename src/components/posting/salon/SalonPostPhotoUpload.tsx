
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image } from "lucide-react";

interface SalonPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonPostPhotoUpload = ({ 
  photoUploads, 
  setPhotoUploads 
}: SalonPostPhotoUploadProps) => {
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files);
    setPhotoUploads(prev => [...prev, ...newFiles]);
    
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  }, [setPhotoUploads]);

  const removePhoto = useCallback((index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  }, [setPhotoUploads]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-medium">Salon Photos</h2>
      <p className="text-gray-600">
        Upload high-quality photos of your salon. Photos significantly increase buyer interest.
      </p>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          id="photo-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
            <Upload className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Drag photos here or click to upload</p>
            <p className="text-sm text-gray-500 mt-1">
              Support: JPG, PNG, WEBP. Max 5MB each.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('photo-upload')?.click()}
          >
            Select Photos
          </Button>
        </div>
      </div>

      {photoUploads.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-3">Uploaded Photos ({photoUploads.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photoUploads.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <div className="aspect-square rounded-md border bg-gray-100 overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Salon photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {photoUploads.length === 0 && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-start space-x-3">
            <Image className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Photos make a difference!</p>
              <p className="mt-1">Listings with 5+ photos receive 3x more inquiries. Show your salon at its best.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
