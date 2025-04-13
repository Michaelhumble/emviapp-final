
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  size: number;
  created_at: string;
}

export function useArtistPortfolio() {
  const { user } = useAuth();
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch portfolio images when component mounts
  useEffect(() => {
    if (user) {
      fetchPortfolioImages();
    }
  }, [user]);

  const fetchPortfolioImages = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Get list of files from the user's folder in the artist_portfolios bucket
      const { data, error } = await supabase.storage
        .from('artist_portfolios')
        .list(`${user.id}`);
      
      if (error) throw error;
      
      // Get public URLs for each file
      const imagePromises = data.map(async (file) => {
        const { data: urlData } = supabase.storage
          .from('artist_portfolios')
          .getPublicUrl(`${user.id}/${file.name}`);
        
        return {
          id: file.id,
          name: file.name,
          size: file.metadata?.size || 0,
          url: urlData.publicUrl,
          created_at: file.created_at
        };
      });
      
      const portfolioImages = await Promise.all(imagePromises);
      setImages(portfolioImages);
    } catch (error) {
      console.error('Error fetching portfolio images:', error);
      toast.error('Failed to load portfolio images');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    if (!user) {
      toast.error('You must be logged in to upload images');
      return false;
    }
    
    // Validate file type
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(fileExt || '')) {
      toast.error('Only JPG, PNG and WebP images are allowed');
      return false;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size too large (max 5MB)');
      return false;
    }
    
    // Start upload
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Create a unique filename
      const fileName = `${Date.now()}-${file.name}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('artist_portfolios')
        .upload(`${user.id}/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('artist_portfolios')
        .getPublicUrl(`${user.id}/${fileName}`);
      
      // Add the new image to the state
      const newImage: PortfolioImage = {
        id: data.id,
        name: fileName,
        size: file.size,
        url: urlData.publicUrl,
        created_at: new Date().toISOString()
      };
      
      setImages(prev => [...prev, newImage]);
      toast.success('Image uploaded successfully');
      return true;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Failed to upload image');
      return false;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const deleteImage = async (imageName: string) => {
    if (!user) return false;
    
    try {
      // Delete from Supabase Storage
      const { error } = await supabase.storage
        .from('artist_portfolios')
        .remove([`${user.id}/${imageName}`]);
      
      if (error) throw error;
      
      // Remove from local state
      setImages(prev => prev.filter(img => img.name !== imageName));
      
      toast.success('Image deleted successfully');
      return true;
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast.error(error.message || 'Failed to delete image');
      return false;
    }
  };

  return {
    images,
    isLoading,
    isUploading,
    uploadProgress,
    fileInputRef,
    uploadImage,
    deleteImage,
    fetchPortfolioImages
  };
}
