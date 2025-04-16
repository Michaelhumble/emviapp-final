
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';

export interface Appointment {
  id: string;
  artist_id: string;
  customer_id?: string | null;
  customer_name?: string | null;
  customer_email?: string | null;
  customer_phone?: string | null;
  service_id?: string | null;
  start_time: string;
  end_time: string;
  notes?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  is_manual?: boolean;
  duration_minutes?: number;
  services?: {
    title?: string;
    price?: number;
    duration_minutes?: number;
  };
}

export const useAppointments = (startDate: Date, endDate: Date) => {
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading: isLoadingAppointments } = useQuery({
    queryKey: ['appointments', format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd')],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*, services(title, price, duration_minutes)')
        .gte('start_time', startDate.toISOString())
        .lte('end_time', endDate.toISOString())
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  const { mutateAsync: saveAppointment } = useMutation({
    mutationFn: async (appointmentData: any) => {
      const { data, error } = await supabase
        .from('appointments')
        .upsert(appointmentData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment saved successfully');
    },
    onError: (error: any) => {
      toast.error(`Error saving appointment: ${error.message}`);
    }
  });

  const { mutateAsync: deleteAppointment } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Error deleting appointment: ${error.message}`);
    }
  });

  return {
    appointments,
    isLoadingAppointments,
    saveAppointment,
    deleteAppointment
  };
};
