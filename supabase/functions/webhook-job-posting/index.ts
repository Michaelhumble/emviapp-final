
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🔥 [WEBHOOK] Job posting webhook called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('🔥 [WEBHOOK] Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body and signature header
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';
    
    console.log('🔥 [WEBHOOK] Processing webhook with signature:', signature.substring(0, 20) + '...');

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
      console.log('✅ [WEBHOOK] Webhook signature verified successfully');
    } catch (err) {
      console.error('❌ [WEBHOOK] Webhook signature verification failed:', err.message);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client with service role
    const supabase = createClient(
      supabaseUrl || '',
      supabaseServiceKey || ''
    );

    console.log('🔥 [WEBHOOK] Event type:', event.type);

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Get metadata from the session
      const jobId = session.metadata?.job_id || session.metadata?.post_id;
      const userId = session.metadata?.userId;
      const pricingTier = session.metadata?.pricing_tier;
      
      console.log('💰 [WEBHOOK] Processing successful job payment:', {
        jobId,
        userId,
        pricingTier,
        sessionId: session.id
      });
      
      if (jobId && userId) {
        // First, activate the draft job by updating its status
        const { error: updateError, data: updatedJob } = await supabase
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
          console.error('❌ [WEBHOOK] Error activating job:', updateError);
          return new Response(JSON.stringify({ error: 'Failed to activate job' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        if (updatedJob) {
          console.log('✅ [WEBHOOK] Job activated successfully:', updatedJob.id);
        } else {
          console.log('⚠️ [WEBHOOK] No job found to activate (may already be active)');
        }
        
        // Update payment log status
        const { error: paymentLogError } = await supabase
          .from('payment_logs')
          .update({ 
            payment_status: 'success',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_payment_id', session.id);
          
        if (paymentLogError) {
          console.error('❌ [WEBHOOK] Error updating payment log:', paymentLogError);
        } else {
          console.log('✅ [WEBHOOK] Payment log updated successfully');
        }
        
        console.log('🎉 [WEBHOOK] Job posting payment processing completed successfully');
        
        // Tag user as job poster
        try {
          await supabase.rpc('tag_user', { 
            p_user_id: userId, 
            p_tag: 'job-poster' 
          });
          console.log('✅ [WEBHOOK] User tagged as job-poster');
        } catch (tagError) {
          console.error('⚠️ [WEBHOOK] Error tagging user:', tagError);
          // Don't fail the webhook for tagging errors
        }
      } else {
        console.error('❌ [WEBHOOK] Missing jobId or userId in session metadata');
        return new Response(JSON.stringify({ error: 'Missing required metadata' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      console.log('ℹ️ [WEBHOOK] Unhandled event type:', event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('💥 [WEBHOOK] Critical error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
