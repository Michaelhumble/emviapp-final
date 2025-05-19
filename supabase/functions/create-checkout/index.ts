
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";

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

    // Authenticate user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse the request
    const { postType, postDetails, pricingOptions, priceData, idempotencyKey } = await req.json();
    
    // Validate required data
    if (!postType || !postDetails || !pricingOptions || !priceData || !idempotencyKey) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Validate Diamond tier is not directly accessible
    if (pricingOptions.selectedPricingTier === 'diamond') {
      return new Response(JSON.stringify({ error: 'Diamond tier requires invitation' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Validate price is above 0
    if (priceData.finalPrice <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid price for paid tier' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Initialize Stripe with the secret key from environment variables
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    // Get or create a Stripe customer for this user
    const stripeCustomers = await stripe.customers.list({ email: user.email });
    let stripeCustomerId = stripeCustomers.data.length > 0
      ? stripeCustomers.data[0].id
      : (await stripe.customers.create({ email: user.email })).id;
    
    // Get the formatted price in cents for Stripe
    const priceCents = Math.round(priceData.finalPrice * 100);
    
    // Format product name based on tier and type
    const tierNames = {
      'standard': 'Standard',
      'premium': 'Premium', 
      'gold': 'Gold',
      'diamond': 'Diamond'
    };
    const tierName = tierNames[pricingOptions.selectedPricingTier as keyof typeof tierNames] || 'Standard';
    const productName = `${tierName} ${postType.charAt(0).toUpperCase() + postType.slice(1)} Listing`;
    
    // Create a payment log entry to track this payment attempt
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        amount: priceData.finalPrice,
        currency: 'usd',
        plan_type: postType,
        plan_duration: pricingOptions.durationMonths || 1,
        payment_status: 'pending',
        pricing_tier: pricingOptions.selectedPricingTier,
        idempotency_key: idempotencyKey,
        auto_renew_enabled: !!pricingOptions.autoRenew,
        payment_intent_created_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (paymentLogError) {
      console.error('Error creating payment log:', paymentLogError);
      return new Response(JSON.stringify({ error: 'Failed to create payment record' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Define metadata for Stripe
    const metadata = {
      user_id: user.id,
      email: user.email,
      post_type: postType,
      pricing_tier: pricingOptions.selectedPricingTier,
      payment_log_id: paymentLog.id,
      auto_renew: pricingOptions.autoRenew ? 'yes' : 'no',
      duration_months: pricingOptions.durationMonths || 1
    };
    
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: `${pricingOptions.durationMonths || 1} month${pricingOptions.durationMonths > 1 ? 's' : ''} - ${pricingOptions.autoRenew ? 'Auto-renew enabled' : 'One-time payment'}`
            },
            unit_amount: priceCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/post-success?payment_log_id=${paymentLog.id}`,
      cancel_url: `${req.headers.get('origin')}/cancel-payment?payment_log_id=${paymentLog.id}`,
      metadata: metadata,
    });
    
    // Update payment log with the checkout session ID
    await supabaseAdmin
      .from('payment_logs')
      .update({
        stripe_session_id: session.id,
        payment_status: 'checkout_created'
      })
      .eq('id', paymentLog.id);
      
    // Return the checkout session URL
    return new Response(JSON.stringify({ 
      success: true,
      url: session.url,
      session_id: session.id,
      payment_log_id: paymentLog.id
    }), {
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
