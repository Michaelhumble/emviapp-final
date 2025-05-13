
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;
    
    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);
    
    try {
      // Create a unique filename to avoid collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `job-posts/${fileName}`;
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('public')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        throw error;
      }
      
      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);
      
      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      setUploadError(error.message || 'Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
    }
  };

  const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      const uploadPromises = files.map(file => uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      return urls.filter(url => url !== null) as string[];
    } catch (error: any) {
      console.error('Error uploading multiple images:', error.message);
      setUploadError(error.message || 'Failed to upload images');
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    uploadMultipleImages,
    isUploading,
    uploadProgress,
    uploadError
  };
};
