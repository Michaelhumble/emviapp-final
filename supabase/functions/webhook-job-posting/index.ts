
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('💳 [JOB-WEBHOOK] Webhook called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('💳 [JOB-WEBHOOK] Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body and signature header
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';
    
    console.log('💳 [JOB-WEBHOOK] Processing webhook with signature length:', signature.length);

    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error('❌ [JOB-WEBHOOK] Missing environment variables');
      throw new Error('Missing required environment variables');
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-08-16',
    });

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log('✅ [JOB-WEBHOOK] Webhook signature verified successfully');
    } catch (err) {
      console.error('❌ [JOB-WEBHOOK] Webhook signature verification failed:', err.message);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('💳 [JOB-WEBHOOK] Event type:', event.type);

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Get metadata from the session
      const jobId = session.metadata?.job_id || session.metadata?.post_id;
      const userId = session.metadata?.userId;
      const pricingTier = session.metadata?.pricing_tier;
      
      console.log('💳 [JOB-WEBHOOK] Processing successful job payment:', {
        jobId,
        userId,
        pricingTier,
        sessionId: session.id,
        paymentStatus: session.payment_status
      });
      
      if (!jobId || !userId) {
        console.error('❌ [JOB-WEBHOOK] Missing jobId or userId in session metadata');
        return new Response(JSON.stringify({ error: 'Missing required metadata' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // First, update the job status from draft to active
      const { data: updatedJob, error: updateError } = await supabase
        .from('jobs')
        .update({ 
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('user_id', userId)
        .eq('status', 'draft')
        .select()
        .single();
        
      if (updateError) {
        console.error('❌ [JOB-WEBHOOK] Error activating job:', updateError);
        // Try to find the job to see what's wrong
        const { data: existingJob, error: findError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();
          
        console.log('🔍 [JOB-WEBHOOK] Existing job status:', existingJob?.status, 'Find error:', findError);
        
        return new Response(JSON.stringify({ error: 'Failed to activate job' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (updatedJob) {
        console.log('✅ [JOB-WEBHOOK] Job activated successfully:', {
          id: updatedJob.id,
          title: updatedJob.title,
          status: updatedJob.status,
          pricing_tier: updatedJob.pricing_tier
        });
      } else {
        console.log('⚠️ [JOB-WEBHOOK] No job was updated - may already be active');
        
        // Check if job exists and is already active
        const { data: existingJob } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();
          
        if (existingJob?.status === 'active') {
          console.log('✅ [JOB-WEBHOOK] Job is already active, proceeding with payment log');
        } else {
          console.error('❌ [JOB-WEBHOOK] Job not found or in unexpected state:', existingJob);
        }
      }
      
      // Update or create payment log
      const { error: paymentLogError } = await supabase
        .from('payment_logs')
        .upsert({ 
          stripe_payment_id: session.id,
          user_id: userId,
          listing_id: jobId,
          pricing_tier: pricingTier || 'premium',
          plan_type: 'job_posting',
          payment_status: 'success',
          payment_date: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString()
        }, {
          onConflict: 'stripe_payment_id'
        });
        
      if (paymentLogError) {
        console.error('❌ [JOB-WEBHOOK] Error updating payment log:', paymentLogError);
      } else {
        console.log('✅ [JOB-WEBHOOK] Payment log updated successfully');
      }
      
      console.log('🎉 [JOB-WEBHOOK] Job posting payment processing completed successfully');
      
    } else {
      console.log('ℹ️ [JOB-WEBHOOK] Unhandled event type:', event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('💥 [JOB-WEBHOOK] Critical error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
