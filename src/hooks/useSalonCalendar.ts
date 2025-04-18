
import { useState } from 'react';
import { useTypedQuery } from "@/hooks/useTypedQuery";
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

// Define the SalonBooking interface to match the component expectations
interface SalonBooking {
  id: string;
  client_name: string;
  client_email?: string | null;
  client_phone?: string | null;
  service_name: string;
  service_price: number;
  date: Date | null;
  time: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled' | 'declined';
  assigned_staff_id?: string;
  assigned_staff_name?: string;
  notes?: string;
  created_at: string;
}

// Define the raw appointment data from Supabase
interface AppointmentData {
  id: string;
  artist_id: string;
  customer_name?: string | null;
  customer_email?: string | null;
  customer_phone?: string | null;
  start_time: string;
  end_time: string;
  status: string;
  assigned_staff_id?: string | null;
  assigned_staff_name?: string | null;
  notes?: string | null;
  created_at: string;
  services?: {
    title?: string;
    price?: number;
    duration_minutes?: number;
  } | null;
}

// Define the return type to break the deep type inference chain
interface SalonCalendarReturn {
  currentMonth: Date;
  calendarDays: Date[];
  appointments: SalonBooking[];
  isLoading: boolean;
  error: Error | null;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  getAppointmentsForDay: (day: Date) => SalonBooking[];
}

export const useSalonCalendar = (): SalonCalendarReturn => {
  const { currentSalon } = useSalon();
  const salonId = currentSalon?.id;
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formattedStartDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const formattedEndDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  // Use the hook without generic type parameters, and manually handle types
  const appointmentsQuery = useTypedQuery({
    queryKey: ['salon-appointments', salonId, formattedStartDate, formattedEndDate],
    queryFn: async (): Promise<SalonBooking[]> => {
      if (!salonId) return [];

      const { data, error } = await supabase
        .from('appointments')
        .select('*, services:service_id(*)')
        .eq('salon_id', salonId)
        .gte('start_time', formattedStartDate)
        .lte('end_time', formattedEndDate);

      if (error) throw error;
      
      // Explicitly build the array with manual type casting
      const result: SalonBooking[] = [];
      
      if (data) {
        for (const item of data) {
          const appointment: SalonBooking = {
            id: item.id,
            client_name: item.customer_name || '',
            client_email: item.customer_email,
            client_phone: item.customer_phone,
            service_name: item.services?.title || 'Unknown Service',
            service_price: item.services?.price || 0,
            date: item.start_time ? new Date(item.start_time) : null,
            time: item.start_time ? format(new Date(item.start_time), 'HH:mm') : '',
            status: (item.status || 'pending') as SalonBooking['status'],
            notes: item.notes || '',
            created_at: item.created_at,
          };
          
          result.push(appointment);
        }
      }
      
      return result;
    },
    enabled: !!salonId,
  });

  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      return new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1);
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      return new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1);
    });
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAppointmentsForDay = (day: Date): SalonBooking[] => {
    const appointments = appointmentsQuery.data || [];
    return appointments.filter(appointment =>
      appointment.date && isSameDay(appointment.date, day)
    );
  };

  return {
    currentMonth,
    calendarDays,
    appointments: appointmentsQuery.data || [],
    isLoading: appointmentsQuery.isLoading,
    error: appointmentsQuery.error,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getAppointmentsForDay,
  };
};
