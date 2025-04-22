
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  image_url: string;
  description?: string;
  created_at: string;
  order: number;
}

export function useArtistPortfolio() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPortfolio();
    // eslint-disable-next-line
  }, [user?.id]);

  const fetchPortfolio = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("user_id", user.id)
        .order("order", { ascending: false });
      if (error) throw error;
      setPortfolio(data ?? []);
    } catch (error) {
      toast.error("Failed to load portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  const addPortfolioItem = async (file: File, title: string, description?: string) => {
    if (!user) return false;
    setUploading(true);
    try {
      // Get the highest order number
      const { data: orderData } = await supabase
        .from("portfolio_items")
        .select("order")
        .eq("user_id", user.id)
        .order("order", { ascending: false })
        .limit(1);
      
      const newOrder = orderData && orderData.length > 0 ? orderData[0].order + 1 : 1;
      
      // Upload to storage
      const fileExt = file.name.split('.').pop()?.toLowerCase() || "jpg";
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: storageErr } = await supabase.storage
        .from("portfolio_images")
        .upload(fileName, file);
      if (storageErr) throw storageErr;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("portfolio_images")
        .getPublicUrl(fileName);

      // Insert into DB
      const { error: dbErr } = await supabase
        .from("portfolio_items")
        .insert({
          user_id: user.id,
          title,
          description: description || null,
          image_url: publicUrl,
          order: newOrder,
        });
      if (dbErr) throw dbErr;

      toast.success("Portfolio item added!");
      await fetchPortfolio();
      return true;
    } catch (e) {
      toast.error("Failed to add portfolio item");
      return false;
    } finally {
      setUploading(false);
    }
  };

  const deletePortfolioItem = async (id: string, imageUrl: string) => {
    if (!user) return false;
    
    try {
      // Delete from DB
      const { error: dbErr } = await supabase
        .from("portfolio_items")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);
      
      if (dbErr) throw dbErr;
      
      // Extract filename from URL to delete from storage
      const imageUrlParts = imageUrl.split('/');
      const fileName = imageUrlParts[imageUrlParts.length - 1];
      const filePath = `${user.id}/${fileName}`;
      
      // Try to delete from storage (but don't fail if this doesn't work)
      await supabase.storage
        .from("portfolio_images")
        .remove([filePath]);
      
      toast.success("Portfolio item removed");
      await fetchPortfolio();
      return true;
    } catch (e) {
      toast.error("Failed to delete portfolio item");
      return false;
    }
  };

  const reorderPortfolioItems = async (startIndex: number, endIndex: number) => {
    if (!user || portfolio.length < 2) return false;
    
    // Create a copy of the current portfolio
    const items = [...portfolio];
    
    // Remove the item from its original position
    const [reorderedItem] = items.splice(startIndex, 1);
    
    // Insert the item at the new position
    items.splice(endIndex, 0, reorderedItem);
    
    // Update the order property for each item
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: items.length - index // Reverse order so newest appears first
    }));
    
    // Optimistically update the UI
    setPortfolio(updatedItems);
    
    try {
      // Batch update the order in the database
      // This is where the error was happening. We need to include all required fields
      // or use the onConflict option to only update the order field
      const { error } = await supabase.from('portfolio_items')
        .upsert(
          updatedItems.map(({ id, order, user_id, title, image_url }) => ({ 
            id, 
            order, 
            user_id, 
            title, 
            image_url 
          })),
          { onConflict: 'id' }
        );
      
      if (error) throw error;
      
      return true;
    } catch (e) {
      // If there's an error, revert to original state
      await fetchPortfolio();
      toast.error("Failed to reorder portfolio items");
      return false;
    }
  };

  return {
    portfolio,
    isLoading,
    addPortfolioItem,
    deletePortfolioItem,
    reorderPortfolioItems,
    uploading,
    fileInputRef,
    fetchPortfolio,
  };
}
