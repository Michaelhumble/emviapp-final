
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

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
      apiVersion: "2023-08-16",
    });

    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get metadata from the session
    const metadata = session.metadata || {};
    
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
    
    // Find the related payment log using the payment_log_id from metadata
    const paymentLogId = metadata.payment_log_id;
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .select('*, jobs:listing_id(*)')
      .eq('id', paymentLogId)
      .single();
    
    if (paymentLogError) {
      console.error("Error fetching payment log:", paymentLogError);
      return new Response(JSON.stringify({ error: "Failed to find payment record" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get post ID from metadata or payment log
    const postId = metadata.post_id || paymentLog?.listing_id;
    
    // If we have a post_id, update the job status to active
    if (postId) {
      const { error: updateJobError } = await supabaseAdmin
        .from('jobs')
        .update({ 
          status: 'active',
          expires_at: metadata.expires_at || paymentLog?.expires_at
        })
        .eq('id', postId);
        
      if (updateJobError) {
        console.error("Error updating job status:", updateJobError);
        return new Response(JSON.stringify({ error: "Failed to update post status" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    
    // Update payment log status
    const { error: updateLogError } = await supabaseAdmin
      .from('payment_logs')
      .update({ payment_status: 'success' })
      .eq('id', paymentLog.id);
      
    if (updateLogError) {
      console.error("Error updating payment log:", updateLogError);
    }
    
    // Get job title if available
    let jobTitle = "your job";
    if (paymentLog?.jobs) {
      jobTitle = paymentLog.jobs.title || "your job";
    }

    return new Response(
      JSON.stringify({
        success: true,
        post_id: postId,
        title: jobTitle,
        expires_at: metadata.expires_at || paymentLog?.expires_at,
        post_type: metadata.post_type || paymentLog?.plan_type,
        pricing_tier: metadata.pricing_tier || paymentLog?.pricing_tier,
        payment_log_id: paymentLog?.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error verifying checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
