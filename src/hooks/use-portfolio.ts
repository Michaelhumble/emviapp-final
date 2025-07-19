import { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
  order: number;
}

export const usePortfolio = () => {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPortfolioItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabaseBypass
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id as any)
        .order('order', { ascending: true });

      if (error) throw error;
      setPortfolioItems((data as any) || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast.error('Failed to load portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadPortfolioImage = async (file: File) => {
    if (!user) throw new Error('User not authenticated');

    try {
      // Upload to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabaseBypass.storage
        .from('portfolio')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabaseBypass.storage
        .from('portfolio')
        .getPublicUrl(fileName);

      // Create portfolio item record
      const { data, error } = await supabaseBypass
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          title: file.name.split('.')[0],
          image_url: publicUrl,
          order: portfolioItems.length
        } as any)
        .select()
        .single();

      if (error) throw error;

      setPortfolioItems(prev => [...prev, data as any]);
      toast.success('Image uploaded successfully!');
      return data;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      throw error;
    }
  };

  const uploadMultipleImages = async (urls: string[]) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const insertData = urls.map((url, index) => ({
        user_id: user.id,
        title: `Portfolio Image ${portfolioItems.length + index + 1}`,
        image_url: url,
        order: portfolioItems.length + index
      }));

      const { data, error } = await supabaseBypass
        .from('portfolio_items')
        .insert(insertData as any)
        .select();

      if (error) throw error;

      setPortfolioItems(prev => [...prev, ...(data as any)]);
      return data;
    } catch (error) {
      console.error('Error saving portfolio items:', error);
      toast.error('Failed to save portfolio items');
      throw error;
    }
  };

  const deletePortfolioImage = async (itemId: string) => {
    try {
      const { error } = await supabaseBypass
        .from('portfolio_items')
        .delete()
        .eq('id', itemId as any);

      if (error) throw error;

      setPortfolioItems(prev => prev.filter(item => item.id !== itemId));
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast.error('Failed to delete image');
    }
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, [user]);

  return {
    portfolioItems,
    isLoading,
    uploadPortfolioImage,
    uploadMultipleImages,
    deletePortfolioImage,
    refreshPortfolio: fetchPortfolioItems
  };
};