
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
    // Get request body
    const { postType, postDetails, pricingOptions, priceData, idempotencyKey } = await req.json();
    
    if (!postType || !pricingOptions || !priceData) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Create Supabase client with the Auth context of the function
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
      return new Response(
        JSON.stringify({ error: 'User not authenticated' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: '2023-08-16',
    });

    // Check if we have this customer in Stripe already
    let customerId;
    const { data: customers, error: searchError } = await stripe.customers.search({
      query: `email:'${user.email}'`,
      limit: 1
    }).catch(_ => ({ data: [], error: true }));

    if (customers && customers.length > 0) {
      customerId = customers[0].id;
    } else {
      // Create a new customer
      const newCustomer = await stripe.customers.create({
        email: user.email,
        name: user.user_metadata?.full_name || '',
        metadata: {
          user_id: user.id
        }
      });
      customerId = newCustomer.id;
    }

    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (pricingOptions.durationMonths * 30)); // Each month is ~30 days
    
    // Create a pending payment record
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
        auto_renew_enabled: pricingOptions.autoRenew || false
      })
      .select()
      .single();
      
    if (paymentError) {
      console.error('Error creating payment log:', paymentError);
      return new Response(
        JSON.stringify({ error: 'Failed to create payment record' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    // If we're posting a job, create a draft job entry
    let jobId = null;
    if (postType === 'job' && postDetails) {
      const { data: job, error: jobError } = await supabaseAdmin
        .from('jobs')
        .insert({
          ...postDetails,
          user_id: user.id,
          status: 'draft', // Draft until payment is confirmed
          payment_id: paymentLog.id,
          expires_at: expiresAt.toISOString(),
          post_type: postType,
          pricing_tier: pricingOptions.selectedPricingTier
        })
        .select()
        .single();
        
      if (jobError) {
        console.error('Error creating job:', jobError);
        return new Response(
          JSON.stringify({ error: 'Failed to create job draft' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      jobId = job.id;
      
      // Update payment log with the job ID
      await supabaseAdmin
        .from('payment_logs')
        .update({ listing_id: jobId })
        .eq('id', paymentLog.id);
    }
    
    // Get success and cancel URLs
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const successUrl = `${origin}/post-success?payment_log_id=${paymentLog.id}`;
    const cancelUrl = `${origin}/post-job?canceled=true`;
    
    // Create line items for Stripe
    const lineItems = [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${postType.charAt(0).toUpperCase() + postType.slice(1)} - ${pricingOptions.selectedPricingTier.toUpperCase()} for ${pricingOptions.durationMonths} month${pricingOptions.durationMonths > 1 ? 's' : ''}`,
          description: `${pricingOptions.selectedPricingTier} tier listing for ${pricingOptions.durationMonths} month${pricingOptions.durationMonths > 1 ? 's' : ''}`,
        },
        unit_amount: Math.round(priceData.finalPrice * 100), // Convert to cents
      },
      quantity: 1,
    }];
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: user.id,
        payment_log_id: paymentLog.id,
        post_id: jobId,
        post_type: postType,
        pricing_tier: pricingOptions.selectedPricingTier,
        duration_months: pricingOptions.durationMonths.toString(),
        expires_at: expiresAt.toISOString(),
        auto_renew: pricingOptions.autoRenew ? 'true' : 'false'
      }
    });
    
    // Update payment log with Stripe session ID
    await supabaseAdmin
      .from('payment_logs')
      .update({ 
        stripe_payment_id: session.id 
      })
      .eq('id', paymentLog.id);
    
    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in create-checkout function:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
