
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { format } from "date-fns";
import { AvailabilityDay } from "@/types/availability";

export const useArtistAvailabilityManagement = (artistId?: string) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [availabilityDays, setAvailabilityDays] = useState<AvailabilityDay[]>([]);
  const effectiveArtistId = artistId || user?.id;

  // Initialize days of the week
  useEffect(() => {
    if (!availabilityDays.length) {
      const defaultDays: AvailabilityDay[] = [
        { day_of_week: 1, start_time: "09:00", end_time: "17:00", active: true },
        { day_of_week: 2, start_time: "09:00", end_time: "17:00", active: true },
        { day_of_week: 3, start_time: "09:00", end_time: "17:00", active: true },
        { day_of_week: 4, start_time: "09:00", end_time: "17:00", active: true },
        { day_of_week: 5, start_time: "09:00", end_time: "17:00", active: true },
        { day_of_week: 6, start_time: "09:00", end_time: "17:00", active: false },
        { day_of_week: 0, start_time: "09:00", end_time: "17:00", active: false }
      ];
      setAvailabilityDays(defaultDays);
    }
  }, [availabilityDays.length]);

  // Fetch availability
  useEffect(() => {
    if (effectiveArtistId) {
      fetchAvailability();
    }
  }, [effectiveArtistId]);

  const fetchAvailability = async () => {
    if (!effectiveArtistId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('artist_availability')
        .select('*')
        .eq('artist_id', effectiveArtistId);

      if (error) throw error;

      if (data && data.length > 0) {
        // Map database days to our format
        const mappedDays: AvailabilityDay[] = data.map(day => ({
          id: day.id,
          day_of_week: getDayNumber(day.day_of_week),
          start_time: day.start_time,
          end_time: day.end_time,
          active: day.is_available
        }));
        
        // Ensure we have all 7 days
        const dayNumbers = mappedDays.map(d => d.day_of_week);
        const allDays: AvailabilityDay[] = [...mappedDays];
        
        for (let i = 0; i < 7; i++) {
          if (!dayNumbers.includes(i)) {
            // Add missing day
            allDays.push({
              day_of_week: i,
              start_time: "09:00",
              end_time: "17:00",
              active: false
            });
          }
        }
        
        setAvailabilityDays(allDays.sort((a, b) => a.day_of_week - b.day_of_week));
      } else {
        // No data, use defaults
        const defaultDays: AvailabilityDay[] = [
          { day_of_week: 1, start_time: "09:00", end_time: "17:00", active: true },
          { day_of_week: 2, start_time: "09:00", end_time: "17:00", active: true },
          { day_of_week: 3, start_time: "09:00", end_time: "17:00", active: true },
          { day_of_week: 4, start_time: "09:00", end_time: "17:00", active: true },
          { day_of_week: 5, start_time: "09:00", end_time: "17:00", active: true },
          { day_of_week: 6, start_time: "09:00", end_time: "17:00", active: false },
          { day_of_week: 0, start_time: "09:00", end_time: "17:00", active: false }
        ];
        setAvailabilityDays(defaultDays);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load availability');
      setError(error);
      console.error('Error fetching availability:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAvailability = async () => {
    if (!effectiveArtistId) {
      toast.error("Artist ID is required to save availability");
      return false;
    }

    setIsLoading(true);
    
    try {
      // Convert our day format to database format
      const databaseRecords = availabilityDays.map(day => ({
        artist_id: effectiveArtistId,
        day_of_week: getDayName(day.day_of_week),
        start_time: day.start_time,
        end_time: day.end_time,
        is_available: day.active,
        ...(day.id ? { id: day.id } : {})
      }));

      const { error } = await supabase
        .from('artist_availability')
        .upsert(databaseRecords, { onConflict: 'artist_id,day_of_week' });

      if (error) throw error;
      
      toast.success("Availability saved successfully");
      await fetchAvailability(); // Refresh data
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to save availability');
      setError(error);
      console.error('Error saving availability:', err);
      toast.error("Failed to save availability");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateDayAvailability = (dayIndex: number, field: keyof AvailabilityDay, value: any) => {
    setAvailabilityDays(prevDays => 
      prevDays.map((day, idx) => 
        idx === dayIndex ? { ...day, [field]: value } : day
      )
    );
  };

  // Helper to convert day name to number
  const getDayNumber = (dayName: string): number => {
    const dayMap: Record<string, number> = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };
    return dayMap[dayName.trim()] ?? 0;
  };

  // Helper to convert day number to name
  const getDayName = (dayNumber: number): string => {
    const dayMap: Record<number, string> = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
    return dayMap[dayNumber] ?? 'Monday';
  };

  return {
    isLoading,
    error,
    availabilityDays,
    updateDayAvailability,
    saveAvailability,
    refresh: fetchAvailability
  };
};
