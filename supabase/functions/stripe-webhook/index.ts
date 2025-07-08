
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';

    const event = stripe.webhooks.constructEvent(
      body, 
      signature, 
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );
    
    // Log the webhook event for auditing
    await supabase
      .from('webhook_logs')
      .insert({
        event_type: event.type,
        event_id: event.id,
        status: 'received',
        details: event.data.object
      });

    // Handle successful checkout
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const metadata = session.metadata || {};
      const durationMonths = Number(metadata.duration_months || 1);
      
      console.log('💳 [STRIPE-WEBHOOK] Processing completed checkout session:', {
        sessionId: session.id,
        metadata: metadata,
        paymentStatus: session.payment_status
      });

      // Check if this is a job posting payment
      const jobId = metadata.job_id;
      if (jobId) {
        console.log('🎯 [STRIPE-WEBHOOK] JOB PAYMENT DETECTED - Activating job:', jobId);
        
        // First, check if the job exists and is in draft status
        const { data: existingJob, error: checkError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (checkError) {
          console.error('❌ [STRIPE-WEBHOOK] Error checking for existing job:', checkError);
        } else if (!existingJob) {
          console.error('❌ [STRIPE-WEBHOOK] No job found with ID:', jobId);
        } else {
          console.log('📋 [STRIPE-WEBHOOK] Found job to activate:', {
            id: existingJob.id,
            title: existingJob.title,
            status: existingJob.status,
            pricing_tier: existingJob.pricing_tier
          });

          // Update job status from draft to active
          const { data: updatedJob, error: updateError } = await supabase
            .from('jobs')
            .update({ 
              status: 'active',
              payment_status: 'completed',
              updated_at: new Date().toISOString()
            })
            .eq('id', jobId)
            .eq('status', 'draft')
            .select();

          if (updateError) {
            console.error('❌ [STRIPE-WEBHOOK] JOB ACTIVATION FAILED:', updateError);
          } else if (!updatedJob || updatedJob.length === 0) {
            console.error('❌ [STRIPE-WEBHOOK] No job was updated - may not be in draft status');
          } else {
            console.log('✅ [STRIPE-WEBHOOK] JOB SUCCESSFULLY ACTIVATED:', updatedJob[0]);
            console.log('✅ [STRIPE-WEBHOOK] PAID JOB NOW VISIBLE ON JOBS PAGE');
          }
        }
      }
      
      // Calculate expiration date based on duration
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + (durationMonths * 30)); // Approximate months as 30 days
      
      // Insert payment record into payment_logs table
      await supabase
        .from('payment_logs')
        .insert({
          user_id: metadata.user_id,
          listing_id: metadata.listing_id,
          plan_type: metadata.plan_type || 'standard',
          payment_status: 'success',
          stripe_payment_id: session.id,
          auto_renew_enabled: metadata.auto_renew === 'true',
          payment_date: new Date().toISOString(),
          expires_at: expiresAt.toISOString()
        });

      // Also insert into payments table for backward compatibility
      const { error } = await supabase
        .from('payments')
        .insert({
          user_id: metadata.user_id,
          amount: session.amount_total ? session.amount_total / 100 : 0,
          payment_type: metadata.post_type || 'unknown',
          stripe_session_id: session.id,
          metadata: JSON.stringify(metadata)
        });

      if (error) {
        console.error('Error inserting payment:', error);
        await supabase
          .from('webhook_logs')
          .insert({
            event_type: event.type,
            event_id: event.id,
            status: 'error',
            details: { error: error.message }
          });
      }
    }
    
    // Handle subscription events
    if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object;
      
      // Check if this is a subscription invoice
      if (invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
        const metadata = subscription.metadata || {};
        
        // Calculate new expiry date based on billing period
        const periodEnd = new Date(subscription.current_period_end * 1000);
        
        // Update payment_logs for subscription renewal
        if (metadata.user_id) {
          await supabase
            .from('payment_logs')
            .insert({
              user_id: metadata.user_id,
              listing_id: metadata.listing_id,
              plan_type: metadata.plan_type || 'standard',
              payment_status: 'success',
              stripe_payment_id: invoice.id,
              auto_renew_enabled: true,
              payment_date: new Date().toISOString(),
              expires_at: periodEnd.toISOString()
            });
        }
      }
    }
    
    // Handle payment disputes and refunds
    if (event.type === 'charge.dispute.created') {
      const dispute = event.data.object;
      const charge = dispute.charge;
      
      // Update payment status to dispute_open
      await handlePaymentStatusUpdate(supabase, charge, 'dispute_open');
      
      // Flag user with disputes
      await flagUserWithDisputeOrRefund(supabase, dispute.metadata?.user_id);
    }
    
    if (event.type === 'charge.dispute.closed') {
      const dispute = event.data.object;
      const charge = dispute.charge;
      const status = dispute.status === 'won' ? 'dispute_won' : 'dispute_lost';
      
      // Update payment status based on dispute outcome
      await handlePaymentStatusUpdate(supabase, charge, status);
    }
    
    if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      
      // Update payment status to refunded
      await handlePaymentStatusUpdate(supabase, charge.id, 'refunded');
      
      // Flag user with refunds
      await flagUserWithDisputeOrRefund(supabase, charge.metadata?.user_id);
    }
    
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      
      // Update payment status to payment_failed
      await handlePaymentStatusUpdate(supabase, paymentIntent.id, 'payment_failed');
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Helper function to update payment status in payment_logs
async function handlePaymentStatusUpdate(
  supabase: any, 
  stripePaymentId: string, 
  newStatus: string
) {
  // First try to find by stripe_payment_id
  let { data, error } = await supabase
    .from('payment_logs')
    .update({ payment_status: newStatus })
    .eq('stripe_payment_id', stripePaymentId);
  
  if (error || !data) {
    // If not found, log the issue
    await supabase
      .from('webhook_logs')
      .insert({
        event_type: 'payment_status_update',
        status: 'error',
        details: { 
          error: error?.message || 'Payment not found', 
          stripe_payment_id: stripePaymentId 
        }
      });
  }
}

// Helper function to flag users with multiple disputes or refunds
async function flagUserWithDisputeOrRefund(supabase: any, userId: string) {
  if (!userId) return;
  
  // Count disputes and refunds for this user
  const { data, error } = await supabase
    .from('payment_logs')
    .select('payment_status', { count: 'exact' })
    .eq('user_id', userId)
    .in('payment_status', ['refunded', 'dispute_open', 'dispute_lost']);
  
  // If multiple issues, flag the user
  if (!error && data && data.count >= 2) {
    await supabase
      .from('users')
      .update({ flagged: true })
      .eq('id', userId);
  }
}
