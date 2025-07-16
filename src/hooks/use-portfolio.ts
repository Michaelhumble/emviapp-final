import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('order', { ascending: true });

      if (error) throw error;
      setPortfolioItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast.error('Failed to load portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadPortfolioImage = async (file: File) => {
    if (!user) throw new Error('User not authenticated');

    // Upload to storage
    const fileName = `${user.id}/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio')
      .getPublicUrl(fileName);

    // Create portfolio item record
    const { data, error } = await supabase
      .from('portfolio_items')
      .insert({
        user_id: user.id,
        title: file.name.split('.')[0],
        image_url: publicUrl,
        order: portfolioItems.length
      })
      .select()
      .single();

    if (error) throw error;

    setPortfolioItems(prev => [...prev, data]);
    toast.success('Image uploaded successfully!');
    return data;
  };

  const deletePortfolioImage = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', itemId);

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
    deletePortfolioImage,
    refreshPortfolio: fetchPortfolioItems
  };
};