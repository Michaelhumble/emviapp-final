
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Define simple interfaces that won't cause type recursion
interface CalendarAppointment {
  time: string;
  customer: string;
  service: string;
  status: string;
}

interface CalendarDay {
  [timeSlot: string]: CalendarAppointment[];
}

interface Calendar {
  [date: string]: CalendarDay;
}

export const useSalonCalendar = (salonId: string) => {
  const [calendar, setCalendar] = useState<Calendar>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("appointments")
        .select("*, services(*)")
        .eq("salon_id", salonId);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const newCalendar: Calendar = {};

      // Safely process the data with explicit type checks
      if (Array.isArray(data)) {
        data.forEach((appt) => {
          // Extract date and time from start_time field
          const startDate = appt.start_time ? new Date(appt.start_time) : null;
          if (!startDate) return;
          
          const date = startDate.toISOString().split('T')[0];
          const time = startDate.toTimeString().substring(0, 5);
          
          if (!date || !time) return;

          if (!newCalendar[date]) {
            newCalendar[date] = {};
          }

          if (!newCalendar[date][time]) {
            newCalendar[date][time] = [];
          }

          // Get service name from joined services table or use service_id as fallback
          const serviceName = appt.services?.title || `Service ${appt.service_id}`;

          newCalendar[date][time].push({
            time: time,
            customer: appt.customer_name || 'Unknown',
            service: serviceName,
            status: appt.status || 'pending',
          });
        });
      }

      setCalendar(newCalendar);
      setLoading(false);
    };

    if (salonId) {
      fetchAppointments();
    }
  }, [salonId]);

  return { calendar, loading, error };
};
