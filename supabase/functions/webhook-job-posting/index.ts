
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

serve(async (req) => {
  console.log('🎣 [WEBHOOK-JOB] Function called');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error('❌ [WEBHOOK-JOB] Missing environment variables');
      return new Response('Server configuration error', { status: 500 });
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-08-16',
    });

    // Initialize Supabase with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the raw body and signature
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      console.error('❌ [WEBHOOK-JOB] No Stripe signature header');
      return new Response('No signature', { status: 400 });
    }

    console.log('🎣 [WEBHOOK-JOB] Received webhook with signature');

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('✅ [WEBHOOK-JOB] Webhook signature verified, event type:', event.type);
    } catch (err) {
      console.error('❌ [WEBHOOK-JOB] Webhook signature verification failed:', err);
      return new Response('Invalid signature', { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('💳 [WEBHOOK-JOB] Processing completed checkout session:', {
        sessionId: session.id,
        metadata: session.metadata,
        paymentStatus: session.payment_status
      });

      // Extract job ID from session metadata
      const jobId = session.metadata?.job_id;
      if (!jobId) {
        console.error('❌ [WEBHOOK-JOB] No job_id in session metadata');
        return new Response('Missing job ID in metadata', { status: 400 });
      }

      console.log('🎯 [WEBHOOK-JOB] Activating job with ID:', jobId);

      // Update job status from draft to active
      const { data, error } = await supabase
        .from('jobs')
        .update({ 
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('status', 'draft') // Only update if currently draft
        .select();

      if (error) {
        console.error('❌ [WEBHOOK-JOB] JOB ACTIVATION FAILED:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: error.message 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (!data || data.length === 0) {
        console.error('❌ [WEBHOOK-JOB] No job found to activate with ID:', jobId);
        return new Response('Job not found or already active', { status: 404 });
      }

      console.log('✅ [WEBHOOK-JOB] JOB ACTIVATION SUCCESSFUL:', data);

      return new Response(JSON.stringify({ 
        success: true, 
        data: data 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('ℹ️ [WEBHOOK-JOB] Unhandled event type:', event.type);
    return new Response('Event not handled', { status: 200 });

  } catch (error) {
    console.error('💥 [WEBHOOK-JOB] Unexpected error:', error);
    return new Response('Internal server error', { status: 500 });
  }
});
