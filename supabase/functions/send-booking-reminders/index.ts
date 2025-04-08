
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );
    
    // Get the request body
    const { bookingId, manual = false } = await req.json();
    
    // For security, verify the user making this request
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Processing reminder for booking ${bookingId}, manual=${manual}`);
    
    // Get the booking
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .select("*, sender:sender_id(*), recipient:recipient_id(*)")
      .eq("id", bookingId)
      .single();
    
    if (bookingError || !booking) {
      console.error("Error fetching booking:", bookingError);
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Get notification settings for the customer
    const { data: notificationSettings } = await supabaseClient
      .from("notification_settings")
      .select("*")
      .eq("user_id", booking.sender_id)
      .maybeSingle();
    
    const settings = notificationSettings || {
      email_reminders_enabled: true,
      sms_reminders_enabled: true
    };
    
    // Send notification
    if (settings.email_reminders_enabled) {
      console.log("Sending email reminder to:", booking.sender.email);
      // In a production app, we would integrate with an email service here
    }
    
    if (settings.sms_reminders_enabled && booking.sender.phone) {
      console.log("Sending SMS reminder to:", booking.sender.phone);
      // In a production app, we would integrate with an SMS service here
    }
    
    // Create notification in the app
    await supabaseClient.from("notifications").insert({
      user_id: booking.sender_id,
      message: `Reminder: You have an appointment with ${booking.recipient.full_name} on ${booking.date_requested} at ${booking.time_requested}`,
      type: "reminder",
      link: "/dashboard/bookings"
    });
    
    // Update booking status to mark reminder as sent
    await supabaseClient
      .from("bookings")
      .update({
        reminder_sent: true,
        reminder_sent_at: new Date().toISOString()
      })
      .eq("id", bookingId);
    
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing booking reminder:", error);
    
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// To invoke:
// curl -i --location --request POST 'https://wwhqbjrhbajpabfdwnip.supabase.co/functions/v1/send-booking-reminders' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3aHFianJoYmFqcGFiZmR3bmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTk2OTMsImV4cCI6MjA1NzU3NTY5M30.1YGaLgfnwqmzn3f28IzmTxDKKX5NoJ1V8IbI3V4-WmM' \
//   --header 'Content-Type: application/json' \
//   --data '{"bookingId":"some-booking-id", "manual":true}'
