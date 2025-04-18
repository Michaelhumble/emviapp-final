
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SalonService } from '../types';
import { toast } from 'sonner';
import { useSalon } from '@/context/salon';

export function useSalonServices() {
  const { currentSalon } = useSalon();
  const [services, setServices] = useState<SalonService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = async () => {
    if (!currentSalon?.id) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('salon_services')
        .select('*')
        .eq('salon_id', currentSalon.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch services'));
      toast.error('Could not load salon services');
    } finally {
      setLoading(false);
    }
  };

  const addService = async (serviceData: Omit<SalonService, 'id' | 'created_at' | 'updated_at'>) => {
    if (!currentSalon?.id) {
      toast.error('No salon selected');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('salon_services')
        .insert({
          ...serviceData,
          salon_id: currentSalon.id,
        })
        .select()
        .single();

      if (error) throw error;

      setServices(prev => [data, ...prev]);
      toast.success('Service added successfully');
      return data;
    } catch (err) {
      console.error('Error adding service:', err);
      toast.error('Failed to add service');
      return null;
    }
  };

  const updateService = async (id: string, updates: Partial<SalonService>) => {
    try {
      const { data, error } = await supabase
        .from('salon_services')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setServices(prev => 
        prev.map(service => 
          service.id === id ? { ...service, ...data } : service
        )
      );
      toast.success('Service updated successfully');
      return data;
    } catch (err) {
      console.error('Error updating service:', err);
      toast.error('Failed to update service');
      return null;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('salon_services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(prev => prev.filter(service => service.id !== id));
      toast.success('Service deleted successfully');
    } catch (err) {
      console.error('Error deleting service:', err);
      toast.error('Failed to delete service');
    }
  };

  useEffect(() => {
    fetchServices();
  }, [currentSalon?.id]);

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
