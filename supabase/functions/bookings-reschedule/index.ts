import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RescheduleRequest {
  bookingId: string;
  newStartsAt: string;
  newEndsAt: string;
  token?: string;
  managedBy: 'customer' | 'artist' | 'admin';
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    });

    const { bookingId, newStartsAt, newEndsAt, token, managedBy }: RescheduleRequest = await req.json();

    // Verify token if provided (for customer self-service)
    if (token && managedBy === 'customer') {
      const { data: isValid, error: tokenError } = await supabase.rpc('verify_manage_token', {
        p_token: token,
        p_booking_id: bookingId
      });

      if (tokenError || !isValid) {
        return new Response(
          JSON.stringify({ error: "Invalid or expired token" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Get current booking
    const { data: currentBooking, error: bookingError } = await supabase
      .from("bookings")
      .select("*, services(*)")
      .eq("id", bookingId)
      .single();

    if (bookingError || !currentBooking) {
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check for scheduling conflicts
    const { data: conflicts, error: conflictError } = await supabase
      .from("bookings")
      .select("id")
      .eq("recipient_id", currentBooking.recipient_id)
      .eq("status", "confirmed")
      .neq("id", bookingId)
      .gte("starts_at", newStartsAt)
      .lt("starts_at", newEndsAt);

    if (conflictError) {
      throw new Error("Error checking conflicts: " + conflictError.message);
    }

    if (conflicts && conflicts.length > 0) {
      return new Response(
        JSON.stringify({ error: "Time slot is not available" }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update booking with new time and increment ICS sequence
    const { error: updateError } = await supabase
      .from("bookings")
      .update({
        starts_at: newStartsAt,
        ends_at: newEndsAt,
        status: 'rescheduled',
        managed_by: managedBy,
        ics_sequence: (currentBooking.ics_sequence || 0) + 1,
        date_requested: new Date(newStartsAt).toISOString().split('T')[0],
        time_requested: new Date(newStartsAt).toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      })
      .eq("id", bookingId);

    if (updateError) {
      throw new Error("Failed to update booking: " + updateError.message);
    }

    // Send confirmation emails if Resend is configured
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const newDate = new Date(newStartsAt);
        const formattedDate = newDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const formattedTime = newDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });

        // Email to customer
        await resend.emails.send({
          from: "EmviApp <bookings@emviapp.com>",
          to: [currentBooking.client_email],
          subject: "Booking Rescheduled - Confirmation",
          html: `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
              <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                Booking Rescheduled
              </h1>
              
              <p>Hi ${currentBooking.client_name || 'there'}!</p>
              
              <p>Your booking has been successfully rescheduled:</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">New Appointment Details</h3>
                <p><strong>Service:</strong> ${currentBooking.service_type || 'Beauty Service'}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${formattedTime}</p>
                ${currentBooking.note ? `<p><strong>Notes:</strong> ${currentBooking.note}</p>` : ''}
              </div>
              
              <p>We look forward to seeing you at your new appointment time!</p>
              
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                This is an automated message from EmviApp. If you need assistance, please contact us.
              </p>
            </div>
          `,
        });

        // Email to artist
        const { data: artistProfile } = await supabase
          .from("profiles")
          .select("full_name, email")
          .eq("id", currentBooking.recipient_id)
          .single();

        if (artistProfile?.email) {
          await resend.emails.send({
            from: "EmviApp <bookings@emviapp.com>",
            to: [artistProfile.email],
            subject: "Booking Rescheduled - Artist Notification",
            html: `
              <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                  Booking Rescheduled
                </h1>
                
                <p>Hi ${artistProfile.full_name || 'there'}!</p>
                
                <p>A booking has been rescheduled:</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #333;">Updated Appointment</h3>
                  <p><strong>Client:</strong> ${currentBooking.client_name}</p>
                  <p><strong>Service:</strong> ${currentBooking.service_type || 'Beauty Service'}</p>
                  <p><strong>New Date:</strong> ${formattedDate}</p>
                  <p><strong>New Time:</strong> ${formattedTime}</p>
                </div>
                
                <p>Please update your calendar accordingly.</p>
                
                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                  This is an automated message from EmviApp.
                </p>
              </div>
            `,
          });
        }

        console.log("Reschedule confirmation emails sent successfully");
      } catch (emailError) {
        console.error("Failed to send emails:", emailError);
        // Don't fail the request if email fails
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Booking rescheduled successfully",
        newStartsAt,
        newEndsAt
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error in reschedule function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});