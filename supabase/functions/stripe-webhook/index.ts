
// @ts-nocheck
// ^ This comment disables TypeScript checking for this file since it uses Deno types
// that aren't available in the browser/Node.js environment

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.14.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the raw request body
    const rawBody = await req.text();
    console.log("Received webhook event");

    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-08-16",
    });

    // Get the stripe signature from the headers
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      console.error("No Stripe signature found in request headers");
      return new Response(JSON.stringify({ error: "No Stripe signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the webhook signature using STRIPE_WEBHOOK_SECRET
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
      );
      console.log(`✅ Verified webhook signature, event type: ${event.type}`);
    } catch (err) {
      console.error(`❌ Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase client with service role for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );

    // Process the event based on type
    console.log(`Processing event: ${event.type}, ID: ${event.id}`);

    // Handle checkout.session.completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log(`🛒 Checkout session completed: ${session.id}`);

      // Extract metadata from the session
      const metadata = session.metadata || {};
      const postId = metadata.post_id;
      const postType = metadata.post_type;
      const expiresAt = metadata.expires_at;
      const pricingTier = metadata.pricing_tier;
      
      console.log(`Session metadata: postId=${postId}, type=${postType}, tier=${pricingTier}, expires=${expiresAt}`);

      // Update payment log status
      const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
        .from("payment_logs")
        .select("*")
        .eq("stripe_payment_id", session.id)
        .single();

      if (paymentLogError) {
        console.error(`Error fetching payment log for session ${session.id}:`, paymentLogError);
      } else if (paymentLog) {
        console.log(`Found payment log: ${paymentLog.id}`);
        
        // Update payment log status
        const { error: updateLogError } = await supabaseAdmin
          .from("payment_logs")
          .update({ 
            payment_status: "success",
            updated_at: new Date().toISOString()
          })
          .eq("id", paymentLog.id);

        if (updateLogError) {
          console.error(`Error updating payment log ${paymentLog.id}:`, updateLogError);
        } else {
          console.log(`✅ Updated payment log ${paymentLog.id} status to success`);
        }
      }

      // If we have a post_id, update its status based on the post type
      if (postId && postType) {
        let updateTable;
        
        if (postType === "job") {
          updateTable = "jobs";
        } else if (postType === "salon") {
          updateTable = "salons";
        } else if (postType === "booth") {
          updateTable = "booths";
        } else if (postType === "supply") {
          updateTable = "supplies";
        }
        
        if (updateTable) {
          const { error: updatePostError } = await supabaseAdmin
            .from(updateTable)
            .update({
              status: "active",
              expires_at: expiresAt,
              pricingTier: pricingTier || "standard",
              is_featured: pricingTier?.includes("premium") || pricingTier?.includes("diamond"),
              updated_at: new Date().toISOString()
            })
            .eq("id", postId);

          if (updatePostError) {
            console.error(`Error updating ${postType} post ${postId}:`, updatePostError);
          } else {
            console.log(`✅ Updated ${postType} post ${postId} to active status`);
          }
        }
      }
    } 
    // Handle checkout.session.expired
    else if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      console.log(`🕒 Checkout session expired: ${session.id}`);

      // Extract metadata from the session
      const metadata = session.metadata || {};
      const postId = metadata.post_id;
      const postType = metadata.post_type;
      
      // Log payment failure
      const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
        .from("payment_logs")
        .select("*")
        .eq("stripe_payment_id", session.id)
        .single();

      if (paymentLogError) {
        console.error(`Error fetching payment log for expired session ${session.id}:`, paymentLogError);
      } else if (paymentLog) {
        // Update payment log status
        const { error: updateLogError } = await supabaseAdmin
          .from("payment_logs")
          .update({ 
            payment_status: "expired",
            updated_at: new Date().toISOString()
          })
          .eq("id", paymentLog.id);

        if (updateLogError) {
          console.error(`Error updating expired payment log ${paymentLog.id}:`, updateLogError);
        } else {
          console.log(`✅ Updated payment log ${paymentLog.id} status to expired`);
        }
      }
    }
    // Handle checkout.session.async_payment_succeeded
    else if (event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object;
      console.log(`💲 Async payment succeeded for session: ${session.id}`);
      
      // Similar logic to checkout.session.completed
      const metadata = session.metadata || {};
      const postId = metadata.post_id;
      const postType = metadata.post_type;
      const expiresAt = metadata.expires_at;
      
      // Update payment log
      const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
        .from("payment_logs")
        .select("*")
        .eq("stripe_payment_id", session.id)
        .single();

      if (!paymentLogError && paymentLog) {
        await supabaseAdmin
          .from("payment_logs")
          .update({ 
            payment_status: "success",
            updated_at: new Date().toISOString()
          })
          .eq("id", paymentLog.id);
        
        console.log(`✅ Updated payment log ${paymentLog.id} after async payment success`);
      }
    }
    // Handle checkout.session.async_payment_failed
    else if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object;
      console.log(`❌ Async payment failed for session: ${session.id}`);
      
      // Update payment log
      const { data: paymentLog, error: paymentLogError } = await supabaseAdmin
        .from("payment_logs")
        .select("*")
        .eq("stripe_payment_id", session.id)
        .single();

      if (!paymentLogError && paymentLog) {
        await supabaseAdmin
          .from("payment_logs")
          .update({ 
            payment_status: "failed",
            updated_at: new Date().toISOString() 
          })
          .eq("id", paymentLog.id);
        
        console.log(`✅ Updated payment log ${paymentLog.id} after async payment failure`);
      }
    }
    // Handle payment_intent.succeeded
    else if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log(`💰 Payment intent succeeded: ${paymentIntent.id}`);
      
      // Log successful payment
      await supabaseAdmin
        .from("payment_logs")
        .insert({
          payment_type: "stripe_intent",
          stripe_payment_id: paymentIntent.id,
          payment_status: "success",
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          metadata: paymentIntent.metadata
        });
    }
    // Handle payment_intent.failed
    else if (event.type === "payment_intent.failed") {
      const paymentIntent = event.data.object;
      console.log(`❌ Payment intent failed: ${paymentIntent.id}`);

      // Log failed payment
      await supabaseAdmin
        .from("payment_logs")
        .insert({
          payment_type: "stripe_intent",
          stripe_payment_id: paymentIntent.id,
          payment_status: "failed",
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          metadata: paymentIntent.metadata,
          error_message: paymentIntent.last_payment_error?.message
        });
    }
    // Log other events
    else {
      console.log(`📝 Other webhook event received: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(`❌ Error processing webhook:`, error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
