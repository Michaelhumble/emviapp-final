
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export interface JobPostPhotoUploadProps {
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  maxPhotos?: number; // Added maxPhotos as optional prop
}

export const JobPostPhotoUpload = ({ 
  photoUploads, 
  setPhotoUploads, 
  maxPhotos = 5 // Default to 5 photos if not specified
}: JobPostPhotoUploadProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files);
    
    // Limit the number of photos that can be uploaded
    const availableSlots = maxPhotos - photoUploads.length;
    const filesToAdd = newFiles.slice(0, availableSlots);
    
    if (filesToAdd.length > 0) {
      setPhotoUploads(prev => [...prev, ...filesToAdd]);
    }
    
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  }, [setPhotoUploads, photoUploads.length, maxPhotos]);

  const removePhoto = useCallback((index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  }, [setPhotoUploads]);

  const uploadToSupabase = async (file: File): Promise<string | null> => {
    const fileId = uuidv4(); // Generate unique ID for the file
    setUploading(true);
    
    // Create a unique filename to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `job-posts/${fileId}-${Date.now()}.${fileExt}`;
    
    try {
      // Track this file's upload progress
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('nails')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Update progress
      setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
      
      // Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('nails')
        .getPublicUrl(fileName);
      
      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-medium">Job Photos</h2>
      <p className="text-gray-600">
        Upload high-quality photos for your job post. Photos significantly increase application rates.
      </p>

      {photoUploads.length < maxPhotos && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            id="photo-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading || photoUploads.length >= maxPhotos}
          />
          
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {uploading 
                  ? "Uploading images..." 
                  : "Drag photos here or click to upload"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Support: JPG, PNG, WEBP. Max 5MB each. {photoUploads.length}/{maxPhotos} photos.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('photo-upload')?.click()}
              disabled={uploading || photoUploads.length >= maxPhotos}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Select Photos'
              )}
            </Button>
          </div>
        </div>
      )}

      {photoUploads.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-3">Uploaded Photos ({photoUploads.length}/{maxPhotos})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photoUploads.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <div className="aspect-square rounded-md border bg-gray-100 overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Job photo ${index + 1} - ${file.name.split('.')[0]}`}
                    className="w-full h-full object-cover"
                  />
                  {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="bg-white rounded-full p-2">
                        <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={uploading}
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {photoUploads.length === 0 && (
        <div className="mt-6">
          <Alert className="bg-blue-50 border-blue-100">
            <Info className="h-5 w-5 text-blue-500" />
            <AlertDescription className="text-blue-700">
              <p className="font-medium">Add photos to increase applications</p>
              <p className="mt-1">Job posts with photos receive up to 35% more applications. Show off your salon or workspace to attract the best talent.</p>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default JobPostPhotoUpload;
