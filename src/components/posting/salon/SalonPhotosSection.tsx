
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SalonPhotosSectionProps {
  photoUploads: File[];
  setPhotoUploads: (photos: File[]) => void;
  maxPhotos: number;
}

export const SalonPhotosSection = ({ 
  photoUploads, 
  setPhotoUploads, 
  maxPhotos 
}: SalonPhotosSectionProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, maxPhotos - photoUploads.length);
      setPhotoUploads([...photoUploads, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photoUploads.filter((_, i) => i !== index);
    setPhotoUploads(updatedPhotos);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Salon Photos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photoUploads.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Salon photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => removePhoto(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        {photoUploads.length < maxPhotos && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="photo-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Upload salon photos ({photoUploads.length}/{maxPhotos})
                </span>
                <input
                  id="photo-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
