
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PortfolioItem, PortfolioFormData, PortfolioStats } from '@/types/portfolio';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

export const usePortfolio = () => {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [portfolioStats, setPortfolioStats] = useState<PortfolioStats>({
    totalItems: 0,
    viewCount: 0,
    mostViewed: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const fetchPortfolioItems = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const items = data as PortfolioItem[];
      setPortfolioItems(items);
      
      // Calculate basic stats
      if (items.length > 0) {
        setPortfolioStats({
          totalItems: items.length,
          viewCount: Math.floor(Math.random() * 100), // This would be replaced with actual view tracking
          mostViewed: items[0] // Assume first is most viewed for now
        });
      }
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast.error('Failed to load portfolio items');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchPortfolioItems();
    }
  }, [user, fetchPortfolioItems]);

  const uploadPortfolioItem = async (formData: PortfolioFormData) => {
    if (!user || !formData.image) return;

    try {
      setIsUploading(true);

      // Upload image to storage
      const fileExt = formData.image.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('portfolio_images')
        .upload(fileName, formData.image, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio_images')
        .getPublicUrl(fileName);

      // Save portfolio item to database
      const { error: insertError } = await supabase
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description || null,
          image_url: publicUrl
        });

      if (insertError) throw insertError;

      toast.success('Portfolio item added successfully');
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error uploading portfolio item:', error);
      toast.error('Failed to upload portfolio item');
    } finally {
      setIsUploading(false);
    }
  };

  const deletePortfolioItem = async (id: string, imageUrl: string) => {
    if (!user) return;

    try {
      // Delete the database record
      const { error: deleteError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      // Extract the file path from the URL
      const urlPath = imageUrl.split('/').slice(-2).join('/');
      
      // Try to delete the image from storage (this might fail if the image doesn't exist)
      await supabase.storage
        .from('portfolio_images')
        .remove([urlPath]);

      toast.success('Portfolio item deleted');
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast.error('Failed to delete portfolio item');
    }
  };

  return {
    portfolioItems,
    portfolioStats,
    isLoading,
    isUploading,
    uploadPortfolioItem,
    deletePortfolioItem,
    refreshPortfolio: fetchPortfolioItems
  };
};
