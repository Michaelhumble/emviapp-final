
import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { PortfolioItem } from '@/types/portfolio';

export function useArtistPortfolio() {
  const { user } = useAuth();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPortfolioItems = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('order', { ascending: true });
      
      if (error) throw error;
      
      setItems(data as PortfolioItem[]);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast.error('Failed to load portfolio items');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadItem = async (file: File, title: string, description?: string) => {
    if (!user) {
      toast.error('You must be logged in to upload images');
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

    try {
      // Get the highest order number
      const maxOrder = items.reduce((max, item) => Math.max(max, item.order), 0);

      // Upload file to Supabase Storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('portfolio_images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio_images')
        .getPublicUrl(fileData.path);

      // Insert record in portfolio_items table
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

      // Add to local state
      setItems(prev => [...prev, portfolioItem as PortfolioItem]);
      
      toast.success('Image uploaded successfully');
      return portfolioItem as PortfolioItem;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const reorderItems = async (startIndex: number, endIndex: number) => {
    if (!user) return;

    const newItems = Array.from(items);
    const [removed] = newItems.splice(startIndex, 1);
    newItems.splice(endIndex, 0, removed);

    // Update local state immediately for smooth UI
    setItems(newItems);

    // Update all affected items in the database
    const updates = newItems.map((item, index) => ({
      id: item.id,
      order: index + 1
    }));

    try {
      for (const update of updates) {
        const { error } = await supabase
          .from('portfolio_items')
          .update({ order: update.order })
          .eq('id', update.id);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error reordering items:', error);
      toast.error('Failed to save new order');
      // Revert to previous state on error
      await fetchPortfolioItems();
    }
  };

  const deleteItem = async (id: string, imageUrl: string) => {
    if (!user) return false;
    
    try {
      // Delete from database
      const { error: deleteError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (deleteError) throw deleteError;
      
      // Delete from storage
      const filePath = imageUrl.split('portfolio_images/')[1];
      if (filePath) {
        await supabase.storage
          .from('portfolio_images')
          .remove([filePath]);
      }
      
      // Update local state
      setItems(prev => prev.filter(item => item.id !== id));
      
      toast.success('Image deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
      return false;
    }
  };

  return {
    items,
    isLoading,
    isUploading,
    fileInputRef,
    fetchPortfolioItems,
    uploadItem,
    deleteItem,
    reorderItems
  };
}
