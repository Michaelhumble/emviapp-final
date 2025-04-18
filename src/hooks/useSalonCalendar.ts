
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

// Define the SalonBooking interface if not already defined
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

export const useSalonCalendar = () => {
  const { currentSalon } = useSalon();
  const salonId = currentSalon?.id;
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formattedStartDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const formattedEndDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  // Use explicit typing for the query
  const appointmentsQuery = useQuery<any[], Error, SalonBooking[]>({
    queryKey: ['salon-appointments', salonId, formattedStartDate, formattedEndDate],
    queryFn: async () => {
      if (!salonId) return [];

      // Use 'appointments' table instead of 'salon_bookings'
      const { data, error } = await supabase
        .from('appointments')
        .select('*, services:service_id(title, price, duration_minutes)')
        .eq('salon_id', salonId)
        .gte('start_time', formattedStartDate)
        .lte('end_time', formattedEndDate)
        .order('start_time', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    select: (data) => {
      // Map the appointments data to SalonBooking format
      return data.map(apt => {
        // Safely access nested service properties
        const serviceName = apt.services?.title || 'Unknown Service';
        const servicePrice = apt.services?.price || 0;
        
        return {
          id: apt.id,
          client_name: apt.customer_name || '',
          client_email: apt.customer_email,
          client_phone: apt.customer_phone,
          service_name: serviceName,
          service_price: servicePrice,
          date: apt.start_time ? new Date(apt.start_time) : null,
          time: apt.start_time ? format(new Date(apt.start_time), 'HH:mm') : '',
          status: apt.status || 'pending',
          assigned_staff_id: apt.assigned_staff_id,
          assigned_staff_name: apt.assigned_staff_name,
          notes: apt.notes || '',
          created_at: apt.created_at || new Date().toISOString(),
        };
      });
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

  // Get appointments for a specific day
  const getAppointmentsForDay = (day: Date): SalonBooking[] => {
    return (appointmentsQuery.data || []).filter(appointment =>
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
