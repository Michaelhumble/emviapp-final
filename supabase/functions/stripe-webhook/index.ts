
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
    return new Response(JSON.stringify({ error: "No Stripe signature found" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  try {
    // Get the raw body data for signature verification
    const body = await req.text();
    
    // Get Stripe secret key and webhook secret from environment variables
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey || !webhookSecret) {
      console.error("Missing required environment variables: STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET");
      throw new Error("Server configuration error");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    console.log(`Webhook event received: ${event.type}`);
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    // Log the event to track webhook activity
    await supabase
      .from("webhook_logs")
      .insert({
        event_type: event.type,
        event_id: event.id,
        status: "received",
        details: event.data.object
      });
      
    // Process different event types
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log(`Checkout session completed: ${session.id}`);
      
      // Get payment_log_id from metadata
      const paymentLogId = session.metadata?.payment_log_id;
      
      if (paymentLogId) {
        // Update payment log status
        const { error: updateError } = await supabase
          .from('payment_logs')
          .update({ 
            status: 'completed',
            payment_date: new Date().toISOString()
          })
          .eq('id', paymentLogId);
          
        if (updateError) {
          console.error("Error updating payment log:", updateError);
          await supabase
            .from('webhook_logs')
            .insert({
              event_type: event.type,
              status: 'error',
              details: { error: updateError, stage: 'updating_payment_log' }
            });
        }
        
        // Get payment details for post creation
        const { data: paymentLog, error: fetchError } = await supabase
          .from('payment_logs')
          .select('*')
          .eq('id', paymentLogId)
          .single();
          
        if (fetchError) {
          console.error("Error fetching payment log:", fetchError);
          await supabase
            .from('webhook_logs')
            .insert({
              event_type: event.type,
              status: 'error',
              details: { error: fetchError, stage: 'fetching_payment_log' }
            });
        }
          
        if (paymentLog) {
          // Create the actual post based on the payment
          const duration = paymentLog.pricing_options?.durationMonths || 1;
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + (duration * 30)); // Approximate month to 30 days
          
          const postData = {
            user_id: paymentLog.user_id,
            post_type: paymentLog.post_type,
            title: paymentLog.post_details?.title || 'New Post',
            content: paymentLog.post_details?.description || '',
            location: paymentLog.post_details?.location || '',
            contact_info: paymentLog.post_details?.contact_info || {},
            status: 'active',
            expires_at: expiresAt.toISOString(),
            is_nationwide: paymentLog.pricing_options?.isNationwide || false,
            price: paymentLog.price_amount / 100, // Convert from cents to dollars
            metadata: {
              pricing_tier: paymentLog.pricing_options?.selectedPricingTier || 'standard',
              payment_log_id: paymentLogId
            }
          };
          
          const { data: post, error: postError } = await supabase
            .from('posts')
            .insert(postData)
            .select()
            .single();
            
          if (postError) {
            console.error("Error creating post:", postError);
            await supabase
              .from('webhook_logs')
              .insert({
                event_type: event.type,
                status: 'error',
                details: { error: postError, stage: 'creating_post' }
              });
          } else {
            console.log(`Created post: ${post.id} with expiration: ${expiresAt.toISOString()}`);
            
            // Link the post to the payment log
            await supabase
              .from('payment_logs')
              .update({ post_id: post.id })
              .eq('id', paymentLogId);
              
            await supabase
              .from('webhook_logs')
              .insert({
                event_type: event.type,
                status: 'success',
                details: { post_id: post.id, payment_log_id: paymentLogId }
              });
          }
        }
      }
    } else if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
      
      // Log successful payment
      await supabase
        .from('webhook_logs')
        .insert({
          event_type: event.type,
          status: 'success',
          details: { payment_intent_id: paymentIntent.id }
        });
      
    } else if (event.type === 'payment_intent.failed') {
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent failed: ${paymentIntent.id}`);
      
      // Log failed payment
      await supabase
        .from('webhook_logs')
        .insert({
          event_type: event.type,
          status: 'failed',
          details: { 
            payment_intent_id: paymentIntent.id,
            error: paymentIntent.last_payment_error
          }
        });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error(`Webhook error: ${error.message}`);
    
    // Initialize Supabase client to log the error
    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") || "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
        { auth: { persistSession: false } }
      );
      
      await supabase
        .from('webhook_logs')
        .insert({
          event_type: 'error',
          status: 'error',
          details: { error: error.message }
        });
    } catch (logError) {
      console.error("Failed to log webhook error:", logError);
    }
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    );
  }
});
