
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  size: number;
  created_at: string;
  order?: number;
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
    } else {
      setIsLoading(false);
    }
  }, [user]);

  // Fetch all portfolio images for the current user
  const fetchPortfolioImages = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // First, get all portfolio records from the database
      const { data: portfolioItems, error: portfolioError } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (portfolioError) throw portfolioError;

      // Map portfolioItems to our PortfolioImage interface
      const mappedImages = portfolioItems.map(item => ({
        id: item.id,
        url: item.image_url,
        name: item.title || 'Untitled',
        size: 0, // Size not stored in DB, but needed for interface
        created_at: item.created_at,
        order: item.order,
      }));

      setImages(mappedImages);
    } catch (error) {
      console.error('Error fetching portfolio images:', error);
      toast.error('Failed to load your portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  // Upload an image to Supabase Storage
  const uploadImage = async (file: File) => {
    if (!user) {
      toast.error('You must be logged in to upload images');
      return;
    }

    if (!file) {
      toast.error('Please select an image to upload');
      return;
    }

    // Validate file type
    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      toast.error('File must be JPEG, PNG, or WebP');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile_images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percentage = Math.round((progress.loaded / progress.total) * 100);
            setUploadProgress(percentage);
          }
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('profile_images')
        .getPublicUrl(filePath);

      if (!urlData.publicUrl) throw new Error('Failed to get public URL');

      // Create portfolio item record in database
      const { data: portfolioData, error: portfolioError } = await supabase
        .from('portfolio_items')
        .insert([{
          user_id: user.id,
          title: file.name.split('.')[0], // Use filename as title
          image_url: urlData.publicUrl,
          order: images.length + 1, // Append to the end by default
        }])
        .select()
        .single();

      if (portfolioError) throw portfolioError;

      // Add new image to the state
      const newImage: PortfolioImage = {
        id: portfolioData.id,
        url: urlData.publicUrl,
        name: file.name,
        size: file.size,
        created_at: portfolioData.created_at,
        order: portfolioData.order,
      };

      setImages(prev => [newImage, ...prev]);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Delete an image from storage and database
  const deleteImage = async (imageId: string) => {
    if (!user) return;

    try {
      // Find the image in our state
      const imageToDelete = images.find(img => img.id === imageId);
      if (!imageToDelete) return;

      // Delete from portfolio_items table
      const { error: deleteError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', imageId);

      if (deleteError) throw deleteError;

      // Remove from state
      setImages(prev => prev.filter(img => img.id !== imageId));
      toast.success('Image deleted');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  // Update image order
  const updateImageOrder = async (reorderedImages: PortfolioImage[]) => {
    if (!user) return;

    try {
      // Update local state first for responsive UI
      setImages(reorderedImages);

      // Update order in database (for each image)
      const updates = reorderedImages.map((img, index) => ({
        id: img.id,
        order: index + 1,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('portfolio_items')
          .update({ order: update.order })
          .eq('id', update.id);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error updating image order:', error);
      toast.error('Failed to update image order');
      // Revert to original order
      fetchPortfolioImages();
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
    updateImageOrder,
    refreshImages: fetchPortfolioImages,
  };
}
