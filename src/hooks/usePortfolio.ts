
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PortfolioItem, PortfolioFormData } from '@/types/portfolio';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

export const usePortfolio = () => {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const fetchPortfolioItems = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolioItems(data as PortfolioItem[]);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast.error('Failed to load portfolio items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPortfolioItems();
    }
  }, [user]);

  const uploadPortfolioItem = async (formData: PortfolioFormData) => {
    if (!user || !formData.image) return;

    try {
      setIsUploading(true);

      // Upload image to storage
      const fileExt = formData.image.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
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
      const filePath = imageUrl.split('/').pop();
      if (filePath) {
        const fullPath = `${user.id}/${filePath}`;
        // Try to delete the image from storage (this might fail if the image doesn't exist)
        await supabase.storage
          .from('portfolio_images')
          .remove([fullPath]);
      }

      toast.success('Portfolio item deleted');
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast.error('Failed to delete portfolio item');
    }
  };

  return {
    portfolioItems,
    isLoading,
    isUploading,
    uploadPortfolioItem,
    deletePortfolioItem,
    refreshPortfolio: fetchPortfolioItems
  };
};
