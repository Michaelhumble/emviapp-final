
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
    const { 
      postType, 
      listingId, 
      planType, 
      autoRenew, 
      durationMonths = 1 
    } = await req.json();
    
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
      unitAmount = durationMonths === 12 ? 99999 : 149999; // $999.99 or $1499.99
      productName = "Diamond Featured Job Post";
    }
    
    // Apply duration-based discounts (except for Diamond plan which has special pricing)
    if (planType !== 'diamond' && planType !== 'free') {
      let discountPercentage = 0;
      if (durationMonths === 3) discountPercentage = 5;
      else if (durationMonths === 6) discountPercentage = 10;
      else if (durationMonths === 12) discountPercentage = 20;
      
      // Add auto-renew discount
      if (autoRenew) discountPercentage += 5;
      
      // Apply discount
      unitAmount = Math.round(unitAmount * (1 - discountPercentage / 100));
    }
    
    // Add metadata to track payment details
    const metadata = {
      user_id: user.id,
      post_type: postType,
      listing_id: listingId || '',
      plan_type: planType,
      duration_months: String(durationMonths),
      auto_renew: autoRenew ? 'true' : 'false'
    };

    // Calculate expiration date based on duration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (durationMonths * 30)); // Approximate months as 30 days

    // Different checkout configuration based on auto-renew selection
    let session;
    
    if (autoRenew && unitAmount > 0) {
      // Create a subscription for auto-renew
      const interval = durationMonths === 1 ? 'month' : 
                        durationMonths === 3 ? 'quarter' : 
                        durationMonths === 6 ? 'half_year' : 'year';
      
      // Convert interval to Stripe format (only month and year are supported)
      const stripeInterval = interval === 'month' ? 'month' : 
                              interval === 'quarter' || interval === 'half_year' ? 'month' : 'year';
      
      // Adjust interval count for quarter and half-year
      const intervalCount = interval === 'quarter' ? 3 : 
                            interval === 'half_year' ? 6 : 1;
      
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${productName} (${durationMonths} month${durationMonths > 1 ? 's' : ''})`,
            },
            unit_amount: unitAmount,
            recurring: {
              interval: stripeInterval,
              interval_count: intervalCount
            }
          },
          quantity: 1,
        }],
        mode: 'subscription',
        success_url: `${req.headers.get('origin')}/post-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/post-canceled`,
        metadata: metadata,
        customer_email: user.email,
        subscription_data: {
          metadata: metadata
        }
      });
    } else {
      // Create one-time payment for non-auto-renew
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: unitAmount === 0 ? [] : [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${productName} (${durationMonths} month${durationMonths > 1 ? 's' : ''})`,
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
    }

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
        auto_renew_enabled: false,
        expires_at: expiresAt.toISOString()
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
