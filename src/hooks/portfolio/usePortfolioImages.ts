
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

export const usePortfolioImages = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userRole } = useAuth();

  useEffect(() => {
    const fetchImages = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Check if user is artist using the normalized role check
        const isArtist = userRole === 'nail-artist' || 
                        userRole === 'hair-stylist' || 
                        userRole === 'lash-tech' || 
                        userRole === 'barber' || 
                        userRole === 'esthetician' || 
                        userRole === 'massage-therapist' || 
                        userRole === 'freelancer';

        if (!isArtist) {
          setLoading(false);
          return;
        }

        // For now, return empty array since portfolio_images table doesn't exist
        // This will be implemented when the table is created
        setImages([]);
      } catch (error) {
        console.error('Error fetching portfolio images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [user, userRole]);

  const addImage = async (imageUrl: string) => {
    if (!user) return;

    try {
      setLoading(true);
      // Placeholder - will be implemented when portfolio_images table exists
      setImages(prevImages => [...prevImages, imageUrl]);
    } catch (error) {
      console.error('Error adding portfolio image:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageUrl: string) => {
    if (!user) return;

    try {
      setLoading(true);
      // Placeholder - will be implemented when portfolio_images table exists
      setImages(prevImages => prevImages.filter(img => img !== imageUrl));
    } catch (error) {
      console.error('Error deleting portfolio image:', error);
    } finally {
      setLoading(false);
    }
  };

  return { images, loading, addImage, deleteImage };
};
