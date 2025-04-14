
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UpsellService {
  id: string;
  title: string;
  price: number;
  description: string | null;
  duration_minutes: number;
  image_url: string | null;
}

export const useServiceUpsells = (serviceId: string | null, bookingValue: number = 0) => {
  const [upsells, setUpsells] = useState<UpsellService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpsells = async () => {
      if (!serviceId) return;
      
      // Only show upsells if booking value is less than $100
      if (bookingValue >= 100) {
        setUpsells([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Use the Supabase function to get related services
        const { data, error } = await supabase
          .rpc('get_service_upsells', { p_service_id: serviceId });
        
        if (error) throw error;
        
        setUpsells(data || []);
      } catch (err: any) {
        console.error('Error fetching upsell services:', err);
        setError('Failed to load service recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchUpsells();
  }, [serviceId, bookingValue]);

  return { upsells, loading, error };
};
