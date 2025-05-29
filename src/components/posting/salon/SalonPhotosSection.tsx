
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Camera, Star, Eye, TrendingUp, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

interface SalonPhotosSectionProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
}

export const SalonPhotosSection = ({ 
  photoUploads, 
  setPhotoUploads,
  maxPhotos = 10
}: SalonPhotosSectionProps) => {
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files);
    const remainingSlots = maxPhotos - photoUploads.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    setPhotoUploads(prev => [...prev, ...filesToAdd]);
    
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  }, [setPhotoUploads, photoUploads.length, maxPhotos]);

  const removePhoto = useCallback((index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  }, [setPhotoUploads]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const remainingSlots = maxPhotos - photoUploads.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    setPhotoUploads(prev => [...prev, ...filesToAdd]);
  }, [setPhotoUploads, photoUploads.length, maxPhotos]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Showcase Your Salon's Beauty
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            High-quality photos are the #1 factor in attracting serious buyers and commanding premium prices
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-100 px-4 py-2 rounded-full">
              <Eye className="h-4 w-4" />
              <span className="font-medium">Photos increase views by 500%</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">Sell 3x faster with great photos</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-indigo-300 rounded-xl p-12 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 bg-gradient-to-br from-white to-indigo-50/30"
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
        
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Upload className="h-10 w-10 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-xl mb-2">Drag your stunning photos here</p>
            <p className="text-gray-600 text-lg">or click below to select from your device</p>
            <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto">
              Support: JPG, PNG, WEBP. Max 5MB each. Up to {maxPhotos} photos.
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <span className="text-sm text-indigo-600 font-medium">
                {photoUploads.length}/{maxPhotos} photos uploaded
              </span>
            </div>
          </div>
          <Button
            type="button"
            size="lg"
            onClick={() => document.getElementById('photo-upload')?.click()}
            disabled={photoUploads.length >= maxPhotos}
            className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg"
          >
            <Camera className="h-5 w-5 mr-2" />
            {photoUploads.length === 0 ? 'Select Your Best Photos' : 'Add More Photos'}
          </Button>
        </div>
      </div>

      {/* Photo Gallery */}
      {photoUploads.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-500" />
              Your Salon Gallery ({photoUploads.length})
            </h3>
            <div className="text-sm text-gray-500">
              {maxPhotos - photoUploads.length} slots remaining
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {photoUploads.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <div className="aspect-square rounded-xl border-2 border-gray-200 bg-gray-100 overflow-hidden hover:border-indigo-300 transition-all duration-300 shadow-md hover:shadow-lg">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Salon photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                >
                  <X className="h-4 w-4" />
                </button>
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Cover
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2 truncate text-center">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photo Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <Camera className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong className="block mb-2">📸 Photo Success Tips:</strong>
            <ul className="text-sm space-y-1">
              <li>• Bright, natural lighting works best</li>
              <li>• Show exterior, reception, workstations, equipment</li>
              <li>• Include before/after client work samples</li>
              <li>• Capture busy periods to show popularity</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <Zap className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong className="block mb-2">💰 Value Impact:</strong>
            <ul className="text-sm space-y-1">
              <li>• Professional photos = 40% higher offers</li>
              <li>• Multiple angles build buyer confidence</li>
              <li>• Quality images reduce negotiation time</li>
              <li>• Visual proof accelerates sale process</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
