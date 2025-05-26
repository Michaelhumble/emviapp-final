
import React, { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, Video, Star, X } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";
import { uploadImage } from "@/utils/uploadImage";
import { Progress } from "@/components/ui/progress";

interface SalonPhotosSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonPhotosSection = ({ form, photoUploads, setPhotoUploads }: SalonPhotosSectionProps) => {
  const [uploadProgress, setUploadProgress] = React.useState<{ [key: string]: number }>({});
  const [dragOver, setDragOver] = React.useState(false);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    setPhotoUploads(prev => [...prev, ...files].slice(0, 10));
  }, [setPhotoUploads]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      setPhotoUploads(prev => [...prev, ...files].slice(0, 10));
    }
  };

  const removePhoto = (index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };

  const setCoverPhoto = (index: number) => {
    form.setValue("coverPhotoIndex", index);
  };

  return (
    <div className="space-y-8">
      {/* Drag and Drop Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragOver 
            ? 'border-purple-400 bg-purple-50/50 scale-105' 
            : 'border-purple-200 bg-gradient-to-br from-purple-50/30 to-pink-50/30'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-purple-100 rounded-full">
              <Camera className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Showcase Your Salon</h3>
            <p className="text-gray-600 mb-4">
              Drag & drop photos here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Upload up to 10 high-quality photos (JPG, PNG up to 10MB each)
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload">
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Photos
                </span>
              </Button>
            </label>
          </div>
        </div>

        {dragOver && (
          <div className="absolute inset-0 bg-purple-100/50 rounded-xl flex items-center justify-center">
            <div className="text-purple-600 text-lg font-medium">Drop photos here!</div>
          </div>
        )}
      </div>

      {/* Photo Preview Grid */}
      {photoUploads.length > 0 && (
        <div>
          <h4 className="font-semibold text-lg mb-4">Your Salon Photos ({photoUploads.length}/10)</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photoUploads.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Salon photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Cover Photo Badge */}
                {form.watch("coverPhotoIndex") === index && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Cover
                  </Badge>
                )}

                {/* Controls */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setCoverPhoto(index)}
                    className="text-xs"
                  >
                    Set Cover
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video Tour Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Video className="h-6 w-6 text-blue-600" />
          <h3 className="font-semibold text-lg">Video Tour (Optional)</h3>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">Increases views by 300%</Badge>
        </div>
        
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YouTube or Vimeo URL</FormLabel>
              <FormControl>
                <input
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-blue-600">Pro tip: A 2-3 minute walkthrough video significantly increases buyer interest</p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Photography Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h4 className="font-semibold text-amber-800 mb-3">📸 Professional Photo Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-700">
          <div>
            <h5 className="font-medium mb-2">Essential Shots:</h5>
            <ul className="space-y-1">
              <li>• Exterior and entrance</li>
              <li>• Reception and waiting area</li>
              <li>• Main service floor</li>
              <li>• Individual stations</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Best Practices:</h5>
            <ul className="space-y-1">
              <li>• Good lighting (avoid harsh shadows)</li>
              <li>• Clean, organized spaces</li>
              <li>• Multiple angles of key areas</li>
              <li>• Show equipment and amenities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonPhotosSection;
