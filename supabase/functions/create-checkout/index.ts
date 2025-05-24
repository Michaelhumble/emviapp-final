
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

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Parse request body
    const requestBody = await req.json();
    const { postType, postDetails, pricingOptions, priceData, idempotencyKey } = requestBody;

    logStep("Post type", postType);
    logStep("Pricing tier", pricingOptions?.selectedPricingTier);
    logStep("Duration months", pricingOptions?.durationMonths);
    logStep("Auto-renew", pricingOptions?.autoRenew ? "Yes" : "No");

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
      logStep("Authentication failed", userError?.message);
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    logStep("User authenticated", { userId: user.id });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if customer exists in Stripe
    let customerId;
    try {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing customer", { customerId });
      }
    } catch (error) {
      logStep("Error checking customer", error.message);
    }

    // Create temporary job record first to get an ID for metadata
    let tempJobId;
    try {
      // Ensure postDetails has required fields with safe defaults
      const safePostDetails = {
        title: postDetails?.title || postDetails?.jobTitle || "Job Posting",
        description: postDetails?.description || postDetails?.jobDescription || "",
        location: postDetails?.location || "",
        employment_type: postDetails?.employment_type || postDetails?.employmentType || "Full-time",
        compensation_type: postDetails?.compensation_type || postDetails?.compensationType || "",
        compensation_details: postDetails?.compensation_details || postDetails?.compensationDetails || "",
        contact_info: postDetails?.contact_info || {},
        status: 'pending_payment',
        pricing_tier: pricingOptions?.selectedPricingTier || 'standard',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        ...postDetails
      };

      const { data: tempJob, error: tempJobError } = await supabaseAdmin
        .from('jobs')
        .insert(safePostDetails)
        .select('id')
        .single();

      if (tempJobError) {
        logStep("Temporary job creation error", tempJobError);
        throw new Error(`Failed to create temporary job: ${tempJobError.message}`);
      }

      tempJobId = tempJob.id;
      logStep("Created temporary job", { tempJobId });
    } catch (error) {
      logStep("Job creation failed", error.message);
      return new Response(JSON.stringify({ 
        error: "Failed to create job posting",
        details: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get correct Stripe price ID based on pricing tier and options
    let stripePriceId;
    const pricingTier = pricingOptions?.selectedPricingTier || 'standard';
    const durationMonths = pricingOptions?.durationMonths || 1;
    const autoRenew = pricingOptions?.autoRenew || false;

    // Map pricing to Stripe price IDs (these should match your actual Stripe dashboard)
    const priceMap = {
      'standard_1': 'price_1QOBxsJBvWVB2d16QqYw1234', // $9.99/month - REPLACE WITH REAL PRICE ID
      'standard_3': 'price_1QOBxsJBvWVB2d16QqYw5678', // $27.99/3 months - REPLACE WITH REAL PRICE ID
      'standard_6': 'price_1QOBxsJBvWVB2d16QqYw9012', // $49.99/6 months - REPLACE WITH REAL PRICE ID
      'premium_1': 'price_1QOBxsJBvWVB2d16QqYw3456', // $19.99/month - REPLACE WITH REAL PRICE ID
      'gold_1': 'price_1QOBxsJBvWVB2d16QqYw7890', // $49.99/month - REPLACE WITH REAL PRICE ID
    };

    if (pricingTier === 'standard') {
      if (durationMonths === 3) stripePriceId = priceMap.standard_3;
      else if (durationMonths === 6) stripePriceId = priceMap.standard_6;
      else stripePriceId = priceMap.standard_1;
    } else if (pricingTier === 'premium') {
      stripePriceId = priceMap.premium_1;
    } else if (pricingTier === 'gold') {
      stripePriceId = priceMap.gold_1;
    }

    if (!stripePriceId) {
      logStep("Invalid pricing configuration", { pricingTier, durationMonths });
      return new Response(JSON.stringify({ error: "Invalid pricing configuration" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Stripe checkout session
    const sessionConfig = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: "payment", // One-time payment, not subscription
      success_url: `${req.headers.get("origin")}/post-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/post-canceled`,
      metadata: {
        post_id: tempJobId,
        post_type: postType,
        pricing_tier: pricingTier,
        duration_months: durationMonths.toString(),
        user_id: user.id,
        idempotency_key: idempotencyKey,
      },
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);
    logStep("Stripe session created", { sessionId: session.id });

    // Create payment log
    try {
      await supabaseAdmin.from('payment_logs').insert({
        user_id: user.id,
        stripe_payment_id: session.id,
        plan_type: pricingTier,
        pricing_tier: pricingTier,
        listing_id: tempJobId,
        payment_status: 'pending',
        auto_renew_enabled: autoRenew,
        expires_at: new Date(Date.now() + durationMonths * 30 * 24 * 60 * 60 * 1000).toISOString(),
      });
      logStep("Payment log created");
    } catch (error) {
      logStep("Payment log creation error", error.message);
      // Continue anyway, this is not critical for checkout
    }

    return new Response(
      JSON.stringify({
        url: session.url,
        sessionId: session.id,
        tempJobId: tempJobId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    logStep("Stripe checkout error", error.message);
    return new Response(JSON.stringify({ 
      error: "Payment processing failed",
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
