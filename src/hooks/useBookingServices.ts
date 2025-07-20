import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BookingService {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  image_url: string | null;
  category: string;
  provider_id: string;
  provider_name: string;
  provider_type: 'artist' | 'salon';
  location: string | null;
  is_visible: boolean;
  created_at: string;
  rating?: number;
}

export const useBookingServices = () => {
  const [services, setServices] = useState<BookingService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch artist services with profile data
      const { data: artistServices, error: artistError } = await supabase
        .from('services')
        .select(`
          id,
          title,
          description,
          price,
          duration_minutes,
          image_url,
          is_visible,
          created_at,
          user_id,
          profiles (
            full_name,
            location,
            specialty
          )
        `)
        .eq('is_visible', true);

      if (artistError) throw artistError;

      // Fetch salon services with salon data (using actual schema columns)
      const { data: salonServices, error: salonError } = await supabase
        .from('salon_services')
        .select(`
          id,
          name,
          description,
          price,
          duration_min,
          created_at,
          salon_id,
          salons (
            salon_name,
            location,
            owner_id
          )
        `);

      if (salonError) throw salonError;

      // Transform artist services
      const transformedArtistServices: BookingService[] = (artistServices || []).map(service => {
        const profile = Array.isArray(service.profiles) ? service.profiles[0] : service.profiles;
        return {
          id: service.id,
          title: service.title,
          description: service.description,
          price: service.price,
          duration_minutes: service.duration_minutes,
          image_url: service.image_url,
          category: determineCategory(service.title, profile?.specialty),
          provider_id: service.user_id,
          provider_name: profile?.full_name || 'Artist',
          provider_type: 'artist' as const,
          location: profile?.location || null,
          is_visible: service.is_visible,
          created_at: service.created_at,
        };
      });

      // Transform salon services
      const transformedSalonServices: BookingService[] = (salonServices || []).map(service => {
        const salon = Array.isArray(service.salons) ? service.salons[0] : service.salons;
        return {
          id: service.id,
          title: service.name,
          description: service.description,
          price: service.price,
          duration_minutes: service.duration_min || 60, // Use duration_min from schema
          image_url: null, // Salon services don't have images in current schema
          category: determineCategory(service.name), // Determine category from name
          provider_id: service.salon_id,
          provider_name: salon?.salon_name || 'Salon',
          provider_type: 'salon' as const,
          location: salon?.location || null,
          is_visible: true,
          created_at: service.created_at,
        };
      });

      // Combine and sort all services
      const allServices = [...transformedArtistServices, ...transformedSalonServices];
      allServices.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setServices(allServices);
    } catch (err) {
      console.error('Error fetching booking services:', err);
      setError(err instanceof Error ? err.message : 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    refreshServices: fetchServices,
  };
};

// Helper function to determine category based on service title and specialty
const determineCategory = (title: string, specialty?: string | null): string => {
  const titleLower = title.toLowerCase();
  const specialtyLower = specialty?.toLowerCase() || '';

  if (titleLower.includes('nail') || titleLower.includes('manicure') || titleLower.includes('pedicure') || specialtyLower.includes('nail')) {
    return 'nails';
  }
  if (titleLower.includes('hair') || titleLower.includes('cut') || titleLower.includes('color') || specialtyLower.includes('hair')) {
    return 'hair';
  }
  if (titleLower.includes('brow') || titleLower.includes('lash') || titleLower.includes('eyebrow') || titleLower.includes('eyelash')) {
    return 'brows-lashes';
  }
  if (titleLower.includes('makeup') || specialtyLower.includes('makeup')) {
    return 'makeup';
  }
  if (titleLower.includes('massage') || specialtyLower.includes('massage')) {
    return 'massage';
  }
  if (titleLower.includes('facial') || titleLower.includes('skincare') || titleLower.includes('skin')) {
    return 'skincare';
  }
  if (titleLower.includes('tattoo') || specialtyLower.includes('tattoo')) {
    return 'tattoo';
  }
  if (titleLower.includes('barber') || specialtyLower.includes('barber')) {
    return 'barber';
  }

  return 'nails'; // Default category
};