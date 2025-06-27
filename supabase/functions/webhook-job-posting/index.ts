
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body and signature header
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';

    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey || '', {
      apiVersion: '2023-08-16',
    });

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret || '');
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabase = createClient(
      supabaseUrl || '',
      supabaseServiceKey || ''
    );

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Get metadata from the session
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier;
      const durationMonths = parseInt(session.metadata?.durationMonths || '1', 10);
      const jobTitle = session.metadata?.jobTitle;
      const jobData = session.metadata?.jobData ? JSON.parse(session.metadata.jobData) : {};
      
      console.log(`Processing successful payment for user ${userId}: ${tier} plan`);
      
      if (userId && tier && jobTitle) {
        // Calculate expiration date
        const expirationDate = new Date();
        if (tier === 'diamond') {
          expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        } else {
          expirationDate.setDate(expirationDate.getDate() + 30);
        }

        // Create the job posting in Supabase
        const { data: job, error: jobError } = await supabase
          .from('jobs')
          .insert({
            user_id: userId,
            title: jobTitle,
            description: jobData.description || '',
            location: jobData.location || '',
            compensation_type: jobData.compensationType || 'hourly',
            compensation_details: jobData.compensationDetails || '',
            requirements: jobData.requirements || '',
            contact_info: jobData.contact_info || {},
            pricing_tier: tier,
            status: 'active',
            expires_at: expirationDate.toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (jobError) {
          console.error('Error creating job posting:', jobError);
          return new Response(JSON.stringify({ error: 'Failed to create job posting' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Log the payment
        await supabase
          .from('payment_logs')
          .insert({
            user_id: userId,
            listing_id: job.id,
            plan_type: 'job',
            pricing_tier: tier,
            stripe_payment_id: session.id,
            payment_status: 'success',
            expires_at: expirationDate.toISOString(),
            payment_date: new Date().toISOString()
          });

        console.log(`Job posting created successfully with ID: ${job.id}`);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
