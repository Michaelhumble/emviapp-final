
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Camera, Star, Image, Sparkles, Crown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

interface SalonPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number;
}

export const SalonPostPhotoUpload = ({ 
  photoUploads, 
  setPhotoUploads,
  maxPhotos = 15
}: SalonPostPhotoUploadProps) => {
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files);
    const remainingSlots = maxPhotos - photoUploads.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    setPhotoUploads(prev => [...prev, ...filesToAdd]);
    
    event.target.value = '';
  }, [setPhotoUploads, photoUploads.length, maxPhotos]);

  const removePhoto = useCallback((index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  }, [setPhotoUploads]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const remainingSlots = maxPhotos - photoUploads.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    setPhotoUploads(prev => [...prev, ...filesToAdd]);
  }, [setPhotoUploads, photoUploads.length, maxPhotos]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-3, 3, -3],
      rotate: [-1, 1, -1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-12 w-36 h-36 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-32 left-8 w-28 h-28 bg-gradient-to-br from-pink-200/40 to-orange-200/40 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-44 h-44 bg-gradient-to-br from-orange-200/20 to-rose-200/20 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/25">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                <Camera className="w-8 h-8 lg:w-10 lg:h-10 text-white relative z-10" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 3, repeat: Infinity }
                }}
              >
                <Star className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Showcase Beauty
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Let your salon's story shine through stunning visuals
          </motion.p>

          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full border border-rose-200/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Image className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-medium text-pink-700">Hình Ảnh Salon</span>
            <Sparkles className="w-4 h-4 text-orange-500" />
          </motion.div>
        </motion.div>

        {/* Upload Area */}
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-pink-500/10 p-8 lg:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400" />
            
            <div className="relative z-10">
              <div 
                className="border-2 border-dashed border-rose-300/50 rounded-2xl p-12 lg:p-16 text-center hover:border-rose-400 hover:bg-rose-50/30 transition-all duration-300 cursor-pointer group"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <input
                  id="photo-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center justify-center space-y-6">
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="h-20 w-20 lg:h-24 lg:w-24 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                      <Upload className="h-10 w-10 lg:h-12 lg:w-12 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Crown className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                  </motion.div>
                  
                  <div className="space-y-4">
                    <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-gray-800">
                      Drag photos here or click to upload
                    </h3>
                    <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                      Show off your salon's beauty with high-quality photos that tell your story
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Support: JPG, PNG, WEBP • Max 10MB each • Up to {maxPhotos} photos</p>
                      <p className="font-medium text-rose-600">{photoUploads.length}/{maxPhotos} photos uploaded</p>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      disabled={photoUploads.length >= maxPhotos}
                      className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-lg disabled:opacity-50"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Select Beautiful Photos
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Photo Gallery */}
        {photoUploads.length > 0 && (
          <motion.div 
            className="mb-12"
            variants={itemVariants}
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-pink-500/10 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-orange-400 to-rose-400" />
              
              <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Star className="w-5 h-5 text-white" />
                  </motion.div>
                  Your Beautiful Gallery ({photoUploads.length})
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                  {photoUploads.map((file, index) => (
                    <motion.div 
                      key={`${file.name}-${index}`} 
                      className="relative group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                    >
                      <div className="aspect-square rounded-2xl border-2 border-white/50 bg-white/30 overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Salon photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <motion.button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                      
                      <p className="text-xs text-gray-500 mt-2 truncate text-center">{file.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Photography Tips */}
        <motion.div 
          variants={itemVariants}
        >
          <Alert className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 rounded-2xl p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Camera className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h4 className="text-lg font-semibold text-blue-800 mb-3">📸 Professional Photo Tips</h4>
                <AlertDescription className="text-blue-700 space-y-2">
                  <p><strong>Interior shots:</strong> Reception area, workstations, pedicure chairs, equipment</p>
                  <p><strong>Exterior shots:</strong> Storefront, signage, parking area</p>
                  <p><strong>Before/after work:</strong> Show your team's amazing skills</p>
                  <p><strong>Team photos:</strong> Happy staff create trust with buyers</p>
                  <p className="font-medium">💡 Well-lit, high-quality images get 5x more serious inquiries!</p>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="flex justify-center pt-12"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-green-400 rounded-full shadow-lg" />
            <div className="w-12 h-2 bg-gradient-to-r from-green-200 to-purple-200 rounded-full" />
            <div className="w-4 h-4 bg-purple-400 rounded-full shadow-lg" />
            <div className="w-12 h-2 bg-gradient-to-r from-purple-200 to-emerald-200 rounded-full" />
            <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-lg" />
            <div className="w-12 h-2 bg-gradient-to-r from-emerald-200 to-rose-200 rounded-full" />
            <motion.div 
              className="w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="w-12 h-2 bg-gray-200 rounded-full" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>
        </motion.div>

        {/* Inspirational Quote */}
        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-6 border border-rose-200/50">
            <p className="text-lg text-rose-700 font-medium mb-2">✨ Remember</p>
            <p className="text-rose-600 italic">
              "A picture is worth a thousand words... and thousands of dollars in value!"
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
