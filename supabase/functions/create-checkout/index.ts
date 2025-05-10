
// @ts-nocheck

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
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
    console.log("Create Checkout function started");
    
    // Get authorization header from request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse the request body
    const { postType, postDetails, pricingOptions } = await req.json();
    
    console.log(`Creating checkout for ${postType} post with pricing tier: ${pricingOptions?.selectedPricingTier}`);
    console.log(`Auto-renew: ${pricingOptions?.autoRenew ? 'Yes' : 'No'}`);
    console.log(`Duration months: ${pricingOptions?.durationMonths || 1}`);

    // Create Supabase client with the auth header to get the user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );
    
    // Create Admin Supabase client with service role (for database operations)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
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

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if this is a free post first
    if (pricingOptions?.selectedPricingTier === "free") {
      return new Response(JSON.stringify({ error: "Free posts should be handled by create-free-post function" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Get price based on the selected tier
    const pricing = getPricingInfo(postType, pricingOptions);
    if (!pricing) {
      return new Response(JSON.stringify({ error: "Invalid pricing tier" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    console.log("Calculated price info:", pricing);

    // Check if there's an existing Stripe customer record
    const { data: customers, error: customerError } = await stripe.customers.list({
      email: user.email,
      limit: 1
    });
    
    let customerId;
    if (customers && customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log(`Found existing Stripe customer: ${customerId}`);
    } else {
      // Create a new customer
      const newCustomer = await stripe.customers.create({
        email: user.email,
        name: user.user_metadata?.full_name || "Emvi User",
        metadata: {
          user_id: user.id
        }
      });
      customerId = newCustomer.id;
      console.log(`Created new Stripe customer: ${customerId}`);
    }
    
    // Calculate expiration date
    const durationMonths = pricingOptions?.durationMonths || 1;
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + durationMonths);
    
    // Save post as draft first
    const { data: newPost, error: postError } = await supabaseAdmin
      .from('jobs')
      .insert({
        ...postDetails,
        user_id: user.id,
        status: 'draft',
        post_type: postType,
        pricingTier: pricingOptions?.selectedPricingTier,
        auto_renew: pricingOptions?.autoRenew || false,
        expires_at: expiresAt.toISOString()
      })
      .select('id')
      .single();
      
    if (postError) {
      console.error("Error creating draft post:", postError);
      return new Response(JSON.stringify({ error: "Failed to create draft post" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    console.log(`Created draft post with ID: ${newPost.id}`);
    
    // Set up line items for Stripe
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${postType === 'job' ? 'Job' : 'Salon'} Post - ${pricingOptions.selectedPricingTier.toUpperCase()}`,
            description: `${durationMonths}-month ${postType} posting`,
          },
          unit_amount: Math.round(pricing.finalPrice * 100), // Convert to cents
          ...(pricingOptions?.autoRenew ? { recurring: { interval: "month" } } : {}),
        },
        quantity: 1,
      },
    ];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: pricingOptions?.autoRenew ? "subscription" : "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        post_id: newPost.id,
        post_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        auto_renew: pricingOptions?.autoRenew ? "true" : "false",
        duration_months: durationMonths.toString(),
        expires_at: expiresAt.toISOString()
      },
    });
    
    console.log(`Created Stripe session: ${session.id}`);
    
    // Create payment log entry
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        listing_id: newPost.id,
        stripe_payment_id: session.id,
        plan_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        payment_status: 'pending',
        amount: pricing.finalPrice,
        original_amount: pricing.originalPrice,
        discount_percentage: pricing.discountPercentage,
        expires_at: expiresAt.toISOString(),
        auto_renew_enabled: pricingOptions?.autoRenew || false,
        duration_months: durationMonths
      })
      .select('id')
      .single();

    if (paymentLogError) {
      console.error("Error creating payment log:", paymentLogError);
    } else {
      console.log(`Created payment log with ID: ${paymentLog.id}`);
    }

    // Return the checkout URL for the frontend to redirect to
    return new Response(
      JSON.stringify({ 
        url: session.url,
        session_id: session.id,
        payment_log_id: paymentLog?.id,
        expires_at: expiresAt.toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Checkout creation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Helper function to get pricing info based on selected tier
function getPricingInfo(postType, pricingOptions) {
  const { selectedPricingTier, durationMonths = 1, autoRenew = false } = pricingOptions;
  
  // Define pricing tiers for each post type
  const pricingTiers = {
    job: {
      standard: { price: 9.99 },
      gold: { price: 19.99 },
      premium: { price: 29.99 },
      diamond: { price: 49.99 }
    },
    salon: {
      standard: { price: 19.99 },
      gold: { price: 29.99 },
      premium: { price: 39.99 },
      diamond: { price: 59.99 }
    }
  };
  
  // Get base price from pricing tier
  const tierInfo = pricingTiers[postType]?.[selectedPricingTier];
  if (!tierInfo) {
    console.error(`Invalid pricing tier: ${selectedPricingTier} for ${postType}`);
    return null;
  }
  
  const basePrice = tierInfo.price;
  
  // Calculate original price (without discounts)
  const originalPrice = basePrice * durationMonths;
  
  // Calculate duration discount
  let durationDiscount = 0;
  if (durationMonths === 3) durationDiscount = 10;
  else if (durationMonths === 6) durationDiscount = 15;
  else if (durationMonths >= 12) durationDiscount = 20;
  
  // Apply auto-renew discount (5%)
  const autoRenewDiscount = autoRenew ? 5 : 0;
  
  // Calculate total discount percentage
  const discountPercentage = durationDiscount + autoRenewDiscount;
  
  // Apply discount to get final price
  const finalPrice = originalPrice * (1 - discountPercentage / 100);
  
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discountPercentage,
    priceTier: selectedPricingTier
  };
}
