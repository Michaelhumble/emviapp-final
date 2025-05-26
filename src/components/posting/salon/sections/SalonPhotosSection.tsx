
import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Play, Star, Camera, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SalonPhotosSectionProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
}

export const SalonPhotosSection = ({ photoUploads, setPhotoUploads }: SalonPhotosSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setPhotoUploads(prev => [...prev, ...imageFiles]);
  }, [setPhotoUploads]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotoUploads(prev => [...prev, ...files]);
  }, [setPhotoUploads]);

  const removePhoto = useCallback((index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
    if (coverPhotoIndex === index) {
      setCoverPhotoIndex(0);
    } else if (coverPhotoIndex > index) {
      setCoverPhotoIndex(coverPhotoIndex - 1);
    }
  }, [setPhotoUploads, coverPhotoIndex]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Showcase Your Salon
        </h2>
        <p className="text-gray-600">Photos increase buyer interest by 400%. Upload your best shots!</p>
      </div>

      {/* Premium Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-purple-500 bg-purple-50 scale-105' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="p-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
              <Camera className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 p-1 rounded-full bg-yellow-400">
              <Star className="h-4 w-4 text-white" />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Drag & Drop Your Photos Here
            </h3>
            <p className="text-gray-600 mb-4">
              Or click to browse your files
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">✓ JPG, PNG, WEBP</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">✓ Up to 10MB each</Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">✓ Videos supported</Badge>
            </div>
          </div>
          
          <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </div>
      </div>

      {/* Photo Grid with Premium Styling */}
      {photoUploads.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              Your Salon Gallery ({photoUploads.length})
            </h3>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Star className="h-3 w-3 mr-1" />
              Premium Photos
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photoUploads.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group aspect-square"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Salon photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Cover Photo Badge */}
                  {index === coverPhotoIndex && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-yellow-500 text-white shadow-md">
                        <Star className="h-3 w-3 mr-1" />
                        Cover
                      </Badge>
                    </div>
                  )}
                  
                  {/* Video Badge */}
                  {file.type.startsWith('video/') && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="p-3 rounded-full bg-white/90">
                        <Play className="h-6 w-6 text-gray-800" />
                      </div>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setCoverPhotoIndex(index)}
                        className="bg-white/90 hover:bg-white"
                      >
                        <Star className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removePhoto(index)}
                        className="bg-red-500/90 hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Upload CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Add a Video Tour</h4>
                <p className="text-sm text-blue-700">Video listings get 3x more views and sell 40% faster</p>
              </div>
              <Button variant="outline" className="ml-auto border-blue-300 text-blue-600 hover:bg-blue-50">
                Add Video
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pro Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <h4 className="font-semibold text-purple-900 mb-3">📸 Pro Photography Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
          <div>
            <h5 className="font-medium mb-2">Must-Have Shots:</h5>
            <ul className="space-y-1">
              <li>• Salon entrance & storefront</li>
              <li>• Main service area overview</li>
              <li>• Individual stations/chairs</li>
              <li>• Reception & waiting area</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Quality Tips:</h5>
            <ul className="space-y-1">
              <li>• Natural lighting works best</li>
              <li>• Clean & declutter before shooting</li>
              <li>• Show equipment in action</li>
              <li>• Capture the atmosphere</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
