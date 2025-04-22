
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { PortfolioImage } from "@/types/artist";

export const usePortfolioImages = (artistId?: string) => {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const targetUserId = artistId || user?.id;
        
        if (!targetUserId) {
          setImages([]);
          return;
        }

        const { data, error } = await supabase
          .from("artist_portfolio")
          .select("*")
          .eq("user_id", targetUserId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setImages(
          data.map((item) => ({
            id: item.id,
            url: item.image_url,
            title: item.title || undefined,
            description: item.description || undefined,
            created_at: item.created_at,
            featured: item.featured || false
          }))
        );
      } catch (error) {
        console.error("Error fetching portfolio images:", error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [user, artistId]);

  return { images, isLoading };
};
