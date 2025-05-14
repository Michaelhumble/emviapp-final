
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface JobPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

const JobPostPhotoUpload: React.FC<JobPostPhotoUploadProps> = ({ 
  photoUploads, 
  setPhotoUploads,
  maxPhotos = 5 
}) => {
  // Upload file to Supabase storage
  const uploadToBucket = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `job-listings/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('public')
      .upload(filePath, file);
      
    if (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload image');
    }
    
    const { data: urlData } = supabase.storage
      .from('public')
      .getPublicUrl(filePath);
      
    return urlData.publicUrl;
  };
  
  // Validate file size and type
  const validateFile = (file: File): { valid: boolean; message?: string } => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return { valid: false, message: 'File type not supported. Please upload JPG, PNG, or WebP images.' };
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, message: 'File size exceeds 5MB limit.' };
    }
    
    return { valid: true };
  };

  // Handle file selection
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...photoUploads, ...newFiles];
      
      // Limit the number of photos
      if (totalFiles.length > maxPhotos) {
        alert(`You can upload a maximum of ${maxPhotos} photos.`);
        return;
      }
      
      // Validate each file
      const invalidFiles = newFiles.filter(file => !validateFile(file).valid);
      if (invalidFiles.length > 0) {
        const file = invalidFiles[0];
        const validation = validateFile(file);
        alert(validation.message || 'Invalid file');
        return;
      }
      
      setPhotoUploads(prev => [...prev, ...newFiles]);
      e.target.value = ''; // Reset input value to allow selecting the same file again
    }
  }, [photoUploads, setPhotoUploads, maxPhotos]);

  // Remove photo from list
  const removePhoto = useCallback((index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  }, [setPhotoUploads]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {photoUploads.map((file, index) => (
          <div 
            key={`${file.name}-${index}`} 
            className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200"
          >
            <img 
              src={URL.createObjectURL(file)} 
              alt={`Upload ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
        
        {photoUploads.length < maxPhotos && (
          <div 
            className={cn(
              "w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors",
              "relative overflow-hidden"
            )}
            onClick={() => document.getElementById('photo-upload')?.click()}
          >
            <Upload className="h-6 w-6 text-gray-400" />
            <span className="text-xs text-gray-500 mt-1">Upload</span>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
          </div>
        )}
      </div>
      
      <div className="text-sm text-gray-500">
        {photoUploads.length} of {maxPhotos} photos - 
        <Button variant="link" type="button" className="h-auto p-0 text-sm" onClick={() => document.getElementById('photo-upload')?.click()}>browse</Button>
      </div>
    </div>
  );
};

export default JobPostPhotoUpload;
