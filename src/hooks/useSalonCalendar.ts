
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

// Raw data interface from Supabase
export interface AppointmentData {
  id: string;
  date: string;
  time: string;
  customer_name: string;
  service: string;
  status: "booked" | "cancelled" | "completed";
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

  const { data: appointmentsData = [], isLoading, error } = useQuery<AppointmentData[]>({
    queryKey: ['salon-appointments', currentSalon?.id, startDate, endDate],
    queryFn: async () => {
      if (!currentSalon?.id) return [];

      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('salon_id', currentSalon.id)
        .gte('date', startDate)
        .lte('date', endDate);

      if (error) throw error;
      return data || [];
    },
    enabled: !!currentSalon?.id
  });

  // Build simple calendar structure
  const calendar: SalonCalendar = {};
  
  appointmentsData.forEach(appt => {
    if (!calendar[appt.date]) {
      calendar[appt.date] = {};
    }
    
    if (!calendar[appt.date][appt.time]) {
      calendar[appt.date][appt.time] = [];
    }

    calendar[appt.date][appt.time].push({
      time: appt.time,
      customer: appt.customer_name,
      service: appt.service,
      status: appt.status
    });
  });

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
