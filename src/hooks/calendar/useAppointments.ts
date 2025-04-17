
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useAuth } from '@/context/auth';

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
  const { user } = useAuth();

  const { data: appointments = [], isLoading: isLoadingAppointments, error: appointmentsError } = useQuery({
    queryKey: ['appointments', format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd')],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('appointments')
        .select('*, services(title, price, duration_minutes)')
        .eq('artist_id', user.id)
        .gte('start_time', startDate.toISOString())
        .lte('end_time', endDate.toISOString())
        .order('start_time', { ascending: true });
      
      if (error) {
        console.error('Error fetching appointments:', error);
        throw error;
      }
      return data || [];
    },
    enabled: !!user?.id
  });

  const { mutateAsync: saveAppointment, isPending: isSavingAppointment } = useMutation({
    mutationFn: async (appointmentData: Partial<Appointment>) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      // Ensure artist_id is set to current user
      const dataToSave = {
        ...appointmentData,
        artist_id: user.id,
        updated_at: new Date().toISOString()
      };
      
      // If creating new appointment
      if (!appointmentData.id) {
        dataToSave.created_at = new Date().toISOString();
      }
      
      // Ensure required fields are present
      if (!dataToSave.start_time || !dataToSave.end_time) {
        throw new Error('Start time and end time are required');
      }
      
      // Make sure start_time and end_time are strings (not optional)
      const finalData = {
        ...dataToSave,
        start_time: dataToSave.start_time,
        end_time: dataToSave.end_time
      };
      
      const { data, error } = await supabase
        .from('appointments')
        .upsert(finalData)
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
      console.error('Error saving appointment:', error);
      toast.error(`Error saving appointment: ${error.message}`);
    }
  });

  const { mutateAsync: deleteAppointment, isPending: isDeletingAppointment } = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id)
        .eq('artist_id', user.id); // Ensure only owner can delete
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success('Appointment deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting appointment:', error);
      toast.error(`Error deleting appointment: ${error.message}`);
    }
  });

  // Create void-returning wrapper functions to match expected types
  const saveAppointmentVoid = async (appointmentData: Partial<Appointment>): Promise<void> => {
    await saveAppointment(appointmentData);
  };

  const deleteAppointmentVoid = async (id: string): Promise<void> => {
    await deleteAppointment(id);
  };

  return {
    appointments,
    isLoadingAppointments,
    appointmentsError,
    isSavingAppointment,
    isDeletingAppointment,
    saveAppointment: saveAppointmentVoid,
    deleteAppointment: deleteAppointmentVoid
  };
};
