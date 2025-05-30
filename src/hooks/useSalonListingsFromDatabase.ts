
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

interface DatabaseSalonListing {
  id: string;
  salon_name: string;
  description: string;
  location: string;
  pricing_tier: string;
  status: string;
  contact_info: any;
  created_at: string;
  user_id: string;
  services: any;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  address: string;
  specialties: string[];
  is_featured: boolean;
  expires_at: string;
}

export const useSalonListingsFromDatabase = () => {
  const [salonListings, setSalonListings] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalonListings = async () => {
      try {
        setLoading(true);
        console.log('Fetching salon listings from database...');
        
        const { data, error } = await supabase
          .from('salon_listings')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching salon listings:', error);
          setError(error.message);
          return;
        }

        console.log('Fetched salon listings:', data);

        // Transform database salon listings to Job type for compatibility
        const transformedListings: Job[] = data.map((dbListing: DatabaseSalonListing) => ({
          id: dbListing.id,
          title: dbListing.salon_name,
          company: dbListing.salon_name,
          location: dbListing.location,
          created_at: dbListing.created_at,
          description: dbListing.description,
          image: '', // Will be handled by ImageWithFallback
          price: '', // Salon listings don't have price in same format
          status: dbListing.status as 'active' | 'expired',
          type: 'salon',
          role: 'Salon Services',
          pricing_tier: dbListing.pricing_tier,
          contact_info: dbListing.contact_info,
          expires_at: dbListing.expires_at,
          user_id: dbListing.user_id,
          // Salon-specific fields
          services: dbListing.services,
          phone: dbListing.phone,
          email: dbListing.email,
          website: dbListing.website,
          instagram: dbListing.instagram,
          address: dbListing.address,
          specialties: dbListing.specialties,
          is_featured: dbListing.is_featured
        }));

        setSalonListings(transformedListings);
      } catch (err) {
        console.error('Error in fetchSalonListings:', err);
        setError('Failed to load salon listings');
      } finally {
        setLoading(false);
      }
    };

    fetchSalonListings();
  }, []);

  return { salonListings, loading, error };
};
