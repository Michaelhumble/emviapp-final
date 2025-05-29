
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Camera, Star, Sparkles, Crown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full">
          <Camera className="w-5 h-5 text-rose-600" />
          <span className="text-sm font-medium text-rose-800">Step 4</span>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-3">Showcase Your Salon</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          High-quality photos are your most powerful tool to attract buyers. Show them why your salon is special.
        </p>
      </div>

      {/* Upload Area */}
      <div className="relative">
        <div 
          className="border-2 border-dashed border-purple-300 rounded-2xl p-12 text-center hover:border-purple-400 transition-all duration-300 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 backdrop-blur-sm"
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
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/25">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-playfair text-2xl font-bold text-gray-900">
                Drag photos here or click to upload
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Support: JPG, PNG, WEBP • Max 5MB each • Up to {maxPhotos} photos
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-purple-600 bg-purple-100/50 rounded-full px-4 py-2 inline-flex">
                  <Star className="w-4 h-4" />
                  <span>{photoUploads.length}/{maxPhotos} photos uploaded</span>
                </div>
              </div>
            </div>
            
            <Button
              type="button"
              onClick={() => document.getElementById('photo-upload')?.click()}
              disabled={photoUploads.length >= maxPhotos}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/30 transition-all duration-200"
            >
              <Camera className="w-4 h-4 mr-2" />
              Select Photos
            </Button>
          </div>
        </div>
      </div>

      {/* Uploaded Photos Grid */}
      {photoUploads.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-playfair text-xl font-semibold text-gray-900">
              Your Salon Gallery ({photoUploads.length})
            </h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photoUploads.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <div className="aspect-square rounded-xl border-2 border-gray-200 bg-white overflow-hidden hover:border-purple-300 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Salon photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 transform scale-90 hover:scale-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 truncate px-1">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photo Tips */}
      <Alert className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <Crown className="h-5 w-5 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="space-y-3">
            <div className="font-semibold">📸 Professional Photo Tips:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Essential Shots:</strong>
                <ul className="mt-1 space-y-1 text-blue-700">
                  <li>• Exterior storefront view</li>
                  <li>• Reception & waiting area</li>
                  <li>• Individual workstations</li>
                  <li>• Equipment & tools</li>
                </ul>
              </div>
              <div>
                <strong>Pro Results:</strong>
                <ul className="mt-1 space-y-1 text-blue-700">
                  <li>• Natural lighting is best</li>
                  <li>• Clean, organized spaces</li>
                  <li>• Multiple angles per area</li>
                  <li>• Before/after client work</li>
                </ul>
              </div>
            </div>
            <div className="text-sm font-medium">
              💡 Listings with 8+ high-quality photos get 3x more buyer inquiries!
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
