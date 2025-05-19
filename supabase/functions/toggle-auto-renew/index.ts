
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@14.14.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header for user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create Supabase clients
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
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse request body
    const { stripePaymentId, enableAutoRenew } = await req.json();
    if (!stripePaymentId) {
      return new Response(JSON.stringify({ error: 'Missing payment ID' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get payment record to verify it belongs to this user
    const { data: paymentData, error: paymentError } = await supabase
      .from('payment_logs')
      .select('*')
      .eq('stripe_payment_id', stripePaymentId)
      .eq('user_id', user.id)
      .single();

    if (paymentError || !paymentData) {
      return new Response(JSON.stringify({ error: 'Payment not found or unauthorized' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16"
    });

    // Find subscription in Stripe
    const { data: checkoutSessions } = await stripe.checkout.sessions.list({
      limit: 1,
      payment_intent: stripePaymentId
    });

    let subscriptionId = checkoutSessions?.[0]?.subscription;
    if (!subscriptionId) {
      // Try to look up by invoice
      const { data: invoices } = await stripe.invoices.list({
        limit: 1,
        payment_intent: stripePaymentId
      });
      
      if (invoices?.[0]?.subscription) {
        subscriptionId = invoices[0].subscription;
      }
    }
    
    if (!subscriptionId) {
      return new Response(JSON.stringify({ error: 'No subscription found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Cancel or reactivate the subscription
    if (enableAutoRenew === false) {
      // Cancel subscription
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true
      });
      
      // Update payment record
      await supabaseAdmin
        .from('payment_logs')
        .update({ auto_renew_enabled: false })
        .eq('stripe_payment_id', stripePaymentId);
      
      // Record the cancellation in webhook logs
      await supabaseAdmin
        .from('webhook_logs')
        .insert({
          event_type: 'subscription.cancelled_by_user',
          status: 'processed',
          details: { 
            user_id: user.id,
            stripe_payment_id: stripePaymentId,
            subscription_id: subscriptionId
          }
        });
        
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Auto-renew turned off successfully', 
        autoRenewEnabled: false 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      
    } else {
      // Reactivate subscription
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false
      });
      
      // Update payment record
      await supabaseAdmin
        .from('payment_logs')
        .update({ auto_renew_enabled: true })
        .eq('stripe_payment_id', stripePaymentId);
      
      // Record the reactivation in webhook logs
      await supabaseAdmin
        .from('webhook_logs')
        .insert({
          event_type: 'subscription.reactivated_by_user',
          status: 'processed',
          details: { 
            user_id: user.id,
            stripe_payment_id: stripePaymentId,
            subscription_id: subscriptionId
          }
        });
        
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Auto-renew enabled successfully', 
        autoRenewEnabled: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Error toggling auto-renew:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
