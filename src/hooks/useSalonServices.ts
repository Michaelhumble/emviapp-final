
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import type { SalonService } from '@/types/salon';

export function useSalonServices() {
  const { currentSalon } = useSalon();
  const [services, setServices] = useState<SalonService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (currentSalon?.id) {
      fetchServices();
    }
  }, [currentSalon?.id]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('salon_id', currentSalon?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch services'));
      toast.error('Could not load services');
    } finally {
      setLoading(false);
    }
  };

  const addService = async (serviceData: Partial<SalonService>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([{ ...serviceData, salon_id: currentSalon?.id }])
        .select()
        .single();

      if (error) throw error;
      setServices([data, ...services]);
      toast.success('Service added successfully');
    } catch (err) {
      console.error('Error adding service:', err);
      toast.error('Failed to add service');
      throw err;
    }
  };

  const updateService = async (id: string, serviceData: Partial<SalonService>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id)
        .eq('salon_id', currentSalon?.id)
        .select()
        .single();

      if (error) throw error;
      setServices(services.map(service => 
        service.id === id ? { ...service, ...data } : service
      ));
      toast.success('Service updated successfully');
    } catch (err) {
      console.error('Error updating service:', err);
      toast.error('Failed to update service');
      throw err;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
        .eq('salon_id', currentSalon?.id);

      if (error) throw error;
      setServices(services.filter(service => service.id !== id));
      toast.success('Service deleted successfully');
    } catch (err) {
      console.error('Error deleting service:', err);
      toast.error('Failed to delete service');
      throw err;
    }
  };

  return {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    refreshServices: fetchServices,
  };
}
