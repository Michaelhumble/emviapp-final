
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera, Play, Star, X } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPhotosSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
}

const SalonPhotosSection = ({ form, photoUploads, setPhotoUploads }: SalonPhotosSectionProps) => {
  const coverPhotoIndex = form.watch("coverPhotoIndex") || 0;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotoUploads([...photoUploads, ...files]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photoUploads.filter((_, i) => i !== index);
    setPhotoUploads(newPhotos);
    
    // Update cover photo index if needed
    if (coverPhotoIndex >= newPhotos.length && newPhotos.length > 0) {
      form.setValue("coverPhotoIndex", 0);
    }
  };

  const setCoverPhoto = (index: number) => {
    form.setValue("coverPhotoIndex", index);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-serif mb-2">Showcase Your Salon</h2>
        <p className="text-gray-600">High-quality photos get 5x more buyer interest</p>
      </div>

      {/* Drag and Drop Upload */}
      <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center bg-purple-50/50 hover:bg-purple-50 transition-colors">
        <Camera className="h-12 w-12 text-purple-400 mx-auto mb-4" />
        <h3 className="font-semibold text-lg mb-2">Upload Salon Photos</h3>
        <p className="text-gray-600 mb-4">Drag & drop photos here, or click to browse</p>
        
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload">
          <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50" asChild>
            <span className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Choose Photos
            </span>
          </Button>
        </label>
        
        <p className="text-sm text-gray-500 mt-2">
          JPG, PNG up to 10MB each. Upload 5-15 photos for best results.
        </p>
      </div>

      {/* Photo Grid */}
      {photoUploads.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-4">Your Photos ({photoUploads.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photoUploads.map((file, index) => (
              <Card key={index} className={`relative overflow-hidden ${index === coverPhotoIndex ? 'ring-2 ring-purple-500' : ''}`}>
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Salon photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Cover Photo Badge */}
                    {index === coverPhotoIndex && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Cover
                        </div>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {index !== coverPhotoIndex && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0"
                          onClick={() => setCoverPhoto(index)}
                        >
                          <Star className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 p-0"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Video Tour (Optional) */}
      <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 bg-blue-50/50">
        <div className="flex items-center gap-3 mb-4">
          <Play className="h-6 w-6 text-blue-500" />
          <div>
            <h3 className="font-semibold text-lg">Video Tour (Optional)</h3>
            <p className="text-gray-600">Add a video tour to increase buyer engagement by 3x</p>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube or Vimeo URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  className="border-2 focus:border-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Photography Tips */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-semibold text-amber-900 mb-3">📸 Pro Photography Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-amber-800 mb-2">Must-Have Shots:</h4>
            <ul className="text-amber-700 space-y-1">
              <li>• Front exterior with signage</li>
              <li>• Reception/waiting area</li>
              <li>• Service stations (all angles)</li>
              <li>• Equipment and supplies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-amber-800 mb-2">Photo Quality:</h4>
            <ul className="text-amber-700 space-y-1">
              <li>• Good lighting (natural preferred)</li>
              <li>• Clean, organized spaces</li>
              <li>• High resolution (minimum 1080p)</li>
              <li>• Multiple angles of each area</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonPhotosSection;
