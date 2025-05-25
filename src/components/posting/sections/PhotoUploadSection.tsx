
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Star, Heart } from 'lucide-react';
import PhotoUploader from '@/components/posting/PhotoUploader';

interface PhotoUploadSectionProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ 
  photoUploads, 
  setPhotoUploads, 
  maxPhotos = 5 
}) => {
  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8"
    >
      {/* Motivational Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900">📸 Show Off Your Amazing Salon!</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Posts with photos get 5x more quality applicants! Showcase your beautiful workspace, team, and atmosphere. 
          Make candidates excited to work with you.
        </p>
      </div>

      {/* Photo Upload Card */}
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Upload className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-playfair text-xl font-semibold text-gray-900">✨ Add Photos</h3>
          <div className="flex-1"></div>
          <span className="text-sm text-gray-500">Up to {maxPhotos} photos</span>
        </div>
        
        <PhotoUploader
          files={photoUploads}
          onChange={handlePhotoChange}
          maxFiles={maxPhotos}
          accept="image/*"
          className="mb-6"
        />

        {/* Photo Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-purple-500" />
              <span className="font-medium text-purple-800">Best Photos Include:</span>
            </div>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Clean, well-lit salon interior</li>
              <li>• Your team at work</li>
              <li>• Before/after client work</li>
              <li>• Reception area & amenities</li>
            </ul>
          </div>
          
          <div className="bg-pink-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-pink-500" />
              <span className="font-medium text-pink-800">Pro Tips:</span>
            </div>
            <ul className="text-sm text-pink-700 space-y-1">
              <li>• Natural lighting works best</li>
              <li>• Show your personality</li>
              <li>• Include happy clients (with permission)</li>
              <li>• Highlight unique services</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Success Tip */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Success Tip</h4>
            <p className="text-blue-700 text-sm leading-relaxed italic">
              "I uploaded 4 photos of my salon and got 3x more applicants than my competitor who posted without photos. 
              Visual storytelling makes all the difference!" 
            </p>
            <p className="text-blue-600 text-xs mt-2 font-medium">- Michelle T., Hair & Beauty Studio</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoUploadSection;
