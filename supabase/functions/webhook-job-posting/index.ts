
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

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
      const jobId = session.metadata?.job_id || session.metadata?.post_id;
      const userId = session.metadata?.userId;
      const pricingTier = session.metadata?.pricing_tier;
      
      console.log(`Processing successful job payment for user ${userId}, job ${jobId}`);
      
      if (jobId && userId) {
        // Activate the draft job by updating its status
        const { error: updateError } = await supabase
          .from('jobs')
          .update({ 
            status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('id', jobId)
          .eq('user_id', userId) // Extra security check
          .eq('status', 'draft'); // Only update if still in draft status
          
        if (updateError) {
          console.error('Error activating job:', updateError);
          return new Response(JSON.stringify({ error: 'Failed to activate job' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        // Update payment log status
        await supabase
          .from('payment_logs')
          .update({ 
            payment_status: 'success',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_payment_id', session.id);
          
        console.log(`Job ${jobId} activated successfully after payment`);
        
        // Tag user as job poster
        await supabase.rpc('tag_user', { 
          p_user_id: userId, 
          p_tag: 'job-poster' 
        });
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
