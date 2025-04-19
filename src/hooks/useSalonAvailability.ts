
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { AvailabilityDay } from "@/types/availability";

export const useSalonAvailability = (salonId?: string) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [availabilityDays, setAvailabilityDays] = useState<AvailabilityDay[]>([]);
  const [staffAvailability, setStaffAvailability] = useState<Record<string, AvailabilityDay[]>>({});
  
  // Get salon ID from context or props
  const effectiveSalonId = salonId || (user?.manager_for_salon_id || "");

  useEffect(() => {
    if (effectiveSalonId) {
      fetchSalonAvailability();
      fetchStaffAvailability();
    }
  }, [effectiveSalonId]);

  const fetchSalonAvailability = async () => {
    if (!effectiveSalonId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Default salon hours - can be replaced with actual salon hours later
      const defaultDays: AvailabilityDay[] = [
        { day_of_week: 1, start_time: "09:00", end_time: "18:00", active: true },
        { day_of_week: 2, start_time: "09:00", end_time: "18:00", active: true },
        { day_of_week: 3, start_time: "09:00", end_time: "18:00", active: true },
        { day_of_week: 4, start_time: "09:00", end_time: "18:00", active: true },
        { day_of_week: 5, start_time: "09:00", end_time: "18:00", active: true },
        { day_of_week: 6, start_time: "09:00", end_time: "18:00", active: true },
        { day_of_week: 0, start_time: "10:00", end_time: "16:00", active: false }
      ];
      
      setAvailabilityDays(defaultDays);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load salon availability');
      setError(error);
      console.error('Error fetching salon availability:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStaffAvailability = async () => {
    if (!effectiveSalonId) return;
    
    try {
      // Get all staff IDs for this salon
      const { data: staffData, error: staffError } = await supabase
        .from('salon_staff')
        .select('id, user_id')
        .eq('salon_id', effectiveSalonId)
        .eq('status', 'active');
      
      if (staffError) throw staffError;
      
      // Create a map to hold availability for each staff member
      const staffAvailabilityMap: Record<string, AvailabilityDay[]> = {};
      
      // For each staff member with a user_id, get their availability
      for (const staff of staffData || []) {
        if (staff.user_id) {
          const { data: availData, error: availError } = await supabase
            .from('artist_availability')
            .select('*')
            .eq('artist_id', staff.user_id);
            
          if (availError) continue;
          
          if (availData && availData.length > 0) {
            // Convert to our format
            const mappedDays: AvailabilityDay[] = availData.map(day => ({
              id: day.id,
              day_of_week: getDayNumber(day.day_of_week),
              start_time: day.start_time,
              end_time: day.end_time,
              active: day.is_available
            }));
            
            staffAvailabilityMap[staff.user_id] = mappedDays;
          }
        }
      }
      
      setStaffAvailability(staffAvailabilityMap);
    } catch (err) {
      console.error('Error fetching staff availability:', err);
    }
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

  // Get the combined availability for the salon
  const getCombinedAvailability = () => {
    // Start with salon's hours
    const combined = [...availabilityDays];
    
    // Overlay staff availability
    return combined;
  };

  return {
    isLoading,
    error,
    salonAvailability: availabilityDays,
    staffAvailability,
    combinedAvailability: getCombinedAvailability(),
    refresh: () => {
      fetchSalonAvailability();
      fetchStaffAvailability();
    }
  };
};
