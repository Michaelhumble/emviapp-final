
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface PortfolioImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  created_at: string;
}

export function usePortfolioImages() {
  const { user, userRole } = useAuth();
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isArtist = userRole === 'artist' || userRole === 'nail technician/artist' || userRole === 'renter';

  // Fetch portfolio images when component mounts
  useEffect(() => {
    if (user && isArtist) {
      fetchPortfolioImages();
    }
  }, [user, isArtist]);

  const fetchPortfolioImages = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('order', { ascending: true });
      
      if (error) throw error;
      
      setImages(data.map(item => ({
        id: item.id,
        url: item.image_url,
        title: item.title,
        description: item.description,
        created_at: item.created_at
      })));
    } catch (error) {
      console.error('Error fetching portfolio images:', error);
      toast.error('Failed to load portfolio images');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File, title: string, description?: string) => {
    if (!user || !isArtist) {
      toast.error('You must be an artist to upload images');
      return null;
    }
    
    if (!file) {
      toast.error('Please select a file to upload');
      return null;
    }

    // Validate file type
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(fileExt || '')) {
      toast.error('File type not supported. Please upload JPG, PNG, or WebP images');
      return null;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size too large. Maximum allowed is 5MB');
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Get highest order for this user
      const maxOrder = images.length > 0 
        ? Math.max(...images.map(img => {
            const imgData = images.find(i => i.id === img.id);
            return imgData ? parseInt(imgData.id.split('-')[0] || '0') : 0;
          }))
        : 0;

      // 1. Upload file to Supabase Storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      
      // Use manual progress tracking since Supabase JS client type issues with onUploadProgress
      setUploadProgress(25);
      
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('portfolio_images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) throw uploadError;
      
      setUploadProgress(50);
      
      // 2. Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio_images')
        .getPublicUrl(fileData.path);
      
      setUploadProgress(75);
      
      // 3. Insert record in portfolio_items table
      const { data: portfolioItem, error: insertError } = await supabase
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          title: title || 'Untitled',
          description: description || null,
          image_url: publicUrl,
          order: maxOrder + 1
        })
        .select()
        .single();
      
      if (insertError) throw insertError;
      
      setUploadProgress(100);
      
      // 4. Add the new image to the local state
      const newImage: PortfolioImage = {
        id: portfolioItem.id,
        url: publicUrl,
        title: portfolioItem.title,
        description: portfolioItem.description,
        created_at: portfolioItem.created_at
      };
      
      setImages(prev => [newImage, ...prev]);
      
      toast.success('Image uploaded successfully');
      return newImage;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const deleteImage = async (imageId: string, imageUrl: string) => {
    if (!user || !isArtist) return false;
    
    try {
      // 1. Delete from portfolio_items table
      const { error: deleteError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', imageId)
        .eq('user_id', user.id);
      
      if (deleteError) throw deleteError;
      
      // 2. Delete from Supabase Storage
      // Extract path from URL (after the bucket name)
      const filePath = imageUrl.split('portfolio_images/')[1];
      if (filePath) {
        await supabase.storage
          .from('portfolio_images')
          .remove([filePath]);
      }
      
      // 3. Update local state
      setImages(prev => prev.filter(img => img.id !== imageId));
      
      toast.success('Image deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
      return false;
    }
  };

  return {
    images,
    isLoading,
    isUploading,
    uploadProgress,
    fileInputRef,
    fetchPortfolioImages,
    uploadImage,
    deleteImage,
    isArtist
  };
}
