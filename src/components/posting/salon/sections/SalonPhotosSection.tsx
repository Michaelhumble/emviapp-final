
import React, { useCallback } from "react";
import { Camera, Video, Star, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SalonPhotosSectionProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

const SalonPhotosSection = ({ photoUploads, setPhotoUploads }: SalonPhotosSectionProps) => {
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files);
    setPhotoUploads(prev => [...prev, ...newFiles]);
    event.target.value = '';
  }, [setPhotoUploads]);

  const removePhoto = useCallback((index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  }, [setPhotoUploads]);

  return (
    <div className="space-y-8">
      {/* Photo Upload Area */}
      <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50">
        <input
          id="photo-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Showcase Your Beautiful Salon</h3>
            <p className="text-gray-600 mb-4">
              High-quality photos significantly increase buyer interest and inquiries
            </p>
          </div>
          <Button
            type="button"
            onClick={() => document.getElementById('photo-upload')?.click()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Photos
          </Button>
          <p className="text-sm text-gray-500">
            JPG, PNG, WEBP. Max 10MB each. Up to 20 photos.
          </p>
        </div>
      </div>

      {/* Photo Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Must-Have Photos</h3>
          </div>
          <ul className="text-sm text-green-700 space-y-2">
            <li>• Salon exterior and storefront</li>
            <li>• Reception and waiting area</li>
            <li>• All service stations/chairs</li>
            <li>• Equipment and amenities</li>
            <li>• Storage and back areas</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Pro Tips</h3>
          </div>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Use natural lighting when possible</li>
            <li>• Show the salon clean and organized</li>
            <li>• Include neighborhood/parking views</li>
            <li>• Highlight unique features</li>
            <li>• Take photos from multiple angles</li>
          </ul>
        </div>
      </div>

      {/* Uploaded Photos Preview */}
      {photoUploads.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Uploaded Photos ({photoUploads.length})</h3>
            <Label className="text-sm text-gray-600">Drag to reorder • First photo will be the cover</Label>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photoUploads.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <div className="aspect-square rounded-xl border bg-gray-100 overflow-hidden relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Salon photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Cover
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Upload Section */}
      <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
        <div className="flex items-center gap-3 mb-4">
          <Video className="h-6 w-6 text-purple-600" />
          <h3 className="font-semibold text-lg">Video Walkthrough (Optional)</h3>
        </div>
        <p className="text-gray-600 mb-4">
          A video tour can increase buyer engagement by 300%. Show your personality and passion!
        </p>
        <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
          <Video className="h-4 w-4 mr-2" />
          Upload Video
        </Button>
        <p className="text-sm text-gray-500 mt-2">MP4, MOV up to 100MB • 2-5 minutes recommended</p>
      </div>
    </div>
  );
};

export default SalonPhotosSection;
