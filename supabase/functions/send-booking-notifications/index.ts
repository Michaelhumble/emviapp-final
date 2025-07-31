import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking_id, event_type, booking_data } = await req.json();

    console.log('📧 Sending booking notifications:', { booking_id, event_type });

    // Create Supabase client with service role for admin access
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Get booking details with related data
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .select(`
        id,
        date_requested,
        time_requested,
        status,
        note,
        service:service_id (
          id,
          name,
          price,
          duration
        ),
        customer:sender_id (
          id,
          full_name,
          email
        ),
        artist:recipient_id (
          id,
          full_name,
          email
        )
      `)
      .eq('id', booking_id)
      .single();

    if (bookingError || !booking) {
      console.error('❌ Failed to fetch booking details:', bookingError);
      throw new Error('Booking not found');
    }

    // Prepare email content based on event type
    let customerSubject, customerHtml, artistSubject, artistHtml;

    switch (event_type) {
      case 'created':
        customerSubject = '✅ Booking Confirmation - EmviApp';
        customerHtml = `
          <h2>Booking Confirmed!</h2>
          <p>Hi ${booking.customer?.full_name || 'there'},</p>
          <p>Your booking has been successfully created:</p>
          <ul>
            <li><strong>Service:</strong> ${booking.service?.name || 'Beauty Service'}</li>
            <li><strong>Artist:</strong> ${booking.artist?.full_name || 'Professional'}</li>
            <li><strong>Date:</strong> ${booking.date_requested}</li>
            <li><strong>Time:</strong> ${booking.time_requested}</li>
            <li><strong>Price:</strong> $${booking.service?.price || 0}</li>
          </ul>
          ${booking.note ? `<p><strong>Note:</strong> ${booking.note}</p>` : ''}
          <p>We'll send you a reminder before your appointment. Can't wait to see you!</p>
          <p>Best regards,<br>The EmviApp Team</p>
        `;

        artistSubject = '🎯 New Booking Request - EmviApp';
        artistHtml = `
          <h2>New Booking Request!</h2>
          <p>Hi ${booking.artist?.full_name || 'there'},</p>
          <p>You have a new booking request:</p>
          <ul>
            <li><strong>Customer:</strong> ${booking.customer?.full_name || 'Customer'}</li>
            <li><strong>Service:</strong> ${booking.service?.name || 'Beauty Service'}</li>
            <li><strong>Date:</strong> ${booking.date_requested}</li>
            <li><strong>Time:</strong> ${booking.time_requested}</li>
            <li><strong>Price:</strong> $${booking.service?.price || 0}</li>
          </ul>
          ${booking.note ? `<p><strong>Customer Note:</strong> ${booking.note}</p>` : ''}
          <p>Please log in to your dashboard to confirm or modify this booking.</p>
          <p>Best regards,<br>The EmviApp Team</p>
        `;
        break;

      case 'cancelled':
        customerSubject = '❌ Booking Cancelled - EmviApp';
        customerHtml = `
          <h2>Booking Cancelled</h2>
          <p>Hi ${booking.customer?.full_name || 'there'},</p>
          <p>Your booking has been cancelled:</p>
          <ul>
            <li><strong>Service:</strong> ${booking.service?.name || 'Beauty Service'}</li>
            <li><strong>Artist:</strong> ${booking.artist?.full_name || 'Professional'}</li>
            <li><strong>Date:</strong> ${booking.date_requested}</li>
            <li><strong>Time:</strong> ${booking.time_requested}</li>
          </ul>
          <p>If you'd like to reschedule, please visit EmviApp to book a new appointment.</p>
          <p>Best regards,<br>The EmviApp Team</p>
        `;

        artistSubject = '❌ Booking Cancelled - EmviApp';
        artistHtml = `
          <h2>Booking Cancelled</h2>
          <p>Hi ${booking.artist?.full_name || 'there'},</p>
          <p>A booking has been cancelled:</p>
          <ul>
            <li><strong>Customer:</strong> ${booking.customer?.full_name || 'Customer'}</li>
            <li><strong>Service:</strong> ${booking.service?.name || 'Beauty Service'}</li>
            <li><strong>Date:</strong> ${booking.date_requested}</li>
            <li><strong>Time:</strong> ${booking.time_requested}</li>
          </ul>
          <p>This time slot is now available for other bookings.</p>
          <p>Best regards,<br>The EmviApp Team</p>
        `;
        break;

      default:
        throw new Error(`Unknown event type: ${event_type}`);
    }

    // Send notifications
    const notifications = [];

    // Send to customer
    if (booking.customer?.email && customerSubject) {
      try {
        const customerEmail = await resend.emails.send({
          from: 'EmviApp <bookings@emviapp.com>',
          to: [booking.customer.email],
          subject: customerSubject,
          html: customerHtml,
        });

        // Log notification
        await supabaseAdmin
          .from('booking_notifications')
          .insert({
            booking_id,
            user_id: booking.customer.id,
            notification_type: 'email',
            event_type,
            sent_at: new Date().toISOString(),
            delivery_status: 'sent',
            provider_response: { resend_id: customerEmail.data?.id }
          });

        notifications.push({ type: 'customer_email', status: 'sent' });
      } catch (error) {
        console.error('❌ Failed to send customer email:', error);
        notifications.push({ type: 'customer_email', status: 'failed', error: error.message });
      }
    }

    // Send to artist
    if (booking.artist?.email && artistSubject) {
      try {
        const artistEmail = await resend.emails.send({
          from: 'EmviApp <bookings@emviapp.com>',
          to: [booking.artist.email],
          subject: artistSubject,
          html: artistHtml,
        });

        // Log notification
        await supabaseAdmin
          .from('booking_notifications')
          .insert({
            booking_id,
            user_id: booking.artist.id,
            notification_type: 'email',
            event_type,
            sent_at: new Date().toISOString(),
            delivery_status: 'sent',
            provider_response: { resend_id: artistEmail.data?.id }
          });

        notifications.push({ type: 'artist_email', status: 'sent' });
      } catch (error) {
        console.error('❌ Failed to send artist email:', error);
        notifications.push({ type: 'artist_email', status: 'failed', error: error.message });
      }
    }

    console.log('✅ Notifications sent:', notifications);

    return new Response(
      JSON.stringify({ 
        success: true,
        notifications,
        booking_id 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("❌ Notification sending failed:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send notifications" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});