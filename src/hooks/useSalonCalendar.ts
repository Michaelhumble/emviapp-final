
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
        .select("*")
        .eq("salon_id", salonId);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const newCalendar: Calendar = {};

      // Safely process the data with explicit type assertions
      if (Array.isArray(data)) {
        data.forEach((appt) => {
          const date = appt.date as string;
          const time = appt.time as string;
          
          if (!date || !time) return;

          if (!newCalendar[date]) {
            newCalendar[date] = {};
          }

          if (!newCalendar[date][time]) {
            newCalendar[date][time] = [];
          }

          newCalendar[date][time].push({
            time: time,
            customer: appt.customer_name || 'Unknown',
            service: appt.service || 'Unknown Service',
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
