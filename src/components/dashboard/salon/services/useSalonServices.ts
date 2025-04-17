
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon";
import { SalonService } from "../types";
import { toast } from "sonner";

export const useSalonServices = () => {
  const { currentSalon } = useSalon();
  const [services, setServices] = useState<SalonService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = useCallback(async () => {
    if (!currentSalon?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', currentSalon.id)
        .order('title', { ascending: true });

      if (error) throw error;

      setServices(data as SalonService[]);
    } catch (err: any) {
      console.error("Error fetching salon services:", err);
      setError(new Error("Failed to load services"));
      toast.error("Could not load services");
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);

  const addService = async (service: Omit<SalonService, 'id' | 'created_at' | 'updated_at'>) => {
    if (!currentSalon?.id) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('services')
        .insert({
          ...service,
          user_id: currentSalon.id
        })
        .select()
        .single();

      if (error) throw error;

      setServices(prev => [...prev, data as SalonService]);
      toast.success("Service added successfully");
      return data;
    } catch (err: any) {
      console.error("Error adding service:", err);
      toast.error("Failed to add service");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id: string, updates: Omit<SalonService, 'id' | 'created_at' | 'updated_at'>) => {
    if (!currentSalon?.id) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('services')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', currentSalon.id)
        .select()
        .single();

      if (error) throw error;

      setServices(prev => 
        prev.map(service => service.id === id ? { ...service, ...data } : service)
      );
      
      toast.success("Service updated successfully");
      return data;
    } catch (err: any) {
      console.error("Error updating service:", err);
      toast.error("Failed to update service");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!currentSalon?.id) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
        .eq('user_id', currentSalon.id);

      if (error) throw error;

      setServices(prev => prev.filter(service => service.id !== id));
      toast.success("Service deleted successfully");
    } catch (err: any) {
      console.error("Error deleting service:", err);
      toast.error("Failed to delete service");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleServiceVisibility = async (id: string, isVisible: boolean) => {
    await updateService(id, { 
      title: services.find(s => s.id === id)?.title || "",
      price: services.find(s => s.id === id)?.price || 0,
      duration_minutes: services.find(s => s.id === id)?.duration_minutes || 30,
      description: services.find(s => s.id === id)?.description || "",
      is_visible: isVisible 
    });
  };

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    loading,
    error,
    fetchServices,
    addService,
    updateService,
    deleteService,
    toggleServiceVisibility
  };
};
