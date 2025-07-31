import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingConfirmationRequest {
  booking_id: string;
  client_email: string;
  client_name: string;
  service_name: string;
  date: string;
  time: string;
  artist_id: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("🔧 [BOOKING-CONFIRMATION] Function started");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const requestData: BookingConfirmationRequest = await req.json();
    console.log("📧 [BOOKING-CONFIRMATION] Processing confirmation for booking:", requestData.booking_id);

    // Get artist information
    const { data: artistData, error: artistError } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', requestData.artist_id)
      .single();

    if (artistError) {
      console.error("❌ [BOOKING-CONFIRMATION] Error fetching artist:", artistError);
    }

    const artistName = artistData?.full_name || "Your Artist";
    const artistEmail = artistData?.email;

    // Format date for better readability
    const formattedDate = new Date(requestData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Send confirmation email to client
    const clientEmailResponse = await resend.emails.send({
      from: "EmviApp <no-reply@emviapp.com>",
      to: [requestData.client_email],
      subject: "Booking Confirmation - EmviApp",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B5CF6; margin-bottom: 10px;">EmviApp</h1>
            <h2 style="color: #4B5563; margin: 0;">Booking Confirmation</h2>
          </div>
          
          <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1F2937; margin-top: 0;">Hi ${requestData.client_name}!</h3>
            <p style="color: #4B5563; line-height: 1.6;">
              Thank you for booking with EmviApp! Your appointment has been submitted and is currently pending confirmation from ${artistName}.
            </p>
          </div>

          <div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: #1F2937; margin-top: 0; border-bottom: 1px solid #E5E7EB; padding-bottom: 10px;">
              Booking Details
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-weight: 500;">Service:</td>
                <td style="padding: 8px 0; color: #1F2937;">${requestData.service_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-weight: 500;">Artist:</td>
                <td style="padding: 8px 0; color: #1F2937;">${artistName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-weight: 500;">Date:</td>
                <td style="padding: 8px 0; color: #1F2937;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-weight: 500;">Time:</td>
                <td style="padding: 8px 0; color: #1F2937;">${requestData.time}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280; font-weight: 500;">Booking ID:</td>
                <td style="padding: 8px 0; color: #1F2937; font-family: monospace;">${requestData.booking_id}</td>
              </tr>
            </table>
          </div>

          <div style="background: #FEF3C7; border: 1px solid #F59E0B; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="color: #92400E; margin: 0; font-weight: 500;">
              ⏳ Your booking is pending confirmation from the artist. You'll receive another email once it's confirmed.
            </p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://emviapp.com" 
               style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
              View on EmviApp
            </a>
          </div>

          <div style="border-top: 1px solid #E5E7EB; padding-top: 20px; text-align: center; color: #6B7280; font-size: 14px;">
            <p>Need help? Contact us at <a href="mailto:michaelemviapp@gmail.com" style="color: #8B5CF6;">michaelemviapp@gmail.com</a></p>
            <p style="margin: 10px 0 0 0;">© 2024 EmviApp. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log("✅ [BOOKING-CONFIRMATION] Client email sent:", clientEmailResponse);

    // Send notification email to artist if email available
    if (artistEmail) {
      const artistEmailResponse = await resend.emails.send({
        from: "EmviApp <no-reply@emviapp.com>",
        to: [artistEmail],
        subject: "New Booking Request - EmviApp",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8B5CF6; margin-bottom: 10px;">EmviApp</h1>
              <h2 style="color: #4B5563; margin: 0;">New Booking Request</h2>
            </div>
            
            <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1F2937; margin-top: 0;">Hi ${artistName}!</h3>
              <p style="color: #4B5563; line-height: 1.6;">
                You have received a new booking request. Please review the details below and respond promptly.
              </p>
            </div>

            <div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1F2937; margin-top: 0; border-bottom: 1px solid #E5E7EB; padding-bottom: 10px;">
                Booking Details
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 500;">Client:</td>
                  <td style="padding: 8px 0; color: #1F2937;">${requestData.client_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 500;">Email:</td>
                  <td style="padding: 8px 0; color: #1F2937;">${requestData.client_email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 500;">Service:</td>
                  <td style="padding: 8px 0; color: #1F2937;">${requestData.service_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 500;">Date:</td>
                  <td style="padding: 8px 0; color: #1F2937;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6B7280; font-weight: 500;">Time:</td>
                  <td style="padding: 8px 0; color: #1F2937;">${requestData.time}</td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://emviapp.com/dashboard/artist" 
                 style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin-right: 10px;">
                Accept Booking
              </a>
              <a href="https://emviapp.com/dashboard/artist" 
                 style="background: #6B7280; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                View Dashboard
              </a>
            </div>

            <div style="border-top: 1px solid #E5E7EB; padding-top: 20px; text-align: center; color: #6B7280; font-size: 14px;">
              <p>Questions? Contact us at <a href="mailto:michaelemviapp@gmail.com" style="color: #8B5CF6;">michaelemviapp@gmail.com</a></p>
              <p style="margin: 10px 0 0 0;">© 2024 EmviApp. All rights reserved.</p>
            </div>
          </div>
        `,
      });

      console.log("✅ [BOOKING-CONFIRMATION] Artist email sent:", artistEmailResponse);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        client_email_sent: !!clientEmailResponse.data,
        artist_email_sent: !!artistEmail 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("❌ [BOOKING-CONFIRMATION] Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);