import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SlotRequest {
  artist_id: string;
  service_id?: string;
  date: string; // YYYY-MM-DD format
  timezone?: string; // IANA timezone, defaults to America/New_York
}

interface BookableSlot {
  artist_id: string;
  service_id: string;
  starts_at: string; // ISO timestamp
  ends_at: string; // ISO timestamp
  available: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    let slotRequest: SlotRequest;

    if (req.method === "GET") {
      const url = new URL(req.url);
      slotRequest = {
        artist_id: url.searchParams.get("artist_id") || "",
        service_id: url.searchParams.get("service_id") || undefined,
        date: url.searchParams.get("date") || "",
        timezone: url.searchParams.get("timezone") || "America/New_York"
      };
    } else {
      slotRequest = await req.json();
      slotRequest.timezone = slotRequest.timezone || "America/New_York";
    }

    // Validate required parameters
    if (!slotRequest.artist_id || !slotRequest.date) {
      return new Response(
        JSON.stringify({ error: "artist_id and date are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(slotRequest.date)) {
      return new Response(
        JSON.stringify({ error: "date must be in YYYY-MM-DD format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const requestDate = new Date(slotRequest.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Don't allow booking for past dates
    if (requestDate < today) {
      return new Response(
        JSON.stringify({ 
          slots: [],
          message: "Cannot book appointments for past dates"
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get day of week name
    const dayName = requestDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Fetch artist availability for the day
    const { data: availability, error: availabilityError } = await supabaseClient
      .from('artist_availability')
      .select('*')
      .eq('artist_id', slotRequest.artist_id)
      .eq('day_of_week', dayName)
      .eq('is_available', true);

    if (availabilityError) {
      console.error("Availability fetch error:", availabilityError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch availability" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!availability || availability.length === 0) {
      return new Response(
        JSON.stringify({ 
          slots: [],
          message: "Artist is not available on this day"
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const dayAvailability = availability[0];

    // Check for time off
    const { data: timeOff, error: timeOffError } = await supabaseClient
      .from('artist_time_off')
      .select('*')
      .eq('artist_id', slotRequest.artist_id)
      .lte('start_date', slotRequest.date)
      .gte('end_date', slotRequest.date);

    if (timeOffError) {
      console.error("Time off fetch error:", timeOffError);
    }

    if (timeOff && timeOff.length > 0) {
      return new Response(
        JSON.stringify({ 
          slots: [],
          message: "Artist is on time off for this date"
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get service duration or default to 60 minutes
    let serviceDuration = 60;
    if (slotRequest.service_id) {
      const { data: service, error: serviceError } = await supabaseClient
        .from('services')
        .select('duration_minutes')
        .eq('id', slotRequest.service_id)
        .single();

      if (!serviceError && service) {
        serviceDuration = service.duration_minutes;
      }
    }

    // Fetch existing bookings for the date
    const startOfDay = `${slotRequest.date}T00:00:00.000Z`;
    const endOfDay = `${slotRequest.date}T23:59:59.999Z`;

    const { data: existingBookings, error: bookingsError } = await supabaseClient
      .from('bookings')
      .select('starts_at, ends_at')
      .eq('recipient_id', slotRequest.artist_id)
      .gte('starts_at', startOfDay)
      .lte('starts_at', endOfDay)
      .not('status', 'in', '(cancelled,declined)');

    if (bookingsError) {
      console.error("Bookings fetch error:", bookingsError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch existing bookings" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate time slots
    const slots: BookableSlot[] = [];
    const slotDuration = dayAvailability.slot_duration_minutes || 30;
    const bufferMinutes = dayAvailability.buffer_minutes || 15;

    // Parse availability times
    const [startHour, startMinute] = dayAvailability.start_time.split(':').map(Number);
    const [endHour, endMinute] = dayAvailability.end_time.split(':').map(Number);

    let currentTime = new Date(requestDate);
    currentTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(requestDate);
    endTime.setHours(endHour, endMinute, 0, 0);

    // If it's today, don't allow booking slots in the past
    const now = new Date();
    if (requestDate.toDateString() === now.toDateString()) {
      const minTime = new Date(now.getTime() + (bufferMinutes * 60000)); // Add buffer to current time
      if (currentTime < minTime) {
        currentTime = minTime;
        // Round up to next slot boundary
        const minutesToNextSlot = slotDuration - (currentTime.getMinutes() % slotDuration);
        if (minutesToNextSlot < slotDuration) {
          currentTime.setMinutes(currentTime.getMinutes() + minutesToNextSlot);
        }
      }
    }

    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + (serviceDuration * 60000));
      
      // Check if slot fits within availability window
      if (slotEnd > endTime) break;

      // Check for conflicts with existing bookings
      const hasConflict = existingBookings?.some(booking => {
        if (!booking.starts_at || !booking.ends_at) return false;
        
        const bookingStart = new Date(booking.starts_at);
        const bookingEnd = new Date(booking.ends_at);
        
        return (
          (currentTime < bookingEnd && slotEnd > bookingStart) ||
          (bookingStart < slotEnd && bookingEnd > currentTime)
        );
      }) || false;

      slots.push({
        artist_id: slotRequest.artist_id,
        service_id: slotRequest.service_id || '',
        starts_at: currentTime.toISOString(),
        ends_at: slotEnd.toISOString(),
        available: !hasConflict
      });

      // Move to next slot
      currentTime = new Date(currentTime.getTime() + (slotDuration * 60000));
    }

    return new Response(
      JSON.stringify({
        slots: slots,
        date: slotRequest.date,
        artist_id: slotRequest.artist_id,
        service_duration_minutes: serviceDuration,
        total_slots: slots.length,
        available_slots: slots.filter(s => s.available).length
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Slot generation failed:', error);
    
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});