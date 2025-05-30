
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

interface DatabaseSalonListing {
  id: string;
  salon_name: string;
  description: string | null;
  location: string | null;
  status: string | null;
  pricing_tier: string | null;
  contact_info: any;
  created_at: string;
  user_id: string;
  address: string | null;
  phone: string | null;
  services: any;
  business_hours: any;
  is_featured: boolean | null;
}

export const useSalonListingsFromDatabase = () => {
  const [salonListings, setSalonListings] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalonListings = async () => {
      try {
        setLoading(true);
        console.log('Fetching active salon listings from database...');
        
        const { data, error: fetchError } = await supabase
          .from('salon_listings')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (fetchError) {
          console.error('Error fetching salon listings:', fetchError);
          setError(fetchError.message);
          return;
        }

        // Transform database salon listings to match Job interface for compatibility
        const transformedListings: Job[] = (data || []).map((dbListing: DatabaseSalonListing) => {
          // Normalize pricing tier to match union type
          const normalizePricingTier = (tier: string | null): Job['pricingTier'] => {
            if (!tier) return 'free';
            const lowerTier = tier.toLowerCase();
            switch (lowerTier) {
              case 'diamond': return 'diamond';
              case 'premium': return 'premium';
              case 'gold': return 'gold';
              case 'featured': return 'featured';
              case 'standard': return 'standard';
              case 'starter': return 'starter';
              case 'expired': return 'expired';
              case 'basic': return 'free'; // Map 'basic' to 'free'
              default: return 'free';
            }
          };

          return {
            id: dbListing.id,
            title: `${dbListing.salon_name} - Salon for Sale`,
            company: dbListing.salon_name,
            location: dbListing.location || dbListing.address || 'Location not specified',
            description: dbListing.description || 'Salon business opportunity',
            created_at: dbListing.created_at,
            salary_range: 'Contact for pricing details',
            employment_type: 'Business Sale',
            pricingTier: normalizePricingTier(dbListing.pricing_tier),
            contact_info: dbListing.contact_info || {},
            status: dbListing.status || 'active',
            user_id: dbListing.user_id,
            // Additional salon-specific properties
            salon_name: dbListing.salon_name,
            address: dbListing.address,
            phone: dbListing.phone,
            services: dbListing.services,
            business_hours: dbListing.business_hours,
            // Default properties to match Job interface
            experience_level: 'Business Owner',
            is_featured: dbListing.is_featured || dbListing.pricing_tier === 'diamond' || dbListing.pricing_tier === 'premium',
            is_vietnamese_listing: false // Database listings are not Vietnamese protected listings
          };
        });

        console.log(`Successfully fetched ${transformedListings.length} active salon listings from database`);
        setSalonListings(transformedListings);
        setError(null);
      } catch (err) {
        console.error('Unexpected error fetching salon listings:', err);
        setError('Failed to load salon listings from database');
      } finally {
        setLoading(false);
      }
    };

    fetchSalonListings();
  }, []);

  // Group salon listings by pricing tier for organized display
  const listingsByTier = {
    diamond: salonListings.filter(listing => listing.pricingTier === 'diamond'),
    premium: salonListings.filter(listing => listing.pricingTier === 'premium'),
    gold: salonListings.filter(listing => listing.pricingTier === 'gold'),
    free: salonListings.filter(listing => listing.pricingTier === 'free')
  };

  return {
    salonListings,
    listingsByTier,
    loading,
    error,
    totalCount: salonListings.length
  };
};
