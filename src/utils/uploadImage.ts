
import { supabase } from '@/integrations/supabase/client';

/**
 * Uploads an image to Supabase Storage and reports progress
 * 
 * @param file The image file to upload
 * @param onProgress Progress callback function (0-100)
 * @returns Promise with the uploaded image URL
 */
export const uploadImage = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Simulate progress for UI feedback
      const progressInterval = setInterval(() => {
        if (onProgress) {
          const currentProgress = Math.min(Math.random() * 90, 85);
          onProgress(currentProgress);
        }
      }, 200);

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('community-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('community-images')
        .getPublicUrl(filePath);

      // Complete progress
      if (onProgress) {
        onProgress(100);
      }

      resolve(publicUrl);
    } catch (error) {
      reject(error);
    }
  });
};
