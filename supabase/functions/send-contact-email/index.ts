
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  firstname: string;
  lastname?: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  currentUrl?: string;
  userAgent?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstname, lastname, email, phone, company, message, currentUrl, userAgent }: ContactFormData = await req.json();

    // Validate required fields
    if (!firstname || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All required fields must be filled" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const fullName = `${firstname} ${lastname || ''}`.trim();

    // Send email to support@emvi.app with CC to michaelemviapp@gmail.com
    const emailResponse = await resend.emails.send({
      from: "EmviApp Contact Form <no-reply@emvi.app>",
      to: ["support@emvi.app"],
      cc: ["michaelemviapp@gmail.com"],
      subject: `[EmviApp Contact] ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            ${currentUrl ? `<p><strong>Page URL:</strong> ${currentUrl}</p>` : ''}
            ${userAgent ? `<p><strong>User Agent:</strong> ${userAgent}</p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action Required:</strong> Please respond to this inquiry at your earliest convenience.
            </p>
          </div>
        </div>
      `,
      replyTo: email, // Allow direct reply to the user
    });

    console.log("Contact form email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully" 
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
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send email",
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
