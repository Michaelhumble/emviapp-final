
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useSalonCalendar = (salonId: string): any => {
  const [calendar, setCalendar] = useState<any>({});
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

      const newCalendar: any = {};

      data?.forEach((appt: any) => {
        if (!newCalendar[appt.date]) {
          newCalendar[appt.date] = {};
        }

        if (!newCalendar[appt.date][appt.time]) {
          newCalendar[appt.date][appt.time] = [];
        }

        newCalendar[appt.date][appt.time].push({
          time: appt.time,
          customer: appt.customer_name,
          service: appt.service,
          status: appt.status,
        });
      });

      setCalendar(newCalendar);
      setLoading(false);
    };

    if (salonId) {
      fetchAppointments();
    }
  }, [salonId]);

  return { calendar, loading, error };
};
