import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("🔍 [VERIFY-PAYMENT] Starting payment verification");
    
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("No session ID provided");
    }

    console.log("🔍 [VERIFY-PAYMENT] Verifying session:", sessionId);

    // Get Stripe secret key
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent']
    });

    console.log("💳 [VERIFY-PAYMENT] Session retrieved:", {
      id: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      metadata: session.metadata
    });

    // Create Supabase client to check if job exists and is active
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // If this is a job posting, verify the job was activated
    const jobId = session.metadata?.job_id;
    if (jobId) {
      console.log("🔍 [VERIFY-PAYMENT] Checking if job is active:", jobId);
      
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .eq('status', 'active')
        .single();

      if (jobError || !jobData) {
        console.error("❌ [VERIFY-PAYMENT] Job not found or not active:", jobError);
        // Job might not be activated yet, but payment was successful
        console.log("⚠️ [VERIFY-PAYMENT] Payment successful but job activation pending");
      } else {
        console.log("✅ [VERIFY-PAYMENT] Job is active and visible:", jobData.title);
      }
    }

    // Return payment verification data
    const verificationData = {
      session_id: session.id,
      payment_intent: session.payment_intent?.id || session.payment_intent,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      customer_email: session.customer_details?.email || session.customer_email,
      payment_method_types: session.payment_method_types,
      metadata: {
        ...session.metadata,
        plan_type: session.metadata?.job_id ? 'job' : 'unknown',
        listing_id: session.metadata?.job_id
      }
    };

    console.log("✅ [VERIFY-PAYMENT] Verification complete:", verificationData);

    return new Response(
      JSON.stringify(verificationData),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("❌ [VERIFY-PAYMENT] Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});