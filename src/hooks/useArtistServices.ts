
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface ServiceFormData {
  id?: string; // Make id optional for new services
  title: string;
  description: string;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

export function useArtistServices() {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      fetchServices();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchServices = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id)
        .order('title', { ascending: true });

      if (error) throw new Error(error.message);

      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch services'));
      toast.error('Failed to load your services');
    } finally {
      setIsLoading(false);
    }
  };

  const addService = async (serviceData: ServiceFormData) => {
    if (!user) {
      toast.error('You must be logged in to add services');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .insert([{
          ...serviceData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw new Error(error.message);

      setServices(prev => [...prev, data]);
      toast.success('Service added successfully!');
      return data;
    } catch (err) {
      console.error('Error adding service:', err);
      toast.error('Failed to add service');
      return null;
    }
  };

  const updateService = async (id: string, serviceData: Partial<ServiceFormData>) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw new Error(error.message);

      setServices(prev => prev.map(service => 
        service.id === id ? data : service
      ));
      
      toast.success('Service updated successfully!');
      return true;
    } catch (err) {
      console.error('Error updating service:', err);
      toast.error('Failed to update service');
      return false;
    }
  };

  const deleteService = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw new Error(error.message);

      setServices(prev => prev.filter(service => service.id !== id));
      toast.success('Service deleted successfully!');
      return true;
    } catch (err) {
      console.error('Error deleting service:', err);
      toast.error('Failed to delete service');
      return false;
    }
  };

  return {
    services,
    isLoading,
    error,
    fetchServices,
    addService,
    updateService,
    deleteService,
  };
}
