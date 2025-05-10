
// @ts-nocheck

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authorization header from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Supabase client with anonymous key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Create Admin Supabase client with service role
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    // Get the user from the auth header
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unable to get user" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse the request body
    const { postType, postDetails, pricingOptions } = await req.json();
    
    console.log("Post type:", postType);
    console.log("Pricing tier:", pricingOptions?.selectedPricingTier);

    // Get origin for success and cancel URLs
    const origin = req.headers.get("origin") || "https://emviapp-final.lovable.app";
    
    // Get referer for potential fallback
    const referer = req.headers.get("referer") || origin;
    // Extract base URL from referer if available
    const baseUrl = new URL(referer).origin;

    // Handle free tier immediately without creating a Stripe session
    if (pricingOptions?.selectedPricingTier === "free") {
      console.log("Free tier selected, bypassing Stripe");
      
      // Free tier logic should be handled by create-free-post function
      return new Response(
        JSON.stringify({ 
          url: `${baseUrl}/post-success?free=true&post_type=${postType}` 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Get pricing based on tier
    const pricingMap = {
      "standard": 2999, // $29.99
      "premium": 4999,  // $49.99
      "gold": 7999,     // $79.99
      "diamond": 14999, // $149.99
    };

    const priceInCents = pricingMap[pricingOptions?.selectedPricingTier] || 4999;
    
    // Create a temporary job to associate with the payment
    let temporaryJobId;
    try {
      if (postDetails) {
        const { data: jobData, error: jobError } = await supabaseAdmin
          .from('jobs')
          .insert({
            ...postDetails,
            user_id: user.id,
            status: 'pending_payment',
            post_type: postType,
            pricingTier: pricingOptions?.selectedPricingTier
          })
          .select('id')
          .single();
          
        if (jobError) {
          console.error("Temporary job creation error:", jobError);
        } else if (jobData) {
          temporaryJobId = jobData.id;
          console.log("Created temporary job with ID:", temporaryJobId);
        }
      }
    } catch (error) {
      console.error("Error creating temporary job:", error);
    }

    // Calculate expiration date (30 days for standard, longer for other tiers)
    const durationDays = pricingOptions?.durationMonths ? pricingOptions.durationMonths * 30 : 30;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationDays);

    // Create success and cancel URLs with the proper domain
    const successUrl = new URL('/payment-success', baseUrl);
    successUrl.searchParams.append('session_id', '{CHECKOUT_SESSION_ID}');
    
    const cancelUrl = new URL('/post-canceled', baseUrl);

    // Prepare metadata for the Stripe session
    const metadata = {
      user_id: user.id,
      post_type: postType,
      pricing_tier: pricingOptions?.selectedPricingTier,
      expires_at: expiresAt.toISOString(),
      auto_renew: pricingOptions?.autoRenew ? "true" : "false",
      post_id: temporaryJobId || "",
      origin: baseUrl // Store the origin for verification later
    };
    
    console.log("Creating checkout session with metadata:", metadata);

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `EmviApp ${postType === 'salon' ? 'Salon' : 'Job'} Post – ${pricingOptions?.selectedPricingTier?.charAt(0).toUpperCase() + pricingOptions?.selectedPricingTier?.slice(1)}`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      metadata: metadata,
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
    });
    
    console.log("Stripe session created:", session.id, "with URL:", session.url);

    // Save payment log entry
    const { error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: temporaryJobId || null,
        plan_type: postType,
        payment_status: 'pending',
        expires_at: expiresAt.toISOString(),
        stripe_payment_id: session.id,
        auto_renew_enabled: pricingOptions?.autoRenew || false,
        pricing_tier: pricingOptions?.selectedPricingTier || 'standard'
      });

    if (paymentLogError) {
      console.error("Error creating payment log:", paymentLogError);
    }

    // Return the checkout session URL
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
