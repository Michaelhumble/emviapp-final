
import { useAuth } from "@/context/auth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AvailabilityDay, TimeOffPeriod } from "../types";
import { toast } from "sonner";

export const useArtistAvailability = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [availabilityDays, setAvailabilityDays] = useState<AvailabilityDay[]>([]);
  const [timeOffPeriods, setTimeOffPeriods] = useState<TimeOffPeriod[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetchAvailability();
      fetchTimeOff();
    }
  }, [user]);

  const fetchAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from('artist_availability')
        .select('*')
        .eq('artist_id', user?.id)
        .order('day_of_week');

      if (error) throw error;
      setAvailabilityDays(data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast.error('Failed to load availability settings');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTimeOff = async () => {
    try {
      const { data, error } = await supabase
        .from('artist_time_off')
        .select('*')
        .eq('artist_id', user?.id)
        .order('start_date');

      if (error) throw error;
      setTimeOffPeriods(data.map(period => ({
        ...period,
        start_date: new Date(period.start_date),
        end_date: new Date(period.end_date)
      })));
    } catch (error) {
      console.error('Error fetching time off:', error);
      toast.error('Failed to load time off periods');
    }
  };

  const saveAvailability = async (availability: AvailabilityDay[]) => {
    try {
      const { error } = await supabase
        .from('artist_availability')
        .upsert(
          availability.map(day => ({
            artist_id: user?.id,
            ...day
          }))
        );

      if (error) throw error;
      toast.success('Availability settings saved');
      await fetchAvailability();
    } catch (error) {
      console.error('Error saving availability:', error);
      toast.error('Failed to save availability settings');
    }
  };

  const saveTimeOff = async (timeOff: TimeOffPeriod) => {
    try {
      const { error } = await supabase
        .from('artist_time_off')
        .insert({
          artist_id: user?.id,
          ...timeOff
        });

      if (error) throw error;
      toast.success('Time off period added');
      await fetchTimeOff();
    } catch (error) {
      console.error('Error saving time off:', error);
      toast.error('Failed to save time off period');
    }
  };

  const deleteTimeOff = async (id: string) => {
    try {
      const { error } = await supabase
        .from('artist_time_off')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Time off period removed');
      await fetchTimeOff();
    } catch (error) {
      console.error('Error deleting time off:', error);
      toast.error('Failed to remove time off period');
    }
  };

  return {
    isLoading,
    availabilityDays,
    timeOffPeriods,
    saveAvailability,
    saveTimeOff,
    deleteTimeOff
  };
};
