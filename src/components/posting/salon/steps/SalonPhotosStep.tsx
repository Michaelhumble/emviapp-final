
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image, Camera, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SalonPhotosStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  setPhotoUploads: (photos: File[]) => void;
}

export const SalonPhotosStep = ({ form, photoUploads, setPhotoUploads }: SalonPhotosStepProps) => {
  const maxPhotos = 8;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, maxPhotos - photoUploads.length);
      const updatedPhotos = [...photoUploads, ...newFiles];
      setPhotoUploads(updatedPhotos);
    }
    // Reset the input value to allow re-uploading the same file
    event.target.value = '';
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photoUploads.filter((_, i) => i !== index);
    setPhotoUploads(updatedPhotos);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const newFiles = imageFiles.slice(0, maxPhotos - photoUploads.length);
    
    if (newFiles.length > 0) {
      const updatedPhotos = [...photoUploads, ...newFiles];
      setPhotoUploads(updatedPhotos);
    }
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4 relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-3">
            <Camera className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent pt-8">
          Showcase Your Salon's Beauty
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Professional photos sell salons <span className="font-semibold text-green-600">67% faster</span>. 
          Show off your stunning space, premium equipment, and inviting atmosphere.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            <span className="font-medium">High-quality photos = 3x more offers</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            <Sparkles className="h-3 w-3" />
            <span className="font-medium">Up to {maxPhotos} photos included</span>
          </div>
        </div>
      </div>

      <Card className="border-2 border-gray-200 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
              <Image className="h-5 w-5 text-white" />
            </div>
            <div>
              <div>Upload Stunning Photos ({photoUploads.length}/{maxPhotos})</div>
              <div className="text-sm text-gray-500 font-normal mt-1">Tải lên hình ảnh đẹp nhất của tiệm</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {photoUploads.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Your Beautiful Gallery
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photoUploads.map((photo, index) => (
                  <div key={`${photo.name}-${index}`} className="relative group">
                    <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50 aspect-square">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Salon photo ${index + 1}`}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-red-500 hover:bg-red-600 shadow-lg"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {photoUploads.length < maxPhotos && (
            <div 
              className="border-3 border-dashed border-purple-300 rounded-2xl p-12 text-center bg-gradient-to-br from-purple-50/50 to-blue-50/50 hover:from-purple-100/50 hover:to-blue-100/50 transition-all duration-300 cursor-pointer group"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-4 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Drop Your Stunning Photos Here
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Drag & drop or click to upload high-quality images that showcase your salon's beauty and professionalism
                  </p>
                  <div className="space-y-2">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Button 
                        type="button"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onClick={() => document.getElementById('photo-upload')?.click()}
                      >
                        <Camera className="mr-2 h-5 w-5" />
                        Choose Photos to Upload
                      </Button>
                      <input
                        id="photo-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                    </label>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, HEIC up to 10MB each • Chọn hình ảnh tối đa 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {photoUploads.length >= maxPhotos && (
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="bg-green-500 rounded-full p-2">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <p className="text-green-700 font-semibold text-lg">
                  Perfect! Your Gallery is Complete
                </p>
              </div>
              <p className="text-green-600">
                You've uploaded the maximum {maxPhotos} photos. Your salon looks absolutely stunning!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-2xl p-6 border border-amber-200">
        <div className="flex items-start space-x-3">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-2 mt-1">
            <Camera className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">📸 Pro Photography Tips for Maximum Impact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                  <span><strong>Lighting:</strong> Natural light or bright, even lighting shows true colors</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span><strong>Angles:</strong> Include wide shots, detail shots, and customer perspective</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <span><strong>Show equipment:</strong> Highlight premium chairs, tools, and technology</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                  <span><strong>Clean & organized:</strong> Showcase your salon at its absolute best</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonPhotosStep;
