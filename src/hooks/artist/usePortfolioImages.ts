
import { useState, useEffect } from "react";
import { PortfolioImage } from "@/types/artist";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

export const usePortfolioImages = (artistId?: string) => {
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, userProfile } = useAuth();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const targetUserId = artistId || user?.id;
        
        if (!targetUserId) {
          setImages([]);
          setIsLoading(false);
          return;
        }
        
        // First try to get from portfolio_items table
        const { data: portfolioData, error: portfolioError } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('user_id', targetUserId)
          .order('order', { ascending: false });
          
        if (!portfolioError && portfolioData && portfolioData.length > 0) {
          // Transform data to PortfolioImage format
          const transformedData: PortfolioImage[] = portfolioData.map(item => ({
            id: item.id,
            url: item.image_url,
            title: item.title,
            description: item.description,
            featured: item.featured || false
          }));
          
          setImages(transformedData);
          setIsLoading(false);
          return;
        }
        
        // If no portfolio items, try to get from user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('portfolio_urls')
          .eq('id', targetUserId)
          .single();
          
        if (!userError && userData && userData.portfolio_urls) {
          const portfolioUrls = userData.portfolio_urls || [];
          
          // Map to PortfolioImage format
          const portfolioImages: PortfolioImage[] = portfolioUrls.map((url: string, index: number) => ({
            id: `portfolio-${index}`,
            url,
            title: `Portfolio Item ${index + 1}`,
            featured: index < 2
          }));
          
          setImages(portfolioImages);
          setIsLoading(false);
          return;
        }
        
        // If no data from either source, use mock data (only in development)
        if (process.env.NODE_ENV === 'development') {
          const mockImages: PortfolioImage[] = [
            {
              id: "1",
              url: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
              title: "French Gradient",
              description: "Classic French manicure with a modern gradient twist",
              featured: true
            },
            {
              id: "2",
              url: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
              title: "Minimalist Line Art",
              description: "Simple yet elegant line art on a neutral base",
              featured: false
            },
            {
              id: "3",
              url: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
              title: "Pink Floral Design",
              description: "Delicate floral patterns on a soft pink base",
              featured: false
            },
            {
              id: "4",
              url: "/lovable-uploads/7d585be5-b70d-4d65-b57f-803de81839ba.png",
              title: "Elegant Marble Pattern",
              description: "Luxurious marble effect with gold accents",
              featured: true
            },
            {
              id: "5",
              url: "/lovable-uploads/a3c08446-c1cb-492d-a361-7ec4aca18cfd.png",
              title: "Geometric Abstract",
              description: "Bold geometric patterns with contrasting colors",
              featured: false
            },
            {
              id: "6",
              url: "/lovable-uploads/c9e52825-c7f4-4923-aecf-a92a8799530b.png",
              title: "Glitter Accent",
              description: "Subtle glitter accents on a matte base",
              featured: false
            }
          ];
          
          // Add a small delay to simulate network request
          setTimeout(() => {
            setImages(mockImages);
            setIsLoading(false);
          }, 500);
        } else {
          // In production, just set empty array
          setImages([]);
          setIsLoading(false);
        }
      } catch (err) {
        setError("Failed to load portfolio images");
        setIsLoading(false);
        console.error("Error fetching portfolio images:", err);
      }
    };

    fetchImages();
  }, [artistId, user, userProfile]);

  return { images, isLoading, error };
};
