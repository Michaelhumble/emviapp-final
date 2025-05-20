
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
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
    // Parse request body
    const {
      postType,
      postDetails,
      pricingOptions,
      priceData,
      idempotencyKey
    } = await req.json();
    
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

    // Initialize Supabase client with user token
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: {
          headers: { Authorization: `Bearer ${token}` },
        },
      }
    );

    // Initialize Supabase admin client for service operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
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
      apiVersion: "2023-08-16",
    });
    
    // Special handling for Diamond tier - always 12 months, never auto-renew
    if (pricingOptions.selectedPricingTier === 'diamond') {
      pricingOptions.durationMonths = 12;
      pricingOptions.autoRenew = false;
    }

    // Check if the user already has a Stripe customer ID
    let customerId;
    
    // Try to find existing customer
    const { data: userProfiles, error: profileError } = await supabaseAdmin
      .from('users')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();
      
    if (!profileError && userProfiles?.stripe_customer_id) {
      customerId = userProfiles.stripe_customer_id;
    } else {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      
      customerId = customer.id;
      
      // Save the customer ID to the user profile
      await supabaseAdmin
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id);
    }
    
    // Calculate expires_at date based on duration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (pricingOptions.durationMonths * 30)); // Approximate 30 days per month
    
    // Create a payment log entry to track this payment attempt
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        plan_type: postType,
        payment_status: 'pending',
        auto_renew_enabled: pricingOptions.autoRenew || false,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();
      
    if (paymentLogError) {
      return new Response(JSON.stringify({ error: "Failed to create payment log" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create a pending job entry if this is a job post
    let listingId;
    if (postType === 'job') {
      const { data: jobData, error: jobError } = await supabaseAdmin
        .from('jobs')
        .insert({
          ...postDetails,
          user_id: user.id,
          status: 'pending', // Will be updated to active after payment
          pricing_tier: pricingOptions.selectedPricingTier,
          expires_at: expiresAt.toISOString()
        })
        .select('id')
        .single();
        
      if (jobError) {
        return new Response(JSON.stringify({ error: "Failed to create job entry" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      listingId = jobData.id;
      
      // Update the payment log with the listing ID
      await supabaseAdmin
        .from('payment_logs')
        .update({ listing_id: listingId })
        .eq('id', paymentLog.id);
    } else {
      // Handle other listing types if needed
    }
    
    // Determine the mode (payment or subscription)
    const isSubscription = pricingOptions.autoRenew && pricingOptions.selectedPricingTier !== 'free';
    const mode = isSubscription ? 'subscription' : 'payment';
    
    // Determine the pricing tier description
    let tierDescription = pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1);
    
    // Set up line items
    const lineItems = [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${tierDescription} ${postType.charAt(0).toUpperCase() + postType.slice(1)} Listing`,
          description: `${pricingOptions.durationMonths} month${pricingOptions.durationMonths > 1 ? 's' : ''} listing${pricingOptions.isNationwide ? ' with nationwide visibility' : ''}`,
        },
        unit_amount: Math.round(priceData.finalPrice * 100), // Convert dollars to cents
      },
      quantity: 1,
    }];
    
    // Build metadata for the session
    const metadata = {
      user_id: user.id,
      post_type: postType,
      post_id: listingId,
      pricing_tier: pricingOptions.selectedPricingTier,
      duration_months: pricingOptions.durationMonths.toString(),
      auto_renew: pricingOptions.autoRenew ? 'true' : 'false',
      is_nationwide: pricingOptions.isNationwide ? 'true' : 'false',
      payment_log_id: paymentLog.id,
      expires_at: expiresAt.toISOString(),
      idempotency_key: idempotencyKey,
    };

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: mode,
      metadata: metadata,
      success_url: `${req.headers.get("origin")}/post-success?session_id={CHECKOUT_SESSION_ID}&payment_log_id=${paymentLog.id}`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled?payment_log_id=${paymentLog.id}`,
    });
    
    // Update the payment log with the Stripe session ID
    await supabaseAdmin
      .from('payment_logs')
      .update({ stripe_payment_id: session.id })
      .eq('id', paymentLog.id);

    // Return the session URL for client-side redirect
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
