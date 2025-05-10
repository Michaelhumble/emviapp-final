
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";

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
    console.log("Starting verify-checkout-session function");
    // Parse request body
    const { sessionId } = await req.json();
    console.log("Session ID received:", sessionId);

    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(JSON.stringify({ error: "Unauthorized", success: false }), {
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
      console.error("Authentication failed:", userError);
      return new Response(JSON.stringify({ error: "Authentication failed", success: false }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    console.log("Authenticated user:", user.id);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve the session
    console.log("Retrieving Stripe session");
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      console.error("Invalid session");
      return new Response(JSON.stringify({ error: "Invalid session", success: false }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    console.log("Stripe session retrieved, payment status:", session.payment_status);

    // Get metadata from the session
    const metadata = session.metadata || {};
    console.log("Session metadata:", metadata);
    
    // Check if payment is complete
    if (session.payment_status !== "paid") {
      console.error("Payment not completed:", session.payment_status);
      return new Response(JSON.stringify({ 
        error: "Payment not completed", 
        status: session.payment_status,
        success: false
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Find the related payment log
    console.log("Looking up payment log for session:", sessionId);
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .select('*')
      .eq('stripe_payment_id', session.id)
      .single();

    if (paymentLogError) {
      console.error("Error fetching payment log:", paymentLogError);
    } else {
      console.log("Found payment log:", paymentLog?.id);
    }

    // Calculate expiration date (default 30 days if not specified)
    const expiresAt = metadata.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    console.log("Calculated expiration date:", expiresAt);

    // If we have a post_id in metadata, update the job status
    if (metadata.post_id) {
      console.log("Updating job with ID:", metadata.post_id);
      const { error: updateJobError } = await supabaseAdmin
        .from('jobs')
        .update({ 
          status: 'active',
          expires_at: expiresAt,
          paid_at: new Date().toISOString(),
          pricingTier: metadata.pricing_tier || 'standard'
        })
        .eq('id', metadata.post_id);
        
      if (updateJobError) {
        console.error("Error updating job status:", updateJobError);
        return new Response(JSON.stringify({ 
          error: "Failed to update job status", 
          details: updateJobError.message,
          success: false
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.log("Job status updated successfully to 'active'");
    } else {
      console.log("No post_id found in metadata, nothing to update");
    }
    
    // Update payment log status
    if (paymentLog?.id) {
      console.log("Updating payment log status for ID:", paymentLog.id);
      const { error: updateLogError } = await supabaseAdmin
        .from('payment_logs')
        .update({ payment_status: 'success' })
        .eq('id', paymentLog.id);
        
      if (updateLogError) {
        console.error("Error updating payment log:", updateLogError);
      } else {
        console.log("Payment log updated successfully");
      }
    }

    console.log("Verification complete, returning success");
    return new Response(
      JSON.stringify({
        success: true,
        post_id: metadata.post_id || paymentLog?.listing_id,
        expires_at: expiresAt,
        post_type: metadata.post_type || paymentLog?.plan_type,
        pricing_tier: metadata.pricing_tier,
        payment_log_id: paymentLog?.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error verifying checkout session:", error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
