
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('💳 [JOB-CHECKOUT] Function called');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tier, finalPrice, jobData, jobId } = await req.json();
    
    console.log('💳 [JOB-CHECKOUT] Request data:', {
      tier,
      finalPrice,
      jobId,
      hasJobData: !!jobData
    });

    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!stripeSecretKey || !supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing environment variables');
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-08-16',
    });

    // Initialize Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get user from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Invalid authentication');
    }

    console.log('💳 [JOB-CHECKOUT] User authenticated:', user.id);

    // Get tier configuration
    const tierConfig = {
      premium: { price: 2500, name: 'Premium Job Posting' }, // $25.00
      gold: { price: 4500, name: 'Gold Job Posting' },       // $45.00  
      diamond: { price: 8500, name: 'Diamond Job Posting' }  // $85.00
    };

    const config = tierConfig[tier as keyof typeof tierConfig];
    if (!config) {
      throw new Error(`Invalid tier: ${tier}`);
    }

    const priceAmount = finalPrice ? Math.round(finalPrice * 100) : config.price;

    console.log('💳 [JOB-CHECKOUT] Creating checkout session:', {
      tier,
      priceAmount,
      jobId,
      userId: user.id
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: config.name,
              description: `${tier.charAt(0).toUpperCase() + tier.slice(1)} tier job posting`,
            },
            unit_amount: priceAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/post-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/jobs/create`,
      metadata: {
        job_id: jobId,
        userId: user.id,
        pricing_tier: tier,
        post_type: 'job'
      },
    });

    console.log('💳 [JOB-CHECKOUT] Checkout session created:', {
      sessionId: session.id,
      url: session.url
    });

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('💥 [JOB-CHECKOUT] Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
