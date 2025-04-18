
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Check, ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  initialUrl?: string;
  bucket?: string;
}

export function FileUpload({ onUploadComplete, initialUrl, bucket = 'salon_photos' }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl || null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Upload to Supabase Storage
      // Create an AbortController to manage the upload
      const abortController = new AbortController();
      
      // Upload to Supabase Storage without onUploadProgress
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          upsert: true,
          // We'll manually simulate the progress since onUploadProgress isn't available
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      // Cleanup object URL and notify parent
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl(publicUrl);
      onUploadComplete(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload image');
      setPreviewUrl(initialUrl);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onUploadComplete('');
  };

  return (
    <div className="w-full">
      {previewUrl ? (
        <div className="relative rounded-md overflow-hidden border border-input">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={handleRemove}
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-md p-6 border-gray-300 hover:border-gray-400 transition-colors flex flex-col items-center justify-center cursor-pointer">
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            id="file-upload"
            onChange={handleUpload}
            disabled={isUploading}
          />
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer flex flex-col items-center"
          >
            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              {isUploading 
                ? `Uploading... ${uploadProgress}%` 
                : "Click to upload an image"}
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
