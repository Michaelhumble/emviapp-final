
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
      const { data: availabilityData, error: availabilityError } = await supabase
        .from("artist_availability")
        .select("start_time, end_time, is_available")
        .eq("artist_id", artistId)
        .eq("day_of_week", dayName)
        .maybeSingle();

      if (availabilityError) throw availabilityError;
      
      // If no availability record or not available
      if (!availabilityData || !availabilityData.is_available) {
        return false;
      }

      // Check if the time is within the available hours
      const [requestHour, requestMinute] = time.split(":").map(Number);
      const [startHour, startMinute] = availabilityData.start_time.split(":").map(Number);
      const [endHour, endMinute] = availabilityData.end_time.split(":").map(Number);
      
      const requestTimeInMinutes = requestHour * 60 + requestMinute;
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;
      
      if (requestTimeInMinutes < startTimeInMinutes || requestTimeInMinutes >= endTimeInMinutes) {
        return false;
      }

      // Now check if there are any existing bookings at that time
      const { data: existingBookings, error: bookingsError } = await supabase
        .from("bookings")
        .select("*")
        .eq("recipient_id", artistId)
        .eq("date_requested", dateStr)
        .eq("time_requested", time)
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
      
      const { data, error } = await supabase
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
        .eq("recipient_id", artistId)
        .eq("date_requested", dateStr)
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
