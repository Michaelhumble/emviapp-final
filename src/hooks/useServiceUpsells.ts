
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define proper types to avoid type instantiation issues
interface Service {
  id: string;
  title: string;
  price: number;
  duration_minutes: number;
  description?: string;
  user_id: string;
}

export const useServiceUpsells = (artistId: string | undefined, currentServiceId: string | undefined) => {
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedServices = async () => {
      if (!artistId || !currentServiceId) {
        setRelatedServices([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch services by the same artist excluding the current one
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('user_id', artistId)
          .neq('id', currentServiceId)
          .limit(3);
        
        if (error) throw error;
        
        setRelatedServices(data || []);
      } catch (err) {
        console.error('Error fetching related services:', err);
        setError('Failed to load related services');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedServices();
  }, [artistId, currentServiceId]);

  return { relatedServices, loading, error };
};
