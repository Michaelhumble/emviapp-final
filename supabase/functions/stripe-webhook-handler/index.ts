
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

// Configure CORS headers for the function
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to log webhook events
async function logWebhookEvent(supabase, event, status, details = {}) {
  try {
    await supabase
      .from('webhook_logs')
      .insert({
        event_type: event.type,
        event_id: event.id,
        status: status,
        details: JSON.stringify({
          ...details,
          timestamp: new Date().toISOString()
        })
      });
  } catch (logError) {
    // If webhook_logs table doesn't exist, just log to console
    console.error('Could not log webhook event:', logError);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body and signature header
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    
    if (!signature) {
      throw new Error('No Stripe signature found in request headers');
    }

    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16", 
    });
    
    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`Webhook received: ${event.type}`);
    
    // Initialize Supabase client with service role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );
    
    // Handle specific event types
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const metadata = paymentIntent.metadata || {};
        const userId = metadata.user_id;
        
        if (userId && paymentIntent.id) {
          await supabaseAdmin
            .from('payment_logs')
            .update({ payment_status: 'success' })
            .eq('stripe_payment_id', paymentIntent.id);
            
          await logWebhookEvent(supabaseAdmin, event, 'processed', { userId });
        }
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const metadata = paymentIntent.metadata || {};
        const userId = metadata.user_id;
        
        if (userId && paymentIntent.id) {
          await supabaseAdmin
            .from('payment_logs')
            .update({ payment_status: 'payment_failed' })
            .eq('stripe_payment_id', paymentIntent.id);
            
          await logWebhookEvent(supabaseAdmin, event, 'processed', { userId });
        }
        break;
      }
      
      case 'charge.refunded': {
        const charge = event.data.object;
        const paymentIntentId = charge.payment_intent;
        
        if (paymentIntentId) {
          // Find associated payment logs
          const { data: paymentLogs, error } = await supabaseAdmin
            .from('payment_logs')
            .select('id, user_id')
            .eq('stripe_payment_id', paymentIntentId)
            .maybeSingle();
            
          if (paymentLogs) {
            // Update payment status
            await supabaseAdmin
              .from('payment_logs')
              .update({ payment_status: 'refunded' })
              .eq('stripe_payment_id', paymentIntentId);
              
            // Flag user if this is their second+ refund
            await checkAndFlagUser(supabaseAdmin, paymentLogs.user_id, 'refund');
            
            await logWebhookEvent(supabaseAdmin, event, 'processed', { 
              userId: paymentLogs.user_id,
              paymentIntentId
            });
          }
        }
        break;
      }
      
      case 'charge.dispute.created': {
        const dispute = event.data.object;
        const paymentIntentId = dispute.payment_intent;
        
        if (paymentIntentId) {
          const { data: paymentLogs, error } = await supabaseAdmin
            .from('payment_logs')
            .select('id, user_id')
            .eq('stripe_payment_id', paymentIntentId)
            .maybeSingle();
            
          if (paymentLogs) {
            await supabaseAdmin
              .from('payment_logs')
              .update({ payment_status: 'dispute_open' })
              .eq('stripe_payment_id', paymentIntentId);
              
            // Flag user if this is their second+ dispute
            await checkAndFlagUser(supabaseAdmin, paymentLogs.user_id, 'dispute');
            
            await logWebhookEvent(supabaseAdmin, event, 'processed', { 
              userId: paymentLogs.user_id,
              paymentIntentId,
              disputeId: dispute.id
            });
          }
        }
        break;
      }
      
      case 'charge.dispute.closed': {
        const dispute = event.data.object;
        const paymentIntentId = dispute.payment_intent;
        const status = dispute.status; // 'won', 'lost', 'warning_closed', etc.
        
        if (paymentIntentId) {
          const { data: paymentLogs, error } = await supabaseAdmin
            .from('payment_logs')
            .select('id, user_id')
            .eq('stripe_payment_id', paymentIntentId)
            .maybeSingle();
            
          if (paymentLogs) {
            let paymentStatus = 'dispute_closed';
            
            // Determine payment status based on dispute outcome
            if (status === 'won') {
              paymentStatus = 'dispute_won';
            } else if (status === 'lost') {
              paymentStatus = 'dispute_lost';
            }
            
            await supabaseAdmin
              .from('payment_logs')
              .update({ payment_status: paymentStatus })
              .eq('stripe_payment_id', paymentIntentId);
              
            await logWebhookEvent(supabaseAdmin, event, 'processed', { 
              userId: paymentLogs.user_id,
              paymentIntentId,
              disputeId: dispute.id,
              disputeStatus: status
            });
          }
        }
        break;
      }
      
      default:
        await logWebhookEvent(supabaseAdmin, event, 'unhandled');
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Helper function to check for repeated issues and flag users
async function checkAndFlagUser(supabase, userId, issueType) {
  if (!userId) return;
  
  try {
    // Count previous issues of this type
    const { count, error } = await supabase
      .from('payment_logs')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('payment_status', issueType === 'refund' ? 'refunded' : 'dispute_open');
      
    if (!error && count && count >= 2) {
      // Flag the user after multiple issues
      await supabase
        .from('users')
        .update({ flagged: true })
        .eq('id', userId);
        
      console.log(`User ${userId} flagged due to multiple ${issueType}s`);
    }
  } catch (err) {
    console.error(`Error checking/flagging user: ${err.message}`);
  }
}
