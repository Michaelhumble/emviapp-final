
import { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { useAuth } from '@/context/auth';
import { PortfolioItem, PortfolioFormData } from '@/types/portfolio';
import { toast } from 'sonner';

export const usePortfolio = () => {
  const { user } = useAuth();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [portfolioStats, setPortfolioStats] = useState({
    totalItems: 0,
    viewCount: 0,
    mostViewed: null as PortfolioItem | null
  });

  useEffect(() => {
    if (user) {
      fetchPortfolioItems();
    }
  }, [user]);

  const fetchPortfolioItems = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabaseBypass
        .from('portfolio_items')
        .select('*')
        .eq('user_id' as any, user.id)
        .order('created_at' as any, { ascending: false });
      
      if (error) throw error;
      
      setPortfolioItems((data as any) || []);
      setPortfolioStats({
        totalItems: (data as any)?.length || 0,
        viewCount: Math.floor(Math.random() * 100), // This would be real view data in a full implementation
        mostViewed: (data as any)?.length > 0 ? (data as any)[0] : null
      });
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast.error('Failed to load portfolio items');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadPortfolioItem = async ({ title, description, image }: PortfolioFormData) => {
    if (!user || !image) return;
    
    setIsUploading(true);
    try {
      // Get highest order
      const { data, error: orderError } = await supabaseBypass
        .from('portfolio_items')
        .select('order')
        .eq('user_id' as any, user.id)
        .order('order' as any, { ascending: false })
        .limit(1);
        
      if (orderError) throw orderError;
      
      const maxOrder = data && (data as any).length > 0 ? (data as any)[0]?.order : 0;

      // Upload image to storage
      const fileExt = image.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await (supabaseBypass as any).storage
        .from('portfolio_images')
        .upload(filePath, image);
      
      if (uploadError) throw uploadError;
      
      // Get public URL for the uploaded image
      const { data: { publicUrl } } = (supabaseBypass as any).storage
        .from('portfolio_images')
        .getPublicUrl(filePath);
      
      // Save portfolio item to database
      const { error: dbError } = await supabaseBypass
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          title,
          description,
          image_url: publicUrl,
          order: maxOrder + 1
        } as any);
      
      if (dbError) throw dbError;
      
      toast.success('Portfolio item added successfully');
      await fetchPortfolioItems();
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
      // Delete the record from the database
      const { error: dbError } = await supabaseBypass
        .from('portfolio_items')
        .delete()
        .eq('id' as any, id);
      
      if (dbError) throw dbError;
      
      // Extract file path from URL and delete from storage
      const filePath = imageUrl.split('portfolio_images/')[1];
      if (filePath) {
        const { error: storageError } = await (supabaseBypass as any).storage
          .from('portfolio_images')
          .remove([filePath]);
        
        if (storageError) {
          console.error('Warning: Could not delete file from storage:', storageError);
          // Continue execution - the database record is more important
        }
      }
      
      toast.success('Portfolio item deleted');
      
      // Update local state
      setPortfolioItems(prevItems => prevItems.filter(item => item.id !== id));
      setPortfolioStats(prev => ({
        ...prev,
        totalItems: prev.totalItems - 1,
        mostViewed: prev.mostViewed?.id === id ? null : prev.mostViewed
      }));
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
