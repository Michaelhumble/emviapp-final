
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  description?: string;
  created_at: string;
  order: number; // Add order field
  user_id: string;
}

export function useArtistPortfolio() {
  const { user } = useAuth();
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      console.error('Error fetching portfolio images:', err);
      toast.error('Failed to load portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File, title?: string, description?: string) => {
    if (!user) return null;
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload image to storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('portfolio_images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio_images')
        .getPublicUrl(filePath);

      // Get current max order
      const { data: currentImages } = await supabase
        .from('portfolio_items')
        .select('order')
        .eq('user_id', user.id)
        .order('order', { ascending: false })
        .limit(1);

      const nextOrder = (currentImages?.[0]?.order || 0) + 1;

      // Add record to portfolio_items table
      const { data: newImage, error: dbError } = await supabase
        .from('portfolio_items')
        .insert([{
          user_id: user.id,
          image_url: publicUrl,
          title: title || file.name,
          description,
          order: nextOrder
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      setImages(prev => [...prev, newImage]);
      toast.success('Image uploaded successfully!');
      return newImage;
    } catch (err) {
      console.error('Error uploading image:', err);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const updateImageOrder = async (reorderedImages: PortfolioImage[]) => {
    try {
      // Update local state immediately for optimistic UI
      setImages(reorderedImages);

      // Update order in database
      for (let i = 0; i < reorderedImages.length; i++) {
        const { error } = await supabase
          .from('portfolio_items')
          .update({ order: i })
          .eq('id', reorderedImages[i].id);

        if (error) throw error;
      }
    } catch (err) {
      console.error('Error updating image order:', err);
      toast.error('Failed to save new order');
      // Revert to previous order by re-fetching
      fetchImages();
    }
  };

  const deleteImage = async (id: string) => {
    if (!user) return false;

    try {
      const imageToDelete = images.find(img => img.id === id);
      if (!imageToDelete) return false;

      const { error: dbError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (dbError) throw dbError;

      // Remove from local state
      setImages(prev => prev.filter(img => img.id !== id));
      toast.success('Image deleted successfully!');
      return true;
    } catch (err) {
      console.error('Error deleting image:', err);
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
    fetchImages,
    uploadImage,
    deleteImage,
    updateImageOrder
  };
}
