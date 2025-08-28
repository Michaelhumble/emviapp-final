import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CancelRequest {
  booking_id: string;
  reason?: string;
  notify_parties?: boolean;
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

    const cancelRequest: CancelRequest = await req.json();

    if (!cancelRequest.booking_id) {
      return new Response(
        JSON.stringify({ error: "booking_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify the user has permission to cancel this booking
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    // Get the booking to verify ownership
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .select("*, sender:sender_id(*), recipient:recipient_id(*)")
      .eq("id", cancelRequest.booking_id)
      .single();

    if (bookingError || !booking) {
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user has permission to cancel (either sender or recipient)
    if (user && booking.sender_id !== user.id && booking.recipient_id !== user.id) {
      return new Response(
        JSON.stringify({ error: "Not authorized to cancel this booking" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update booking status to cancelled
    const { error: updateError } = await supabaseClient
      .from("bookings")
      .update({
        status: "cancelled",
        metadata: {
          ...booking.metadata,
          cancelled_at: new Date().toISOString(),
          cancellation_reason: cancelRequest.reason,
          cancelled_by: user?.id
        }
      })
      .eq("id", cancelRequest.booking_id);

    if (updateError) {
      console.error("Error updating booking:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to cancel booking" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send cancellation notifications if requested
    if (cancelRequest.notify_parties !== false) {
      try {
        // Notify the artist if customer cancelled
        if (user?.id === booking.sender_id && booking.recipient) {
          await supabaseClient.from("notifications").insert({
            user_id: booking.recipient_id,
            message: `${booking.client_name || 'A customer'} cancelled their appointment on ${booking.date_requested}`,
            type: "booking_cancelled",
            link: "/dashboard/bookings"
          });
        }

        // Notify the customer if artist cancelled
        if (user?.id === booking.recipient_id && booking.sender_id) {
          await supabaseClient.from("notifications").insert({
            user_id: booking.sender_id,
            message: `Your appointment on ${booking.date_requested} has been cancelled`,
            type: "booking_cancelled",
            link: "/dashboard/bookings"
          });
        }

        // Send email notifications (if available)
        if (booking.client_email) {
          try {
            await supabaseClient.functions.invoke('send-cancellation-email', {
              body: {
                booking_id: cancelRequest.booking_id,
                booking_data: booking,
                reason: cancelRequest.reason
              }
            });
          } catch (emailError) {
            console.warn('Email notification failed:', emailError);
          }
        }
      } catch (notificationError) {
        console.warn('Notification failed:', notificationError);
      }
    }

    // Invalidate calendar event if it exists
    if (booking.calendar_event_id) {
      try {
        // In a real implementation, you might want to delete/update the calendar event
        console.log(`Calendar event ${booking.calendar_event_id} should be updated/deleted`);
      } catch (calendarError) {
        console.warn('Calendar update failed:', calendarError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Booking cancelled successfully",
        booking_id: cancelRequest.booking_id
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Booking cancellation failed:', error);
    
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});