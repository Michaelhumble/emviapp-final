
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

// Define CORS headers for preflight requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    console.log("🔔 Stripe webhook received");
    
    // Get environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!stripeSecretKey) {
      throw new Error('Missing STRIPE_SECRET_KEY');
    }
    
    if (!webhookSecret) {
      throw new Error('Missing STRIPE_WEBHOOK_SECRET');
    }
    
    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-08-16',
    });
    
    // Get the raw body and signature header
    const rawBody = await req.text();
    const sig = req.headers.get('stripe-signature');
    
    if (!sig) {
      throw new Error('No Stripe signature found in request headers');
    }
    
    console.log("🔐 Verifying webhook signature...");
    
    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
      console.log(`✅ Webhook verified: ${event.type}`);
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed:`, err);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Initialize Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    
    // Extract metadata from the event
    const eventId = event.id;
    const eventType = event.type;
    const eventObject = event.data.object;
    
    console.log(`📊 Processing Stripe event: ${eventType} (${eventId})`);
    console.log(`🧾 Event data:`, JSON.stringify(eventObject, null, 2));
    
    // Log the event in the database regardless of event type
    const { error: logError } = await supabase
      .from('payment_logs')
      .insert({
        stripe_event_id: eventId,
        event_type: eventType,
        payload: event.data.object,
        processed_at: new Date().toISOString()
      });
      
    if (logError) {
      console.error('❌ Error logging Stripe event to database:', logError);
    } else {
      console.log('✅ Stripe event logged to database');
    }
    
    // Handle specific event types
    switch (eventType) {
      case 'checkout.session.completed': {
        const session = eventObject;
        console.log(`💰 Checkout completed: ${session.id}`);
        
        // Extract metadata from the session
        const postId = session.metadata?.post_id;
        const postType = session.metadata?.post_type;
        const userId = session.metadata?.user_id;
        
        if (postId && postType) {
          console.log(`🏷️ Post metadata found: ${postType} post ID ${postId}`);
          
          // Update post status based on post type
          if (postType === 'job') {
            const { error: jobError } = await supabase
              .from('jobs')
              .update({ 
                status: 'active',
                payment_confirmed_at: new Date().toISOString(),
                stripe_session_id: session.id
              })
              .eq('id', postId);
              
            if (jobError) {
              console.error(`❌ Error updating job status:`, jobError);
            } else {
              console.log(`✅ Job post ${postId} activated successfully`);
            }
          } else if (postType === 'salon') {
            const { error: salonError } = await supabase
              .from('salons')
              .update({ 
                status: 'active',
                payment_confirmed_at: new Date().toISOString(),
                stripe_session_id: session.id
              })
              .eq('id', postId);
              
            if (salonError) {
              console.error(`❌ Error updating salon status:`, salonError);
            } else {
              console.log(`✅ Salon post ${postId} activated successfully`);
            }
          }
          
          // Update payment log with successful payment
          const { error: updateError } = await supabase
            .from('payment_logs')
            .update({
              status: 'completed',
              post_id: postId,
              user_id: userId,
              completed_at: new Date().toISOString()
            })
            .eq('stripe_session_id', session.id);
          
          if (updateError) {
            console.error('❌ Error updating payment log:', updateError);
          } else {
            console.log('✅ Payment log updated successfully');
          }
        } else {
          console.warn('⚠️ Missing post metadata in checkout session');
        }
        break;
      }
      
      case 'checkout.session.expired': {
        const session = eventObject;
        console.log(`⏰ Checkout expired: ${session.id}`);
        
        // Extract metadata
        const postId = session.metadata?.post_id;
        const postType = session.metadata?.post_type;
        
        if (postId && postType) {
          // Update post status based on post type
          if (postType === 'job') {
            const { error: jobError } = await supabase
              .from('jobs')
              .update({ 
                status: 'payment_failed',
                updated_at: new Date().toISOString()
              })
              .eq('id', postId);
              
            if (jobError) {
              console.error(`❌ Error updating job status for expired session:`, jobError);
            }
          } else if (postType === 'salon') {
            const { error: salonError } = await supabase
              .from('salons')
              .update({ 
                status: 'payment_failed',
                updated_at: new Date().toISOString()
              })
              .eq('id', postId);
              
            if (salonError) {
              console.error(`❌ Error updating salon status for expired session:`, salonError);
            }
          }
          
          // Update payment log
          const { error: updateError } = await supabase
            .from('payment_logs')
            .update({
              status: 'expired',
              updated_at: new Date().toISOString()
            })
            .eq('stripe_session_id', session.id);
            
          if (updateError) {
            console.error('❌ Error updating payment log for expired session:', updateError);
          }
        }
        break;
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = eventObject;
        console.log(`💵 Payment intent succeeded: ${paymentIntent.id}`);
        // Handle payment intent success (if needed beyond session handling)
        break;
      }
      
      case 'payment_intent.failed': {
        const paymentIntent = eventObject;
        console.log(`❌ Payment intent failed: ${paymentIntent.id}`);
        // Handle payment intent failure
        break;
      }
      
      case 'checkout.session.async_payment_succeeded': {
        const session = eventObject;
        console.log(`✅ Async payment succeeded: ${session.id}`);
        // Similar logic to checkout.session.completed
        break;
      }
      
      case 'checkout.session.async_payment_failed': {
        const session = eventObject;
        console.log(`❌ Async payment failed: ${session.id}`);
        // Handle async payment failure
        break;
      }
      
      default:
        console.log(`⏩ Unhandled event type: ${eventType}`);
    }
    
    // Return success
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('💥 Error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
