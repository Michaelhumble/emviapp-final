
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
    const { postType, postDetails, pricingOptions, priceData, idempotencyKey } = await req.json();

    if (!postType || !postDetails || !pricingOptions) {
      throw new Error("Missing required parameters");
    }

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

    // Validate and prepare contact_info structure
    const contactInfo = postDetails.contact_info || postDetails.contactInfo || {};
    if (!contactInfo.owner_name && !contactInfo.phone && !contactInfo.email) {
      // Provide defaults if contact info is missing
      contactInfo.owner_name = postDetails.contactName || postDetails.salonName || "Contact Owner";
      contactInfo.phone = postDetails.contactPhone || postDetails.phone || "";
      contactInfo.email = postDetails.contactEmail || postDetails.email || user.email || "";
    }

    // Calculate final price
    const finalPrice = priceData?.finalPrice || (pricingOptions.selectedPricingTier === 'free' ? 0 : 999);

    // Create Stripe checkout session for paid plans
    if (finalPrice > 0) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${postType.charAt(0).toUpperCase() + postType.slice(1)} Post - ${pricingOptions.selectedPricingTier}`,
                description: `${pricingOptions.durationMonths} month(s) listing`,
              },
              unit_amount: Math.round(finalPrice * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/post-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/post-job`,
        metadata: {
          post_type: postType,
          pricing_tier: pricingOptions.selectedPricingTier,
          duration_months: pricingOptions.durationMonths.toString(),
          user_id: user.id,
          idempotency_key: idempotencyKey || '',
        },
      });

      // Create payment log
      const { error: logError } = await supabaseAdmin
        .from('payment_logs')
        .insert({
          user_id: user.id,
          stripe_payment_id: session.id,
          plan_type: pricingOptions.selectedPricingTier,
          payment_status: 'pending',
          expires_at: new Date(Date.now() + (pricingOptions.durationMonths * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        });

      if (logError) {
        console.error("Error creating payment log:", logError);
      }

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle free posts
    const jobData = {
      title: postDetails.title || `${postDetails.profession?.replace('-', ' ')} Position`,
      description: postDetails.jobDescriptionEnglish || postDetails.description || "",
      location: postDetails.location || "",
      compensation_type: postDetails.compensationType || "negotiable",
      compensation_details: postDetails.compensationDetails || "",
      contact_info: contactInfo,
      status: 'active',
      expires_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(), // 30 days
      pricing_tier: 'free'
    };

    const { data: jobResult, error: jobError } = await supabaseAdmin
      .from('jobs')
      .insert(jobData)
      .select()
      .single();

    if (jobError) {
      console.error("Error creating free job:", jobError);
      throw new Error("Failed to create job posting");
    }

    return new Response(JSON.stringify({ 
      success: true, 
      job_id: jobResult.id,
      redirect_url: `/post-success?job_id=${jobResult.id}&free=true`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in create-checkout:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "Failed to process request" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
