
// @ts-nocheck
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
    const { postType, postDetails, pricingOptions } = await req.json();
    
    // Get authentication header for user identification
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");

    // Initialize Supabase client for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );

    // Get authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle free tier directly without going to Stripe
    if (pricingOptions?.selectedPricingTier === 'free') {
      // Create the service role client for database operations
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") || "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
        { auth: { persistSession: false } }
      );
      
      // Calculate expiration date (30 days for free tier)
      const expires_at = new Date();
      expires_at.setDate(expires_at.getDate() + 30);
      
      // Create the job post
      const { data: jobData, error: jobError } = await supabaseAdmin
        .from('jobs')
        .insert({
          ...postDetails,
          user_id: user.id,
          status: 'active',
          pricingTier: 'free',
          expires_at: expires_at.toISOString(),
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
        
      if (jobError) {
        console.error("Job creation error:", jobError);
        return new Response(JSON.stringify({ error: "Failed to create free job post" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      // Create payment log entry for the free post
      await supabaseAdmin
        .from('payment_logs')
        .insert({
          user_id: user.id,
          listing_id: jobData.id,
          plan_type: postType,
          payment_status: 'success',
          pricing_tier: 'free',
          expires_at: expires_at.toISOString()
        });
        
      return new Response(JSON.stringify({ 
        success: true, 
        post_id: jobData.id,
        expires_at: expires_at.toISOString()
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Stripe with secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Define line items based on pricing tier
    const priceMap = {
      'starter': 1000, // $10.00
      'standard': 3000, // $30.00
      'premium': 5000, // $50.00
      'gold': 7000,    // $70.00
      'diamond': 9900  // $99.00
    };

    // Get price based on selected tier, default to standard
    const selectedTier = pricingOptions?.selectedPricingTier || 'standard';
    const basePrice = priceMap[selectedTier] || priceMap.standard;
    
    // Apply duration multiplier (if applicable)
    const durationMonths = pricingOptions?.durationMonths || 1;
    
    // Calculate discount (5% for auto-renew)
    let finalPrice = basePrice * durationMonths;
    if (pricingOptions?.autoRenew) {
      finalPrice = Math.round(finalPrice * 0.95); // 5% discount
    }
    
    // Format product name based on tier
    const tierDisplay = selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1);
    
    // Create a temporary post record to get the ID
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    // Calculate expiration date based on duration
    const expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + (30 * durationMonths));

    // Create temporary job record with pending status
    const { data: jobData, error: jobError } = await supabaseAdmin
      .from('jobs')
      .insert({
        ...postDetails,
        user_id: user.id,
        status: 'pending',
        pricingTier: selectedTier,
        expires_at: expires_at.toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
      
    if (jobError) {
      console.error("Temporary job creation error:", jobError);
      return new Response(JSON.stringify({ error: "Failed to create temporary job record" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create metadata for the session
    const metadata = {
      user_id: user.id,
      post_id: jobData.id,
      post_type: postType,
      pricing_tier: selectedTier,
      auto_renew: pricingOptions?.autoRenew ? "true" : "false",
      expires_at: expires_at.toISOString()
    };

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `EmviApp ${tierDisplay} ${postType.charAt(0).toUpperCase() + postType.slice(1)} Post`,
              description: `${durationMonths}-month ${tierDisplay} tier posting${pricingOptions?.autoRenew ? " (auto-renew)" : ""}`,
            },
            unit_amount: finalPrice,
          },
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/post/${postType}`,
    });

    // Create payment log entry
    await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: jobData.id,
        stripe_payment_id: session.id,
        plan_type: postType,
        payment_status: 'pending',
        pricing_tier: selectedTier,
        auto_renew_enabled: pricingOptions?.autoRenew || false,
        expires_at: expires_at.toISOString()
      });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
