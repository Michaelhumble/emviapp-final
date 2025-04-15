
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
        // Query related services directly instead of using RPC
        const { data, error: queryError } = await supabase
          .from('services')
          .select('id, title, price, description, duration_minutes, image_url')
          .eq('related_to', serviceId)
          .eq('is_visible', true)
          .order('price', { ascending: true })
          .limit(3);
        
        if (queryError) throw queryError;
        
        // Type safety handling to avoid deep instantiation
        if (Array.isArray(data)) {
          // Use type assertion with known shape instead of deep instantiation
          const typedData: UpsellService[] = [];
          data.forEach(item => {
            if (item && typeof item === 'object') {
              typedData.push({
                id: String(item.id || ''),
                title: String(item.title || ''),
                price: Number(item.price || 0),
                description: item.description !== undefined ? String(item.description) : null,
                duration_minutes: Number(item.duration_minutes || 0),
                image_url: item.image_url !== undefined ? String(item.image_url) : null
              });
            }
          });
          setUpsells(typedData);
        } else {
          setUpsells([]);
        }
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
