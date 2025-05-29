
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SalonPhotosStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: (photos: File[]) => void;
}

export const SalonPhotosStep = ({ form, photoUploads, setPhotoUploads }: SalonPhotosStepProps) => {
  const maxPhotos = 8;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, maxPhotos - photoUploads.length);
      const updatedPhotos = [...photoUploads, ...newFiles];
      setPhotoUploads(updatedPhotos);
    }
    // Reset the input value to allow re-uploading the same file
    event.target.value = '';
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photoUploads.filter((_, i) => i !== index);
    setPhotoUploads(updatedPhotos);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const newFiles = imageFiles.slice(0, maxPhotos - photoUploads.length);
    
    if (newFiles.length > 0) {
      const updatedPhotos = [...photoUploads, ...newFiles];
      setPhotoUploads(updatedPhotos);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Salon Photos / Hình ảnh tiệm
        </h3>
        <p className="text-gray-600">
          Upload up to {maxPhotos} photos to showcase your salon / Tải lên tối đa {maxPhotos} hình ảnh để giới thiệu tiệm của bạn
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Upload Photos ({photoUploads.length}/{maxPhotos}) / Tải lên hình ảnh
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {photoUploads.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {photoUploads.map((photo, index) => (
                <div key={`${photo.name}-${index}`} className="relative group">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Salon photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {photoUploads.length < maxPhotos && (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <span className="text-lg font-medium text-gray-900 hover:text-purple-600">
                    Click to upload or drag and drop / Nhấp để tải lên hoặc kéo thả
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB each / PNG, JPG, GIF tối đa 10MB mỗi tệp
                  </p>
                  <input
                    id="photo-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
                <Button 
                  type="button"
                  variant="outline" 
                  className="mt-4"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  Select Photos / Chọn hình ảnh
                </Button>
              </div>
            </div>
          )}

          {photoUploads.length >= maxPhotos && (
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-700 font-medium">
                Maximum photos uploaded ({maxPhotos}/{maxPhotos}) / Đã tải lên tối đa hình ảnh
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPhotosStep;
