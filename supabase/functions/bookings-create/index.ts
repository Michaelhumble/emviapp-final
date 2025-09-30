import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  artist_id: string;
  service_id?: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  starts_at: string; // ISO timestamp
  ends_at: string; // ISO timestamp
  notes?: string;
  source?: 'web' | 'hubspot' | 'manual';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Parse and validate request body
    const BodySchema = z.object({
      artist_id: z.string().uuid(),
      service_id: z.string().uuid().optional().nullable(),
      client_name: z.string().min(1).max(120),
      client_email: z.string().email().max(254),
      client_phone: z.string().max(30).optional().nullable(),
      starts_at: z.string().datetime(),
      ends_at: z.string().datetime(),
      notes: z.string().max(1000).optional().nullable(),
      source: z.enum(['web', 'hubspot', 'manual']).optional()
    });

    const raw = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      console.error("Booking validation failed:", parsed.error);
      return new Response(
        JSON.stringify({ error: "invalid_request" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const bookingRequest = parsed.data;

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

    // Check for booking conflicts
    const { data: conflictCheck, error: conflictError } = await supabaseClient.rpc(
      'check_booking_conflicts',
      {
        p_artist_id: bookingRequest.artist_id,
        p_starts_at: bookingRequest.starts_at,
        p_ends_at: bookingRequest.ends_at
      }
    );

    if (conflictError) {
      console.error("Conflict check error:", conflictError);
      return new Response(
        JSON.stringify({ error: "Failed to validate time slot availability" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (conflictCheck) {
      return new Response(
        JSON.stringify({ error: "This time slot is no longer available. Please select another time." }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create the booking
    const { data: bookingData, error: bookingError } = await supabaseClient
      .from('bookings')
      .insert({
        recipient_id: bookingRequest.artist_id,
        sender_id: null, // Guest booking
        service_id: bookingRequest.service_id,
        client_name: bookingRequest.client_name,
        client_email: bookingRequest.client_email,
        client_phone: bookingRequest.client_phone,
        starts_at: bookingRequest.starts_at,
        ends_at: bookingRequest.ends_at,
        date_requested: new Date(bookingRequest.starts_at).toISOString().split('T')[0],
        time_requested: new Date(bookingRequest.starts_at).toTimeString().slice(0, 5),
        status: 'pending',
        source: bookingRequest.source || 'web',
        note: bookingRequest.notes,
        metadata: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          user_agent: req.headers.get("user-agent") || '',
          submitted_at: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (bookingError) {
      console.error("Booking creation error:", bookingError);
      return new Response(
        JSON.stringify({ error: "Failed to create booking" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const bookingId = bookingData.id;

    // Send confirmation emails asynchronously (don't fail booking if this fails)
    try {
      await supabaseClient.functions.invoke('send-booking-confirmation', {
        body: {
          booking_id: bookingId,
          booking_data: bookingData,
          client_email: bookingRequest.client_email,
          client_name: bookingRequest.client_name,
          artist_id: bookingRequest.artist_id
        }
      });
    } catch (emailError) {
      console.warn('Email notification failed:', emailError);
    }

    // Fire analytics event (don't fail booking if this fails)
    try {
      if (typeof globalThis !== 'undefined' && (globalThis as any).gtag) {
        (globalThis as any).gtag('event', 'booking_submitted', {
          artist_id: bookingRequest.artist_id,
          service_id: bookingRequest.service_id,
          source: bookingRequest.source || 'web',
          value: 1
        });
      }
    } catch (analyticsError) {
      console.warn('Analytics tracking failed:', analyticsError);
    }

    // Send lead to HubSpot CRM (don't fail booking if this fails)
    try {
      const crmLead = {
        email: bookingRequest.client_email,
        name: bookingRequest.client_name,
        phone: bookingRequest.client_phone,
        source: 'booking',
        artist_id: bookingRequest.artist_id,
        booking_date: bookingRequest.starts_at,
        metadata: {
          service_id: bookingRequest.service_id,
          notes: bookingRequest.notes,
          booking_id: bookingId
        }
      };

      await supabaseClient.functions.invoke('hubspot-contact', {
        body: crmLead
      });
    } catch (crmError) {
      console.warn('CRM integration failed:', crmError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        booking_id: bookingId,
        booking: bookingData
      }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Booking creation failed:', error);
    
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});