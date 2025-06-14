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
        
        // Check if user is artist - update role check
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

        const { data, error } = await supabase
          .from('portfolio_images')
          .select('image_url')
          .eq('user_id', user.id);

        if (error) throw error;

        if (data) {
          const imageUrls = data.map(item => item.image_url);
          setImages(imageUrls);
        }
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

      const { error } = await supabase
        .from('portfolio_images')
        .insert([{ user_id: user.id, image_url: imageUrl }]);

      if (error) throw error;

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

      const { error } = await supabase
        .from('portfolio_images')
        .delete()
        .eq('user_id', user.id)
        .eq('image_url', imageUrl);

      if (error) throw error;

      setImages(prevImages => prevImages.filter(img => img !== imageUrl));
    } catch (error) {
      console.error('Error deleting portfolio image:', error);
    } finally {
      setLoading(false);
    }
  };

  return { images, loading, addImage, deleteImage };
};
