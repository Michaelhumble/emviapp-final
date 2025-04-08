
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { format } from "https://esm.sh/date-fns@2.30.0";

// Configure CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize email service (Resend)
const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("Missing RESEND_API_KEY");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Emvi App <bookings@emviapp.com>",
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`Failed to send email: ${JSON.stringify(error)}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

// Initialize SMS service (Twilio)
const sendSms = async (to: string, body: string) => {
  try {
    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      throw new Error("Missing Twilio configuration");
    }

    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${btoa(`${twilioAccountSid}:${twilioAuthToken}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: twilioPhoneNumber,
          To: to,
          Body: body,
        }).toString(),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Failed to send SMS: ${error}`);
    }

    return await res.json();
  } catch (error) {
    console.error("SMS sending error:", error);
    throw error;
  }
};

// Generate reminder email HTML
const generateReminderEmailHtml = (
  customerName: string, 
  artistName: string, 
  date: string, 
  time: string, 
  isVietnamese = false
) => {
  if (isVietnamese) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Nhắc nhở Cuộc hẹn</h2>
        <p>Xin chào ${customerName},</p>
        <p>Đây là lời nhắc nhở thân thiện rằng bạn có một cuộc hẹn với ${artistName} vào ngày <strong>${date}</strong> lúc <strong>${time}</strong>.</p>
        <p>Vui lòng đến đúng giờ! 💅</p>
        <p>Nếu bạn cần thay đổi hoặc hủy bỏ cuộc hẹn này, vui lòng liên hệ với chúng tôi càng sớm càng tốt.</p>
        <p>Cảm ơn bạn,<br>Emvi App</p>
      </div>
    `;
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Appointment Reminder</h2>
      <p>Hi ${customerName},</p>
      <p>This is a friendly reminder that you have an appointment with ${artistName} on <strong>${date}</strong> at <strong>${time}</strong>.</p>
      <p>Please arrive on time! 💅</p>
      <p>If you need to reschedule or cancel this appointment, please contact us as soon as possible.</p>
      <p>Thank you,<br>Emvi App</p>
    </div>
  `;
};

// Generate reminder SMS text
const generateReminderSmsText = (
  customerName: string, 
  artistName: string, 
  date: string, 
  time: string, 
  isVietnamese = false
) => {
  if (isVietnamese) {
    return `Xin chào ${customerName}! Đây là lời nhắc nhở thân thiện từ ${artistName} rằng bạn có cuộc hẹn vào ngày ${date} lúc ${time}. Vui lòng đến đúng giờ! 💅`;
  }
  
  return `Hi ${customerName}! This is a friendly reminder from ${artistName} that you have an appointment on ${date} at ${time}. Please arrive on time! 💅`;
};

// Function to process bookings and send reminders
const processBookingReminders = async () => {
  try {
    // Get current date/time
    const now = new Date();
    
    // Calculate the time 24 hours from now for finding bookings
    const reminderWindowEnd = new Date(now);
    reminderWindowEnd.setHours(reminderWindowEnd.getHours() + 24);
    
    // Calculate the time 23 hours from now (to avoid double-sending for hourly cron jobs)
    const reminderWindowStart = new Date(now);
    reminderWindowStart.setHours(reminderWindowStart.getHours() + 23);
    
    // Format dates for the query
    const startDate = reminderWindowStart.toISOString().split('T')[0];
    const endDate = reminderWindowEnd.toISOString().split('T')[0];
    
    console.log(`Searching for bookings between ${startDate} and ${endDate}`);
    
    // Get bookings that need reminders
    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select(`
        id, 
        date_requested, 
        time_requested, 
        status, 
        sender_id, 
        recipient_id,
        reminder_sent,
        service_id
      `)
      .eq("status", "accepted")
      .eq("reminder_sent", false)
      .gte("date_requested", startDate)
      .lte("date_requested", endDate);
    
    if (bookingsError) {
      throw bookingsError;
    }
    
    console.log(`Found ${bookings?.length || 0} bookings that need reminders`);
    
    if (!bookings || bookings.length === 0) {
      return { processed: 0 };
    }

    // Process each booking
    let remindersSent = 0;
    for (const booking of bookings) {
      // Get customer details
      const { data: customer, error: customerError } = await supabase
        .from("users")
        .select("email, full_name, phone, preferred_language")
        .eq("id", booking.sender_id)
        .single();
      
      if (customerError) {
        console.error(`Error fetching customer details for booking ${booking.id}:`, customerError);
        continue;
      }
      
      // Get artist details
      const { data: artist, error: artistError } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", booking.recipient_id)
        .single();
      
      if (artistError) {
        console.error(`Error fetching artist details for booking ${booking.id}:`, artistError);
        continue;
      }

      // Get notification settings
      const { data: settings, error: settingsError } = await supabase
        .from("notification_settings")
        .select("email_reminders_enabled, sms_reminders_enabled")
        .eq("user_id", booking.sender_id)
        .maybeSingle();
      
      // Default to enabled if no settings found
      const emailEnabled = settings?.email_reminders_enabled !== false;
      const smsEnabled = settings?.sms_reminders_enabled !== false;
      
      // Format appointment date and time
      const appointmentDate = format(new Date(booking.date_requested), "MMMM dd, yyyy");
      const appointmentTime = booking.time_requested;
      
      // Check if Vietnamese is preferred
      const isVietnamese = customer.preferred_language === "Vietnamese";
      
      try {
        // Send email reminder if enabled
        if (emailEnabled && customer.email) {
          const emailHtml = generateReminderEmailHtml(
            customer.full_name,
            artist.full_name,
            appointmentDate,
            appointmentTime,
            isVietnamese
          );
          
          const subject = isVietnamese
            ? `Nhắc nhở: Cuộc hẹn của bạn vào ngày ${appointmentDate}`
            : `Reminder: Your appointment on ${appointmentDate}`;
          
          await sendEmail(customer.email, subject, emailHtml);
          console.log(`Email reminder sent to ${customer.email} for booking ${booking.id}`);
        }
        
        // Send SMS reminder if enabled and phone number available
        if (smsEnabled && customer.phone) {
          const smsText = generateReminderSmsText(
            customer.full_name,
            artist.full_name,
            appointmentDate,
            appointmentTime,
            isVietnamese
          );
          
          await sendSms(customer.phone, smsText);
          console.log(`SMS reminder sent to ${customer.phone} for booking ${booking.id}`);
        }
        
        // Mark reminder as sent in the database
        const { error: updateError } = await supabase
          .from("bookings")
          .update({
            reminder_sent: true,
            reminder_sent_at: new Date().toISOString()
          })
          .eq("id", booking.id);
        
        if (updateError) {
          throw updateError;
        }
        
        remindersSent++;
      } catch (error) {
        console.error(`Error sending reminder for booking ${booking.id}:`, error);
      }
    }
    
    return { processed: bookings.length, sent: remindersSent };
  } catch (error) {
    console.error("Error processing reminders:", error);
    throw error;
  }
};

// Handler for the edge function
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Process reminders
    const result = await processBookingReminders();
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${result.processed} bookings, sent ${result.sent} reminders` 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
};

// Start the server
serve(handler);
