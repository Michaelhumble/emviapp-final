
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

// This function will handle Stripe webhooks to update user credits after purchase
serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';

    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-08-16',
    });

    // Verify the webhook signature
    let event;
    try {
      const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
      if (!endpointSecret) {
        console.warn('Missing Stripe webhook secret');
      }
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Extract metadata
      const userId = session.metadata?.userId;
      const creditsAmount = parseInt(session.metadata?.creditsAmount || '0', 10);

      if (userId && creditsAmount > 0) {
        // Update user credits in the database
        const { data, error } = await supabase
          .from('users')
          .select('credits')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching user credits:', error);
          return new Response(JSON.stringify({ error: 'Failed to fetch user credits' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const currentCredits = data?.credits || 0;
        const newCredits = currentCredits + creditsAmount;

        const { error: updateError } = await supabase
          .from('users')
          .update({ credits: newCredits })
          .eq('id', userId);

        if (updateError) {
          console.error('Error updating user credits:', updateError);
          return new Response(JSON.stringify({ error: 'Failed to update user credits' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        // Log credit purchase in activity log
        await supabase
          .from('activity_log')
          .insert({
            user_id: userId,
            activity_type: 'credit_earned',
            description: `Purchased ${creditsAmount} credits`,
            metadata: { credits: creditsAmount, source: 'purchase' }
          });

        console.log(`Successfully updated credits for user ${userId}: +${creditsAmount}`);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
