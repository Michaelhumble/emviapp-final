import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/profile';
import { supabase } from '@/integrations/supabase';

export interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  price_type: string;
  duration: string;
  duration_minutes: number;
  image_url?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

interface UseArtistProfileDataResult {
  profile: UserProfile | null;
  portfolioImages: PortfolioImage[];
  services: Service[];
  loading: boolean;
  error: Error | null;
}

const useArtistProfileData = (userId: string): UseArtistProfileDataResult => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArtistProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) {
          throw new Error(`Error fetching profile: ${profileError.message}`);
        }

        if (!profileData) {
          throw new Error('Profile not found');
        }

        setProfile(profileData as UserProfile);

        // Fetch portfolio images
        const { data: portfolioData, error: portfolioError } = await supabase
          .from('portfolio_images')
          .select('*')
          .eq('user_id', userId);

        if (portfolioError) {
          throw new Error(`Error fetching portfolio images: ${portfolioError.message}`);
        }

        setPortfolioImages(
            portfolioData.map(item => ({
              id: item.id,
              url: item.image_url,
              name: item.title || '',
              description: item.description || ''
            }))
        );

        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('user_id', userId);

        if (servicesError) {
          throw new Error(`Error fetching services: ${servicesError.message}`);
        }

        setServices(servicesData as Service[]);

      } catch (err: any) {
        setError(err instanceof Error ? err : new Error('An unexpected error occurred'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistProfile();
  }, [userId]);

  return { profile, portfolioImages, services, loading, error };
};

export default useArtistProfileData;
export type { PortfolioImage, Service };
