
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

    // Create the job post in Supabase immediately after payment verification
    const jobData = {
      user_id: user.id, // Always ensure user_id is set
      title: metadata.jobTitle || 'Job Posting',
      pricing_tier: metadata.tier || 'standard',
      status: 'active', // Make sure job is active and visible
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + (parseInt(metadata.durationMonths || '1') * 30 * 24 * 60 * 60 * 1000)).toISOString(),
      // Add job fields from metadata if available
      description: metadata.description || '',
      location: metadata.location || '',
      compensation_details: metadata.compensation_details || '',
      contact_info: metadata.contact_info ? JSON.parse(metadata.contact_info) : {}
    };

    console.log('💳 Creating paid job post after payment verification:', jobData);

    const { data: newJob, error: jobError } = await supabaseAdmin
      .from('jobs')
      .insert(jobData)
      .select()
      .single();

    if (jobError) {
      console.error("❌ Error creating job post:", jobError);
      return new Response(JSON.stringify({ error: "Failed to create job post" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log('✅ Paid job created successfully:', newJob.id);
    
    // Update payment log if it exists
    const { data: paymentLog } = await supabaseAdmin
      .from('payment_logs')
      .select('*')
      .eq('stripe_payment_id', session.id)
      .single();

    if (paymentLog?.id) {
      const { error: updateLogError } = await supabaseAdmin
        .from('payment_logs')
        .update({ 
          payment_status: 'success',
          listing_id: newJob.id
        })
        .eq('id', paymentLog.id);
        
      if (updateLogError) {
        console.error("⚠️ Error updating payment log:", updateLogError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        post_id: newJob.id,
        jobTitle: newJob.title,
        expires_at: newJob.expires_at,
        pricing_tier: newJob.pricing_tier,
        payment_log_id: paymentLog?.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error verifying checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
