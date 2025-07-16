import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
// Note: Using manual progress bar since @/components/ui/progress might not exist
import { Card } from '@/components/ui/card';
import { 
  Upload, 
  X, 
  Camera, 
  CheckCircle2, 
  AlertCircle,
  ImageIcon,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

interface UniversalPortfolioUploaderProps {
  onUploadComplete?: (urls: string[]) => void;
  onClose?: () => void;
  maxFiles?: number;
  existingCount?: number;
}

const UniversalPortfolioUploader = ({ 
  onUploadComplete, 
  onClose, 
  maxFiles = 12, 
  existingCount = 0 
}: UniversalPortfolioUploaderProps) => {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableSlots = maxFiles - existingCount;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    // Check total limit
    if (files.length + acceptedFiles.length > availableSlots) {
      setError(`Can only upload ${availableSlots} more images. You currently have ${existingCount} images.`);
      return;
    }

    // Validate each file
    const validFiles = acceptedFiles.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
  }, [files.length, availableSlots, existingCount]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    noClick: false,
    noKeyboard: false
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const handleManualFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    onDrop(selectedFiles);
  };

  const uploadFiles = async () => {
    if (!user || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const uploadPromises = files.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from('portfolio')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(fileName);

        // Update progress
        setUploadProgress(Math.round(((index + 1) / files.length) * 100));
        
        return publicUrl;
      });

      const urls = await Promise.all(uploadPromises);
      setUploadedUrls(urls);

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8A53F8', '#F97316', '#10B981']
      });

      toast.success(`Successfully uploaded ${urls.length} image${urls.length === 1 ? '' : 's'}!`);
      
      onUploadComplete?.(urls);
      
      // Auto-close after success
      setTimeout(() => {
        onClose?.();
      }, 2000);

    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload some images. Please try again.');
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-playfair font-bold mb-2">Add Your Masterpieces</h3>
        <p className="text-gray-600">
          Upload your best work to attract clients • {availableSlots} slots available
        </p>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive 
            ? 'border-purple-400 bg-purple-50 scale-105' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          {uploading ? (
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
          ) : (
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-purple-600" />
            </div>
          )}
          
          <div>
            <h4 className="text-lg font-semibold mb-2">
              {isDragActive ? 'Drop your images here!' : 'Drag & drop images here'}
            </h4>
            <p className="text-gray-600 mb-4">
              or click to browse • JPG, PNG, WEBP up to 10MB each
            </p>
            
            {/* Mobile-friendly upload buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                type="button"
                onClick={handleManualFileSelect}
                disabled={uploading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Camera className="w-4 h-4 mr-2" />
                Choose Photos
              </Button>
              
              {/* Camera access for mobile */}
              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.capture = 'environment';
                  input.multiple = true;
                  input.onchange = (e) => {
                    const files = Array.from((e.target as HTMLInputElement).files || []);
                    onDrop(files);
                  };
                  input.click();
                }}
                disabled={uploading}
                className="sm:inline-flex"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photos
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Files Preview */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Selected Images ({files.length})</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group aspect-square rounded-lg overflow-hidden border"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  {!uploading && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-4"
          >
            <div className="text-center">
              <p className="font-medium mb-2">Uploading your masterpieces...</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{uploadProgress}% complete</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success State */}
      <AnimatePresence>
        {uploadedUrls.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-6"
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-green-700 mb-2">
              Upload Complete!
            </h4>
            <p className="text-gray-600">
              {uploadedUrls.length} image{uploadedUrls.length === 1 ? '' : 's'} uploaded successfully
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      {!uploading && uploadedUrls.length === 0 && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {files.length > 0 && (
            <Button onClick={uploadFiles} size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload {files.length} Image{files.length === 1 ? '' : 's'}
            </Button>
          )}
          
          {onClose && (
            <Button variant="outline" onClick={onClose} size="lg">
              {files.length > 0 ? 'Cancel' : 'Close'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversalPortfolioUploader;