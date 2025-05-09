
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

    // Handle successful checkout
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const metadata = session.metadata || {};
      
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
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
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
        return new Response(JSON.stringify({ error: 'Payment recording failed' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
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
