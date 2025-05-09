
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
  
  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey || !webhookSecret) {
      throw new Error("Required Stripe configuration is missing");
    }

    // Get the signature from the header
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No stripe signature in request");
    }

    // Get raw body for webhook signature verification
    const body = await req.text();
    
    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
    
    // Initialize Supabase client with service role key
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );
    
    console.log(`Webhook event received: ${event.type}`);
    
    // Log webhook event
    await supabase
      .from('webhook_logs')
      .insert({
        event_type: event.type,
        payload: event.data.object,
        source: 'stripe'
      });
      
    // Process different event types
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const paymentLogId = session.metadata?.payment_log_id;
      
      if (paymentLogId) {
        console.log(`Processing completed payment for log: ${paymentLogId}`);
        
        // Update payment log status
        const { error: updateError } = await supabase
          .from('payment_logs')
          .update({ 
            status: 'completed',
            completed_at: new Date().toISOString(),
            payment_details: session
          })
          .eq('id', paymentLogId);
          
        if (updateError) {
          console.error("Error updating payment log:", updateError);
        }
        
        // Get payment details for post creation
        const { data: paymentLog } = await supabase
          .from('payment_logs')
          .select('*')
          .eq('id', paymentLogId)
          .single();
          
        if (paymentLog) {
          // Create the actual post based on the payment
          const { post_type, post_details, pricing_options, user_id } = paymentLog;
          
          // Calculate expiration date based on duration months
          const months = pricing_options.durationMonths || 1;
          const expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + months);
          
          // Create post record
          const postData = {
            ...post_details,
            user_id,
            status: 'active',
            post_type,
            pricingTier: pricing_options.selectedPricingTier,
            payment_id: paymentLogId,
            expires_at: expiresAt.toISOString()
          };
          
          const { data: post, error: postError } = await supabase
            .from('posts')
            .insert(postData)
            .select('id')
            .single();
            
          if (postError) {
            console.error("Error creating post:", postError);
          } else {
            console.log(`Created post: ${post.id} with expiration: ${expiresAt.toISOString()}`);
            
            // Link post ID back to payment log
            await supabase
              .from('payment_logs')
              .update({ post_id: post.id })
              .eq('id', paymentLogId);
          }
        }
      }
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object;
      const paymentLogId = session.metadata?.payment_log_id;
      
      if (paymentLogId) {
        // Update payment log for expired session
        await supabase
          .from('payment_logs')
          .update({ 
            status: 'expired',
            updated_at: new Date().toISOString()
          })
          .eq('id', paymentLogId);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(`Webhook error: ${error.message}`);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    );
  }
});
