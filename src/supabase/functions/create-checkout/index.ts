
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Log steps for better debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    // Get auth header for user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get Stripe API key
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      return new Response(JSON.stringify({ error: 'Stripe key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create Supabase clients
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: { headers: { Authorization: authHeader } }
      }
    );
    
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Authenticate user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    logStep("User authenticated", { userId: user.id });

    // Parse the request
    const { postType, postDetails, pricingOptions, priceData, idempotencyKey } = await req.json();
    
    if (!postType || !pricingOptions || !priceData) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    logStep("Request validated", { postType, pricingTier: pricingOptions.selectedPricingTier });

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-08-16",
    });

    // Check if a Stripe customer record exists for this user
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing Stripe customer", { customerId });
    } else {
      // Create a new customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id
        }
      });
      customerId = customer.id;
      logStep("Created new Stripe customer", { customerId });
    }

    // Generate expiration date based on the selected duration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (pricingOptions.durationMonths * 30)); // Approximate 30 days per month
    const expiresAtISO = expiresAt.toISOString();

    // Determine if this should be a subscription
    const isSubscription = !!pricingOptions.autoRenew;
    logStep("Payment details", { 
      isSubscription, 
      durationMonths: pricingOptions.durationMonths,
      finalPrice: priceData.finalPrice,
      expiresAt: expiresAtISO
    });

    // Prepare line items
    let productName = `${pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1)} Job Post`;
    if (postType === 'salon') {
      productName = `${pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1)} Salon Listing`;
    }

    // Create payment log entry to track the attempt
    const { data: paymentLog, error: paymentError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        amount: priceData.finalPrice,
        currency: 'usd',
        plan_type: postType,
        plan_duration: pricingOptions.durationMonths,
        payment_status: 'pending',
        payment_method: 'stripe',
        idempotency_key: idempotencyKey,
        pricing_tier: pricingOptions.selectedPricingTier,
        expires_at: expiresAtISO,
        is_subscription: isSubscription,
        auto_renew_enabled: isSubscription,
        metadata: {
          post_details: postDetails,
          pricing_options: pricingOptions
        }
      })
      .select()
      .single();
    
    if (paymentError) {
      logStep("Error creating payment log", { error: paymentError.message });
      return new Response(JSON.stringify({ error: 'Failed to create payment record' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    logStep("Created payment log", { paymentLogId: paymentLog.id });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: `${pricingOptions.durationMonths}-month ${productName}`,
              metadata: {
                post_type: postType,
                pricing_tier: pricingOptions.selectedPricingTier
              }
            },
            unit_amount: Math.round(priceData.finalPrice * 100), // Convert to cents
            recurring: isSubscription ? {
              interval: 'month',
              interval_count: pricingOptions.durationMonths
            } : undefined
          },
          quantity: 1
        }
      ],
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: `${req.headers.get('origin')}/post-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/post-canceled?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        user_id: user.id,
        post_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        payment_log_id: paymentLog.id,
        expires_at: expiresAtISO,
        duration_months: pricingOptions.durationMonths.toString(),
        is_subscription: isSubscription.toString()
      }
    });

    logStep("Created Stripe session", { sessionId: session.id, url: session.url });

    // Update payment log with Stripe session ID
    await supabaseAdmin
      .from('payment_logs')
      .update({ 
        stripe_payment_id: session.id,
        stripe_customer_id: customerId
      })
      .eq('id', paymentLog.id);

    logStep("Updated payment log with Stripe session ID");

    return new Response(
      JSON.stringify({ 
        url: session.url,
        session_id: session.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
