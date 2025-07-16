import { supabase } from '@/integrations/supabase/client';

export interface PhotoUploadResult {
  success: boolean;
  imageUrls: string[];
  error?: string;
}

/**
 * Upload photos to Supabase storage and return the URLs
 */
export const uploadPhotosToStorage = async (files: File[]): Promise<PhotoUploadResult> => {
  try {
    console.log(`🔍 [PHOTO-UPLOAD] Starting upload of ${files.length} files`);
    
    if (files.length === 0) {
      return { success: true, imageUrls: [] };
    }

    const imageUrls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = `${Date.now()}-${i}-${file.name}`;
      const filePath = `job-photos/${fileName}`;
      
      console.log(`🔍 [PHOTO-UPLOAD] Uploading file ${i + 1}/${files.length}: ${fileName}`);
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('job-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error(`❌ [PHOTO-UPLOAD] Failed to upload ${fileName}:`, error);
        return { 
          success: false, 
          imageUrls: [], 
          error: `Failed to upload ${file.name}: ${error.message}` 
        };
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('job-photos')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;
      imageUrls.push(publicUrl);
      
      console.log(`✅ [PHOTO-UPLOAD] Successfully uploaded: ${publicUrl}`);
    }

    console.log(`✅ [PHOTO-UPLOAD] All ${files.length} files uploaded successfully`);
    return { success: true, imageUrls };
    
  } catch (error) {
    console.error('❌ [PHOTO-UPLOAD] Unexpected error during upload:', error);
    return { 
      success: false, 
      imageUrls: [], 
      error: error instanceof Error ? error.message : 'Unknown upload error' 
    };
  }
};