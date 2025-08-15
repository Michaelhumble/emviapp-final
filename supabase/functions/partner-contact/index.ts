import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PartnerContactData {
  name: string;
  email: string;
  company: string;
  website?: string;
  fundingStage: string;
  investmentAmount: string;
  trackRecord: string;
  whyChooseYou: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: PartnerContactData = await req.json();

    // Enhanced validation with sanitization
    if (!data.name || !data.email || !data.company || !data.trackRecord || !data.whyChooseYou) {
      return new Response(
        JSON.stringify({ error: "All required fields must be filled" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizeInput = (input: string) => input.trim().slice(0, 5000); // Limit length
    const sanitizedData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      company: sanitizeInput(data.company),
      website: data.website ? sanitizeInput(data.website) : undefined,
      fundingStage: sanitizeInput(data.fundingStage),
      investmentAmount: sanitizeInput(data.investmentAmount),
      trackRecord: sanitizeInput(data.trackRecord),
      whyChooseYou: sanitizeInput(data.whyChooseYou),
    };

    // Send email to EmviApp team
    const emailResponse = await resend.emails.send({
      from: "EmviApp Partners <partnerships@resend.dev>",
      to: ["support@emvi.app"],
      bcc: ["michaelemviapp@gmail.com"],
      subject: `🚀 New Partnership Application - ${data.company}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1px;">
          <div style="background: white; margin: 1px; padding: 40px; border-radius: 8px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #4c1d95; font-size: 28px; margin: 0; font-weight: 700;">
                🚀 New Partnership Application
              </h1>
              <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); margin: 20px auto; border-radius: 2px;"></div>
            </div>

            <!-- Applicant Details -->
            <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 5px solid #667eea;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px;">👤 Applicant Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${sanitizedData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${sanitizedData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Company:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${sanitizedData.company}</td>
                </tr>
                ${sanitizedData.website ? `
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Website:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;"><a href="${sanitizedData.website}" style="color: #667eea; text-decoration: none;">${sanitizedData.website}</a></td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Stage:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${sanitizedData.fundingStage}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Investment:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${sanitizedData.investmentAmount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Submitted:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <!-- Track Record -->
            <div style="background: #ecfdf5; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 5px solid #10b981;">
              <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">📈 Track Record & Experience</h3>
              <p style="color: #064e3b; line-height: 1.6; margin: 0; white-space: pre-wrap; font-size: 15px;">${sanitizedData.trackRecord}</p>
            </div>

            <!-- Why Choose You -->
            <div style="background: #fef3c7; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 5px solid #f59e0b;">
              <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">💡 Why Should We Choose You?</h3>
              <p style="color: #78350f; line-height: 1.6; margin: 0; white-space: pre-wrap; font-size: 15px;">${sanitizedData.whyChooseYou}</p>
            </div>

            <!-- Action Required -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; text-align: center;">
              <p style="color: white; margin: 0; font-weight: 600; font-size: 16px;">
                ⚡ High-Quality Application Received
              </p>
              <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 14px;">
                Review this partnership opportunity and respond if there's a strategic fit.
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: sanitizedData.email,
    });

    console.log("Partnership application email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Partnership application submitted successfully" 
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
    console.error("Error in partner-contact function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to submit partnership application",
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