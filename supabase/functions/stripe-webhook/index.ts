
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

// Logging utility for better debugging
const log = (message: string, data?: any) => {
  const logEntry = data ? `${message}: ${JSON.stringify(data)}` : message;
  console.log(`[WEBHOOK] ${logEntry}`);
};

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Get request body as text for signature verification
  const rawBody = await req.text();
  
  try {
    log("Received webhook request");
    
    // Verify environment variables
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeSecretKey || !webhookSecret) {
      throw new Error("Missing Stripe environment variables");
    }

    // Initialize Stripe with the correct API version
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-08-16" });
    
    // Extract signature from headers
    const sig = req.headers.get("stripe-signature");
    
    if (!sig) {
      log("No Stripe signature found");
      return new Response(JSON.stringify({ error: "No signature provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
      log("Validated webhook signature", { eventId: event.id, type: event.type });
    } catch (err) {
      log("Webhook signature verification failed", { error: err.message });
      return new Response(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Initialize Supabase client using service role key for DB operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );
    
    // Process different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        log("Processing checkout.session.completed", { sessionId: session.id });
        
        // For successful checkouts, update the listing and create payment log
        const metadata = session.metadata || {};
        
        // Store in payment logs
        await logPaymentEvent(supabaseAdmin, {
          event_type: event.type,
          event_id: event.id,
          session_id: session.id,
          user_id: metadata.user_id,
          listing_id: metadata.listing_id,
          post_type: metadata.post_type,
          pricing_tier: metadata.pricing_tier,
          duration_months: parseInt(metadata.duration_months || "0", 10),
          auto_renew: metadata.auto_renew === "true",
          status: "success",
          amount: session.amount_total
        });
        
        // Update listing status if applicable
        if (metadata.listing_id && metadata.post_type) {
          await updateListingStatus(
            supabaseAdmin, 
            metadata.listing_id, 
            metadata.post_type, 
            "active", 
            parseInt(metadata.duration_months || "1", 10)
          );
          log("Updated listing status to active", { listingId: metadata.listing_id });
        }
        
        break;
      }
      
      case "checkout.session.expired": {
        const session = event.data.object;
        log("Processing checkout.session.expired", { sessionId: session.id });
        
        const metadata = session.metadata || {};
        
        // Log the expired checkout
        await logPaymentEvent(supabaseAdmin, {
          event_type: event.type,
          event_id: event.id,
          session_id: session.id,
          user_id: metadata.user_id,
          listing_id: metadata.listing_id,
          post_type: metadata.post_type,
          status: "expired",
          amount: session.amount_total
        });
        
        // If temporary listing created, update its status to expired
        if (metadata.listing_id && metadata.post_type) {
          await updateListingStatus(
            supabaseAdmin, 
            metadata.listing_id, 
            metadata.post_type, 
            "expired"
          );
          log("Updated listing status to expired", { listingId: metadata.listing_id });
        }
        
        break;
      }
      
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        log("Processing payment_intent.succeeded", { paymentIntentId: paymentIntent.id });
        
        // Store successful payment intent
        await logPaymentEvent(supabaseAdmin, {
          event_type: event.type,
          event_id: event.id,
          payment_intent_id: paymentIntent.id,
          user_id: paymentIntent.metadata?.user_id,
          status: "success",
          amount: paymentIntent.amount
        });
        
        break;
      }
      
      case "payment_intent.failed": {
        const paymentIntent = event.data.object;
        log("Processing payment_intent.failed", { paymentIntentId: paymentIntent.id });
        
        await logPaymentEvent(supabaseAdmin, {
          event_type: event.type,
          event_id: event.id,
          payment_intent_id: paymentIntent.id,
          user_id: paymentIntent.metadata?.user_id,
          status: "failed",
          amount: paymentIntent.amount,
          failure_reason: paymentIntent.last_payment_error?.message || "Unknown failure"
        });
        
        break;
      }
      
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;
        log("Processing async payment success", { sessionId: session.id });
        
        const metadata = session.metadata || {};
        
        await logPaymentEvent(supabaseAdmin, {
          event_type: event.type,
          event_id: event.id,
          session_id: session.id,
          user_id: metadata.user_id,
          listing_id: metadata.listing_id,
          post_type: metadata.post_type,
          status: "success",
          amount: session.amount_total
        });
        
        // Update listing status if applicable
        if (metadata.listing_id && metadata.post_type) {
          await updateListingStatus(
            supabaseAdmin, 
            metadata.listing_id, 
            metadata.post_type, 
            "active", 
            parseInt(metadata.duration_months || "1", 10)
          );
          log("Updated listing status to active", { listingId: metadata.listing_id });
        }
        
        break;
      }
      
      case "checkout.session.async_payment_failed": {
        const session = event.data.object;
        log("Processing async payment failure", { sessionId: session.id });
        
        const metadata = session.metadata || {};
        
        await logPaymentEvent(supabaseAdmin, {
          event_type: event.type,
          event_id: event.id,
          session_id: session.id,
          user_id: metadata.user_id,
          listing_id: metadata.listing_id,
          post_type: metadata.post_type,
          status: "failed",
          amount: session.amount_total
        });
        
        // If there's a listing ID, update its status to failed
        if (metadata.listing_id && metadata.post_type) {
          await updateListingStatus(
            supabaseAdmin, 
            metadata.listing_id, 
            metadata.post_type, 
            "payment_failed"
          );
          log("Updated listing status to payment_failed", { listingId: metadata.listing_id });
        }
        
        break;
      }
      
      case "customer.subscription.created": 
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        log(`Processing ${event.type}`, { subscriptionId: subscription.id });
        
        await logPaymentEvent(supabaseAdmin, {
          event_type: event.type,
          event_id: event.id,
          subscription_id: subscription.id,
          user_id: subscription.metadata?.user_id,
          status: subscription.status,
          amount: subscription.items.data[0]?.price.unit_amount,
          additional_data: {
            current_period_start: subscription.current_period_start,
            current_period_end: subscription.current_period_end,
            cancel_at_period_end: subscription.cancel_at_period_end
          }
        });
        
        break;
      }
      
      default:
        // Log unhandled event types for future reference
        log("Unhandled webhook event type", { type: event.type });
    }
    
    // Return a 200 response to acknowledge receipt of the event
    return new Response(JSON.stringify({ received: true, eventType: event.type }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
    
  } catch (err) {
    // Catch any unexpected errors
    log("Unexpected webhook error", { error: err.message });
    return new Response(JSON.stringify({ error: `Webhook error: ${err.message}` }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Helper function to log payment events
async function logPaymentEvent(supabase, data) {
  try {
    // Insert into webhook_logs table
    const { error: logError } = await supabase
      .from('webhook_logs')
      .insert({
        event_type: data.event_type,
        event_id: data.event_id,
        status: data.status || 'unknown',
        details: {
          session_id: data.session_id,
          payment_intent_id: data.payment_intent_id,
          subscription_id: data.subscription_id,
          user_id: data.user_id,
          listing_id: data.listing_id,
          post_type: data.post_type,
          pricing_tier: data.pricing_tier,
          duration_months: data.duration_months,
          auto_renew: data.auto_renew,
          amount: data.amount,
          failure_reason: data.failure_reason,
          ...data.additional_data
        }
      });
    
    if (logError) {
      console.error("Failed to log webhook event:", logError);
    }
  } catch (e) {
    console.error("Error logging payment event:", e);
  }
}

// Helper function to update a listing status
async function updateListingStatus(supabase, listingId, postType, status, durationMonths = 1) {
  try {
    // For job posts
    if (postType === 'job') {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + durationMonths);
      
      const { error } = await supabase
        .from('jobs')
        .update({
          status: status,
          updated_at: new Date().toISOString(),
          expires_at: expiresAt.toISOString()
        })
        .eq('id', listingId);
        
      if (error) {
        console.error(`Failed to update job listing status: ${error.message}`);
      }
    }
    // For salon posts (if applicable)
    else if (postType === 'salon') {
      const { error } = await supabase
        .from('salons')
        .update({
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', listingId);
        
      if (error) {
        console.error(`Failed to update salon listing status: ${error.message}`);
      }
    }
  } catch (e) {
    console.error("Error updating listing status:", e);
  }
}
