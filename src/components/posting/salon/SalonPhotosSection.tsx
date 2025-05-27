
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Camera, Star, ArrowLeft, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SalonPhotosSectionProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
  onNext: () => void;
  onBack: () => void;
  maxPhotos?: number;
}

const SalonPhotosSection: React.FC<SalonPhotosSectionProps> = ({ 
  photos, 
  onPhotosChange,
  onNext,
  onBack,
  maxPhotos = 10
}) => {
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files);
    const remainingSlots = maxPhotos - photos.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    onPhotosChange([...photos, ...filesToAdd]);
    
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  }, [onPhotosChange, photos.length, maxPhotos, photos]);

  const removePhoto = useCallback((index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  }, [onPhotosChange, photos]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const remainingSlots = maxPhotos - photos.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    onPhotosChange([...photos, ...filesToAdd]);
  }, [onPhotosChange, photos.length, maxPhotos, photos]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Salon Photos</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Upload high-quality photos of your salon. Photos significantly increase buyer interest and inquiries.
      </p>

      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          id="photo-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-purple-50 flex items-center justify-center">
            <Upload className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800 text-lg">Drag photos here or click to upload</p>
            <p className="text-sm text-gray-500 mt-2">
              Support: JPG, PNG, WEBP. Max 5MB each. Up to {maxPhotos} photos.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {photos.length}/{maxPhotos} photos uploaded
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('photo-upload')?.click()}
            disabled={photos.length >= maxPhotos}
          >
            Select Photos
          </Button>
        </div>
      </div>

      {photos.length > 0 && (
        <div className="mt-8">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Uploaded Photos ({photos.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <div className="aspect-square rounded-lg border-2 border-gray-200 bg-gray-100 overflow-hidden hover:border-purple-300 transition-colors">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Salon photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Alert className="bg-blue-50 border-blue-200">
        <Camera className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Photo Tips:</strong> Include exterior shots, reception area, workstations, equipment, 
          before/after client work, and team photos. Well-lit, high-quality images get 3x more inquiries!
        </AlertDescription>
      </Alert>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Details
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 flex items-center gap-2"
        >
          Next: Pricing
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SalonPhotosSection;
