
// @ts-nocheck
// ^ This comment disables TypeScript checking for this file since it uses Deno types

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

    // Initialize Supabase clients
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

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
    
    // Find the related payment log
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .select('*')
      .eq('stripe_payment_id', session.id)
      .single();

    if (paymentLogError) {
      console.error("Error fetching payment log:", paymentLogError);
    }

    // If we have a post_id in metadata, update the job status
    if (metadata.post_id) {
      if (metadata.post_type === 'job') {
        const { error: updateJobError } = await supabaseAdmin
          .from('jobs')
          .update({ 
            status: 'active',
            expires_at: metadata.expires_at,
            pricingTier: metadata.pricing_tier || 'standard'
          })
          .eq('id', metadata.post_id);
          
        if (updateJobError) {
          console.error("Error updating job status:", updateJobError);
        }
      } else if (metadata.post_type === 'salon') {
        const { error: updateSalonError } = await supabaseAdmin
          .from('salon_sales')
          .update({ 
            status: 'active',
            expires_at: metadata.expires_at,
            is_featured: metadata.pricing_tier === 'premium' || metadata.pricing_tier === 'diamond'
          })
          .eq('id', metadata.post_id);
          
        if (updateSalonError) {
          console.error("Error updating salon status:", updateSalonError);
        }
      }
    }
    
    // Update payment log status
    if (paymentLog?.id) {
      const { error: updateLogError } = await supabaseAdmin
        .from('payment_logs')
        .update({ payment_status: 'success' })
        .eq('id', paymentLog.id);
        
      if (updateLogError) {
        console.error("Error updating payment log:", updateLogError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        post_id: metadata.post_id || paymentLog?.listing_id,
        expires_at: metadata.expires_at || paymentLog?.expires_at,
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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
