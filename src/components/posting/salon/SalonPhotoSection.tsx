
import React, { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X, Star, Camera } from "lucide-react";
import { SalonFormValues } from "./salonFormSchema";

interface SalonPhotoSectionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPhotoSection = ({ form }: SalonPhotoSectionProps) => {
  const { watch, setValue } = form;
  const photos = watch("photos") || [];
  const coverPhotoIndex = watch("coverPhotoIndex") || 0;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const currentPhotos = photos || [];
    const totalPhotos = currentPhotos.length + acceptedFiles.length;
    
    if (totalPhotos > 10) {
      form.setError("photos", { message: "Maximum 10 photos allowed" });
      return;
    }

    // Validate file types and sizes
    const validFiles: File[] = [];
    const errors: string[] = [];

    acceptedFiles.forEach(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type. Please use JPG, JPEG, or PNG.`);
        return;
      }

      if (file.size > maxSize) {
        errors.push(`${file.name}: File too large. Maximum size is 5MB.`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      form.setError("photos", { message: errors.join(" ") });
      return;
    }

    const newPhotos = [...currentPhotos, ...validFiles];
    setValue("photos", newPhotos);
    form.clearErrors("photos");
  }, [photos, form, setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    multiple: true,
    disabled: photos.length >= 10
  });

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setValue("photos", newPhotos);
    
    // Adjust cover photo index if necessary
    if (coverPhotoIndex >= newPhotos.length && newPhotos.length > 0) {
      setValue("coverPhotoIndex", 0);
    } else if (coverPhotoIndex > index) {
      setValue("coverPhotoIndex", coverPhotoIndex - 1);
    }
  };

  const setCoverPhoto = (index: number) => {
    setValue("coverPhotoIndex", index);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4">
          <Camera className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Add salon photos
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Upload high-quality photos to showcase your salon. The first photo will be your cover image.
        </p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8 space-y-6">
        <FormField
          control={form.control}
          name="photos"
          render={() => (
            <FormItem>
              <FormLabel className="text-lg font-medium text-gray-800">
                Salon Photos <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {/* Upload Area */}
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                      isDragActive
                        ? "border-purple-500 bg-purple-50"
                        : photos.length >= 10
                        ? "border-gray-300 bg-gray-50 cursor-not-allowed opacity-50"
                        : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-purple-600" />
                      </div>
                      {isDragActive ? (
                        <p className="font-medium text-purple-700">Drop photos here...</p>
                      ) : photos.length >= 10 ? (
                        <p className="font-medium text-gray-500">Maximum 10 photos reached</p>
                      ) : (
                        <div>
                          <p className="font-medium text-gray-700">
                            Drag & drop photos here, or click to select
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            JPG, JPEG, PNG up to 5MB each • {photos.length}/10 photos
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Photo Previews */}
                  {photos.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">Uploaded Photos</h3>
                        <p className="text-sm text-gray-500">{photos.length}/10 photos</p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photos.map((photo: File, index: number) => (
                          <div
                            key={index}
                            className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                              coverPhotoIndex === index
                                ? "border-purple-500 ring-2 ring-purple-200"
                                : "border-gray-200 hover:border-purple-300"
                            }`}
                          >
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Cover Photo Badge */}
                            {coverPhotoIndex === index && (
                              <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                Cover
                              </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              {coverPhotoIndex !== index && (
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => setCoverPhoto(index)}
                                  className="bg-white text-gray-800 hover:bg-gray-100 text-xs"
                                >
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
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <p className="text-sm text-gray-500">
                Upload 1-10 high-quality photos of your salon. The cover photo will be displayed prominently in search results.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
