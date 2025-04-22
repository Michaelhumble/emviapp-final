
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

        // For now, we'll use mock data since there seems to be an issue with the table schema
        // This will be replaced with actual database queries once the schema is fixed
        const mockImages: PortfolioImage[] = [
          {
            id: "1",
            url: "https://images.unsplash.com/photo-1604902396830-aca29e19b067",
            title: "French Manicure",
            description: "Classic French manicure with a modern twist",
            created_at: "2025-04-01",
            featured: true
          },
          {
            id: "2",
            url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53",
            title: "Nail Art Design",
            description: "Custom floral nail art",
            created_at: "2025-04-02",
            featured: true
          },
          {
            id: "3",
            url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b",
            title: "Gel Nails",
            description: "Long-lasting gel manicure",
            created_at: "2025-04-03",
            featured: false
          }
        ];

        setImages(mockImages);
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
