
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🔔 [WEBHOOK] Job posting webhook called');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    console.log('🔔 [WEBHOOK] Environment check:', {
      hasStripeKey: !!stripeSecretKey,
      hasWebhookSecret: !!webhookSecret,
      hasSupabaseUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey
    });

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error('❌ [WEBHOOK] Missing environment variables');
      throw new Error('Missing required environment variables');
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-08-16',
    });

    // Initialize Supabase
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get request body and signature
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    console.log('🔔 [WEBHOOK] Request details:', {
      hasBody: !!body,
      bodyLength: body.length,
      hasSignature: !!signature,
      signaturePreview: signature?.substring(0, 20) + '...'
    });

    if (!signature) {
      console.error('❌ [WEBHOOK] No Stripe signature header');
      throw new Error('No Stripe signature header');
    }

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('✅ [WEBHOOK] Signature verified, event type:', event.type);
    } catch (err) {
      console.error('❌ [WEBHOOK] Signature verification failed:', err.message);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('💳 [WEBHOOK] Processing checkout session:', {
        sessionId: session.id,
        paymentStatus: session.payment_status,
        hasMetadata: !!session.metadata,
        metadata: session.metadata
      });

      const jobId = session.metadata?.job_id;
      const userId = session.metadata?.userId;
      const pricingTier = session.metadata?.pricing_tier;

      console.log('💳 [WEBHOOK] Session metadata:', {
        jobId,
        userId,
        pricingTier,
        postType: session.metadata?.post_type
      });

      if (!jobId) {
        console.error('❌ [WEBHOOK] No job_id in session metadata');
        return new Response(JSON.stringify({ error: 'No job_id in metadata' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // First, verify the job exists
      console.log('🔍 [WEBHOOK] Looking up job:', jobId);
      const { data: existingJob, error: lookupError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      console.log('🔍 [WEBHOOK] Job lookup result:', {
        found: !!existingJob,
        currentStatus: existingJob?.status,
        userId: existingJob?.user_id,
        title: existingJob?.title,
        error: lookupError?.message
      });

      if (!existingJob) {
        console.error('❌ [WEBHOOK] Job not found:', jobId);
        return new Response(JSON.stringify({ error: 'Job not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Activate the job
      console.log('🔄 [WEBHOOK] Activating job:', jobId);
      const { data: updatedJob, error: updateError } = await supabase
        .from('jobs')
        .update({
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .select()
        .single();

      console.log('🔄 [WEBHOOK] Job activation result:', {
        success: !updateError,
        newStatus: updatedJob?.status,
        updatedAt: updatedJob?.updated_at,
        error: updateError?.message
      });

      if (updateError) {
        console.error('❌ [WEBHOOK] Job activation failed:', updateError);
        return new Response(JSON.stringify({ error: 'Job activation failed' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Log the payment
      console.log('📝 [WEBHOOK] Creating payment log...');
      const { error: logError } = await supabase
        .from('payment_logs')
        .insert({
          user_id: userId || existingJob.user_id,
          listing_id: jobId,
          stripe_payment_id: session.id,
          payment_status: 'success',
          plan_type: pricingTier || 'premium',
          pricing_tier: pricingTier || 'premium',
          payment_date: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });

      console.log('📝 [WEBHOOK] Payment log result:', {
        success: !logError,
        error: logError?.message
      });

      console.log('✅ [WEBHOOK] Job posting completed successfully:', {
        jobId,
        status: 'active',
        paymentLogged: !logError
      });

      return new Response(JSON.stringify({ 
        received: true, 
        jobActivated: true,
        jobId: jobId 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('ℹ️ [WEBHOOK] Unhandled event type:', event.type);
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 [WEBHOOK] Critical error:', {
      message: error.message,
      stack: error.stack
    });
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check webhook logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
