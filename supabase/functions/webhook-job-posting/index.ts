
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

serve(async (req) => {
  console.log('🎣 [WEBHOOK-JOB] ======= WEBHOOK FUNCTION CALLED =======');
  console.log('🎣 [WEBHOOK-JOB] Method:', req.method);
  console.log('🎣 [WEBHOOK-JOB] URL:', req.url);
  console.log('🎣 [WEBHOOK-JOB] Headers:', Object.fromEntries(req.headers.entries()));
  
  if (req.method === 'OPTIONS') {
    console.log('🎣 [WEBHOOK-JOB] CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    console.log('🔑 [WEBHOOK-JOB] Environment check:', {
      hasStripeKey: !!stripeSecretKey,
      stripeKeyLength: stripeSecretKey?.length || 0,
      hasWebhookSecret: !!webhookSecret,
      webhookSecretLength: webhookSecret?.length || 0,
      hasSupabaseUrl: !!supabaseUrl,
      supabaseUrl: supabaseUrl?.substring(0, 30) + '...',
      hasServiceKey: !!supabaseServiceKey,
      serviceKeyLength: supabaseServiceKey?.length || 0
    });

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

    console.log('🎣 [WEBHOOK-JOB] WEBHOOK TRIGGERED:', event);

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
      const selectedPlan = session.metadata?.selected_plan;
      
      console.log('🔍 [WEBHOOK-JOB] Session metadata:', {
        fullMetadata: session.metadata,
        jobId: jobId,
        userId: session.metadata?.user_id,
        selectedPlan: selectedPlan,
        pricingTier: session.metadata?.pricing_tier
      });
      
      if (!jobId) {
        console.error('❌ [WEBHOOK-JOB] No job_id in session metadata');
        console.error('❌ [WEBHOOK-JOB] Available metadata:', session.metadata);
        return new Response('Missing job ID in metadata', { status: 400 });
      }

      console.log('🎯 [WEBHOOK-JOB] Activating job with ID:', jobId);

      // First, let's check if the draft job exists
      console.log('🔍 [WEBHOOK-JOB] Checking if draft job exists...');
      const { data: existingJob, error: checkError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (checkError) {
        console.error('❌ [WEBHOOK-JOB] Error checking for existing job:', checkError);
        return new Response(JSON.stringify({ 
          success: false, 
          error: `Failed to check existing job: ${checkError.message}` 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (!existingJob) {
        console.error('❌ [WEBHOOK-JOB] No job found with ID:', jobId);
        return new Response('Job not found', { status: 404 });
      }

      console.log('📋 [WEBHOOK-JOB] Found existing job:', {
        id: existingJob.id,
        title: existingJob.title,
        status: existingJob.status,
        pricing_tier: existingJob.pricing_tier,
        user_id: existingJob.user_id,
        created_at: existingJob.created_at
      });

      if (existingJob.status === 'active') {
        console.log('⚠️ [WEBHOOK-JOB] Job is already active, skipping update');
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Job was already active',
          data: existingJob 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Update job status from draft to active
      console.log('🔄 [WEBHOOK-JOB] Updating job status from draft to active...');
      console.log('🔄 [WEBHOOK-JOB] Current job status before update:', existingJob.status);
      console.log('🔄 [WEBHOOK-JOB] Current job payment_status before update:', existingJob.payment_status);
      
      // Also update payment_status to ensure consistency
      const { data, error } = await supabase
        .from('jobs')
        .update({ 
          status: 'active',
          payment_status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('status', 'draft') // Only update if currently draft
        .select();

      if (error) {
        console.error('❌ [WEBHOOK-JOB] JOB ACTIVATION FAILED:', error);
        console.error('❌ [WEBHOOK-JOB] Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return new Response(JSON.stringify({ 
          success: false, 
          error: error.message 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (!data || data.length === 0) {
        console.error('❌ [WEBHOOK-JOB] No job was updated. Detailed analysis:');
        console.error('❌ [WEBHOOK-JOB] - Target job ID:', jobId);
        console.error('❌ [WEBHOOK-JOB] - Job found during check:', !!existingJob);
        console.error('❌ [WEBHOOK-JOB] - Job current status:', existingJob?.status);
        console.error('❌ [WEBHOOK-JOB] - Job current payment_status:', existingJob?.payment_status);
        console.error('❌ [WEBHOOK-JOB] - Expected status for update: "draft"');
        
        if (existingJob?.status !== 'draft') {
          console.error('❌ [WEBHOOK-JOB] CRITICAL: Job status is not "draft", cannot activate!');
          console.error('❌ [WEBHOOK-JOB] This suggests the job was created with wrong status or already processed.');
          return new Response(JSON.stringify({ 
            success: false, 
            error: `Job status is "${existingJob?.status}", expected "draft"`,
            jobData: existingJob 
          }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        return new Response('Job not found or already active', { status: 404 });
      }

      console.log('✅ [WEBHOOK-JOB] ======= JOB ACTIVATION SUCCESSFUL =======');
      console.log('✅ [WEBHOOK-JOB] PAID JOB POST SAVED TO DATABASE');
      console.log('✅ [WEBHOOK-JOB] PAID JOB NOW VISIBLE ON JOBS PAGE');
      console.log('✅ [WEBHOOK-JOB] Updated job data:', data[0]);
      
      // VERIFICATION: Query the job to confirm it's actually active and visible
      console.log('🔍 [WEBHOOK-JOB] VERIFICATION: Confirming job is now active in database...');
      const { data: verifyData, error: verifyError } = await supabase
        .from('jobs')
        .select('id, title, status, pricing_tier, created_at, user_id')
        .eq('id', jobId)
        .eq('status', 'active')
        .single();
        
      if (verifyError || !verifyData) {
        console.error('❌ [WEBHOOK-JOB] VERIFICATION FAILED: Job not found as active!', verifyError);
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Job activation verification failed',
          verifyError: verifyError?.message 
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      console.log('✅ [WEBHOOK-JOB] VERIFICATION PASSED: Job is confirmed active and visible');
      console.log('✅ [WEBHOOK-JOB] FINAL VERIFICATION DATA:', verifyData);

      // Log successful activation for debugging
      console.log('🎯 [WEBHOOK-JOB] PAID JOB POSTING FLOW COMPLETED SUCCESSFULLY:');
      console.log('🎯 [WEBHOOK-JOB] - Stripe payment processed ✅');
      console.log('🎯 [WEBHOOK-JOB] - Draft job found and activated ✅');  
      console.log('🎯 [WEBHOOK-JOB] - Job now visible on /jobs page ✅');
      console.log('🎯 [WEBHOOK-JOB] - Customer should see success message ✅');

      return new Response(JSON.stringify({ 
        success: true, 
        data: data,
        message: 'Job activated successfully'
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
