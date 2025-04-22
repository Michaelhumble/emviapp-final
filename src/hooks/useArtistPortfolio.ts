
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  image_url: string;
  created_at: string;
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
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPortfolio(data ?? []);
    } catch (error) {
      toast.error("Failed to load portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  const addPortfolioItem = async (file: File, title: string) => {
    if (!user) return;
    setUploading(true);
    try {
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
          image_url: publicUrl,
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

  return {
    portfolio,
    isLoading,
    addPortfolioItem,
    uploading,
    fileInputRef,
    fetchPortfolio,
  };
}
