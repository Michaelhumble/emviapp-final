
import { useState } from 'react';
import { useTypedQuery } from "@/hooks/useTypedQuery";
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

// This interface matches the actual database schema for appointments
interface AppointmentDataFromDB {
  id: string;
  start_time: string;
  end_time: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  service_id: string | null;
  status: string;
  notes: string | null;
  artist_id: string;
  salon_id: string;
  created_at: string;
  updated_at: string;
  service?: {
    title: string;
    price: number;
  } | null;
}

// Processed booking slot interface
export interface BookingSlot {
  time: string;
  customer: string;
  service: string;
  status: "booked" | "cancelled" | "completed";
}

// Simple calendar type
export type SalonCalendar = Record<string, Record<string, BookingSlot[]>>;

export interface SalonCalendarReturn {
  calendar: SalonCalendar;
  currentMonth: Date;
  calendarDays: Date[];
  isLoading: boolean;
  error: Error | null;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
}

export const useSalonCalendar = (): SalonCalendarReturn => {
  const { currentSalon } = useSalon();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  // Use any to avoid TypeScript deep instantiation error
  const { data: appointmentsData, isLoading, error } = useTypedQuery({
    queryKey: ['salon-appointments', currentSalon?.id, startDate, endDate],
    queryFn: async () => {
      if (!currentSalon?.id) return [];

      const { data, error } = await supabase
        .from('appointments')
        .select('*, service:services(title, price)')
        .eq('salon_id', currentSalon.id)
        .gte('start_time', startDate)
        .lte('end_time', endDate);

      if (error) throw error;
      return data || [];
    },
    enabled: !!currentSalon?.id
  });

  // Build simple calendar structure
  const calendar: SalonCalendar = {};
  
  if (appointmentsData && Array.isArray(appointmentsData)) {
    // Safely cast the data now that we've checked it's an array
    const appointments = appointmentsData as AppointmentDataFromDB[];
    
    appointments.forEach(appt => {
      // Format date from start_time
      const date = format(new Date(appt.start_time), 'yyyy-MM-dd');
      // Format time from start_time
      const time = format(new Date(appt.start_time), 'HH:mm');
      
      if (!calendar[date]) {
        calendar[date] = {};
      }
      
      if (!calendar[date][time]) {
        calendar[date][time] = [];
      }

      calendar[date][time].push({
        time: time,
        customer: appt.customer_name || 'Unknown',
        service: appt.service?.title || 'Unknown Service',
        status: (appt.status === 'completed' || appt.status === 'cancelled' ? 
                appt.status : 'booked') as "booked" | "cancelled" | "completed"
      });
    });
  }

  const calendarDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  return {
    calendar,
    currentMonth,
    calendarDays,
    isLoading,
    error: error as Error | null,
    goToPreviousMonth,
    goToNextMonth,
    goToToday
  };
};
