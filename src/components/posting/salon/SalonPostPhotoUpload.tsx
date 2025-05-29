
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Camera, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SalonPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
}

const SalonPhotoUpload: React.FC<SalonPhotoUploadProps> = ({ 
  photoUploads, 
  setPhotoUploads, 
  maxPhotos = 8 
}) => {
  const handlePhotoChange = (files: File[]) => {
    setPhotoUploads(files);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="space-y-8 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium Header */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 tracking-tight flex items-center gap-3">
                  📸 Salon Photos
                  <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" />
                </h2>
                <p className="text-lg text-gray-600 mt-2">
                  Hình Ảnh Salon - Upload beautiful photos to attract buyers
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-pink-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-3 text-lg leading-relaxed">
                    Tải lên hình ảnh đẹp để thu hút người mua. Hình ảnh chất lượng cao sẽ giúp salon của bạn nổi bật!
                  </p>
                  <p className="text-purple-600 font-semibold text-lg">
                    High-quality images will make your salon stand out!
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Photo Upload Area */}
      <motion.div variants={itemVariants}>
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-8">
            <PhotoUploader
              files={photoUploads}
              onChange={handlePhotoChange}
              maxFiles={maxPhotos}
              accept="image/*"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Photo Tips */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-2xl">💡</span>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-blue-800 mb-4">
                Photo Tips / Mẹo Chụp Ảnh Hiệu Quả
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-3 text-blue-700">
                  <li className="flex items-center gap-3 text-base">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Chụp ảnh tổng quan không gian salon</span>
                  </li>
                  <li className="flex items-center gap-3 text-base">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Chụp các khu vực làm việc và thiết bị</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-blue-700">
                  <li className="flex items-center gap-3 text-base">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Ensure good lighting, avoid blur</span>
                  </li>
                  <li className="flex items-center gap-3 text-base">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>First photo will be the main display image</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Requirement Alert */}
      {photoUploads.length === 0 && (
        <motion.div variants={itemVariants}>
          <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <AlertDescription className="text-amber-800 text-lg font-medium">
                ⚠️ Cần ít nhất 1 hình ảnh để tiếp tục / At least 1 photo required to continue
              </AlertDescription>
            </div>
          </Alert>
        </motion.div>
      )}

      {/* Progress Indicator */}
      <motion.div 
        className="flex justify-center pt-6"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1 bg-pink-200 rounded-full"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SalonPhotoUpload;
