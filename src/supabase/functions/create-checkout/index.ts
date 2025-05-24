
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("[CREATE-CHECKOUT] Request received");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const requestBody = await req.json();
    console.log("[CREATE-CHECKOUT] Request body:", JSON.stringify(requestBody, null, 2));
    
    const { postType, postDetails, pricingOptions, priceData, idempotencyKey } = requestBody;

    // Validate required fields
    if (!postType || !postDetails || !pricingOptions || !priceData) {
      throw new Error("Missing required fields: postType, postDetails, pricingOptions, or priceData");
    }

    console.log("[CREATE-CHECKOUT] Post type -", JSON.stringify(postType));
    console.log("[CREATE-CHECKOUT] Pricing tier -", JSON.stringify(pricingOptions.selectedPricingTier));
    console.log("[CREATE-CHECKOUT] Duration months -", pricingOptions.durationMonths);
    console.log("[CREATE-CHECKOUT] Auto-renew -", pricingOptions.autoRenew ? "Yes" : "No");

    // Authentication check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

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
      throw new Error("Authentication failed: " + (userError?.message || "No user found"));
    }

    console.log("[CREATE-CHECKOUT] User authenticated -", JSON.stringify({ userId: user.id }));

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Handle free posts
    if (priceData.finalPrice <= 0) {
      console.log("[CREATE-CHECKOUT] Processing free post");
      
      // Prepare job data with safe contact_info handling
      const jobData = {
        title: postDetails.title || `${postDetails.profession?.replace('-', ' ') || 'Job'} Position`,
        description: postDetails.jobDescriptionEnglish || postDetails.description || '',
        compensation_type: postDetails.compensationType || 'hourly',
        compensation_details: postDetails.compensationDetails || '',
        requirements: postDetails.requirements || '',
        contact_info: {
          owner_name: postDetails.contactName || '',
          phone: postDetails.contactPhone || '',
          email: postDetails.contactEmail || user.email
        },
        pricing_tier: pricingOptions.selectedPricingTier || 'free',
        status: 'active',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      // Create job post directly
      const { data: jobPost, error: jobError } = await supabaseAdmin
        .from('jobs')
        .insert(jobData)
        .select()
        .single();

      if (jobError) {
        console.error("[CREATE-CHECKOUT] Free job creation error:", jobError);
        throw new Error("Failed to create free job post: " + jobError.message);
      }

      console.log("[CREATE-CHECKOUT] Free job created successfully:", jobPost.id);

      return new Response(
        JSON.stringify({
          success: true,
          jobId: jobPost.id,
          message: "Free job post created successfully"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // For paid posts, create Stripe checkout session
    console.log("[CREATE-CHECKOUT] Creating Stripe checkout for paid post");

    // Calculate expires_at (30 days from now for most plans)
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // Create temporary job record first
    const tempJobData = {
      title: postDetails.title || `${postDetails.profession?.replace('-', ' ') || 'Job'} Position`,
      description: postDetails.jobDescriptionEnglish || postDetails.description || '',
      compensation_type: postDetails.compensationType || 'hourly',
      compensation_details: postDetails.compensationDetails || '',
      requirements: postDetails.requirements || '',
      contact_info: {
        owner_name: postDetails.contactName || '',
        phone: postDetails.contactPhone || '',
        email: postDetails.contactEmail || user.email
      },
      pricing_tier: pricingOptions.selectedPricingTier,
      status: 'pending_payment',
      expires_at: expiresAt.toISOString()
    };

    console.log("[CREATE-CHECKOUT] Temporary job creation - attempting insert");

    const { data: tempJob, error: tempJobError } = await supabaseAdmin
      .from('jobs')
      .insert(tempJobData)
      .select()
      .single();

    if (tempJobError) {
      console.error("[CREATE-CHECKOUT] Temporary job creation error:", tempJobError);
      throw new Error("Failed to create temporary job: " + tempJobError.message);
    }

    console.log("[CREATE-CHECKOUT] Temporary job created:", tempJob.id);

    // Create Stripe checkout session
    const lineItems = [{
      price_data: {
        currency: "usd",
        product_data: {
          name: `${pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1)} Job Post`,
          description: `Job posting for ${postDetails.profession || 'beauty professional'}`
        },
        unit_amount: Math.round(priceData.finalPrice * 100) // Convert to cents
      },
      quantity: 1,
    }];

    const sessionConfig = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment" as const,
      success_url: `${req.headers.get("origin")}/post-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/post-job`,
      metadata: {
        post_id: tempJob.id,
        user_id: user.id,
        post_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        expires_at: expiresAt.toISOString(),
        idempotency_key: idempotencyKey
      }
    };

    console.log("[CREATE-CHECKOUT] Creating Stripe session with config:", JSON.stringify(sessionConfig, null, 2));

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Log payment in our system
    const { error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: tempJob.id,
        plan_type: pricingOptions.selectedPricingTier,
        payment_status: 'pending',
        stripe_payment_id: session.id,
        expires_at: expiresAt.toISOString(),
        auto_renew_enabled: pricingOptions.autoRenew || false
      });

    if (paymentLogError) {
      console.error("[CREATE-CHECKOUT] Payment log error:", paymentLogError);
      // Don't fail the request for this, just log it
    }

    console.log("[CREATE-CHECKOUT] Stripe session created successfully:", session.id);

    return new Response(
      JSON.stringify({
        url: session.url,
        sessionId: session.id,
        jobId: tempJob.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Stripe checkout error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to create checkout session",
        details: error.stack
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
