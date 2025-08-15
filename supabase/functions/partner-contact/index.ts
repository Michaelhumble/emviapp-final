import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://www.emvi.app",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Rate limiting (in-memory, basic)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Partner contact validation schema
const partnerContactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255),
  company: z.string().min(2).max(200).trim(),
  website: z.string().url().max(500),
  fundingStage: z.string().max(100).optional(),
  investmentAmount: z.string().max(100).optional(),
  trackRecord: z.string().max(2000).trim().optional(),
  whyChooseYou: z.string().max(2000).trim().optional(),
  website2: z.string().max(1).optional(), // Honeypot field
});

// Sanitize input to prevent CRLF injection
const sanitizeInput = (input: string): string => {
  return input.replace(/[\r\n]/g, '').trim();
};

// Check rate limiting
const checkRateLimit = (clientIP: string): boolean => {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;
  
  const current = rateLimitMap.get(clientIP);
  if (!current || now > current.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check request size (5KB limit)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 5 * 1024) {
      return new Response(
        JSON.stringify({ error: "Request too large" }),
        {
          status: 413,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Rate limiting
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Too many requests" }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const rawData = await req.json();
    
    // Honeypot check
    if (rawData.website2 && rawData.website2.trim() !== "") {
      console.warn("Honeypot triggered from IP:", clientIP);
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate and sanitize data
    const validatedData = partnerContactSchema.parse({
      ...rawData,
      name: sanitizeInput(rawData.name || ""),
      company: sanitizeInput(rawData.company || ""),
      trackRecord: rawData.trackRecord ? sanitizeInput(rawData.trackRecord) : undefined,
      whyChooseYou: rawData.whyChooseYou ? sanitizeInput(rawData.whyChooseYou) : undefined,
    });

    // Send email to support@emvi.app with BCC to founder
    const emailResponse = await resend.emails.send({
      from: "EmviApp Partners <partnerships@resend.dev>",
      to: ["support@emvi.app"],
      bcc: ["michaelemviapp@gmail.com"],
      subject: `Partnership Inquiry from ${validatedData.company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            New Partnership Inquiry
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
            <p><strong>Contact Person:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Company:</strong> ${validatedData.company}</p>
            <p><strong>Website:</strong> <a href="${validatedData.website}" target="_blank">${validatedData.website}</a></p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          ${validatedData.fundingStage ? `
            <div style="margin-top: 15px;">
              <h4 style="color: #374151; margin-bottom: 5px;">Funding Stage:</h4>
              <p style="margin: 0;">${validatedData.fundingStage}</p>
            </div>
          ` : ''}
          
          ${validatedData.investmentAmount ? `
            <div style="margin-top: 15px;">
              <h4 style="color: #374151; margin-bottom: 5px;">Investment Amount:</h4>
              <p style="margin: 0;">${validatedData.investmentAmount}</p>
            </div>
          ` : ''}
          
          ${validatedData.trackRecord ? `
            <div style="margin-top: 15px;">
              <h4 style="color: #374151; margin-bottom: 5px;">Track Record:</h4>
              <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${validatedData.trackRecord}</p>
            </div>
          ` : ''}
          
          ${validatedData.whyChooseYou ? `
            <div style="margin-top: 15px;">
              <h4 style="color: #374151; margin-bottom: 5px;">Why Choose You:</h4>
              <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${validatedData.whyChooseYou}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action Required:</strong> Please respond to this partnership inquiry at your earliest convenience.
            </p>
          </div>
        </div>
      `,
      replyTo: validatedData.email, // Allow direct reply to the partner
    });

    // Log success with masked message ID
    const maskedId = emailResponse.data?.id ? `${emailResponse.data.id.slice(0, 8)}...` : 'unknown';
    console.log("Partnership email sent successfully. Message ID:", maskedId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Partnership inquiry submitted successfully",
        messageId: maskedId
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
    
    // Handle validation errors
    if (error.name === 'ZodError') {
      return new Response(
        JSON.stringify({ 
          error: "Validation failed",
          details: error.errors 
        }),
        {
          status: 422,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to submit partnership inquiry"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);