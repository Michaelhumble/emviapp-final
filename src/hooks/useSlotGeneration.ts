import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { format, addDays, parseISO, startOfDay, endOfDay, isBefore, isAfter, addMinutes, isSameDay } from 'date-fns';
import { formatInTimeZone, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { ArtistAvailability, EnhancedBooking, BookableSlot, Service } from '@/types/booking-enhanced';

interface UseSlotGenerationProps {
  artistId: string;
  serviceId?: string;
  selectedDate?: Date;
  timezone?: string;
}

export const useSlotGeneration = ({ artistId, serviceId, selectedDate, timezone = 'America/New_York' }: UseSlotGenerationProps) => {
  const [availability, setAvailability] = useState<ArtistAvailability[]>([]);
  const [existingBookings, setExistingBookings] = useState<EnhancedBooking[]>([]);
  const [service, setService] = useState<Service | null>(null);
  const [timeOff, setTimeOff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch artist availability and service details
  useEffect(() => {
    const fetchData = async () => {
      if (!artistId) return;
      
      setLoading(true);
      setError(null);

      try {
        // Fetch availability
        const { data: availabilityData, error: availabilityError } = await supabase
          .from('artist_availability')
          .select('*')
          .eq('artist_id', artistId);

        if (availabilityError) throw availabilityError;
        setAvailability(availabilityData || []);

        // Fetch service if provided
        if (serviceId) {
          const { data: serviceData, error: serviceError } = await supabase
            .from('services')
            .select('*')
            .eq('id', serviceId)
            .single();

          if (serviceError) throw serviceError;
          setService(serviceData);
        }

        // Fetch time off
        const { data: timeOffData, error: timeOffError } = await supabase
          .from('artist_time_off')
          .select('*')
          .eq('artist_id', artistId);

        if (timeOffError) throw timeOffError;
        setTimeOff(timeOffData || []);

      } catch (err) {
        console.error('Error fetching availability data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch availability'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [artistId, serviceId]);

  // Fetch existing bookings for selected date
  useEffect(() => {
    const fetchBookings = async () => {
      if (!artistId || !selectedDate) return;

      try {
        const startDate = startOfDay(selectedDate);
        const endDate = endOfDay(selectedDate);

        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('recipient_id', artistId)
          .gte('starts_at', startDate.toISOString())
          .lte('starts_at', endDate.toISOString())
          .not('status', 'in', '(cancelled,declined)');

        if (bookingsError) throw bookingsError;
        setExistingBookings(bookingsData || []);

      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch bookings'));
      }
    };

    fetchBookings();
  }, [artistId, selectedDate]);

  // Generate bookable slots
  const bookableSlots = useMemo((): BookableSlot[] => {
    if (!selectedDate || !availability.length) return [];

    const dayName = format(selectedDate, 'EEEE');
    const dayAvailability = availability.find(a => a.day_of_week === dayName && a.is_available);

    if (!dayAvailability) return [];

    // Check if date is in time off
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const isTimeOff = timeOff.some(off => 
      dateStr >= off.start_date && dateStr <= off.end_date
    );

    if (isTimeOff) return [];

    const slots: BookableSlot[] = [];
    const serviceDuration = service?.duration_minutes || 60;
    const slotDuration = dayAvailability.slot_duration_minutes || 30;
    const bufferMinutes = dayAvailability.buffer_minutes || 15;

    // Parse start and end times in artist's timezone
    const startTime = fromZonedTime(
      `${format(selectedDate, 'yyyy-MM-dd')} ${dayAvailability.start_time}`,
      timezone
    );
    const endTime = fromZonedTime(
      `${format(selectedDate, 'yyyy-MM-dd')} ${dayAvailability.end_time}`,
      timezone
    );

    let currentSlot = startTime;

    while (isBefore(currentSlot, endTime)) {
      const slotEnd = addMinutes(currentSlot, serviceDuration);
      
      // Check if slot fits within availability window
      if (isAfter(slotEnd, endTime)) break;

      // Check for conflicts with existing bookings
      const hasConflict = existingBookings.some(booking => {
        if (!booking.starts_at || !booking.ends_at) return false;
        
        const bookingStart = parseISO(booking.starts_at);
        const bookingEnd = parseISO(booking.ends_at);
        
        return (
          (isBefore(currentSlot, bookingEnd) && isAfter(slotEnd, bookingStart)) ||
          (isBefore(bookingStart, slotEnd) && isAfter(bookingEnd, currentSlot))
        );
      });

      // Check if slot is in the past
      const now = new Date();
      const isPast = isBefore(currentSlot, now);

      slots.push({
        start: currentSlot.toISOString(),
        end: slotEnd.toISOString(),
        available: !hasConflict && !isPast,
        service_id: serviceId
      });

      currentSlot = addMinutes(currentSlot, slotDuration);
    }

    return slots;
  }, [selectedDate, availability, existingBookings, service, timeOff, serviceId, timezone]);

  // Get available time slots as strings for display
  const availableTimeSlots = useMemo(() => {
    return bookableSlots
      .filter(slot => slot.available)
      .map(slot => formatInTimeZone(parseISO(slot.start), timezone, 'HH:mm'));
  }, [bookableSlots, timezone]);

  const isDateAvailable = (date: Date) => {
    const dayName = format(date, 'EEEE');
    const hasAvailability = availability.some(a => a.day_of_week === dayName && a.is_available);
    
    if (!hasAvailability) return false;

    // Check time off
    const dateStr = format(date, 'yyyy-MM-dd');
    const isTimeOff = timeOff.some(off => 
      dateStr >= off.start_date && dateStr <= off.end_date
    );

    return !isTimeOff && !isBefore(date, startOfDay(new Date()));
  };

  const getSlotByTime = (time: string): BookableSlot | null => {
    if (!selectedDate) return null;
    
    const slotDateTime = fromZonedTime(
      `${format(selectedDate, 'yyyy-MM-dd')} ${time}`,
      timezone
    );

    return bookableSlots.find(slot => 
      parseISO(slot.start).getTime() === slotDateTime.getTime()
    ) || null;
  };

  return {
    bookableSlots,
    availableTimeSlots,
    availability,
    service,
    existingBookings,
    loading,
    error,
    isDateAvailable,
    getSlotByTime,
    timezone
  };
};