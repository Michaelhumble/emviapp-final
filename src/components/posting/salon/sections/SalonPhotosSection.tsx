
import React, { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Play, Star, X, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonPhotosSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

const SalonPhotosSection = ({ form, photoUploads, setPhotoUploads }: SalonPhotosSectionProps) => {
  const coverPhotoIndex = form.watch("coverPhotoIndex");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...photoUploads, ...acceptedFiles].slice(0, 10); // Max 10 photos
    setPhotoUploads(newFiles);
  }, [photoUploads, setPhotoUploads]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 10
  });

  const removePhoto = (index: number) => {
    const newFiles = photoUploads.filter((_, i) => i !== index);
    setPhotoUploads(newFiles);
    
    // Update cover photo index if needed
    if (coverPhotoIndex >= newFiles.length) {
      form.setValue("coverPhotoIndex", Math.max(0, newFiles.length - 1));
    }
  };

  const setCoverPhoto = (index: number) => {
    form.setValue("coverPhotoIndex", index);
  };

  return (
    <div className="space-y-8">
      {/* Photo Upload Area */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Showcase Your Salon</h3>
          <p className="text-gray-600">High-quality photos get 5x more views and sell 3x faster</p>
        </div>

        {/* Drag & Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive 
              ? "border-purple-500 bg-purple-50" 
              : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                {isDragActive ? "Drop your photos here" : "Upload Salon Photos"}
              </h4>
              <p className="text-gray-600">
                Drag & drop photos or click to browse (up to 10 photos)
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <Badge variant="outline">Interior shots</Badge>
              <Badge variant="outline">Exterior view</Badge>
              <Badge variant="outline">Equipment</Badge>
              <Badge variant="outline">Work stations</Badge>
            </div>
          </div>
        </div>

        {/* Photo Tips */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Camera className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">📸 Pro Photo Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use natural lighting when possible</li>
                  <li>• Show the salon from multiple angles</li>
                  <li>• Include close-ups of premium equipment</li>
                  <li>• Capture the atmosphere and ambiance</li>
                  <li>• Before/after client work examples</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Photo Gallery */}
      {photoUploads.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Your Photos ({photoUploads.length}/10)</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photoUploads.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Cover Photo Badge */}
                {coverPhotoIndex === index && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-amber-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Cover
                    </Badge>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {coverPhotoIndex !== index && (
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => setCoverPhoto(index)}
                      className="text-xs"
                    >
                      <Star className="h-3 w-3 mr-1" />
                      Set Cover
                    </Button>
                  )}
                  <Button
                    type="button"
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

      {/* Video Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Play className="h-5 w-5 text-purple-600" />
          <h4 className="text-lg font-semibold">Video Walkthrough (Optional)</h4>
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            +40% More Interest
          </Badge>
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
                  className="h-12 border-2 focus:border-purple-500"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-600">
                A 2-3 minute video tour increases buyer engagement by 40%
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Play className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-amber-900 mb-1">🎬 Video Best Practices</h5>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Keep it 2-3 minutes max</li>
                  <li>• Walk through each area of the salon</li>
                  <li>• Highlight unique features and equipment</li>
                  <li>• Show the neighborhood and parking</li>
                  <li>• Include a personal message from you</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Stories */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="h-5 w-5 text-green-600 fill-current" />
              <h4 className="font-semibold text-green-900">Success Story</h4>
              <Star className="h-5 w-5 text-green-600 fill-current" />
            </div>
            <p className="text-green-800 italic">
              "I uploaded 8 high-quality photos and got 12 serious inquiries in the first week. 
              Sold my salon for asking price!" - Maria S., Beverly Hills
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPhotosSection;
