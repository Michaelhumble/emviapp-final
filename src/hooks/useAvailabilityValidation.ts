
import { useState } from "react";
import { supabaseBypass } from "@/types/supabase-bypass";
import { format } from "date-fns";
import { BookingResponse } from "@/types/availability";
import { useBookingErrorHandler } from "./useBookingErrorHandler";

export const useAvailabilityValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const { handleBookingError } = useBookingErrorHandler();

  /**
   * Validates if a time slot is available for booking
   */
  const validateTimeSlot = async (
    artistId: string,
    date: Date,
    time: string
  ): Promise<boolean> => {
    if (!artistId || !date || !time) {
      return false;
    }

    setIsValidating(true);
    
    try {
      const dayName = format(date, "EEEE");
      const dateStr = format(date, "yyyy-MM-dd");

      // Check artist's availability for that day
      const { data: availabilityData, error: availabilityError } = await supabaseBypass
        .from("artist_availability")
        .select("start_time, end_time, is_available")
        .eq("artist_id", artistId as any)
        .eq("day_of_week", dayName as any)
        .maybeSingle();

      if (availabilityError) throw availabilityError;
      
      // If no availability record or not available
      if (!availabilityData || !(availabilityData as any)?.is_available) {
        return false;
      }

      // Check if the time is within the available hours
      const [requestHour, requestMinute] = time.split(":").map(Number);
      const [startHour, startMinute] = ((availabilityData as any)?.start_time || '09:00').split(":").map(Number);
      const [endHour, endMinute] = ((availabilityData as any)?.end_time || '17:00').split(":").map(Number);
      
      const requestTimeInMinutes = requestHour * 60 + requestMinute;
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;
      
      if (requestTimeInMinutes < startTimeInMinutes || requestTimeInMinutes >= endTimeInMinutes) {
        return false;
      }

      // Now check if there are any existing bookings at that time
      const { data: existingBookings, error: bookingsError } = await supabaseBypass
        .from("bookings")
        .select("*")
        .eq("recipient_id", artistId as any)
        .eq("date_requested", dateStr as any)
        .eq("time_requested", time as any)
        .not("status", "in", '("cancelled","declined")');

      if (bookingsError) throw bookingsError;
      
      // If there are existing bookings, the slot is not available
      return existingBookings.length === 0;
    } catch (error) {
      handleBookingError(error, "Could not validate the booking slot availability");
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  /**
   * Get all existing bookings for an artist on a specific date
   */
  const getExistingBookings = async (
    artistId: string,
    date: Date
  ): Promise<BookingResponse[]> => {
    if (!artistId || !date) {
      return [];
    }

    try {
      const dateStr = format(date, "yyyy-MM-dd");
      
      const { data, error } = await supabaseBypass
        .from("bookings")
        .select(`
          id,
          date_requested,
          time_requested,
          status,
          service_id,
          metadata,
          sender_id,
          users:sender_id(full_name)
        `)
        .eq("recipient_id", artistId as any)
        .eq("date_requested", dateStr as any)
        .not("status", "in", '("cancelled","declined")');

      if (error) throw error;
      
      return data as unknown as BookingResponse[];
    } catch (error) {
      handleBookingError(error, "Could not fetch existing bookings");
      return [];
    }
  };

  return {
    isValidating,
    validateTimeSlot,
    getExistingBookings
  };
};
