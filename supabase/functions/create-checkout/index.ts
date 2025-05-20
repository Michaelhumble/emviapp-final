
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Log steps for debugging
    const logStep = (step: string, data?: any) => {
      console.log(`[CREATE-CHECKOUT] ${step}`, data ? JSON.stringify(data) : '');
    };

    logStep('Function started');

    // Get auth header for user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
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

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-08-16",
    });

    // Authenticate user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      logStep('Authentication failed', userError);
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    logStep('User authenticated', { userId: user.id });

    // Parse the request
    const { postType, postDetails, pricingOptions, priceData, idempotencyKey } = await req.json();
    
    if (!postType || !postDetails || !pricingOptions || !priceData) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    logStep('Request parsed', { postType, pricingOptions });

    // Check for existing payment with same idempotency key
    if (idempotencyKey) {
      const { data: existingPayment } = await supabaseAdmin
        .from('payment_logs')
        .select('id, stripe_payment_id')
        .eq('idempotency_key', idempotencyKey)
        .maybeSingle();

      if (existingPayment?.stripe_payment_id) {
        logStep('Found existing payment with this idempotency key', existingPayment);
        
        // Get the existing checkout session
        try {
          const session = await stripe.checkout.sessions.retrieve(existingPayment.stripe_payment_id);
          if (session && session.url) {
            return new Response(JSON.stringify({ url: session.url }), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
        } catch (error) {
          // Continue with creating a new session if retrieval fails
          logStep('Failed to retrieve existing session, will create new one', error);
        }
      }
    }

    // Calculate expiration date based on duration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (pricingOptions.durationMonths * 30)); // Approximately one month
    
    // Set up auto-renew if selected
    const autoRenew = pricingOptions.autoRenew || false;
    
    // Check if user already exists as a Stripe customer
    let customerId: string | undefined;
    const { data: customers, error: customerError } = await stripe.customers.list({
      email: user.email,
      limit: 1
    });
    
    if (customerError) {
      logStep('Error listing customers', customerError);
    } else if (customers && customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep('Found existing Stripe customer', { customerId });
    } else {
      // Create a new customer
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id
        }
      });
      customerId = newCustomer.id;
      logStep('Created new Stripe customer', { customerId });
    }

    // Prepare line items for Stripe Checkout
    const lineItems = [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${postType.charAt(0).toUpperCase() + postType.slice(1)} Posting - ${pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1)}`,
          description: `${pricingOptions.durationMonths}-month ${pricingOptions.selectedPricingTier} ${postType} posting`
        },
        unit_amount: Math.round(priceData.finalPrice * 100), // Convert to cents
      },
      quantity: 1,
    }];

    // Generate a unique payment log ID
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
        expires_at: expiresAt.toISOString(),
        is_free: false,
        auto_renew_enabled: autoRenew,
        metadata: {
          post_details: postDetails,
          price_data: priceData
        }
      })
      .select()
      .single();
    
    if (paymentError) {
      logStep('Error creating payment log', paymentError);
      return new Response(JSON.stringify({ error: 'Failed to create payment record' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    logStep('Payment log created', { paymentLogId: paymentLog.id });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: autoRenew ? 'subscription' : 'payment',
      success_url: `${req.headers.get('origin')}/post-success?payment_log_id=${paymentLog.id}`,
      cancel_url: `${req.headers.get('origin')}/post/${postType}`,
      metadata: {
        payment_log_id: paymentLog.id,
        user_id: user.id,
        post_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        duration_months: pricingOptions.durationMonths.toString(),
        auto_renew: autoRenew ? 'true' : 'false',
        expires_at: expiresAt.toISOString()
      }
    });
    
    logStep('Stripe checkout session created', { 
      sessionId: session.id,
      url: session.url
    });

    // Update payment log with Stripe session ID
    await supabaseAdmin
      .from('payment_logs')
      .update({ 
        stripe_payment_id: session.id,
        stripe_customer_id: customerId
      })
      .eq('id', paymentLog.id);
    
    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
