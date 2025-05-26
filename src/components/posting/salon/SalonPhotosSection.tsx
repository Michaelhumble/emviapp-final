
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Camera, Upload, X, Star, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalonFormValues } from "./salonFormSchema";

interface SalonPhotosSectionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPhotosSection = ({ form }: SalonPhotosSectionProps) => {
  const { watch, setValue, trigger } = form;
  const photos = watch("photos") || [];
  const coverPhotoIndex = watch("coverPhotoIndex") || 0;
  
  const [dragActive, setDragActive] = useState(false);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const validateFile = (file: File): string | null => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return `${file.name}: Invalid file type. Please upload JPG, JPEG, or PNG files only.`;
    }
    
    if (file.size > maxSize) {
      return `${file.name}: File size too large. Maximum size is 5MB.`;
    }

    return null;
  };

  const handleFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const currentPhotos = photos || [];
    const errors: string[] = [];

    // Check total count
    if (currentPhotos.length + fileArray.length > 10) {
      errors.push(`Cannot upload ${fileArray.length} files. Maximum 10 photos allowed (currently have ${currentPhotos.length}).`);
      setUploadErrors(errors);
      return;
    }

    // Validate each file
    const validFiles: File[] = [];
    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setUploadErrors(errors);
      return;
    }

    // Clear errors and add valid files
    setUploadErrors([]);
    const newPhotos = [...currentPhotos, ...validFiles];
    setValue("photos", newPhotos);
    
    // Set cover photo to first photo if this is the first upload
    if (currentPhotos.length === 0 && validFiles.length > 0) {
      setValue("coverPhotoIndex", 0);
    }
    
    trigger(["photos", "coverPhotoIndex"]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setValue("photos", newPhotos);
    
    // Adjust cover photo index if needed
    if (index === coverPhotoIndex && newPhotos.length > 0) {
      setValue("coverPhotoIndex", 0);
    } else if (index < coverPhotoIndex) {
      setValue("coverPhotoIndex", coverPhotoIndex - 1);
    } else if (coverPhotoIndex >= newPhotos.length) {
      setValue("coverPhotoIndex", Math.max(0, newPhotos.length - 1));
    }
    
    trigger(["photos", "coverPhotoIndex"]);
  };

  const setCoverPhoto = (index: number) => {
    setValue("coverPhotoIndex", index);
    trigger("coverPhotoIndex");
  };

  const movePhoto = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= photos.length) return;
    
    const newPhotos = [...photos];
    const [movedPhoto] = newPhotos.splice(fromIndex, 1);
    newPhotos.splice(toIndex, 0, movedPhoto);
    
    setValue("photos", newPhotos);
    
    // Adjust cover photo index
    if (fromIndex === coverPhotoIndex) {
      setValue("coverPhotoIndex", toIndex);
    } else if (fromIndex < coverPhotoIndex && toIndex >= coverPhotoIndex) {
      setValue("coverPhotoIndex", coverPhotoIndex - 1);
    } else if (fromIndex > coverPhotoIndex && toIndex <= coverPhotoIndex) {
      setValue("coverPhotoIndex", coverPhotoIndex + 1);
    }
    
    trigger(["photos", "coverPhotoIndex"]);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4">
          <Camera className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Add photos of your salon
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Upload high-quality photos to showcase your salon. First photo will be your cover image.
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
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                      dragActive
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-300 hover:border-purple-400 bg-gray-50/50"
                    }`}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('photo-upload')?.click()}
                  >
                    <input
                      type="file"
                      id="photo-upload"
                      multiple
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          {photos.length >= 10 ? "Maximum photos reached (10/10)" : "Upload salon photos"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Drag & drop or click to select • JPG, PNG up to 5MB each • {photos.length}/10 photos
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error Messages */}
                  {uploadErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="text-sm text-red-600 space-y-1">
                        {uploadErrors.map((error, index) => (
                          <div key={index}>• {error}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Photo Previews */}
                  {photos.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">Uploaded Photos</h4>
                        <span className="text-sm text-gray-500">{photos.length}/10 photos</span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative group aspect-square">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Salon photo ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                            />
                            
                            {/* Cover Photo Badge */}
                            {index === coverPhotoIndex && (
                              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                Cover
                              </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                              {index !== coverPhotoIndex && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => setCoverPhoto(index)}
                                  className="text-xs"
                                >
                                  <StarIcon className="w-3 h-3 mr-1" />
                                  Set Cover
                                </Button>
                              )}
                              
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => removePhoto(index)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            {/* Reorder Buttons */}
                            <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {index > 0 && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => movePhoto(index, index - 1)}
                                  className="w-6 h-6 p-0 text-xs"
                                >
                                  ←
                                </Button>
                              )}
                              {index < photos.length - 1 && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => movePhoto(index, index + 1)}
                                  className="w-6 h-6 p-0 text-xs"
                                >
                                  →
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h5 className="font-medium text-blue-800 mb-2">📸 Photo Tips</h5>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use natural lighting and high resolution images</li>
            <li>• Show your salon's interior, exterior, and workspace</li>
            <li>• Include photos of your team in action (with permission)</li>
            <li>• The first photo will be your main cover image</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
