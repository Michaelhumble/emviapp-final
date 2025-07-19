
import { useState, useEffect } from "react";
import { supabaseBypass } from "@/types/supabase-bypass";
import { format } from "date-fns";

export function useAvailableTimeSlots(artistId: string, selectedDate: Date | undefined) {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedDate || !artistId) {
      setAvailableTimeSlots([]);
      return;
    }

    const fetchAvailableSlots = async () => {
      const dayName = format(selectedDate, "EEEE");
      const dateStr = format(selectedDate, "yyyy-MM-dd");

      try {
        // Get artist's availability for the day
        const { data: availabilityData, error: availabilityError } = await supabaseBypass
          .from("artist_availability")
          .select("start_time, end_time")
          .eq("artist_id", artistId as any)
          .eq("day_of_week", dayName as any)
          .eq("is_available", true as any)
          .single();

        if (availabilityError || !availabilityData) {
          console.log("No availability found for this day");
          setAvailableTimeSlots([]);
          return;
        }

        // Get existing bookings for the day
        const { data: bookings, error: bookingsError } = await supabaseBypass
          .from("bookings")
          .select("time_requested")
          .eq("recipient_id", artistId as any)
          .eq("date_requested", dateStr as any)
          .not("status", "in", '("cancelled","declined")');

        if (bookingsError) {
          console.error("Error fetching bookings:", bookingsError);
          return;
        }

        // Generate time slots between start and end time
        const bookedTimes = new Set(bookings?.map((b: any) => b?.time_requested) || []);
        const slots = generateTimeSlots((availabilityData as any)?.start_time, (availabilityData as any)?.end_time);
        
        // Filter out booked times
        const availableSlots = slots.filter(slot => !bookedTimes.has(slot));
        setAvailableTimeSlots(availableSlots);

      } catch (error) {
        console.error("Error fetching availability:", error);
        setAvailableTimeSlots([]);
      }
    };

    fetchAvailableSlots();
  }, [artistId, selectedDate]);

  const isDateAvailable = (date: Date) => {
    const dayName = format(date, "EEEE");
    // Here we could add additional checks like holidays or time off
    return true; // For now, allow all days
  };

  return { availableTimeSlots, isDateAvailable };
}

function generateTimeSlots(startTime: string, endTime: string): string[] {
  const slots: string[] = [];
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  
  let currentHour = startHour;
  let currentMinute = startMinute;

  while (
    currentHour < endHour || 
    (currentHour === endHour && currentMinute <= endMinute)
  ) {
    slots.push(
      `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`
    );
    
    // Add 30-minute intervals
    currentMinute += 30;
    if (currentMinute >= 60) {
      currentHour += 1;
      currentMinute = 0;
    }
  }

  return slots;
}
