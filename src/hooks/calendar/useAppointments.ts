
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabaseBypass } from '@/types/supabase-bypass';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useAuth } from '@/context/auth';

// Note: This hook now uses the 'bookings' table instead of 'appointments'
// to maintain consistency across the application

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

      // Map to bookings table structure for consistency
      const { data, error } = await supabaseBypass
        .from('bookings')
        .select('*')
        .eq('recipient_id', user.id as any)
        .gte('date_requested', format(startDate, 'yyyy-MM-dd'))
        .lte('date_requested', format(endDate, 'yyyy-MM-dd'))
        .order('date_requested', { ascending: true })
        .order('time_requested', { ascending: true });
      
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
      
      // Convert to bookings table format
      const bookingData = {
        recipient_id: user.id,
        sender_id: dataToSave.customer_id || user.id,
        client_name: dataToSave.customer_name,
        service_type: dataToSave.services?.title || 'Service',
        date_requested: format(new Date(dataToSave.start_time!), 'yyyy-MM-dd'),
        time_requested: format(new Date(dataToSave.start_time!), 'HH:mm'),
        status: 'accepted',
        note: dataToSave.notes,
        created_at: dataToSave.created_at
      };

      const { data, error } = await supabaseBypass
        .from('bookings')
        .upsert(bookingData as any)
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
      
      const { error } = await supabaseBypass
        .from('bookings')
        .delete()
        .eq('id', id as any)
        .eq('recipient_id', user.id as any); // Ensure only owner can delete
      
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
