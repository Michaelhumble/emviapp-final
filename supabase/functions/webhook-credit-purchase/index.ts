
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response(
      JSON.stringify({ error: "Missing stripe signature" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
  
  try {
    // Get request body for webhook verification
    const body = await req.text();
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!stripeWebhookSecret) {
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
    
    console.log(`Received Stripe credit purchase webhook event: ${event.type}`);
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Log the webhook event
    const { error: logError } = await supabase
      .from('webhook_logs')
      .insert({
        event_type: event.type,
        payload: event,
        source: 'credit-purchase'
      });
      
    if (logError) {
      console.error("Error logging webhook:", logError);
    }
    
    // Process different event types
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      if (session.metadata?.purchase_type === 'credits') {
        const userId = session.metadata.user_id;
        const creditsAmount = parseInt(session.metadata.credits_amount || '0');
        
        if (userId && creditsAmount > 0) {
          // Update user's credits
          const { error: updateError } = await supabase.rpc(
            'award_credits',
            {
              p_user_id: userId,
              p_action_type: 'purchase',
              p_value: creditsAmount,
              p_description: `Purchased ${creditsAmount} credits`
            }
          );
          
          if (updateError) {
            console.error("Error awarding credits:", updateError);
          } else {
            console.log(`Successfully awarded ${creditsAmount} credits to user ${userId}`);
            
            // Create notification for user
            const { error: notifError } = await supabase
              .from('notifications')
              .insert({
                user_id: userId,
                type: 'credit_purchase',
                message: `You've received ${creditsAmount} credits from your purchase!`,
                metadata: {
                  credits: creditsAmount,
                  transaction_id: session.id
                }
              });
              
            if (notifError) {
              console.error("Error creating notification:", notifError);
            }
          }
        }
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
