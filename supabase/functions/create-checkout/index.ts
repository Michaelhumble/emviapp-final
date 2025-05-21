
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
    // Get auth header for user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create Supabase clients - one with user token, one with service role
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
    
    if (!postType || !postDetails || !pricingOptions || !priceData) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check for idempotency - prevent duplicate payments
    if (idempotencyKey) {
      const { data: existingPayment } = await supabaseAdmin
        .from('payment_logs')
        .select('id')
        .eq('idempotency_key', idempotencyKey)
        .single();
      
      if (existingPayment) {
        return new Response(JSON.stringify({ 
          error: 'This payment has already been processed',
          paymentLogId: existingPayment.id 
        }), {
          status: 409, // Conflict status code
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Initialize Stripe
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      return new Response(JSON.stringify({ error: 'Missing Stripe secret key' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-08-16',
    });

    // Calculate expiration date based on duration in pricingOptions
    const durationMonths = pricingOptions.durationMonths || 1;
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + durationMonths);
    
    // Determine price in cents 
    const priceCents = Math.round(priceData.finalPrice * 100);
    
    if (isNaN(priceCents) || priceCents < 0) {
      return new Response(JSON.stringify({ error: 'Invalid price' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    console.log(`Creating checkout session for ${postType} post, price: $${priceData.finalPrice} (${priceCents} cents)`);
    
    // Create pre-payment log entry for pending payment
    const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
      .from('payment_logs')
      .insert({
        user_id: user.id,
        amount: priceData.finalPrice,
        currency: 'usd',
        plan_type: postType,
        plan_duration: durationMonths * 30, // Approximate days
        payment_status: 'pending',
        payment_method: 'stripe',
        idempotency_key: idempotencyKey,
        pricing_tier: pricingOptions.selectedPricingTier,
        expires_at: expiresAt.toISOString(),
        is_free: false,
        auto_renew_enabled: pricingOptions.autoRenew || false
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

    // Get origin for success/cancel URLs
    const origin = req.headers.get('origin') || 'https://emviapp.com';
    
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1)} ${postType.charAt(0).toUpperCase() + postType.slice(1)} Post`,
              description: `${durationMonths} month${durationMonths > 1 ? 's' : ''} posting on EmviApp`,
            },
            unit_amount: priceCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-canceled`,
      customer_email: user.email,
      metadata: {
        post_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        duration_months: durationMonths,
        user_id: user.id,
        payment_log_id: paymentLog.id,
        expires_at: expiresAt.toISOString(),
        job_details: JSON.stringify(postDetails)
      },
    });
    
    // Update payment log with Stripe session ID
    await supabaseAdmin
      .from('payment_logs')
      .update({ stripe_payment_id: session.id })
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
