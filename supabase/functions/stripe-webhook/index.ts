
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    console.error("Missing Stripe signature");
    return new Response(
      JSON.stringify({ error: "Missing stripe signature" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  
  try {
    // Get request body for webhook verification
    const body = await req.text();
    
    // Initialize Stripe with webhook secret for verification
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!stripeWebhookSecret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret
    );
    
    console.log(`Received Stripe webhook event: ${event.type}`);
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Log the webhook event
    const { data: logData, error: logError } = await supabase
      .from('webhook_logs')
      .insert({
        event_type: event.type,
        payload: event
      });
      
    if (logError) {
      console.error("Error logging webhook:", logError);
    }
    
    // Process different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Update payment log status
        const { error: updateError } = await supabase
          .from('payment_logs')
          .update({
            status: 'completed',
            stripe_payment_id: session.payment_intent,
            completed_at: new Date().toISOString()
          })
          .eq('stripe_session_id', session.id);
          
        if (updateError) {
          console.error("Error updating payment log:", updateError);
        }
        
        // Create post if it doesn't exist yet
        if (session.metadata?.post_type && session.metadata?.payment_log_id) {
          const { data: existingPost } = await supabase
            .from('posts')
            .select('id')
            .eq('payment_log_id', session.metadata.payment_log_id)
            .single();
            
          if (!existingPost) {
            // Calculate expiration date based on duration
            const durationMonths = parseInt(session.metadata.duration_months || '1');
            const expiresAt = new Date();
            expiresAt.setMonth(expiresAt.getMonth() + durationMonths);
            
            // Create new post record
            const { error: postError } = await supabase
              .from('posts')
              .insert({
                user_id: session.metadata.user_id,
                post_type: session.metadata.post_type,
                status: 'active',
                pricing_tier: session.metadata.pricing_tier,
                payment_log_id: session.metadata.payment_log_id,
                expires_at: expiresAt.toISOString()
              });
              
            if (postError) {
              console.error("Error creating post:", postError);
            }
          }
        }
        
        break;
      }
      
      case 'checkout.session.expired': {
        const session = event.data.object;
        
        // Update payment log status
        const { error: updateError } = await supabase
          .from('payment_logs')
          .update({
            status: 'expired'
          })
          .eq('stripe_session_id', session.id);
          
        if (updateError) {
          console.error("Error updating payment log:", updateError);
        }
        
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        
        // Find related payment log by payment intent ID
        const { data: paymentLog, error: paymentLogError } = await supabase
          .from('payment_logs')
          .select('id, status')
          .eq('stripe_payment_id', paymentIntent.id)
          .single();
          
        if (paymentLogError) {
          console.error("Error finding payment log:", paymentLogError);
        } else if (paymentLog && paymentLog.status !== 'completed') {
          // Update payment log status if not already completed
          const { error: updateError } = await supabase
            .from('payment_logs')
            .update({
              status: 'completed',
              completed_at: new Date().toISOString()
            })
            .eq('id', paymentLog.id);
            
          if (updateError) {
            console.error("Error updating payment log:", updateError);
          }
        }
        
        break;
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        
        // Update payment log status
        const { error: updateError } = await supabase
          .from('payment_logs')
          .update({
            status: 'failed',
            error_message: paymentIntent.last_payment_error?.message || 'Payment failed'
          })
          .eq('stripe_payment_id', paymentIntent.id);
          
        if (updateError) {
          console.error("Error updating payment log:", updateError);
        }
        
        break;
      }
    }
    
    // Return a success response
    return new Response(
      JSON.stringify({ received: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(`Error handling webhook: ${error.message}`);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
