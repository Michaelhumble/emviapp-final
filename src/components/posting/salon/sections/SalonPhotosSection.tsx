
import React, { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, Video, Star, X, ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPhotosSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
}

const SalonPhotosSection = ({ form, photoUploads, setPhotoUploads }: SalonPhotosSectionProps) => {
  const coverPhotoIndex = form.watch("coverPhotoIndex");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPhotoUploads([...photoUploads, ...acceptedFiles]);
  }, [photoUploads, setPhotoUploads]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  const removePhoto = (index: number) => {
    const newPhotos = photoUploads.filter((_, i) => i !== index);
    setPhotoUploads(newPhotos);
    
    // Adjust cover photo index if necessary
    if (coverPhotoIndex >= newPhotos.length) {
      form.setValue("coverPhotoIndex", Math.max(0, newPhotos.length - 1));
    }
  };

  const setCoverPhoto = (index: number) => {
    form.setValue("coverPhotoIndex", index);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Photos & Media</h2>
        <p className="text-gray-600">Showcase your salon with high-quality photos and optional video tour</p>
      </div>

      {/* Photo Upload */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-full">
              <Camera className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Salon Photos</h3>
              <p className="text-sm text-gray-600">Upload multiple photos of your salon (recommended: 5-15 photos)</p>
            </div>
          </div>

          {/* Drag and Drop Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">
              {isDragActive ? 'Drop photos here' : 'Drag & drop photos here'}
            </h4>
            <p className="text-gray-600 mb-4">or click to browse files</p>
            <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
              Choose Photos
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Supports JPEG, PNG, WebP • Max 10MB per file
            </p>
          </div>

          {/* Photo Grid */}
          {photoUploads.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-4">Uploaded Photos ({photoUploads.length})</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photoUploads.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Cover Photo Badge */}
                    {index === coverPhotoIndex && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Cover
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setCoverPhoto(index)}
                        className="text-xs"
                      >
                        Set as Cover
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removePhoto(index)}
                        className="text-xs"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Tour */}
      <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-full">
              <Video className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Video Tour (Optional)</h3>
              <p className="text-sm text-gray-600">Add a video walkthrough for maximum impact</p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                    className="border-2 focus:border-purple-500"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-gray-600">
                  Upload your video to YouTube or Vimeo and paste the link here
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Photo Tips */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
        <h3 className="font-semibold text-emerald-900 mb-3">📸 Photo Tips for Maximum Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-emerald-800 mb-3">Essential Photos:</h4>
            <ul className="text-emerald-700 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ImageIcon className="h-3 w-3" />
                Exterior storefront and signage
              </li>
              <li className="flex items-center gap-2">
                <ImageIcon className="h-3 w-3" />
                Main salon floor overview
              </li>
              <li className="flex items-center gap-2">
                <ImageIcon className="h-3 w-3" />
                Individual nail stations
              </li>
              <li className="flex items-center gap-2">
                <ImageIcon className="h-3 w-3" />
                Pedicure area and chairs
              </li>
              <li className="flex items-center gap-2">
                <ImageIcon className="h-3 w-3" />
                Reception and waiting area
              </li>
              <li className="flex items-center gap-2">
                <ImageIcon className="h-3 w-3" />
                Back office and storage areas
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-emerald-800 mb-3">Best Practices:</h4>
            <ul className="text-emerald-700 space-y-2 text-sm">
              <li>• Take photos during business hours with good lighting</li>
              <li>• Show the salon clean and organized</li>
              <li>• Include wide shots and detail shots</li>
              <li>• Capture the atmosphere and ambiance</li>
              <li>• Show parking and accessibility</li>
              <li>• Avoid personal information in photos</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Photo Quality Badge */}
      {photoUploads.length >= 5 && (
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Star className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-semibold text-yellow-900">Great Photo Collection!</h4>
              <p className="text-sm text-yellow-700">
                You have {photoUploads.length} photos. Listings with 5+ photos get 3x more buyer interest!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonPhotosSection;
