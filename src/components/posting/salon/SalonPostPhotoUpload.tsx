
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCategoryFallbackImages, SalonCategory } from "@/utils/salonImageFallbacks";

interface SalonPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  salonCategory?: SalonCategory;
}

export const SalonPostPhotoUpload = ({ 
  photoUploads, 
  setPhotoUploads,
  salonCategory = 'beauty'
}: SalonPostPhotoUploadProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
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

  // Toggle sample images display
  const toggleSuggestions = () => {
    setShowSuggestions(prev => !prev);
  };

  // Get sample images for the current category
  const sampleImages = getCategoryFallbackImages(salonCategory);

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
        <div className="mt-6">
          <Alert className="bg-blue-50 border-blue-100">
            <Info className="h-5 w-5 text-blue-500" />
            <AlertDescription className="text-blue-700">
              <p className="font-medium">Don't have photos yet?</p>
              <p className="mt-1">No worries! We'll use one of our professional salon images as a placeholder until you upload your own photos.</p>
              <Button 
                variant="link" 
                className="text-blue-600 p-0 h-auto mt-1 font-normal"
                onClick={toggleSuggestions}
              >
                {showSuggestions ? "Hide sample images" : "View sample images"}
              </Button>
            </AlertDescription>
          </Alert>
          
          {showSuggestions && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 rounded-lg border border-blue-100 p-3 bg-blue-50/50">
              <p className="col-span-full text-sm text-blue-700 mb-1">
                One of these professional images will be used if you don't upload your own:
              </p>
              {sampleImages.map((img, index) => (
                <div key={index} className="aspect-video rounded overflow-hidden">
                  <img
                    src={img}
                    alt={`Sample salon image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
