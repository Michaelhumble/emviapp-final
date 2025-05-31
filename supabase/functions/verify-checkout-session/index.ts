
// @ts-nocheck
// ^ This comment disables TypeScript checking for this file since it uses Deno types
// that aren't available in the browser/Node.js environment

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to wait for webhook processing with timeout
const waitForWebhookProcessing = async (supabaseAdmin: any, sessionId: string, maxWaitMs = 30000) => {
  const startTime = Date.now();
  const pollInterval = 1000; // Poll every 1 second
  
  while (Date.now() - startTime < maxWaitMs) {
    // Check if payment log exists (created by webhook)
    const { data: paymentLog, error } = await supabaseAdmin
      .from('payment_logs')
      .select('*')
      .eq('stripe_payment_id', sessionId)
      .single();

    if (paymentLog) {
      console.log('Payment log found, webhook processing complete:', paymentLog.id);
      return paymentLog;
    }

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error checking payment log:', error);
    }

    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }
  
  return null;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { sessionId } = await req.json();

    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Extract token from Auth header
    const token = authHeader.replace("Bearer ", "");

    // Initialize Supabase client with service role for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    // Initialize Supabase client with user token for user-based operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if payment is complete
    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ 
        error: "Payment not completed", 
        status: session.payment_status 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log('Payment confirmed, waiting for webhook processing...');

    // Wait for webhook to process and create payment log
    const paymentLog = await waitForWebhookProcessing(supabaseAdmin, session.id);
    
    if (!paymentLog) {
      console.error('Webhook processing timeout for session:', session.id);
      
      // Log the timeout for admin review
      await supabaseAdmin
        .from('listing_validation_logs')
        .insert({
          listing_id: session.id,
          listing_type: 'stripe_verification_timeout',
          user_id: user.id,
          error_reason: 'Webhook processing timed out after 30 seconds',
          ip_address: req.headers.get('x-forwarded-for') || 'unknown'
        });

      return new Response(JSON.stringify({ 
        error: "Payment processing delayed", 
        message: "Your payment was successful, but listing creation is still in progress. Please check back in a few minutes or contact support if the issue persists.",
        session_id: session.id
      }), {
        status: 202, // Accepted but still processing
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get metadata from the session for backward compatibility
    const metadata = session.metadata || {};
    
    // Now that we know webhook processing is complete, verify the listing exists
    let listingExists = false;
    let listingType = paymentLog.plan_type;
    
    if (listingType === 'job_posting' && paymentLog.listing_id) {
      const { data: job } = await supabaseAdmin
        .from('jobs')
        .select('id, status')
        .eq('id', paymentLog.listing_id)
        .single();
      
      listingExists = !!job;
      
      // Only update if job exists and needs status update
      if (job && job.status !== 'active') {
        const { error: updateJobError } = await supabaseAdmin
          .from('jobs')
          .update({ 
            status: 'active',
            expires_at: paymentLog.expires_at
          })
          .eq('id', paymentLog.listing_id);
          
        if (updateJobError) {
          console.error("Error updating job status:", updateJobError);
        } else {
          console.log('Job status updated to active:', paymentLog.listing_id);
        }
      }
    } else if (listingType === 'salon_listing' && paymentLog.listing_id) {
      const { data: salon } = await supabaseAdmin
        .from('salon_listings')
        .select('id, status')
        .eq('id', paymentLog.listing_id)
        .single();
      
      listingExists = !!salon;
      
      // Only update if salon exists and needs status update
      if (salon && salon.status !== 'active') {
        const { error: updateSalonError } = await supabaseAdmin
          .from('salon_listings')
          .update({ 
            status: 'active',
            expires_at: paymentLog.expires_at
          })
          .eq('id', paymentLog.listing_id);
          
        if (updateSalonError) {
          console.error("Error updating salon status:", updateSalonError);
        } else {
          console.log('Salon status updated to active:', paymentLog.listing_id);
        }
      }
    }
    
    // Update payment log status to success if not already
    if (paymentLog.payment_status !== 'success') {
      const { error: updateLogError } = await supabaseAdmin
        .from('payment_logs')
        .update({ payment_status: 'success' })
        .eq('id', paymentLog.id);
        
      if (updateLogError) {
        console.error("Error updating payment log:", updateLogError);
      }
    }

    // Log successful verification
    console.log('Payment verification completed successfully:', {
      session_id: session.id,
      listing_id: paymentLog.listing_id,
      listing_type: listingType,
      listing_exists: listingExists
    });

    return new Response(
      JSON.stringify({
        success: true,
        post_id: paymentLog.listing_id,
        expires_at: paymentLog.expires_at,
        post_type: listingType,
        pricing_tier: metadata.pricing_tier || paymentLog.pricing_tier,
        payment_log_id: paymentLog.id,
        listing_active: listingExists
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error verifying checkout session:", error);
    
    // Log the error for admin review
    try {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") || "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
        { auth: { persistSession: false } }
      );
      
      await supabaseAdmin
        .from('listing_validation_logs')
        .insert({
          listing_id: 'unknown',
          listing_type: 'stripe_verification_error',
          error_reason: error.message,
          ip_address: req.headers.get('x-forwarded-for') || 'unknown'
        });
    } catch (logError) {
      console.error("Failed to log verification error:", logError);
    }
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
