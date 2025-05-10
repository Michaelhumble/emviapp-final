
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
    console.log("Duration months:", pricingOptions?.durationMonths);
    console.log("Auto-renew:", pricingOptions?.autoRenew ? "Yes" : "No");

    // Get origin for success and cancel URLs
    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Handle free tier immediately without creating a Stripe session
    if (pricingOptions?.selectedPricingTier === "free") {
      console.log("Free tier selected, bypassing Stripe");
      
      try {
        // Calculate expiration date (30 days for free tier)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // 30 days for free tier
        
        // Create the post directly in the database
        const { data: postData, error: postError } = await supabaseAdmin
          .from('jobs')
          .insert({
            ...postDetails,
            user_id: user.id,
            status: 'active',
            post_type: postType,
            pricing_tier: 'free',
            expires_at: expiresAt.toISOString()
          })
          .select('id')
          .single();
          
        if (postError) {
          console.error("Free post creation error:", postError);
          throw new Error(`Failed to create free post: ${postError.message}`);
        }

        // Create payment log entry for the free post
        const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
          .from('payment_logs')
          .insert({
            user_id: user.id,
            listing_id: postData.id,
            plan_type: postType,
            payment_status: 'free',
            expires_at: expiresAt.toISOString(),
            auto_renew_enabled: false,
            pricing_tier: 'free'
          })
          .select('id')
          .single();

        if (paymentLogError) {
          console.error("Error creating payment log for free post:", paymentLogError);
        }
        
        // Return success with post data and redirect to success page
        return new Response(
          JSON.stringify({ 
            success: true, 
            post_id: postData.id,
            payment_log_id: paymentLog?.id,
            expires_at: expiresAt.toISOString(),
            url: `${origin}/post-success?post_id=${postData.id}&free=true` 
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (error) {
        console.error("Free post processing error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

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
            pricing_tier: pricingOptions?.selectedPricingTier
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

    // Calculate expiration date based on duration
    const durationDays = pricingOptions?.durationMonths ? pricingOptions.durationMonths * 30 : 30;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + durationDays);
    
    // Define our price map
    const priceMap = {
      free: null,
      standard: "price_XXX_STANDARD_999",
      standardAutoRenew: "price_XXX_STANDARD_AUTO_949",
      gold: "price_XXX_GOLD_1999",
      premium: "price_XXX_PREMIUM_4999",
      diamond3mo: "price_XXX_DIAMOND_3MO_49999",
      diamond6mo: "price_XXX_DIAMOND_6MO_79999",
      diamond1yr: "price_XXX_DIAMOND_1YR_99999"
    };
    
    // Get price ID based on tier, duration and auto-renew
    let priceId;
    let mode = "payment";
    const pricingTier = pricingOptions?.selectedPricingTier;
    const autoRenew = pricingOptions?.autoRenew || false;
    const durationMonths = pricingOptions?.durationMonths || 1;
    
    if (pricingTier === "standard" && autoRenew) {
      priceId = priceMap.standardAutoRenew;
      mode = "subscription";
    } else if (pricingTier === "diamond") {
      if (durationMonths === 3) {
        priceId = priceMap.diamond3mo;
      } else if (durationMonths === 6) {
        priceId = priceMap.diamond6mo;
      } else {
        priceId = priceMap.diamond1yr;
      }
    } else if (pricingTier === "gold") {
      priceId = priceMap.gold;
    } else if (pricingTier === "premium") {
      priceId = priceMap.premium;
    } else {
      priceId = priceMap.standard;
    }
    
    // Calculate display price for logging
    let displayPrice;
    if (pricingTier === "standard") {
      displayPrice = autoRenew ? "$9.49" : "$9.99";
    } else if (pricingTier === "gold") {
      displayPrice = "$19.99";
    } else if (pricingTier === "premium") {
      displayPrice = "$49.99";
    } else if (pricingTier === "diamond") {
      if (durationMonths === 3) {
        displayPrice = "$499.99";
      } else if (durationMonths === 6) {
        displayPrice = "$799.99";
      } else {
        displayPrice = "$999.99";
      }
    }
    
    console.log("Using price ID:", priceId);
    console.log("Display price:", displayPrice);
    console.log("Payment mode:", mode);

    // Prepare metadata for the Stripe session
    const metadata = {
      user_id: user.id,
      post_type: postType,
      pricing_tier: pricingOptions?.selectedPricingTier,
      expires_at: expiresAt.toISOString(),
      auto_renew: pricingOptions?.autoRenew ? "true" : "false",
      post_id: temporaryJobId || "",
      duration_months: pricingOptions?.durationMonths?.toString() || "1"
    };
    
    console.log("Creating checkout session with metadata:", metadata);

    // Create a Stripe checkout session
    const sessionConfig = {
      payment_method_types: ["card"],
      mode: mode,
      metadata: metadata,
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/post-canceled`,
    };
    
    // Add line items based on mode
    if (mode === "subscription") {
      // Subscription mode - use price ID directly
      sessionConfig.line_items = [
        {
          price: priceId,
          quantity: 1,
        },
      ];
    } else {
      // One-time payment - create price data
      // The priceId serves only as a reference but we define unit_amount ourselves
      let unitAmount;
      
      if (pricingTier === "standard") {
        unitAmount = 999;
      } else if (pricingTier === "gold") {
        unitAmount = 1999;
      } else if (pricingTier === "premium") {
        unitAmount = 4999;
      } else if (pricingTier === "diamond") {
        if (durationMonths === 3) {
          unitAmount = 49999;
        } else if (durationMonths === 6) {
          unitAmount = 79999;
        } else {
          unitAmount = 99999; // 1 year
        }
      }
      
      sessionConfig.line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `EmviApp ${postType === 'salon' ? 'Salon' : 'Job'} Post – ${pricingTier.charAt(0).toUpperCase() + pricingTier.slice(1)}${
                pricingTier === 'diamond' ? ` (${durationMonths} month${durationMonths === 1 ? '' : 's'})` : ''
              }`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ];
    }
    
    const session = await stripe.checkout.sessions.create(sessionConfig);
    
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
        pricing_tier: pricingOptions?.selectedPricingTier
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
