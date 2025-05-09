
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";
import Stripe from "https://esm.sh/stripe@12.1.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || "",
      {
        global: { headers: { Authorization: authHeader } }
      }
    );
    
    // Get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'User not found or not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse the request body
    const { postType, listingId, planType, autoRenew } = await req.json();
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16"
    });
    
    // Determine price based on plan type and post type
    let unitAmount = 9999; // Default $99.99
    let productName = "Standard Listing";
    
    if (planType === 'free') {
      unitAmount = 0;
      productName = "Free Job Post";
    } else if (planType === 'standard') {
      unitAmount = 999; // $9.99
      productName = "Standard Job Post";
    } else if (planType === 'gold') {
      unitAmount = 1999; // $19.99
      productName = "Gold Featured Job Post";
    } else if (planType === 'premium') {
      unitAmount = 4999; // $49.99
      productName = "Premium Job Post";
    } else if (planType === 'diamond') {
      unitAmount = 149999; // $1499.99
      productName = "Diamond Featured Job Post";
    }
    
    // Add metadata to track payment details
    const metadata = {
      user_id: user.id,
      post_type: postType,
      listing_id: listingId || '',
      plan_type: planType,
      auto_renew: autoRenew ? 'true' : 'false'
    };

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: unitAmount === 0 ? [] : [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: productName,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      }],
      mode: unitAmount === 0 ? 'setup' : 'payment',
      success_url: `${req.headers.get('origin')}/post-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/post-canceled`,
      metadata: metadata,
      customer_email: user.email
    });

    // For free posts, log the "payment" directly
    if (unitAmount === 0) {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") || "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
      );
      
      await supabaseAdmin.from('payment_logs').insert({
        user_id: user.id,
        listing_id: listingId || null,
        plan_type: "Free",
        payment_status: "success",
        stripe_payment_id: session.id,
        auto_renew_enabled: false
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
