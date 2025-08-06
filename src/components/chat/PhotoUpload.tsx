import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Sparkles, Eye, Palette, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { isFeatureEnabled } from '@/config/premiumFeatures';

interface PhotoUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoAnalyzed: (analysis: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ isOpen, onClose, onPhotoAnalyzed }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const analyzePhoto = async () => {
    if (!selectedFile || !isFeatureEnabled('PHOTO_UPLOAD')) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const mockAnalysis = "Based on your photo, I can see you have beautiful natural features! Here are some personalized recommendations: Your skin tone would look amazing with warm coral or peach tones. For your eye shape, I'd recommend a subtle winged eyeliner. Your nail shape is perfect for a classic French manicure or bold jewel tones. Would you like specific product recommendations?";
      onPhotoAnalyzed(mockAnalysis);
      setIsAnalyzing(false);
      onClose();
    }, 3000);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreview(null);
    setIsAnalyzing(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-orange-500" />
                Photo Analysis
              </h2>
              <p className="text-gray-600 text-sm">Upload a photo for personalized beauty advice</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Coming Soon Notice */}
          {!isFeatureEnabled('PHOTO_UPLOAD') && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center mb-2">
                <Sparkles className="w-4 h-4 text-orange-600 mr-2" />
                <span className="font-semibold text-orange-600">Coming Q1 2025!</span>
              </div>
              <p className="text-orange-700 text-sm">
                AI-powered photo analysis will provide personalized beauty recommendations based on your features, skin tone, and style preferences.
              </p>
            </motion.div>
          )}

          {!preview ? (
            /* Upload Area */
            <motion.div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-orange-400 bg-orange-50' 
                  : isFeatureEnabled('PHOTO_UPLOAD')
                  ? 'border-gray-300 hover:border-orange-300 hover:bg-orange-50/50'
                  : 'border-gray-200 bg-gray-50'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isFeatureEnabled('PHOTO_UPLOAD') ? 'bg-orange-100' : 'bg-gray-100'
              }`}>
                <Upload className={`w-8 h-8 ${isFeatureEnabled('PHOTO_UPLOAD') ? 'text-orange-500' : 'text-gray-400'}`} />
              </div>
              
              <h3 className={`font-semibold mb-2 ${isFeatureEnabled('PHOTO_UPLOAD') ? 'text-gray-900' : 'text-gray-500'}`}>
                Drop your photo here
              </h3>
              
              <p className={`text-sm mb-4 ${isFeatureEnabled('PHOTO_UPLOAD') ? 'text-gray-600' : 'text-gray-400'}`}>
                or click to browse your files
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                disabled={!isFeatureEnabled('PHOTO_UPLOAD')}
                className="hidden"
                id="photo-upload"
              />
              
              <label htmlFor="photo-upload">
                <Button 
                  variant={isFeatureEnabled('PHOTO_UPLOAD') ? 'default' : 'secondary'}
                  disabled={!isFeatureEnabled('PHOTO_UPLOAD')}
                  className={isFeatureEnabled('PHOTO_UPLOAD') ? 'bg-orange-500 hover:bg-orange-600' : ''}
                  asChild
                >
                  <span className="cursor-pointer">Choose Photo</span>
                </Button>
              </label>

              <div className="mt-4 text-xs text-gray-500">
                Supports: JPG, PNG, WEBP (max 10MB)
              </div>
            </motion.div>
          ) : (
            /* Preview & Analysis */
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-64 object-cover rounded-xl"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={resetUpload}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Analysis Options */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <Eye className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                  <span className="text-xs text-orange-700 font-medium">Face Analysis</span>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Palette className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <span className="text-xs text-purple-700 font-medium">Color Match</span>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <span className="text-xs text-blue-700 font-medium">Style Tips</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  onClick={analyzePhoto}
                  disabled={isAnalyzing || !isFeatureEnabled('PHOTO_UPLOAD')}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze Photo
                    </>
                  )}
                </Button>
                
                <Button variant="outline" onClick={resetUpload}>
                  Choose Different
                </Button>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-700 text-sm">
                    Your photo will be analyzed for skin tone, face shape, and features to provide personalized beauty recommendations. Photos are processed securely and not stored.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Features Preview */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-3">Analysis Features:</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                Skin tone analysis
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Color recommendations
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                Face shape guidance
              </div>
              <div className="flex items-center text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Style suggestions
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoUpload;